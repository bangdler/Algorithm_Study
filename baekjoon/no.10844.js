
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

// dp 로 풀기
// dp[i][j] = j 로 시작하는 i 자릿수 숫자의 개수
// dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1]
// 1 는 자신의 전전 자리수 개수와 2의 전 자리수개수의 합으로 반복되므로 [i-2][j] + [i-1][j+1] 로 한다. (단 i = 2 일 경우를 대비하여 dp 초기값 [0][1]에 1을 넣어준다.
// 9 는 8의 전 자리수개수 합과 같으므로 [i-1][j-1]

// 0  1   2    3   4 5  6  8 9
// 1 0 2 1 3  2 4 3 5     7 9 8
//  1 1 3
function run1() {
    const input = getInput();
    const base = Array.from({length:10}).fill(0).map((x,i) => x = i !==0? 1:0)
    const dp = [[0, 1], base]
    for(let i = 2; i <= input; i++) {
        let temp = Array.from({length:10}).fill(0);
        for(let j = 0; j < temp.length; j++) {
            if(j === 0) {
                temp[j] = i === 2? 1: dp[i-1][j+1]
            }
            else if(j === 9) {
                temp[j] = dp[i-1][j-1]
            }
            else{
                temp[j] = dp[i-1][j-1] + dp[i-1][j+1] % 1000000000
            }
        }
        dp.push(temp)
    }
    const sum = dp[input].reduce((acc, cur) => acc + cur)
    console.log(sum % 1000000000)
}

function run_origin() {
    const input = getInput();
    const base = Array.from({length:10}).fill(0).map((x,i) => x = i !==0? 1:0)
    const dp = [[0, 1], base]
    for(let i = 2; i <= input; i++) {
        let temp = Array.from({length:10}).fill(0);
        for(let j = 1; j < temp.length; j++) {
            if(j === 1) {
                temp[j] = dp[i-2][j] + dp[i-1][j+1] % 1000000000
            }
            else if(j === 9) {
                temp[j] = dp[i-1][j-1]
            }
            else{
                temp[j] = dp[i-1][j-1] + dp[i-1][j+1] % 1000000000
            }
        }
        dp.push(temp)
    }
    const sum = dp[input].reduce((acc, cur) => acc + cur)
    console.log(sum % 1000000000)
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
    console.log(obj)
    console.log(Object.keys(obj).length % 1000000000)
}

console.log(Number.MAX_SAFE_INTEGER)
run1();
run_origin()
//run2()