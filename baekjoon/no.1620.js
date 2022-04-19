function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 1620;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x=>x.split(' '));
    return input;
}

function run() {
    const [[N, M], ...arr] = getInput()
    const flatArr = arr.flatMap(x => x)
    const dicArr = flatArr.splice(0, N)
    const test = flatArr
    let answer = []

    const dictionary = {}
    const numDictionary = {}
    dicArr.forEach((dic, i) => {
        dictionary[i+1] = dic
        numDictionary[dic] = i+1
    })

    test.forEach(problem => {
        if(dictionary[problem]) {
            answer.push(dictionary[problem])
        }
        else {
            answer.push(numDictionary[problem])
        }
    })

    console.log(answer.join("\n"))
}
run()