/* eslint-disable default-case */
import React, { useState } from 'react'
import Keyboard from './components/keyboard'
import './style.css'
// import './style2.css'

export default function App() {
  const [hiddenValue, setHiddenValue] = useState('')
  const [outputValue, setOutputValue] = useState(0)
  const [historyValue, setHistoryValue] = useState('')
  const [clickedNumber, setClickedNumber] = useState(false)
  const [numberScreen, setNumberScreen] = useState('')
  const [numberMemory, setNumberMemory] = useState('')
  const [opScreen, setOpScreen] = useState('')
  const [opMemory, setOpMemory] = useState('')

  function printHistory(num) {
    setHistoryValue(num)
  }

  function printOutput(num) {
    var n = Number(num)
    var value = n.toLocaleString('en')
    if (num === '0') {
      setOutputValue(0)
    }
    else if (num === '') {
      setOutputValue('')
    }
    else if (num === '.') {
      setOutputValue(value + '.')
    }
    else {
      setOutputValue(value)
    }
    setHiddenValue(num)
  }

  function clear() {
    setClickedNumber(false)
    setNumberScreen('')
    setNumberMemory('')
    setOpScreen('')
    setOpMemory('')
    printHistory('')
    printOutput('0')
  }

  function backspace() {
    var output = hiddenValue.toString()
    if (output !== '0') {
      output = output.substr(0, output.length - 1)
      printOutput(output)
      setClickedNumber(true)
      if (output === '' || output === '-') {
        printOutput('0')
        setClickedNumber(true)
      }
    }
  }

  function number(button) {
    if (opScreen === '√' || opScreen === 'R') {
      clear()
    }
    if (hiddenValue === '0') {
      printOutput('')
    }
    if (clickedNumber === false) {
      printOutput('')
    }
    setClickedNumber(true)
    var output = hiddenValue
    output = Number(output + button)
    if (output === '') {
      printOutput('0')
    }
    else {
      printOutput(output)
    }
  }
  
  function signal() {
    var output = hiddenValue
    if (output === '0' || output === '') { }
    else if (output.toString().startsWith('-')) {
      output = output.toString().substr(1, output.length)
      printOutput(output)
    }
    else {
      output = '-' + output
      printOutput(output)
    }
    setClickedNumber(true)
  }

  function dot(button) {
    if (clickedNumber === false) {
      printOutput('0.')
      setClickedNumber(true)
    }
    if (hiddenValue === '') {
      printOutput('0.')
      setClickedNumber(true)
    }
    else if (hiddenValue.toString().includes('.')) { }
    else {
      var output = hiddenValue
      output = output + button
      printOutput(output)
    }
  }

  function operator(button) {
    setNumberMemory(Number(numberScreen))
    setNumberScreen(Number(hiddenValue))
    setOpMemory(opScreen)
    setOpScreen(button)
    var history = historyValue
    if (clickedNumber === false && opScreen !== '=' && opScreen !== '±' && opScreen !== '√' && opScreen !== 'R'
      && historyValue !== '' && opMemory !== '√' && opMemory !== 'R') {
      history = history.toString().substr(0, history.length - 1)
      printHistory(history + opScreen)
    }
    else {
      if (opScreen === '√' || opScreen === 'R') {
        history = history + opScreen + '(' + numberScreen + ')'
        printHistory(history)
      }
      else {
        if (opMemory === '√' || opMemory === 'R') {
          history = history + opScreen
          printHistory(history)
        }
        else {
          history = history + numberScreen + opScreen
          printHistory(history)
        }
      }
      switch (opScreen) {
        case '√':
          var result = Math.sqrt(numberScreen)
          if (isNaN(result)) {
            alert("Negative numbers can't have square roots!")
            clear()
          }
          else {
            printOutput(result)
            setNumberScreen(result)
          }
          break
        case 'R':
          result = 1 / numberScreen
          printOutput(result)
          setNumberScreen(result)
          break
      }
      switch (opMemory) {
        case '+':
          printOutput(numberMemory + numberScreen)
          break
        case '-':
          printOutput(numberMemory - numberScreen)
          break
        case '*':
          printOutput(numberMemory * numberScreen)
          break
        case '/':
          result = numberMemory / numberScreen
          if (isNaN(result) || result === Infinity) {
            alert('The result of a division by zero is undefined!')
            clear()
          }
          else {
            printOutput(result)
          }
          break
        case '%':
          printOutput(numberMemory / 100 * numberScreen)
          break
        case '^':
          printOutput(Math.pow(numberMemory, numberScreen))
          break
      }
      if (opScreen === '=') {
        printHistory('')
      }
    }
    setClickedNumber(false)
    setNumberScreen(Number(hiddenValue))
  } 
  
  function click(button) {
    if (button === '.') {
      dot(button)
    }
    else if (button === '±') {
      signal()
    }
    else if (button === 'clear') {
      clear()
    }
    else if (button === 'backspace') {
      backspace()
    }
    else if (button === 'clear-entry') {
      printOutput('0')
    }
    else if (isNaN(button)) {
      operator(button)
    }
    else {
      number(button)
    }
  }

  return (
    <div className='App' >
      <div id='container'>
        <div id='calculator'>
          <div id='result'>
            <div id="history">
              <p id="history-value">{historyValue}</p>
            </div>
            <div id="hidden-output">
              <p id="hidden-output-value">{hiddenValue}</p>
            </div>
            <div id="output">
              <p id="output-value">{outputValue}</p>
            </div>
          </div>
          <Keyboard onClick={click} />
        </div>
      </div>
    </div>
  )
}
