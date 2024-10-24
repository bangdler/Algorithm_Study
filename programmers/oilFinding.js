// https://school.programmers.co.kr/learn/courses/30/lessons/250136

function solution(land) {
  var answer = 0;
  const n = land.length;
  const m = land[0].length;
  // idx 마다 발견된 오일의 총량
  const oils = [];

  const visited = Array.from({ length: n }, () => Array(m).fill(null));
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // 각 열마다 오일이 발견된 위치(총합)의 idx Set 배열
  const findCols = Array.from({ length: m }, () => new Set());

  let oilIdx = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j] !== null) continue;
      if (land[i][j] === 0) continue;

      const stack = [[i, j]];
      let oilCount = 1;
      visited[i][j] = oilIdx;
      while (stack.length) {
        const [curY, curX] = stack.pop();

        dir.forEach(([dY, dX]) => {
          const [nextY, nextX] = [curY + dY, curX + dX];
          if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) return;
          if (visited[nextY][nextX] !== null) return;
          if (land[nextY][nextX] === 0) return;
          visited[nextY][nextX] = oilIdx;
          oilCount += 1;
          stack.push([nextY, nextX]);
        });
      }
      oils.push(oilCount);
      oilIdx += 1;
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const v = visited[i][j];
      if (v !== null) {
        findCols[j].add(v);
      }
    }
  }

  // 1열부터 총량 idx 를 돌면서 총량을 더한다
  findCols.forEach(col => {
    let total = 0;
    col.forEach(idx => {
      total += oils[idx];
    });
    answer = Math.max(total, answer);
  });

  return answer;
}

const a = solution([
  [0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [1, 1, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 1, 1],
]);

console.log(a);
