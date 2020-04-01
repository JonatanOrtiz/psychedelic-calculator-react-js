/* eslint-disable default-case */
import React, { useState } from "react"
import Keyboard from "./components/keyboard"
import "./style.css"

export default function App() {
	const [hiddenValue, setHiddenValue] = useState("")
	const [outputValue, setOutputValue] = useState(0)
	const [historyValue, setHistoryValue] = useState("")
	const [clickedNumber, setClickedNumber] = useState(false)
	const [numberScreen, setNumberScreen] = useState("")
	const [opScreen, setOpScreen] = useState("")

	function printOutput(num) {
		var n = Number(num)
		var value = n.toLocaleString("en")
		if (num === "0") {
			setOutputValue(0)
		} else if (num === "") {
			setOutputValue("")
		} else if (num === ".") {
			setOutputValue(value + ".")
		} else {
			setOutputValue(value)
		}
		setHiddenValue(num)
	}

	function clear() {
		setClickedNumber(false)
		setNumberScreen("")
		setOpScreen("")
		setHistoryValue("")
		printOutput("0")
	}

	function backspace() {
		var output = hiddenValue.toString()
		if (output !== "0") {
			output = output.substr(0, output.length - 1)
			printOutput(output)
			setClickedNumber(true)
			if (output === "" || output === "-") {
				printOutput("0")
				setClickedNumber(true)
			}
		}
	}

	function number(button) {
		if (opScreen === "√" || opScreen === "R") {
			clear()
		}
		if (hiddenValue === "0") {
			printOutput("")
		}
		if (clickedNumber === false) {
			//verificação para tirar o antigo número da tela para poder exibir o resultado da conta mesmo sem o igual ser pressionado
			setClickedNumber(true)
			printOutput(Number(button))
		} else {
			setClickedNumber(true)
			var output = hiddenValue
			output = Number(output + button)
			printOutput(output)
		}
	}

	function signal() {
		var output = hiddenValue
		if (output === "0" || output === "") {
		} else if (output.toString().startsWith("-")) {
			output = output.toString().substr(1, output.length)
			printOutput(output)
		} else {
			output = "-" + output
			printOutput(output)
		}
		setClickedNumber(true)
	}

	function dot(button) {
		if (clickedNumber === false) {
			printOutput("0.")
			setClickedNumber(true)
		}
		if (hiddenValue === "") {
			printOutput("0.")
			setClickedNumber(true)
		} else if (hiddenValue.toString().includes(".")) {
		} else {
			var output = hiddenValue
			output = output + button
			printOutput(output)
		}
	}

	function operator(button) {
		setNumberScreen(Number(hiddenValue))
		setOpScreen(button)
		var nMemory = Number(numberScreen)
		var nScreen = Number(hiddenValue)
		var oMemory = opScreen
		var history = historyValue
		if (
			clickedNumber === false &&
			button !== "=" &&
			button !== "±" &&
			button !== "√" &&
			button !== "R" &&
			historyValue !== "" &&
			oMemory !== "√" &&
			oMemory !== "R"
		) {
			history = history.toString().substr(0, history.length - 1)
			setHistoryValue(history + button)
			setNumberScreen(Number(hiddenValue))
		} else {
			if (button === "√" || button === "R") {
				history = history + button + "(" + nScreen + ")"
				setHistoryValue(history)
			} else {
				if (oMemory === "√" || oMemory === "R") {
					history = history + button
					setHistoryValue(history)
				} else {
					history = history + nScreen + button
					setHistoryValue(history)
				}
			}
			var result
			switch (button) {
				case "√":
					result = Math.sqrt(nScreen)
					if (isNaN(result)) {
						alert("Negative numbers can't have square roots!")
						clear()
					} else {
						printOutput(result)
						nScreen = result
					}
					break
				case "R":
					result = 1 / nScreen
					printOutput(result)
					nScreen = result
					break
			}
			switch (oMemory) {
				case "+":
					result = nMemory + nScreen
					printOutput(result)
					break
				case "-":
					result = nMemory - nScreen
					printOutput(result)
					break
				case "*":
					result = nMemory * nScreen
					printOutput(result)
					break
				case "/":
					result = nMemory / nScreen
					if (isNaN(result) || result === Infinity) {
						alert("The result of a division by zero is undefined!")
						clear()
					} else {
						printOutput(result)
					}
					break
				case "%":
					result = (nMemory / 100) * nScreen
					printOutput(result)
					break
				case "^":
					result = Math.pow(nMemory, nScreen)
					printOutput(result)
					break
			}
			if (button === "=") {
				setHistoryValue("")
			}
			setClickedNumber(false)
			if (!oMemory || oMemory === "√" || oMemory === "R" || oMemory === "=") {
				setNumberScreen(Number(hiddenValue)) //caso só troque de operador de histórico, não havera nada no result, por isso é necessário continuar passando este hiddenValue para o numberScreen
			} else {
				setNumberScreen(Number(result))
			}
		}
	}

	function click(button) {
		if (button === ".") {
			dot(button)
		} else if (button === "±") {
			signal()
		} else if (button === "clear") {
			clear()
		} else if (button === "backspace") {
			backspace()
		} else if (button === "clear-entry") {
			printOutput("0")
		} else if (isNaN(button)) {
			operator(button)
		} else {
			number(button)
		}
	}

	return (
		<div className="App">
			<div id="container">
				<div id="calculator">
					<div id="result">
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
