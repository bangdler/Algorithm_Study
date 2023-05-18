/*
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

// 배열을 만들지 말고 탐색만 하기
function queensAttack(n, k, r_q, c_q, obstacles) {
  let results = 0;
  const obstaclesSet = new Set();

  obstacles.forEach(value => obstaclesSet.add(`${value[0]}:${value[1]}`));

  const process = (rowPosition, columnPosition) => {
    let row = r_q + rowPosition;
    let column = c_q + columnPosition;

    while (row <= n && row > 0 && column <= n && column > 0) {
      if (obstaclesSet.has(`${row}:${column}`)) {
        return;
      }

      results += 1;
      row += rowPosition;
      column += columnPosition;
    }
  };

  process(1, 0);
  process(-1, 0);
  process(0, -1);
  process(0, 1);
  process(1, -1);
  process(-1, -1);
  process(1, 1);
  process(-1, 1);

  return results;
}

// 위에랑 비슷한데 왜 틀렸는지 잘 모르겠는 풀이. 특정 케이스에서 틀림.
function queensAttack_fail2(n, k, r_q, c_q, obstacles) {
  const obstacleKey = new Set();

  obstacles.forEach(([y, x]) => obstacleKey.add(`${n - y}${x - 1}`));

  let count = 0;
  const [startY, startX] = [n - r_q, c_q - 1];

  const directions = [
    [0, 1, 0],
    [1, 0, 1],
    [-1, 0, 2],
    [0, -1, 3],
    [1, -1, 4],
    [-1, 1, 5],
    [1, 1, 6],
    [-1, -1, 7],
  ];

  const stack = [...directions];

  while (stack.length) {
    const [dy, dx, idx] = stack.pop();

    const [nextY, nextX] = [startY + dy, startX + dx];
    if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= n) {
      continue;
    }
    if (obstacleKey.has(`${nextY}${nextX}`)) {
      continue;
    }

    stack.push([dy + directions[idx][0], dx + directions[idx][1], idx]);
    count++;
  }

  return count;
}

// bfs 방식으로 풀어봤으나 시간초과
function queensAttack_fail(n, k, r_q, c_q, obstacles) {
  // Write your code here
  const board = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

  for (let [oy, ox] of obstacles) {
    board[n - oy][ox - 1] = 1;
  }

  let count = 0;
  const [startY, startX] = [n - r_q, c_q - 1];

  const directions = [
    [0, 1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, -1, 0],
    [1, -1, 0],
    [-1, 1, 0],
    [1, 1, 0],
    [-1, -1, 0],
  ];
  let cycle = 1;
  let flagCount = 0;
  while (flagCount < 7) {
    for (let i = 0; i < directions.length; i++) {
      const [dy, dx, flag] = directions[i];
      if (flag) continue;
      const [nextY, nextX] = [startY + cycle * dy, startX + cycle * dx];
      if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= n) {
        directions[i][2] = 1;
        flagCount++;
        continue;
      }
      if (board[nextY][nextX]) {
        directions[i][2] = 1;
        flagCount++;
        continue;
      }
      count++;
    }
    cycle++;
  }

  return count;
}

console.log(
  queensAttack(5, 3, 4, 3, [
    [5, 5],
    [4, 2],
    [2, 3],
  ]),
);

console.log(queensAttack(4, 0, 4, 4, []));
