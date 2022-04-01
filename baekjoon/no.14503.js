
//현재 위치를 청소한다.
// 현재 위치에서 현재 방향을 기준으로 왼쪽 방향부터 차례대로 인접한 칸을 탐색한다.
// 왼쪽 방향에 아직 청소하지 않은 공간이 존재한다면, 그 방향으로 회전한 다음 한 칸을 전진하고 1번부터 진행한다.
// 왼쪽 방향에 청소할 공간이 없다면, 그 방향으로 회전하고 2번으로 돌아간다.
// 네 방향 모두 청소가 이미 되어있거나 벽인 경우에는, 바라보는 방향을 유지한 채로 한 칸 후진을 하고 2번으로 돌아간다.
// 네 방향 모두 청소가 이미 되어있거나 벽이면서, 뒤쪽 방향이 벽이라 후진도 할 수 없는 경우에는 작동을 멈춘다.

function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 14503;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x => x.split(' ').map(Number));
    return input;
}

function run() {
    const [mapSize, startInfo, ...mapInfo] = getInput()
    const [N, M] = mapSize
    let searchMap = Array.from({length: N}, () => Array(M).fill(0) )
    const cleanMap = clean(startInfo, mapInfo, mapSize, searchMap)

    let answer = cleanMap.reduce((acc, cur) => {
        return acc + cur.filter(x => x === 'C').length
    }, 0)

    console.log(answer)
}

function clean(startInfo, map, mapSize, searchMap) {
    let [y, x, look] = startInfo
    //현재위치 청소 (후진하는 경우 'C' 위치로 올 수 있다.)
    if(map[y][x] !== 'C') {
        map[y][x] = 'C'
    }

    //탐색
    let leftCheck;
    let leftInfo;
    let checkNum = 0;
    // 왼쪽이 청소를 안한 빈칸이거나, 네방향을 모두 탐색할 때까지 왼쪽 확인
    // 이미 탐색한 칸이면 회전만 한다.
    while(!leftCheck && checkNum < 4) {
        [leftCheck, leftInfo] = searchLeft(startInfo, map, mapSize)
        if(checkNum === 2 && !leftCheck) {
            break;
        }
        startInfo = leftInfo
        checkNum ++
    }

    // 왼쪽이 비었으면 왼쪽에서 다시 clean, 아니면 후진여부 확인
    if(leftCheck) {
        return clean(leftInfo, map, mapSize)
    }
    else {
        const backInfo = searchBack(startInfo, map)
        if(!backInfo) {
            return map
        }
        return clean(backInfo, map, mapSize)
    }
}

function searchLeft(startInfo, map, mapSize) {
    const [y, x, look] = startInfo
    const leftDirections = {
        0: [0, -1],
        1: [1, 0],
        2: [0, 1],
        3: [-1, 0]
    }

    const leftY = y + leftDirections[look][0]
    const leftX = x + leftDirections[look][1]
    const leftLook = look === 0 ? 3 : look-1

    // 유효성 - 범위를 벗어나면 현재위치에서 돈다.
    // if(leftY < 0 || leftX < 0 || leftY >= mapSize[0] || leftX >= mapSize[1]) {
    //     return [false, [y, x, leftLook]]
    // }

    // 왼쪽 탐색
    if(map[leftY][leftX] === 0) {
        return [true, [leftY, leftX, leftLook]]
    }
    else {
        return [false, [y, x, leftLook]]
    }
}

function searchBack(startInfo, map) {
    const [y, x, look] = startInfo
    const backDirections = {
        0: [-1, 0],
        1: [0, -1],
        2: [1, 0],
        3: [0, 1]
    }
    const [backY, backX] = [y+backDirections[look][0], x+backDirections[look][1]]
    if(map[backY][backX] === 1) {
        return false
    }
    return [backY, backX, look]
}

run()