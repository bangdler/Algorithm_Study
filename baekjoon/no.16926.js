
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 16926;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x => x.split(' ').map(Number));
    return input;
}

function run() {
    let [[N, M, R], ...base] = getInput()
    for(let i = 0; i < R; i++) {
        base =  rotate(N,M,base)
    }

    base.forEach(x => console.log(x.join(' ')))
}

function rotate(N,M, base) {
    const numOfRect = Math.min(N,M) / 2
    for(let n = 0; n < numOfRect; n++) {
        let maxN = N - n - 1  // 움직일 횟수
        let maxM = M - n - 1

        // 최초값
        let tmp = base[n][n];

        // 위쪽변: 변할값 = 현재 오른쪽값
        for(let i = n; i < maxM; i++) {
            base[n][i] = base[n][i+1]
        }

        // 오른변: 변할값 = 현재 아래값
        for(let i = n; i < maxN; i++) {
            base[i][maxM] = base[i+1][maxM]
        }

        // 아래변: 변할값 = 현재 왼쪽값
        for(let i = maxM; i > n; i--) {
            base[maxN][i] = base[maxN][i-1]
        }

        // 왼변: 변할값 = 현재 위값
        for(let i = maxN; i > n; i--) {
            base[i][n] = base[i-1][n]
        }

        base[n+1][n] = tmp
    }
    return base
}

run()
