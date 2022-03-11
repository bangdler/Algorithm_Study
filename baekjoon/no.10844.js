
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 10844;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `test_${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim();
    return input;
}

// 브루트포스 : 24 이상부터 객체 최대치가 넘는지 나누기가 0으로 나옴...

function run2() {
    const input = getInput();
    const target = Number(input)
    const base = Array.from({length:9}, (_, i) => i+1)
    let obj = {}
    const getStairNum = (num, depth) => {
        if(depth === target) {
            return obj[num] = num
        }
        const numStr = num.toString()
        const lastStr = numStr.substring(numStr.length -1)
        const lastNum = Number(lastStr)

        for(let i = 0; i < 2; i++) {
            if(i === 0 && lastNum -1 >= 0) {
                const addStr = (lastNum-1).toString()
                const minusNum = Number(numStr + addStr)
                getStairNum(minusNum, depth + 1)
            }
            if(i === 1 && lastNum +1 <= 9) {
                const addStr = (lastNum+1).toString()
                const plusNum = Number(numStr + addStr)
                getStairNum(plusNum, depth + 1)
            }
        }
    }

    base.forEach(x => getStairNum(x, 1))
    console.log(Object.keys(obj).length % 1000000000)
}

run();
