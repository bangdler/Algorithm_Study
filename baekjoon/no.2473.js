
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 2473;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/);
    return input;
}

function readline() {
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let inputArr = [];
    rl.on('line', function(line) {
        const input = line.toString().trim().split(' ').map((x)=>Number(x));
        inputArr.push(input)
    })
    rl.on('close', function() {
        return run(inputArr)
    })
}

function run(input) {
    // const [[strNum], arr] = getInput()
    // const N = Number(strNum)
    // const samples = arr.split(' ').map(Number).sort((a,b) => a - b)
    const [[N], arr] = input
    const samples = arr.sort((a,b) => a - b)

    let zeroClose = 10000000000
    let zeroSet = []

    // 투포인터 - 한 용액을 고정하고 나머지 배열의 양 끝 값에서 + 또는 - 하며 세 값의 합을 본다.

    for(let i = 0; i < N-2; i++) {
        let curNum = samples[i]
        let start = i+1
        let end = N-1

        while(start < end) {
            let sum = curNum + samples[start] + samples[end]
            if(Math.abs(sum) < zeroClose) {
                zeroClose = Math.abs(sum)
                zeroSet = [curNum, samples[start], samples[end]]
            }

            if(sum === 0) {
                break;
            }
            if(sum > 0) {
                end -= 1
            }
            else {
                start += 1
            }
        }
        if(zeroClose === 0) break;
    }

    console.log(zeroSet.join(' '))
}

readline()