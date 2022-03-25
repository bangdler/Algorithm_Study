
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 2110;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/);
    return input;
}

function run() {
    const [setValues, ...arr] = getInput()

    const [N, C] = setValues.split(' ').map(Number)
    const coordinates = [...arr].map(Number).sort((a,b) => a - b)

    let answers = []
    let distances = []
    for(let i = 1; i < N; i++) {
        distances.push(coordinates[i] - coordinates[i-1])
    }

    let start = Math.min(...distances)
    let end = distances.reduce((acc, cur) => acc + cur)
    // 거리 순으로 배열을 변환, 최소 거리부터 최대 거리(모든 거리의 합) 중에 탐색한다.
    // 처음 위치에서 1개 설치했다고 가정, 이후부터 지정한 거리값보다 현재 위치까지 누적된 거리가 크다면 설치(count ++) 아니면 다시 현재 거리를 누적.
    while(start <= end) {
        let mid = Math.floor((start + end) / 2 )
        let count = 1
        let accDistance = 0
        for(let i = 0; i < distances.length; i++) {
            let curDistance = distances[i]
            accDistance += curDistance
            if(accDistance >= mid) {
                count += 1
                accDistance = 0
            }
        }

        if(count < C) {
            end = mid - 1
        }
        else {
            answers.push(mid)
            start = mid + 1
        }
    }
    console.log(Math.max(...answers))
}

run()