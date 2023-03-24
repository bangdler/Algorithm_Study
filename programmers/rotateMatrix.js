// https://school.programmers.co.kr/learn/courses/30/lessons/77485

function solution(rows, columns, queries) {
  const answer = [];
  const map = Array.from({ length: rows }, (_, i) => Array.from({ length: columns }, (_, j) => i * columns + j + 1));

  const rotate = query => {
    const [y1, x1, y2, x2] = query.map(x => x - 1);
    let [curY, curX] = [y1, x1];
    let cur = map[curY][curX];
    const rotates = [];
    // right
    while (curX < x2) {
      rotates.push(cur);
      const next = map[curY][curX + 1];
      map[curY][curX + 1] = cur;
      cur = next;
      curX += 1;
    }
    // down
    while (curY < y2) {
      rotates.push(cur);
      const next = map[curY + 1][curX];
      map[curY + 1][curX] = cur;
      cur = next;
      curY += 1;
    }
    // left
    while (curX > x1) {
      rotates.push(cur);
      const next = map[curY][curX - 1];
      map[curY][curX - 1] = cur;
      cur = next;
      curX -= 1;
    }
    // up
    while (curY > y1) {
      rotates.push(cur);
      const next = map[curY - 1][curX];
      map[curY - 1][curX] = cur;
      cur = next;
      curY -= 1;
    }
    return rotates;
  };

  for (let query of queries) {
    const array = rotate(query);
    answer.push(Math.min(...array));
  }

  return answer;
}

const test1 = [
  6,
  6,
  [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ],
];
console.log(solution(test1[0], test1[1], test1[2]));
