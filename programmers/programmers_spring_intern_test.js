function solution1(lotteries) {
  // 확률 단위로 변환
  const potentials = lotteries.map(([win, buy, money], idx) => {
    if (win > buy) {
      return [1, money, idx + 1];
    }
    return [win / (buy + 1), money, idx + 1];
  });

  const sorted = potentials.sort((a, b) => {
    if (b[0] - a[0] > 0) {
      return 1;
    }
    if (b[0] === a[0]) {
      return b[1] - a[1];
    } else {
      return -1;
    }
  });

  return sorted[0][2];
}

// console.log(
//   solution([
//     [50, 1, 50],
//     [100, 199, 100],
//     [1, 1, 500],
//   ]),
// );

// # 이면 8방향 탐색해서 넣기
// . 이면 4방향 탐색해서 # 있는지 확인하여 모두 있는 경우 넣기
function solution2(grid) {
  let answer = 0;
  const w = grid[0].length;
  const h = grid.length;
  const sharpDirections = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const dotDirections = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const sharpVisited = Array.from({ length: h }, () => Array.from({ length: w }, () => 0));
  const dotVisited = Array.from({ length: h }, () => Array.from({ length: w }, () => 0));

  const sharpDfs = (x, y, map, visited) => {
    if (visited[y][x]) return 0;
    const stack = [[x, y]];
    visited[y][x] = 1;
    let area = 1;
    while (stack.length) {
      const [curX, curY] = stack.pop();
      for (let [dX, dY] of sharpDirections) {
        const [newX, newY] = [curX + dX, curY + dY];
        if (newX < 0 || newY < 0 || newX >= w || newY >= h) continue;
        if (visited[newY][newX]) continue;
        visited[newY][newX] = 1;
        if (map[newY][newX] === '.') continue;
        stack.push([newX, newY]);
        area++;
      }
    }
    return area;
  };

  const dotDfs = (x, y, map, visited) => {
    if (visited[y][x]) return 0;
    if (x === 0 || y === 0 || x === w - 1 || y === h - 1) {
      if (map[y][x] === '.') {
        visited[y][x] = 1;
        return 0;
      }
    }
    const stack = [[x, y]];
    visited[y][x] = 1;
    let area = 1;
    while (stack.length) {
      const [curX, curY] = stack.pop();
      for (let [dX, dY] of dotDirections) {
        const [newX, newY] = [curX + dX, curY + dY];
        if (newX < 0 || newY < 0 || newX >= w || newY >= h) continue;
        if (newX === 0 || newY === 0 || newX === w - 1 || newY === h - 1) {
          if (map[newY][newX] === '.') {
            visited[newY][newX] = 1;
            return 0;
          }
        }
        if (visited[newY][newX]) continue;
        if (map[newY][newX] === '#') {
          visited[newY][newX] = 1;
          continue;
        }
        stack.push([newX, newY]);
        visited[newY][newX] = 1;
        area++;
      }
    }
    return area;
  };

  const map = grid.map(it => it.split(''));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y][x] === '#') {
        answer += sharpDfs(x, y, map, sharpVisited);
      } else {
        answer += dotDfs(x, y, map, dotVisited);
      }
    }
  }
  return answer;
}

console.log(solution2(['.#.', '#..', '.#.']));
console.log(solution2(['.....####', '.##...###', '.#.#...##', '#..#.....', '.#.#.....', '..#......']));

function isPalindrome(word, start = 0, end = word.length - 1) {
  if (word[start] !== word[end]) return false;
  if (end - start === 1 || end === start) return true;
  return isPalindrome(word, start + 1, end - 1);
}

function solution3(queries) {
  var answer = [];

  const game = (query, turn) => {
    for (let i = 0; i < query.length; i++) {
      if (!query[i]) continue;
      query[i] -= 1;
      const palindrome = isPalindrome(query);
      query[i] += 1;
      if (palindrome) return turn;
    }
    let result = 0;
    for (let i = 0; i < query.length; i++) {
      if (!query[i]) continue;
      query[i] -= 1;
      result = Math.max(result, game(query, turn === 0 ? 1 : 0));
      query[i] += 1;
    }
    return result;
  };
  for (let query of queries) {
    const result = game(query, 1);
    answer.push(result);
  }
  return answer;
}

// console.log(
//   solution([
//     [2, 0],
//     [3, 1],
//   ]),
// );
