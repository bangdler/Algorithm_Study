// 가장 큰 정사각형 찾기
// 1와 0로 채워진 표(board)가 있습니다. 표 1칸은 1 x 1 의 정사각형으로 이루어져 있습니다.
// 표에서 1로 이루어진 가장 큰 정사각형을 찾아 넓이를 return 하는 solution 함수를 완성해 주세요. (단, 정사각형이란 축에 평행한 정사각형을 말합니다.)

/*
표(board)는 2차원 배열로 주어집니다.
표(board)의 행(row)의 크기 : 1,000 이하의 자연수
표(board)의 열(column)의 크기 : 1,000 이하의 자연수
표(board)의 값은 1또는 0으로만 이루어져 있습니다.
 */

// bfs 응용? 1을 기점으로 오른쪽, 아래, 대각선을 계속 확인한다.
// depth 1단계당 크기 +1
// 정확성은 통과지만, 효율성 시간초과
function solution(board) {
  let answer = 0;
  const R = board.length;
  const C = board[0].length;

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const start = board[i][j];
      if (start === 0) continue;
      let size = 0;

      const visited = Array.from({ length: R }, () => Array(C).fill(0));
      const queue = [
        [i, j],
        [-1, -1],
      ];
      visited[i][j] = 1;

      let square = true;

      while (queue.length && square) {
        const [curY, curX] = queue.shift();
        // 한 depth 가 끝났을 때
        if (curY === -1) {
          size++;
          if (!queue.length) break;
          queue.push([-1, -1]);
          continue;
        }

        // 세 방향이 모두 존재해야 정사각형이 된다. 하나라도 없으면 queue 순회 필요가 없다.
        for (let [dy, dx] of directions) {
          const [newY, newX] = [curY + dy, curX + dx];

          if (newY >= R || newX >= C || !board[newY][newX]) {
            square = false;
            break;
          }

          if (visited[newY][newX]) continue;

          visited[newY][newX] = 1;
          queue.push([newY, newX]);
        }
      }
      if (!square) size++;

      answer = Math.max(answer, size * size);
    }
  }
  return answer;
}

// dp 풀이법
// https://onlydev.tistory.com/65
// 현재값을 기준으로 위, 왼, 대각선 위 값들의 최소값 + 1 로 현재값을 업데이트 해간다.
// 위, 왼, 대각선 위가 모두 있는 경우 길이가 +1 씩 증가한다.
function solutionDP(board) {
  let maxLen = 0;
  const R = board.length;
  const C = board[0].length;

  if (R < 2 || C < 2) return 1;

  for (let i = 1; i < R; i++) {
    for (let j = 1; j < C; j++) {
      if (board[i][j] === 0) continue;
      let min = Math.min(board[i - 1][j], board[i][j - 1], board[i - 1][j - 1]);
      board[i][j] = min + 1;
      maxLen = Math.max(maxLen, board[i][j]);
    }
  }

  return maxLen * maxLen;
}

const board = [
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 0, 1, 0],
];
const board2 = [
  [0, 0, 1, 1],
  [1, 1, 1, 1],
];
const board3 = [[0, 0, 0, 1]];
console.log(solutionDP(board));
