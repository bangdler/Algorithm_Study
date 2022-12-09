// https://school.programmers.co.kr/learn/courses/30/lessons/49994

function solution(dirs) {
  var answer = 0;
  const [minX, maxX] = [0, 10];
  const [minY, maxY] = [0, 10];
  const directions = {
    U: [1, 0],
    D: [-1, 0],
    R: [0, 1],
    L: [0, -1],
  };

  const pathTransform = {
    U: 'D',
    D: 'U',
    R: 'L',
    L: 'R',
  };

  // 점 당 네방향에서 오는 길에 대한 방문 정보를 가진다.
  const visited = Array.from({ length: maxY - minY + 1 }, () =>
    Array.from({ length: maxX - minX + 1 }, () => {
      return { U: 0, R: 0, D: 0, L: 0 };
    }),
  );

  // 시작 (0,0) 이나 10, 10 배열이므로 5,5 부터
  let [startY, startX] = [5, 5];

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    const [dY, dX] = directions[dir];
    const [nextY, nextX] = [startY + dY, startX + dX];
    if (nextY > maxY || nextX > maxX || nextY < minY || nextX < minX) continue;
    const transDir = pathTransform[dir];
    if (visited[nextY][nextX][transDir]) {
      [startY, startX] = [nextY, nextX];
      continue;
    }
    // 현재 점의 방향과 다음 점의 방향은 다르고, 각 방문 방향을 업데이트한다.
    visited[startY][startX][dir] = 1;
    visited[nextY][nextX][transDir] = 1;
    [startY, startX] = [nextY, nextX];
    answer++;
  }
  return answer;
}

const dirs = 'ULURRDLLU';
const dirs2 = 'LULLLLLLU';
console.log(solution(dirs2));

// 다른 사람 풀이 신박함. 두 점을 가지고 키를 만들고 그 키로 Map 을 만들어 최종 Map 의 개수를 구한다.
function solution2(dirs) {
  const firstPathMap = new Map();
  let now = [0, 0];
  let moved;
  for (let dir of dirs) {
    moved = move(now, dir);
    if (moved[0] < -5 || moved[0] > 5 || moved[1] < -5 || moved[1] > 5) {
      continue;
    }
    firstPathMap.set(generateKey(now, moved), true);
    now = moved;
  }

  return firstPathMap.size;
}

function move(now, dir) {
  switch (dir) {
    case 'L':
      return [now[0] - 1, now[1]];
    case 'R':
      return [now[0] + 1, now[1]];
    case 'U':
      return [now[0], now[1] + 1];
    case 'D':
      return [now[0], now[1] - 1];
  }
}

function generateKey(now, moved) {
  return `${Math.min(now[0], moved[0])},${Math.max(now[0], moved[0])},${Math.min(now[1], moved[1])},${Math.max(
    now[1],
    moved[1],
  )}`;
}
