function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 7562;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' ').map(Number));
  return input;
}

function run() {
  const [[N], ...arr] = getInput();
  let answers = [];
  let testCases = [];
  for (let i = 0; i < N; i++) {
    let array = arr.splice(0, 3);
    testCases.push(array);
  }
  testCases.forEach(testCase => {
    const [[N], curNight, target] = testCase;
    let visited = Array.from(Array(N), () => Array(N).fill(0));

    let [curX, curY] = curNight;

    visited[curY][curX] = 1;
    const count = bfs(visited, curY, curX, target);
    answers.push(count);
  });
  console.log(answers.join('\n'));
}

function bfs(visited, idxY, idxX, target) {
  const directions = {
    x: [2, 1, -1, -2, -2, -1, 1, 2],
    y: [1, 2, 2, 1, -1, -2, -2, -1],
  };
  const startCoordination = [idxY, idxX];
  // count 를 위해 객체 사용해야한다.
  let que = [{ pos: startCoordination, cnt: 0 }];
  while (que.length !== 0) {
    const curr = que.shift();
    const [curY, curX] = curr.pos;

    for (let i = 0; i < 8; i++) {
      const [searchY, searchX] = [curY + directions.y[i], curX + directions.x[i]];
      if (searchX < 0 || searchX >= visited.length || searchY < 0 || searchY >= visited.length) continue;
      if (visited[searchY][searchX]) continue;
      if (searchY === target[1] && searchX === target[0]) {
        return curr.cnt + 1;
      }
      visited[searchY][searchX] = 1;
      que.push({ pos: [searchY, searchX], cnt: curr.cnt + 1 });
    }
  }
  return 0;
}

run();
