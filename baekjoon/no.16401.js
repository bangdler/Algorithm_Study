
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 16401;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x => x.split(' ').map(Number));
    return input;
}

function run() {
    const [[M, N], sticks] = getInput()

    let start = 1
    let end = Math.max(...sticks)
    let answers = []
    while(start <= end) {
        let mid = Math.floor((start + end) / 2)
        let count = 0
        let curStick
        // mid 값의 스틱 길이로 과자를 줄 때 현재 과자들로 몇 명 줄 수 있는지
        for(let i = 0; i < N; i++) {
            if(sticks[i] >= mid) {
                curStick = sticks[i]
                // 한 스틱으로 몇 명까지 줄 수 있는지 체크
                while(curStick >= mid) {
                    curStick -= mid
                    count += 1
                }
            }
        }

        if(count >= M) {
            answers.push(mid)
            start = mid + 1
        } else {
            end = mid - 1
        }
    }

    if (answers.length === 0) {
        console.log(0)
        return
    }
    console.log(Math.max(...answers))
}

run()