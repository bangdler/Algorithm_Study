// https://school.programmers.co.kr/learn/courses/30/lessons/154540

// dfs 풀이
function solution(maps) {
  const answer = [];
  const mapArr = maps.map(it => it.split(''));
  const Row = mapArr.length;
  const Column = mapArr[0].length;
  const visited = [...Array(Row)].map(_ => Array(Column).fill(0));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const dfs = (startY, startX) => {
    let total = 0;
    const stack = [[startY, startX]];
    total += +mapArr[startY][startX];
    visited[startY][startX] = 1;

    while (stack.length) {
      const [curY, curX] = stack.pop();

      for (let [dX, dY] of directions) {
        const [newY, newX] = [curY + dY, curX + dX];
        if (newY < 0 || newX < 0 || newY >= Row || newX >= Column) continue;

        if (visited[newY][newX]) continue;

        if (mapArr[newY][newX] === 'X') continue;

        total += +mapArr[newY][newX];
        visited[newY][newX] = 1;
        stack.push([newY, newX]);
      }
    }

    return total;
  };

  for (let y = 0; y < Row; y++) {
    for (let x = 0; x < Column; x++) {
      if (visited[y][x]) continue;
      if (mapArr[y][x] === 'X') continue;
      const result = dfs(y, x);
      answer.push(result);
    }
  }

  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}

const test = ['X591X', 'X1X5X', 'X231X', '1XXX1']; // [1, 1, 27]

console.log(solution(test));
