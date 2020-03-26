/* eslint-disable eqeqeq */
/* eslint-disable default-case */
/* eslint-disable no-loop-func */
// function getHistory() {
//   return document.getElementById("history-value").innerText;
// }

// function printHistory(num) {
//   document.getElementById("history-value").innerText = num;
// }

// function getOutput() {
//   return document.getElementById("hidden-output-value").innerText;
// }

// function printOutput(num) {
//   if (num == "0") {
//     document.getElementById("output-value").innerText = "0";
//   }
//   else if (num == "") {
//     document.getElementById("output-value").innerText = "";
//   }
//   else if (num == ".") {
//     document.getElementById("output-value").innerText = getFormattedNumber(num) + ".";
//   }
//   else {
//     document.getElementById("output-value").innerText = getFormattedNumber(num);
//   }
//   document.getElementById("hidden-output-value").innerText = num;
// }

// function getFormattedNumber(num) {
//   var n = Number(num);
//   var value = n.toLocaleString("en");
//   return value;
// }

// var clicked_number = false;
// var screen = "";
// var memory = "";
// var op1 = "";
// var op2 = "";

// function clear() {
//   screen = "";
//   memory = "";
//   op1 = "";
//   op2 = "";
//   printHistory("");
//   printOutput("0");
// }

// var operator = document.getElementsByClassName("operator");

// for (var i = 0; i < operator.length; i++) {
//   operator[i].addEventListener('click', function () {
//     if (this.id == "clear") {
//       clear();
//     }
//     else if (this.id == "backspace") {
//       var output = getOutput().toString();
//       if (output != "0") {
//         output = output.substr(0, output.length - 1);
//         printOutput(output);
//         clicked_number = true;
//         if (output == "" || output == "-") {
//           printOutput("0");
//           clicked_number = true;
//         }
//       }
//     }
//     else if (this.id == "clear-entry") {
//       printOutput("0");
//     }
//     else {
//       memory = Number(screen);
//       screen = Number(getOutput());
//       op2 = op1;
//       op1 = this.id;
//       var history = getHistory();
//       if (clicked_number == false && op1 != "=" && op1 != "±" && op1 != "√" && op1 != "R"
//         && getHistory() != "" && op2 != "√" && op2 != "R") {
//         history = history.substr(0, history.length - 1);
//         printHistory(history + op1);
//       }
//       else {
//         if (op1 == "√" || op1 == "R") {
//           history = history + op1 + "(" + screen + ")";
//           printHistory(history);
//         }
//         else {
//           if (op2 == "√" || op2 == "R") {
//             history = history + op1;
//             printHistory(history);
//           }
//           else {
//             history = history + screen + op1;
//             printHistory(history);
//           }
//         }
//         switch (op1) {
//           case "√":
//             var result = Math.sqrt(screen);
//             if (isNaN(result)) {
//               alert("Negative numbers can't have square roots!");
//               clear();
//             }
//             else {
//               printOutput(result);
//               screen = result;
//             }
//             break;
//           case "R":
//             result = 1 / screen;
//             printOutput(result);
//             screen = result;
//             break;
//         }
//         switch (op2) {
//           case "+":
//             printOutput(memory + screen);
//             break;
//           case "-":
//             printOutput(memory - screen);
//             break;
//           case "*":
//             printOutput(memory * screen);
//             break;
//           case "/":
//             result = memory / screen;
//             if (isNaN(result) || result == Infinity) {
//               alert("The result of a division by zero is undefined!");
//               clear();
//             }
//             else {
//               printOutput(result);
//             }
//             break;
//           case "%":
//             printOutput(memory / 100 * screen);
//             break;
//           case "^":
//             printOutput(Math.pow(memory, screen));
//             break;
//         }
//         if (op1 == "=") {
//           printHistory("");
//         }
//       }
//       clicked_number = false;
//       screen = Number(getOutput());
//     }
//   });
// }

// var number = document.getElementsByClassName("number");
// for (var i = 0; i < number.length; i++) {
//   number[i].addEventListener('click', function () {
//     if (op1 == "√" || op1 == "R") {
//       clear();
//     }
//     if (getOutput() == "0") {
//       printOutput("");
//     }
//     if (clicked_number == false) {
//       printOutput("");
//     }
//     clicked_number = true;
//     var output = getOutput();
//     output = Number(output + this.id);
//     if (output == "") {
//       printOutput("0");
//     }
//     else {
//       printOutput(output);
//     }
//   });
// }

// document.getElementById("±").addEventListener('click', function () {
//   var output = getOutput();
//   if (output == "0" || output == "") { }
//   else if (output.startsWith("-")) {
//     output = output.substr(1, output.length);
//     printOutput(output);
//   }
//   else {
//     output = "-" + output;
//     printOutput(output);
//   }
//   clicked_number = true;
// });

// document.getElementById(".").addEventListener('click', function () {
//   if (clicked_number == false) {
//     printOutput("0.")
//     clicked_number = true;
//   }
//   if (getOutput() == "") {
//     printOutput("0.");
//     clicked_number = true;
//   }
//   else if (getOutput().includes(".")) { }
//   else {
//     var output = getOutput();
//     output = output + this.id;
//     printOutput(output);
//   }
// });

// document.querySelector('input[name=theme]').addEventListener('change', function () {
//   if (this.checked) {
//     trans()
//     document.getElementById("style").setAttribute('href', 'style2.css')
//   } else {
//     trans()
//     document.getElementById("style").setAttribute('href', 'style.css')
//   }
// })

// let trans = () => {
//   document.documentElement.classList.add('transition');
//   window.setTimeout(() => {
//     document.documentElement.classList.remove('transition')
//   }, 1000)
// }
