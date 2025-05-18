const additionOperation = () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "Please enter valid numbers in both fields.";
        return;
    }

    const addition = num1 + num2;

    const resultText = `
        Addition: ${addition}
    `;
    
    document.getElementById('result').innerHTML = resultText;
};

const subtractOperation = () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "Please enter valid numbers in both fields.";
        return;
    }

    const subtraction = num1 - num2;

    const resultText = `
        Subtraction: ${subtraction} <br>
    `;
    
    document.getElementById('result').innerHTML = resultText;
};

const multiplyOperation = () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "Please enter valid numbers in both fields.";
        return;
    }

    const multiplication = num1 * num2;

    const resultText = `
        Multiplication: ${multiplication}
    `;
    
    document.getElementById('result').innerHTML = resultText;
};

const divideOperation = () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "Please enter valid numbers in both fields.";
        return;
    }

    const division = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";

    const resultText = `
        Division: ${division}
    `;
    
    document.getElementById('result').innerHTML = resultText;
};

document.getElementById('additionButton').addEventListener('click', additionOperation);
document.getElementById('subtractButton').addEventListener('click', subtractOperation);
document.getElementById('multiplyButton').addEventListener('click', multiplyOperation);
document.getElementById('divideButton').addEventListener('click', divideOperation);