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
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' ').map(Number));
  return input;
}

const directions = {
  0: {
    up: [-1, 0],
    right: [0, 1],
    down: [1, 0],
    left: [0, -1],
  },

  1: {
    up: [0, 1],
    right: [1, 0],
    down: [0, -1],
    left: [-1, 0],
  },

  2: {
    up: [1, 0],
    right: [0, -1],
    down: [-1, 0],
    left: [0, 1],
  },

  3: {
    up: [0, -1],
    right: [-1, 0],
    down: [0, 1],
    left: [1, 0],
  },
};

function run() {
  const [mapSize, startInfo, ...mapInfo] = getInput();
  const [N, M] = mapSize;
  let visitedMap = Array.from({ length: N }, () => Array(M).fill(0));
  const cleanMap = clean(startInfo, mapInfo, visitedMap);

  let answer = cleanMap.reduce((acc, cur) => {
    return acc + cur.filter(x => x === 'C').length;
  }, 0);

  console.log(answer);
}

function clean(startInfo, map, visitedMap) {
  let [y, x, look] = startInfo;
  let curInfo = startInfo;
  //현재위치 청소
  map[y][x] = 'C';
  visitedMap[y][x] = 1;

  //탐색
  let checkNum = 0;

  while (true) {
    // 왼쪽을 탐색한다. 비어있으면 앞으로 가서 청소.
    const leftCoordinates = getCoordinates(curInfo, 'left');
    if (checkLeft(leftCoordinates, map, visitedMap)) {
      const leftInfo = turnLeftNGo(leftCoordinates, curInfo[2]);
      map[leftInfo[0]][leftInfo[1]] = 'C';
      curInfo = leftInfo;
      checkNum = 0;
      continue;
    }
    // 기탐색이거나 비어있지 않은 경우 제자리에서 턴

    curInfo = turnLeft(curInfo);
    checkNum++;

    if (checkNum === 4) {
      // 네방향을 모두 봤을 때
      const backCoordinates = getCoordinates(curInfo, 'down');
      if (!checkBack(backCoordinates, map)) {
        break;
      }
      const backInfo = [...backCoordinates, curInfo[2]];
      curInfo = backInfo;
      checkNum = 0;
      continue;
    }
  }
  return map;
}

function turnLeft(startInfo) {
  const [y, x, look] = startInfo;
  const leftLook = look === 0 ? 3 : look - 1;
  return [y, x, leftLook];
}

function turnLeftNGo(leftCoordinates, look) {
  const [leftY, leftX] = leftCoordinates;
  const leftLook = look === 0 ? 3 : look - 1;
  return [leftY, leftX, leftLook];
}

function getCoordinates(startInfo, direction) {
  const [y, x, look] = startInfo;
  const searchY = y + directions[look][direction][0];
  const searchX = x + directions[look][direction][1];
  return [searchY, searchX];
}

// 왼쪽좌표가 비어있는지, 이전에 탐색한적이 있는지 확인
function checkLeft(leftCoordinates, map, visitedMap) {
  const [leftY, leftX] = leftCoordinates;

  if (visitedMap[leftY][leftX] === 1) {
    return false;
  } else {
    visitedMap[leftY][leftX] = 1;
    if (map[leftY][leftX] === 0) {
      return true;
    }
    return false;
  }
}
// 벽이 있는지 확인
function checkBack(backCoordinates, map) {
  const [y, x] = backCoordinates;
  if (map[y][x] === 1) return false;
  return true;
}

run();
