
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 13335;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x => x.split(' ').map(Number));
    return input;
}

function run() {
    const [[N, W, L], ...[trucks]] = getInput()

    let bridge = Array.from({length:W}).fill(0)
    let passNum = 0;
    let time = 0;
    let accLoad = 0
    let index = 0;
    while(passNum !== N) {
        time ++

        if(bridge[0] !== 0) {
            passNum += 1
        }
        accLoad -= bridge[0]
        bridge.shift()

        if(accLoad + trucks[index] <= L) {
            bridge.push(trucks[index])
            accLoad += trucks[index]
            index ++
        }
        else {
            bridge.push(0)
        }
    }
    console.log(time)
}

run()
