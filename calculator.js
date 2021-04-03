function parse(str) {
    return Function(`'use strict'; return (${str})`)()
  } 

let ids = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "Enter": "equals",
    "*": "multiply",
    "/": "divide",
    "-": "substract",
    ".": "decimal",
    "+": "add",
    "Backspace": "clear"
    };

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            whole:[],
            current: [0],
            isFloat: true
        }
        window.addEventListener("keydown", (e)=>{
            e.preventDefault()
            console.log(e.key)
            document.getElementById(ids[e.key]).click()
        });
        this.addNum = this.addNum.bind(this)
    }

    addNum(event) {4
        let character = event.target.innerText;
        let whole = [...this.state.whole];
        let current = [...this.state.current];
        let lastSymbol = whole[whole.length-1];
        let isFloat = this.state.isFloat;
        if (parseFloat(whole.join(""))%1 !== 0 && whole.length == 1){isFloat = false}
        //for nums
        if (parseInt(character)>=0) {
            if (parseInt(whole.join("")) && whole.length == 1){
                whole.push(character)
                whole = [whole.join("")]
            }else if (current.length === 1 && current[0] === 0){
                console.log("second")
                current.pop()
                current.push(parseInt(character))
            } else {
                current.push(character)
            }
        }
        //for points
        if(character === "." && current.indexOf(".")<0 && isFloat) {
            current.push(character)
        }

        //for operators
        if (character === "*"|| character === "/" || character === "+" || character === "-") {
            //adding number and operators to whole expression
            if (whole.length === 0){ 
                isFloat = true
                whole.push(parseFloat(current.join("")))
                current = [];
                whole.push(character)
            } else if (!parseFloat(lastSymbol) && parseFloat(current.join(""))){
                isFloat = true
                whole.push(parseFloat(current.join("")))
                current = [];
                whole.push(character)
            } else if (parseInt(whole.join("")) && parseFloat(whole[whole.length - 1])){
                isFloat = true
                whole.push(character)
            }

            //changing operator
            if (!parseFloat(whole[whole.length - 1]) && parseFloat(whole[whole.length - 2])) {
                let minus = false
                if (character === "-" && parseFloat(whole[whole.length - 2])){
                    if (whole[whole.length - 1] ==="*" || whole[whole.length - 1] ==="/"){
                        whole.push(character)
                    } else {
                        minus = false
                    }
                } else {
                whole.pop()
                whole.push(character)
                }

                if (minus){
                whole.pop()
                whole.push(character)
                }
            }else if (!parseFloat(whole[whole.length - 1]) && !parseFloat(whole[whole.length - 2])) {
                whole.pop()
                whole.pop()
                whole.push(character)
            }
        }

        //calculate
        if (character === "="){
            whole.push(parseFloat(current.join("")))
            whole = [parse(whole.join(""))]
            current = []
            isFloat = true;  
        }

        //clear
        if (character ==="C") {
            whole = []
            current = [0]
            console.clear()
            isFloat = true
        }


       
        this.setState({
            whole:whole,
            current:current,
            isFloat:isFloat
        })
        console.log("whole: " + this.state.whole.join(""))
}
   

    
    render() {
        return(
            <div id="calculator">
                <div id="display">{this.state.whole.join("") + (parseFloat(this.state.current.join("")) === 0 && this.state.whole.length > 0 ? "" : this.state.current.join(""))}</div>

            <div className="button" id="zero" value="0" onClick={this.addNum}>0</div>
            <div className="button" id="one" value="1" onClick={this.addNum}>1</div>
            <div className="button" id="two" value="2" onClick={this.addNum}>2</div>
            <div className="button" id="three" value="3" onClick={this.addNum}>3</div>
            <div className="button" id="four" value="4" onClick={this.addNum}>4</div>
            <div className="button" id="five" value="5" onClick={this.addNum}>5</div>
            <div className="button" id="six" value="6" onClick={this.addNum}>6</div>
            <div className="button" id="seven" value="7" onClick={this.addNum}>7</div>
            <div className="button" id="eight" value="8" onClick={this.addNum}>8</div>
            <div className="button" id="nine" value="9" onClick={this.addNum}>9</div>
        
            <div className="button" id="equals"onClick={this.addNum}>=</div>
            <div className="button" id="add"onClick={this.addNum}>+</div>
            <div className="button" id="subtract"onClick={this.addNum}>-</div>
            <div className="button" id="divide"onClick={this.addNum}>/</div>
            <div className="button" id="multiply"onClick={this.addNum}>*</div>
            <div className="button" id="decimal"onClick={this.addNum}>.</div>
            <div className="button" id="clear"onClick={this.addNum}>C</div>
            </div>
        )
    }
}

ReactDOM.render(<Calculator />, document.getElementById("root"))
