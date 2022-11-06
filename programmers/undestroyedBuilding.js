// https://school.programmers.co.kr/learn/courses/30/lessons/92344

// 풀이법 참고, 누적합 활용
function solution(board, skill) {
  let answer = 0;
  const temp = Array.from({ length: board.length + 1 }, () => Array(board[0].length + 1).fill(0));

  // temp 배열 4개 꼭지점 업데이트
  for (let [type, r1, c1, r2, c2, degree] of skill) {
    if (type === 2) {
      temp[r1][c1] += degree;
      temp[r2 + 1][c1] -= degree;
      temp[r2 + 1][c2 + 1] += degree;
      temp[r1][c2 + 1] -= degree;
    } else {
      temp[r1][c1] -= degree;
      temp[r2 + 1][c1] += degree;
      temp[r2 + 1][c2 + 1] -= degree;
      temp[r1][c2 + 1] += degree;
    }
  }

  // 행 누적합
  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp[0].length - 1; j++) {
      temp[i][j + 1] += temp[i][j];
    }
  }

  // 열 누적합
  for (let i = 0; i < temp.length - 1; i++) {
    for (let j = 0; j < temp[0].length; j++) {
      temp[i + 1][j] += temp[i][j];
    }
  }

  // board 합치기
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] += temp[i][j];
      if (board[i][j] > 0) answer++;
    }
  }

  return answer;
}

// 효율성 실패
function solution2(board, skill) {
  let total = board.length * board[0].length;

  const sortedSkill = skill.sort((a, b) => b[0] - a[0]);

  while (sortedSkill.length) {
    const [type, r1, c1, r2, c2, degree] = sortedSkill.shift();

    for (let i = r1; i <= r2; i++) {
      for (let j = c1; j <= c2; j++) {
        if (type === 2) {
          board[i][j] += degree;
        } else {
          if (board[i][j] <= 0) continue;
          board[i][j] -= degree;
          if (board[i][j] <= 0) total--;
        }
      }
    }
  }

  return total;
}

//board	skill	result
// [[1,2,3],[4,5,6],[7,8,9]]	[[1,1,1,2,2,4],[1,0,0,1,1,2],[2,2,0,2,0,100]]	6

const board = [
  [5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5],
];
const skill = [
  [1, 0, 0, 3, 4, 4],
  [1, 2, 0, 2, 3, 2],
  [2, 1, 0, 3, 1, 2],
  [1, 0, 1, 3, 3, 1],
];

console.log(solution(board, skill));
