// 그리디

function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 11399;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x => x.split(' ').map(Number));
    return input;
}

function run() {
    const [[N], ...[times]] = getInput()

    let sortedTimes = times.sort((a,b) => a-b)
    let waitings = []

    for(let i = 0; i < N; i++){
        let accTime = 0
        for(let j = 0; j < i + 1; j++) {
            accTime += sortedTimes[j]
        }
        waitings.push(accTime)
    }

    const answer = waitings.reduce((acc, cur) => acc + cur)
    console.log(answer)
}

function run2() {
    const [[N], ...[times]] = getInput()
    let sortedTimes = times.sort((a,b) => a-b)
    let sum = 0
    sortedTimes.reduce((acc, cur) => {
        sum += acc + cur
        return acc + cur
    }, 0)
    console.log(sum)
}

run2()