const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
const historyList = document.getElementById("historyList");

let currentNumber = "";
let previousNumber = "";
let operator = "";

const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            enterNumber(value);
        } 
        else if (["+", "−", "×", "÷", "%"].includes(value)) {
            chooseOperator(value);
        } 
        else if (value === "=") {
            calculate();
        } 
        else if (value === "AC") {
            clearCalculator();
        } 
        else if (value === "⌫") {
            deleteNumber();
        }
    });
});

function enterNumber(number) {
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    currentNumber += number;
    currentDisplay.textContent = currentNumber;
}

function chooseOperator(selectedOperator) {
    if (currentNumber === "") {
        return;
    }

    if (previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;
    previousNumber = currentNumber;
    currentNumber = "";

    previousDisplay.textContent = previousNumber + " " + operator;
}

function calculate() {
    if (previousNumber === "" || currentNumber === "" || operator === "") {
        return;
    }

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "−":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                currentDisplay.textContent = "Error";
                return;
            }
            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;
    }

    const calculation =
        firstNumber + " " + operator + " " + secondNumber + " = " + result;

    addHistory(calculation);

    currentDisplay.textContent = result;

    previousNumber = "";
    currentNumber = result.toString();
    operator = "";
    previousDisplay.textContent = "";
}

function clearCalculator() {
    currentNumber = "";
    previousNumber = "";
    operator = "";

    currentDisplay.textContent = "0";
    previousDisplay.textContent = "";
}

function deleteNumber() {
    currentNumber = currentNumber.slice(0, -1);

    currentDisplay.textContent =
        currentNumber === "" ? "0" : currentNumber;
}

function addHistory(calculation) {
    if (historyList.querySelector("p")) {
        historyList.innerHTML = "";
    }

    const item = document.createElement("div");
    item.textContent = calculation;

    historyList.prepend(item);
}