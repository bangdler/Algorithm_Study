// 그리디

function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 2170;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x => x.split(' ').map(Number));
    return input;
}

function run2() {
    const [[N], ...lines] = getInput()

    let valid;
    let sum = 0
    let sortedLines = lines.sort((a,b) => a[0] - b[0])
    for(let i = 0; i < N; i++) {
        if(i===0) {
            valid = sortedLines[i]
            continue
        }
        let [x, y] = sortedLines[i]
        if(valid[1] >= x && valid[1] < y) {
            valid[1] = sortedLines[i][1]
        }
        else if(valid[1] < x) {
            sum += valid[1] - valid[0]
            valid = sortedLines[i]
        }
    }
    sum += valid[1] - valid[0]
    console.log(sum)
}

// 메모리 초과
function run() {
    const [[N], ...lines] = getInput()

    let valid = []

    lines.forEach(line => {
        if(valid.length === 0) {
            valid.push(line)
        }
        else {
            let [nx1, nx2] = line
            valid.forEach(validLine => {
                let [vx1, vx2] = validLine;
                if(nx1 < vx1 && vx2 <= nx2 && nx2 < vx2) {
                    validLine[0] = nx1
                }
                else if(vx1 < nx1 && nx1 <= vx2 && vx2 < nx2) {
                    validLine[1] = nx2
                }
                else if(nx2 < vx1 || nx1 > vx2) {
                    valid.push(line)
                }
            })
        }
    })

    const answer = valid.reduce((acc, cur) => acc + cur[1] - cur[0], 0)
    console.log(answer)
}

run2()