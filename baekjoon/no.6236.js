
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 6236;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/);
    return input;
}

function run() {
    const [setValues, ...arr] = getInput()
    const [N, M] = setValues.split(' ').map(Number)
    const expenses = arr.map(Number)

    let start = Math.max(...expenses)
    let end = expenses.reduce((acc,cur) => acc+cur)
    let availableMoney = []

    // 인출 금액 최소화를 위해 돈이 남을 때 새로 인출하는 경우를 k 번으로 제한한다. 오버인출횟수 0 ~ M 번 중 가장 작은 인출금액이 정답.
    for(let k = 0; k <= M; k++) {
        while (start <= end) {
            let mid = Math.floor((start + end) / 2)

            let count = 1
            let currentMoney = mid
            let overWithdrawal = 0

            for (let i = 0; i < N; i++) {
                if (expenses[i] <= currentMoney) {
                    currentMoney -= expenses[i]
                    if (overWithdrawal < k) {
                        count += 1
                        overWithdrawal += 1
                        currentMoney = mid
                    }
                } else {
                    count += 1
                    currentMoney = mid
                    currentMoney -= expenses[i]
                }
            }

            if (count <= M) {
                availableMoney.push(mid)
                end = mid - 1
            } else if (count > M) {
                start = mid + 1
            }
        }
    }

    console.log(Math.min(...availableMoney))
}

run()