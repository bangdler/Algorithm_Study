
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 1541;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim();
    return input;
}

function run() {
    const input = getInput()

    let firstOperator = true;
    if(input[0] === '-') {
        firstOperator = false;
    }

    const minusExpressions = input.split(/-/)
    let total = 0;
    minusExpressions.forEach((expression, idx) => {
        if(idx === 0 && firstOperator) {
            if(expression.includes('+')) {
                let sum = expression.split(/\+/).reduce((acc, cur) => acc + Number(cur), 0)
                total += sum
            }
            else {
                total += Number(expression)
            }
        }
        else {
            if(expression.includes('+')) {
                let sum = expression.split(/\+/).reduce((acc, cur) => acc + Number(cur), 0)
                total -= sum
            }
            else {
                total -= Number(expression)
            }
        }
    })
    console.log(total)
}

run()
