/* eslint-disable default-case */
import React, { Component, useEffect, useRef } from 'react'
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
      hiddenValue: '',
      outputValue: 0,
      history: '',
      clickedNumber: false,
      numberScreen: '',
      numberMemory: '',
      opScreen: '',
      opMemory: ''
    }
  }

  handleEnter(){
    alert("Enter key is pressed")
  }

  
  
  printHistory = async (num) => {
    await this.setState({ history: num })
  }

  printOutput = async (num) => {
    var n = Number(num)
    var value = n.toLocaleString('en')
    if (num === '0') {
      await this.setState({ outputValue: 0 })
    }
    else if (num === '') {
      await this.setState({ outputValue: '' })
    }
    else if (num === '.') {
      await this.setState({ outputValue: value + '.' })
    }
    else {
    await this.setState({ outputValue: num })
    }
    await this.setState({ hiddenValue: num })
  }

  clear = async () => {
    await this.setState({
      clickedNumber: false,
      numberScreen: '',
      numberMemory: '',
      opScreen: '',
      opMemory: ''
    })
    await this.printHistory('')
    await this.printOutput('0')
  }

  backspace = async () => {
    var output = this.state.hiddenValue.toString()
    if (output !== '0') {
      output = output.substr(0, output.length - 1)
      await this.printOutput(output)
      await this.setState({ clickedNumber: true })
      if (output === '' || output === '-') {
        await this.printOutput('0')
        await this.setState({ clickedNumber: true })
      }
    }
  }

  number = async button => {
    if (this.state.opScreen === '√' || this.state.opScreen === 'R') {
      this.clear()
    }
    if (this.state.hiddenValue === '0') {
      await this.printOutput('')
    }
    if (this.state.clickedNumber === false) {
      await this.printOutput('')
    }
    await this.setState({ clickedNumber: true })
    var output = this.state.hiddenValue
    output = Number(output + button)
    if (output === '') {
      await this.printOutput('0')
    }
    else {
      await this.printOutput(output)
    }
  }

  signal = async () => {
    var output = this.state.hiddenValue
    if (output === '0' || output === '') { }
    else if (output.toString().startsWith('-')) {
      output = output.toString().substr(1, output.length)
      await this.printOutput(output)
    }
    else {
      output = '-' + output
      await this.printOutput(output)
    }
    await this.setState({ clickedNumber: true })
  }

  dot = async button => {
    if (this.state.clickedNumber === false) {
      await this.printOutput('0.')
      await this.setState({ clickedNumber: true })
    }
    if (this.state.hiddenValue === '') {
      await this.printOutput('0.')
      await this.setState({ clickedNumber: true })
    }
    else if (this.state.hiddenValue.toString().includes('.')) { }
    else {
      var output = this.state.hiddenValue
      output = output + button
      await this.printOutput(output)
    }
  }

  operator = async button => {
    await this.setState({
      numberMemory: Number(this.state.numberScreen),
      numberScreen: Number(this.state.hiddenValue),
      opMemory: this.state.opScreen,
      opScreen: button
    })
    // alert(this.state.numberMemory)
    var history = this.state.history
    if (this.state.clickedNumber === false && this.state.opScreen !== '=' && this.state.opScreen !== '±' && this.state.opScreen !== '√' && this.state.opScreen !== 'R'
      && this.state.history !== '' && this.state.opMemory !== '√' && this.state.opMemory !== 'R') {
      history = history.toString().substr(0, history.length - 1)
      await this.printHistory(history + this.state.opScreen)
    }
    else {
      if (this.state.opScreen === '√' || this.state.opScreen === 'R') {
        history = history + this.state.opScreen + '(' + this.state.numberScreen + ')'
        await this.printHistory(history)
      }
      else {
        if (this.state.opMemory === '√' || this.state.opMemory === 'R') {
          history = history + this.state.opScreen
          await this.printHistory(history)
        }
        else {
          history = history + this.state.numberScreen + this.state.opScreen
          await this.printHistory(history)
        }
      }
      switch (this.state.opScreen) {
        case '√':
          var result = Math.sqrt(this.state.numberScreen)
          if (isNaN(result)) {
            alert("Negative numbers can't have square roots!")
            this.clear()
          }
          else {
            await this.printOutput(result)
            await this.setState({ numberScreen: result })
          }
          break
        case 'R':
          result = 1 / this.state.numberScreen
          await this.printOutput(result)
          await this.setState({ numberScreen: result })
          break
      }
      switch (this.state.opMemory) {
        case '+':
          await await this.printOutput(this.state.numberMemory + this.state.numberScreen)
          break
        case '-':
          await this.printOutput(this.state.numberMemory - this.state.numberScreen)
          break
        case '*':
          await this.printOutput(this.state.numberMemory * this.state.numberScreen)
          break
        case '/':
          result = this.state.numberMemory / this.state.numberScreen
          if (isNaN(result) || result === Infinity) {
            alert('The result of a division by zero is undefined!')
            this.clear()
          }
          else {
            await this.printOutput(result)
          }
          break
        case '%':
          await this.printOutput(this.state.numberMemory / 100 * this.state.numberScreen)
          break
        case '^':
          await this.printOutput(Math.pow(this.state.numberMemory, this.state.numberScreen))
          break
      }
      if (this.state.opScreen === '=') {
        await this.printHistory('')
      }
    }
    await this.setState({ clickedNumber: false, numberScreen: Number(this.state.hiddenValue) })
  }

  Click = async button => {
    // button.preventDefault()
    if (button === '.') {
      await this.dot(button)
    }
    else if (button === '±') {
      await this.signal()
    }
    else if (button === 'clear') {
      await this.clear()
    }
    else if (button === 'backspace') {
      await this.backspace()
    }
    else if (button === 'clear-entry') {
      await this.printOutput('0')
    }
    else if (isNaN(button)) {
      await this.operator(button)
    }
    else {
      await this.number(button)
    }
  }

  
  // useKey(key, cb){
  //   // const callbackRef = useRef(cb)
  
  //   useEffect(() => {
  //     // callbackRef.current = cb
  //   })
  
  //   useEffect(() => {
  //     function handle(event){
  //       if (event.code === key){
  //         // callbackRef.current(event)
  //       }
  //     }
  //     document.addEventListener("keypress", handle)
  //     return () => document.removeEventListener("keypress", handle)
  //   },[key])
  // }

  render() {
    
    // this.useKey("Enter", this.handleEnter)
    return (
      <div className='App' >
        <div id='container'>
          <div id='calculator'>
            <div id='result'>
              <History historyValue={this.state.history} />
              <HiddenOutput hiddenOutputValue={this.state.hiddenValue} />
              <Output outputValue={this.state.outputValue} />
            </div>
            <Keyboard onClick={this.Click} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
