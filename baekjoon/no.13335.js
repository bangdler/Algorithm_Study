
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
    let passNum = 0; // 다리를 통과한 트럭 개수
    let time = 0;
    let accLoad = 0
    let index = 0; // 지나갈 트럭의 인덱스
    while(passNum !== N) {
        time ++
        // 다리 맨 앞에 트럭이 있을 경우
        if(bridge[0] !== 0) {
            passNum += 1
        }
        // 한칸씩 앞으로 이동
        accLoad -= bridge[0]
        bridge.shift()

        // 누적 무게 + 지나갈 트럭 무게 로 다리에 올릴지 결정
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
