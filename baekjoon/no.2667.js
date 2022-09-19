function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 2667;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs.readFileSync(filePath).toString().trim().split(/\n/);
  return input;
}

function run() {
  const [N, ...input] = getInput();
  const arr = input.map(x => x.split('').map(Number));
  const villages = arr;
  let visited = Array.from({ length: N }, () => Array(N).fill(0));
  let answers = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j] || !villages[i][j]) {
        continue;
      }
      visited[i][j] = 1;
      const count = dfs(villages, visited, i, j);
      answers.push(count);
    }
  }
  answers.sort((a, b) => a - b);
  console.log(answers.length);
  answers.forEach(a => console.log(a));
}

function dfs(origin, visited, idxY, idxX) {
  const directions = {
    x: [1, 0, -1, 0],
    y: [0, -1, 0, 1],
  };
  let count = 1;
  let stack = [];
  const startCoordination = [idxY, idxX];
  stack.push(startCoordination);

  while (stack.length !== 0) {
    const [curY, curX] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const [searchY, searchX] = [curY + directions.y[i], curX + directions.x[i]];
      if (searchX < 0 || searchX >= origin.length || searchY < 0 || searchY >= origin.length) continue;
      if (visited[searchY][searchX] || !origin[searchY][searchX]) continue;

      visited[searchY][searchX] = 1;
      count += 1;
      stack.push([searchY, searchX]);
    }
  }
  return count;
}

run();
