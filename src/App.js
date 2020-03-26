/* eslint-disable default-case */
import React, { Component } from 'react'
import Keyboard from './components/keyboard'
import Output from './components/output'
import History from './components/history'
import HiddenOutput from './components/hiddenOutput'
import './style.css'
// import './style2.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      result: '',
      outputValue: 0,
      history: '',
      clicked_number: false,
      screen: "",
      memory: "",
      op1: "",
      op2: ""
    }
  }

  printHistory(num) {
    this.setState({ history: num })
  }
  
  printOutput(num) {
    var n = Number(num)
    var value = n.toLocaleString("en")
    if (num === "0") {
      this.setState({ outputValue: 0 })
    }
    else if (num === "") {
      this.setState({ outputValue: '' })
    }
    else if (num === ".") {
      this.setState({ outputValue: value + "." })
    }
    else {
      this.setState({ outputValue: value })
    }
    this.setState({ result: num })
  }

  clear() {
    this.setState({ screen: "" })
    this.setState({ memory: "" })
    this.setState({ op1: "" })
    this.setState({ op2: "" })
    this.printHistory("")
    this.printOutput("0")
  }

  number(button) {
    if (this.state.op1 === "√" || this.state.op1 === "R") {
      this.clear()
    }
    if (this.state.result === "0") {
      this.printOutput("")
    }
    if (this.state.clicked_number === false) {
      this.printOutput("")
    }
    this.setState({ clicked_number: true })
    var output = this.state.result
    output = Number(output + button)
    if (output === "") {
      this.printOutput("0")
    }
    else {
      this.printOutput(output)
    }
  }

  signal() {
    var output = this.state.result
    if (output === "0" || output === "") { }
    else if (output.startsWith("-")) {
      output = output.substr(1, output.length)
      this.printOutput(output)
    }
    else {
      output = "-" + output
      this.printOutput(output)
    }
    this.setState({ clicked_number: true })
  }

  dot(button) {
    if (this.state.clicked_number === false) {
      this.printOutput("0.")
      this.setState({ clicked_number: true })
    }
    if (this.state.result === "") {
      this.printOutput("0.")
      this.setState({ clicked_number: true })
    }
    else if (this.state.result.includes(".")) { }
    else {
      var output = this.state.result
      output = output + button
      this.printOutput(output)
    }
  }

  backspace() {
    var output = this.state.result.toString()
    if (output !== "0") {
      output = output.substr(0, output.length - 1)
      this.printOutput(output)
      this.setState({ clicked_number: true })
      if (output === "" || output === "-") {
        this.printOutput("0")
        this.setState({ clicked_number: true })
      }
    }
  }

  operator(button) {
    this.setState({ memory: Number(this.state.screen) })
    this.setState({ screen: Number(this.state.result) })
    this.setState({ op2: this.state.op1 })
    this.setState({ op1: button })
    var history = this.state.history
    if (this.state.clicked_number === false && this.state.op1 !== "=" && this.state.op1 !== "±" && this.state.op1 !== "√" && this.state.op1 !== "R"
      && this.state.history !== "" && this.state.op2 !== "√" && this.state.op2 !== "R") {
      history = history.substr(0, history.length - 1)
      this.printHistory(history + this.state.op1)
    }
    else {
      if (this.state.op1 === "√" || this.state.op1 === "R") {
        history = history + this.state.op1 + "(" + this.state.screen + ")"
        this.printHistory(history)
      }
      else {
        if (this.state.op2 === "√" || this.state.op2 === "R") {
          history = history + this.state.op1
          this.printHistory(history)
        }
        else {
          history = history + this.state.screen + this.state.op1
          this.printHistory(history)
        }
      }
      switch (this.state.op1) {
        case "√":
          var result = Math.sqrt(this.state.screen)
          if (isNaN(result)) {
            alert("Negative numbers can't have square roots!")
            this.clear()
          }
          else {
            this.printOutput(result)
            this.setState({ screen: result })
          }
          break
        case "R":
          result = 1 / this.state.screen
          this.printOutput(result)
          this.setState({ screen: result })
          break
      }
      switch (this.state.op2) {
        case "+":
          this.printOutput(this.state.memory + this.state.screen)
          break
        case "-":
          this.printOutput(this.state.memory - this.state.screen)
          break
        case "*":
          this.printOutput(this.state.memory * this.state.screen)
          break
        case "/":
          result = this.state.memory / this.state.screen
          if (isNaN(result) || result === Infinity) {
            alert("The result of a division by zero is undefined!")
            this.clear()
          }
          else {
            this.printOutput(result)
          }
          break
        case "%":
          this.printOutput(this.state.memory / 100 * this.state.screen)
          break
        case "^":
          this.printOutput(Math.pow(this.state.memory, this.state.screen))
          break
      }
      if (this.state.op1 === "=") {
        this.printHistory("")
      }
    }
    this.setState({ clicked_number: false })
    this.setState({ screen: Number(this.state.result) })
  }

  onClick = button => {
    if (button === '.') {
      this.dot(button)
    }
    if (button === '±') {
      this.signal()
    }
    if (button === "clear") {
      this.clear()
    }
    if (button === "backspace") {
      this.backspace()
    }
    if (button === "clear-entry") {
      this.printOutput("0")
    }
    else if (isNaN(button)) {
      this.operator(button)
    }
    else {
      this.number(button)
    }
    // alert(this.state.clicked_number)
  }

  render() {
    return (
      <div className="App" >
        <div id="container">
          <div id="calculator">
            <div id="result">
              <History historyValue={this.state.history} />
              <HiddenOutput hiddenOutputValue={this.state.result} />
              <Output outputValue={this.state.outputValue} />
            </div>
            <Keyboard onClick={this.onClick} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
