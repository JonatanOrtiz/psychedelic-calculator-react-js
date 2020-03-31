/* eslint-disable default-case */
import React, { useState, useEffect } from 'react'
import Keyboard from './components/keyboard'
import './style.css'
// import './style2.css'

export default function App() {
  const [control, setControl] = useState('')
  const [hiddenValue, setHiddenValue] = useState('')
  const [outputValue, setOutputValue] = useState(0)
  const [historyValue, setHistoryValue] = useState('')
  const [clickedNumber, setClickedNumber] = useState(false)
  const [numberScreen, setNumberScreen] = useState('')
  const [numberMemory, setNumberMemory] = useState('')
  const [opScreen, setOpScreen] = useState('')
  const [opMemory, setOpMemory] = useState('')

  async function printOutput(num) {
    var n = await Number(num)
    var value = await n.toLocaleString('en')
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

  async function clear() {
    setClickedNumber(false)
    setNumberScreen('')
    setNumberMemory('')
    setOpScreen('')
    setOpMemory('')
    setHistoryValue('')
    await printOutput('0')
  }

  async function backspace() {
    var output = await hiddenValue.toString()
    if (output !== '0') {
      output = await output.substr(0, output.length - 1)
      await printOutput(output)
      setClickedNumber(true)
      if (output === '' || output === '-') {
        await printOutput('0')
        setClickedNumber(true)
      }
    }
  }

  async function number(button) {
    if (opScreen === '√' || opScreen === 'R') {
      clear()
    }
    else if (hiddenValue === '0') {
      await printOutput('')
    }
    else if (clickedNumber === false) {
      await printOutput('')
    }
    setClickedNumber(true)
    // var output = await hiddenValue
    var output = await Number(hiddenValue + button)
    if (output === '') {
      await printOutput('0')
    }
    else {
      await printOutput(hiddenValue + button)
    }
  }
  
  async function signal() {
    var output = await hiddenValue
    if (output === '0' || output === '') { }
    else if (output.toString().startsWith('-')) {
      output = await output.toString().substr(1, output.length)
      await printOutput(output)
    }
    else {
      output = await '-' + output
      await printOutput(output)
    }
    setClickedNumber(true)
  }

  async function dot(button) {
    if (clickedNumber === false) {
      await printOutput('0.')
      setClickedNumber(true)
    }
    if (hiddenValue === '') {
      await printOutput('0.')
      setClickedNumber(true)
    }
    else if (hiddenValue.toString().includes('.')) { }
    else {
      var output = await hiddenValue
      output = await output + button
      await printOutput(output)
    }
  }

  async function operator(button) {
    setNumberMemory(Number(numberScreen))
    setNumberScreen(Number(hiddenValue))
    setOpMemory(opScreen)
    setOpScreen(button)
    var history = await historyValue
    if (clickedNumber === false && button !== '=' && button !== '±' && button !== '√' && button !== 'R'
      && historyValue !== '' && opScreen !== '√' && opScreen !== 'R') {
      history = await history.toString().substr(0, history.length - 1)
      setHistoryValue(history + button)
    }
    else {
      if (button === '√' || button === 'R') {
        history = await history + button + '(' + hiddenValue + ')'
        setHistoryValue(history)
      }
      else {
        if (opScreen === '√' || opScreen === 'R') {
          history = await history + button
          setHistoryValue(history)
        }
        else {
          history = await history + hiddenValue + button
          setHistoryValue(history)
        }
      }
      switch (button) {
        case '√':
          var result = await Math.sqrt(hiddenValue)
          if (isNaN(result)) {
            alert("Negative numbers can't have square roots!")
            clear()
          }
          else {
            await printOutput(result)
            setNumberScreen(result)
          }
          break
        case 'R':
          result = await 1 / hiddenValue
          await printOutput(result)
          setNumberScreen(result)
          break
      }
      switch (opScreen) {
        case '+':
          await printOutput(numberScreen + hiddenValue)
          break
        case '-':
          await printOutput(numberScreen - hiddenValue)
          break
        case '*':
          await printOutput(numberScreen * hiddenValue)
          break
        case '/':
          result = await numberScreen / hiddenValue
          if (isNaN(result) || result === Infinity) {
            alert('The result of a division by zero is undefined!')
            clear()
          }
          else {
            await printOutput(result)
          }
          break
        case '%':
          await printOutput(numberScreen / 100 * hiddenValue)
          break
        case '^':
          await printOutput(Math.pow(numberScreen), hiddenValue)
          break
      } 
      if (button === '=') {
        setHistoryValue('')
      }
    }
    setClickedNumber(false)
    setNumberScreen(hiddenValue)
  } 
  
  async function click(button) {
    setControl(button)
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
      await printOutput('0')
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