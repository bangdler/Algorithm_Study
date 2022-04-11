function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 17413;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim();
    return input;
}

function run() {
    const input = getInput()
    let bracketSwitch = false;
    let word = ``;
    let words = []
    for(let i = 0; i < input.length; i++) {
        const str = input[i]
        if(str === '<') {
            bracketSwitch = true;
            word += str;
        }
        else if(str === '>') {
            bracketSwitch = false;
            word += str;
            words.push(word);
            word = ``;
        }
        else if(bracketSwitch) {
            word += str
        }
        else if(!bracketSwitch && str === ' ') {
            word += str;
            words.push(word)
            word = ``
        }
        else {
            word = str + word;
        }
    }
    if(word !== '') {
        words.push(word)
    }
    console.log(words.join(''))
}

run()