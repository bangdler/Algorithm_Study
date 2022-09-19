// bfs

function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 1012;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/test_${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' ').map(Number));
  return input;
}

function run() {
  const [[T], ...arr] = getInput();
  let caseArray = [];
  let answers = [];

  // case 묶기
  for (let i = 0; i < T; i++) {
    const [M, N, K] = arr[0];
    let eachCase = arr.splice(0, K + 1);
    caseArray.push(eachCase);
  }

  caseArray.forEach(eachCase => {
    const adjacentPointsArr = bfs(eachCase);
    answers.push(adjacentPointsArr.length);
  });

  answers.forEach(answer => console.log(answer));
}

function bfs(eachCase) {
  const [M, N, K] = eachCase[0];

  // Array.from({length:N}).fill(Array.from({length:M}).fill(0)); 이렇게 하면 참조가 이상해진다.
  let searchArr = Array.from({ length: N }, () => Array(M).fill(0));
  let visitedArr = Array.from({ length: N }, () => Array(M).fill(0));

  // 배추 위치 세팅
  for (let i = 1; i < K + 1; i++) {
    let [x, y] = eachCase[i];
    searchArr[y][x] = 1;
  }

  let adjacentPointsArr = [];
  let dx = [1, 0, -1, 0];
  let dy = [0, 1, 0, -1];

  // 배추가 있는 위치에서 bfs 실행
  for (let i = 1; i < K + 1; i++) {
    let [x, y] = eachCase[i];
    if (visitedArr[y][x] !== 0) continue;

    // 방문한 적이 없을 시
    let que = [];
    let temp = [];
    visitedArr[y][x] = 1;

    que.push([y, x]);
    temp.push([y, x]);
    while (que.length !== 0) {
      const [curY, curX] = que.shift();
      for (let j = 0; j < dx.length; j++) {
        const x = curX + dx[j];
        const y = curY + dy[j];

        if (x < 0 || y < 0 || x >= M || y >= N) continue;
        if (searchArr[y][x] !== 1 || visitedArr[y][x] === 1) continue;

        que.push([y, x]);
        temp.push([y, x]);
        visitedArr[y][x] = 1;
      }
    }
    adjacentPointsArr.push(temp);
  }
  return adjacentPointsArr;
}

run();
