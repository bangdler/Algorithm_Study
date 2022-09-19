// bfs

function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 10026;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(''));
  return input;
}

function run() {
  const [[N], ...colors] = getInput();

  const abnormalColors = colors.map(x =>
    x.map(str => {
      if (str === 'R') return str.replace('R', 'G');
      return str;
    }),
  );

  let normalCount = getNumOfAreaByBFS(colors);
  let abnormalCount = getNumOfAreaByBFS(abnormalColors);

  console.log(normalCount);
  console.log(abnormalCount);
}

function getNumOfAreaByBFS(base) {
  let numOfArea = 0;
  const numOfRow = base.length;
  const diff = {
    x: [0, 1, 0, -1],
    y: [1, 0, -1, 0],
  };

  const visited = Array.from(Array(numOfRow), () => Array(numOfRow).fill(0));

  for (let i = 0; i < base.length; i++) {
    for (let j = 0; j < base.length; j++) {
      if (visited[i][j] !== 0) continue;

      visited[i][j] = 1;
      let que = [];
      que.push([i, j]);
      const element = base[i][j];

      while (que.length !== 0) {
        const [curY, curX] = que.shift();

        for (let k = 0; k < 4; k++) {
          const y = curY + diff.y[k];
          const x = curX + diff.x[k];

          if (x < 0 || y < 0 || x >= numOfRow || y >= numOfRow) continue;
          if (visited[y][x] !== 0 || base[y][x] !== element) continue;

          visited[y][x] = 1;
          que.push([y, x]);
        }
      }

      numOfArea += 1;
    }
  }
  return numOfArea;
}

run();

// array.fill 로 객체를 넣을 경우 참조가 복사된다.
// let c = [1,2,3];
// const arr = Array(3).fill(c)
// console.log(arr)
// c[2] = 5
// console.log(arr)
