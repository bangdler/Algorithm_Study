const getInput = require('./utils/util');

function run() {
  const [first, ...nums] = getInput(2178);
  const [N, M] = first.split(' ').map(Number);
  const mapArr = nums.map(it => it.split('').map(Number));

  const direction = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const visited = Array.from({ length: N }, () => Array(M).fill(0));

  const bfs = (start, end, visited) => {
    const [startY, startX] = start;
    const queue = [[startY, startX, 1]];
    visited[startY][startX] = 1;
    while (queue.length) {
      const [curY, curX, curCount] = queue.shift();
      for (let [dY, dX] of direction) {
        const [newY, newX] = [curY + dY, curX + dX];
        if (newY < 0 || newX < 0 || newY >= N || newX >= M) continue;
        if (newY === end[0] && newX === end[1]) return curCount + 1;
        if (visited[newY][newX] || !mapArr[newY][newX]) continue;
        visited[newY][newX] = 1;
        queue.push([newY, newX, curCount + 1]);
      }
    }
  };

  const count = bfs([0, 0], [N - 1, M - 1], visited);

  console.log(count);
}

run();
