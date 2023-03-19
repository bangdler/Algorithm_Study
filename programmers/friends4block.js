// https://school.programmers.co.kr/learn/courses/30/lessons/17679

function solution(m, n, board) {
  let answer = 0;
  const blockBoard = board.map(str => str.split(''));
  const checkBoard = Array.from({ length: m }, () => Array.from({ length: n }, () => 0));
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  const check4 = curPosition => {
    const [y, x] = curPosition;
    const curStr = blockBoard[y][x];
    if (!curStr) return false;
    for (let [dY, dX] of directions) {
      const [nextY, nextX] = [y + dY, x + dX];
      if (nextY >= m || nextX >= n || nextY < 0 || nextX < 0) return false;
      const nextStr = blockBoard[nextY][nextX];
      if (nextStr !== curStr) return false;
    }
    return true;
  };

  const changeCheckBoard = curPosition => {
    const [y, x] = curPosition;
    if (!checkBoard[y][x]) {
      checkBoard[y][x] = 1;
      answer += 1;
    }
    for (let [dY, dX] of directions) {
      const [nextY, nextX] = [y + dY, x + dX];
      if (!checkBoard[nextY][nextX]) {
        checkBoard[nextY][nextX] = 1;
        answer += 1;
      }
    }
  };

  // 세로 빈 칸만큼 아래로 내리는 함수. 이부분에서 계속 틀렸다.
  const downBlockBoard = () => {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (checkBoard[i][j]) {
          checkBoard[i][j] = 0;
          blockBoard[i][j] = 0;
          let first = true;
          let next;
          for (let k = 0; k < i; k++) {
            if (!blockBoard[k][j]) continue;
            if (blockBoard[k][j] && first) {
              first = false;
              next = blockBoard[k + 1][j];
              blockBoard[k + 1][j] = blockBoard[k][j];
              blockBoard[k][j] = 0;
              continue;
            }
            let temp = blockBoard[k + 1][j];
            blockBoard[k + 1][j] = next;
            next = temp;
          }
        }
      }
    }
  };

  const oneCycle = () => {
    fourBlock = false;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (check4([i, j])) {
          fourBlock = true;
          changeCheckBoard([i, j]);
        }
      }
    }
    downBlockBoard();
  };

  let fourBlock = true;
  while (fourBlock) {
    oneCycle();
  }

  return answer;
}

const test = [4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']];
const test1 = [8, 5, ['HGNHU', 'CRSHV', 'UKHVL', 'MJHQB', 'GSHOT', 'MQMJJ', 'AGJKK', 'QULKK']];
console.log(solution(test1[0], test1[1], test1[2]));
