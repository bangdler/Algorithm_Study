function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 11501;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x=>x.split(' ').map(Number));
    return input;
}

function run() {
    const [[T], ...array] = getInput()
    const cases = Array.from({length:T}, (_, i) => [array[i*2], array[i*2+1]])

    let answers = [];
    cases.forEach(eachCase => {
        const [[N], ...[prices]] = eachCase;
        let max = 0;
        let buy = {}
        for(let i = 0; i < N-1; i++) {
            if(prices[i] <= prices[i+1]) { // 내일 주식보다 싸면 산다.
                if(buy[prices[i]] === undefined) {
                    buy[prices[i]] = 1
                }
                else {
                    buy[prices[i]] += 1
                }
            }
            else {
                for(let price in buy) {
                    let profit = (prices[i] - price) * buy[price]
                    max += profit
                }
                buy ={}
            }
        }
        // 마지막 날이 비쌀 경우
        if(Object.keys(buy).length !== 0) {
            for(let price in buy) {
                let profit = (prices[N-1] - price) * buy[price]
                max += profit
            }
        }
        answers.push(max)
    })
    console.log(answers.join(`\n`))
}

run()