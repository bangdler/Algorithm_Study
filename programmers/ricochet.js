// https://school.programmers.co.kr/learn/courses/30/lessons/169199

function solution(board) {
  let answer = -1;

  const boardMap = board.map(it => it.split(''));

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let start;

  for (let i = 0; i < boardMap.length; i++) {
    if (start) break;
    for (let j = 0; j < boardMap[0].length; j++) {
      if (boardMap[i][j] === 'R') {
        start = [i, j];
        break;
      }
    }
  }

  let queue = [[...start, 0]];
  const visited = Array.from({ length: boardMap.length }, () => Array(boardMap[0].length).fill(0));
  visited[start[0]][start[1]] = 1;

  while (queue.length) {
    const [curY, curX, count] = queue.shift();

    for (let [dY, dX] of directions) {
      let tempY = curY;
      let tempX = curX;

      while (true) {
        const [newY, newX] = [tempY + dY, tempX + dX];
        if (newY < 0 || newX < 0 || newY >= boardMap.length || newX >= boardMap[0].length) break;
        const next = boardMap[newY][newX];
        if (next === 'D') break;
        tempY = newY;
        tempX = newX;
      }

      if (visited[tempY][tempX]) continue;
      visited[tempY][tempX] = 1;
      if (boardMap[tempY][tempX] === 'G') {
        answer = count + 1;
      }
      queue.push([tempY, tempX, count + 1]);
    }
  }

  return answer;
}

const test = ['...D..R', '.D.G...', '....D.D', 'D....D.', '..D....']; // 7

console.log(solution(test));
