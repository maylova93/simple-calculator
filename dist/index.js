"use strict";
//Эта функция выполняет математическую операцию над двумя числами в зависимости от значения operation.
function calculate(operation, num1, num2) {
    switch (operation) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            if (num2 !== 0) {
                return num1 / num2;
            }
            else {
                throw new Error('Division by zero');
            }
        case 'inverseDivide':
            if (num1 !== 0) {
                return 1 / num1;
            }
            else {
                throw new Error('Division by zero');
            }
        default:
            throw new Error('Invalid operation');
    }
}
//Эти переменные используются для хранения текущего ввода (currentInput), текущей операции (operation) и первого операнда (firstOperand).
let currentInput = '';
let operation = null;
let firstOperand = null;
//Эта функция вызывается при нажатии кнопки на калькуляторе.
function pressKey(key) {
    const display = document.getElementById('display');
    if (!display)
        return;
    if (key === 'C') {
        currentInput = '';
        firstOperand = null;
        operation = null;
        display.value = '';
    }
    else if (key === '=' && operation && firstOperand !== null) {
        const secondOperand = parseFloat(currentInput);
        display.value = calculate(operation, firstOperand, secondOperand).toString();
        currentInput = display.value;
        firstOperand = null;
        operation = null;
    }
    else if (['+', '-', '*', '/', 'inv'].includes(key)) {
        if (key === 'inv') {
            const value = parseFloat(currentInput);
            display.value = calculate('inverseDivide', value, 0).toString();
            currentInput = display.value;
        }
        else {
            operation = mapKeyToOperation(key);
            firstOperand = parseFloat(currentInput);
            currentInput = key;
            display.value = currentInput;
            currentInput = '';
        }
    }
    else {
        currentInput += key;
        display.value = currentInput;
    }
}
//Эта функция сопоставляет нажатую клавишу с соответствующей операцией.
function mapKeyToOperation(key) {
    switch (key) {
        case '+':
            return 'add';
        case '-':
            return 'subtract';
        case '*':
            return 'multiply';
        case '/':
            return 'divide';
        default:
            throw new Error('Invalid key');
    }
}
//Этот код выполняется, когда HTML-документ полностью загружен и готов к взаимодействию. Он находит элемент с идентификатором display и очищает его значение.
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    display.value = '';
});
