
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 1932;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `test_${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x => x.split(' ').map(Number));
    return input;
}

// 맨 밑에서부터 시작하면서 해당 줄까지 얻을 수 있는 최대값 배열을 업데이트한다. (초기 최대값 배열 = 마지막 줄)
// 다음 줄을 차례대로 돈다. 다음 줄 i번째 위치에서의 최대값 = 이전까지의 최대값 배열[i] + 최대값 배열[i+1]
// 최대값 배열 업데이트 = 최대값이 누적된 다음줄
// 그 다음줄을 똑같이 반복.

function run() {
    const [n, ...arr] = getInput();
    let maxPath;
    for(let i = n-1; i >= 0; i--) {
        if(!maxPath) {
            maxPath = arr[i];
        }
        else {
            maxPath = arr[i].map((num, idx) => num + Math.max(maxPath[idx], maxPath[idx + 1]));
        }
    }
    console.log(...maxPath);
}

run();
