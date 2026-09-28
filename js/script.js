
const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

let currentNumber = "";
let previousNumber = "";
let operator = "";

// Number buttons
numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        const number = button.textContent;

        // Prevent multiple decimal points
        if (number === "." && currentNumber.includes(".")) {
            return;
        }

        currentNumber += number;

        updateDisplay();
    });
});

// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (currentNumber === "" && previousNumber === "") {
            return;
        }

        if (currentNumber !== "" && previousNumber !== "") {
            calculate();
        }

        if (currentNumber !== "") {
            previousNumber = currentNumber;
            currentNumber = "";
        }

        operator = button.textContent;

        updateDisplay();
    });
});

// Equals button
equalsButton.addEventListener("click", () => {

    if (currentNumber === "" || previousNumber === "" || operator === "") {
        return;
    }

    calculate();
    updateDisplay();
});

// Clear button
clearButton.addEventListener("click", () => {

    currentNumber = "";
    previousNumber = "";
    operator = "";

    updateDisplay();
});

// Delete button
deleteButton.addEventListener("click", () => {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
});

// Calculation
function calculate() {

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = previous + current;
            break;

        case "−":
            result = previous - current;
            break;

        case "×":
            result = previous * current;
            break;

        case "÷":
            if (current === 0) {
                alert("Cannot divide by zero!");
                return;
            }

            result = previous / current;
            break;

        default:
            return;
    }

    currentNumber = result.toString();
    previousNumber = "";
    operator = "";
}

// Update display
function updateDisplay() {

    currentOperand.textContent =
        currentNumber || "0";

    if (previousNumber && operator) {
        previousOperand.textContent =
            `${previousNumber} ${operator}`;
    } else {
        previousOperand.textContent = "";
    }
}

// Initial display
updateDisplay();
