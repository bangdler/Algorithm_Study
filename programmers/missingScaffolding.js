// https://school.programmers.co.kr/learn/courses/30/lessons/92345
// level 3 너무 어렵다...풀이 참고
// https://abangpa1ace.tistory.com/253

function solution(board, aloc, bloc) {
  const R = board.length;
  const C = board[0].length;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // turn - A 차례 0, B 차례 1
  const dfs = (aLoc, bLoc, turn, count) => {
    // 패배 조건 - 현재 위치가 0 인 경우
    if ((turn === 0 && board[aLoc[0]][aLoc[1]] === 0) || (turn === 1 && board[bLoc[0]][bLoc[1]] === 0))
      return { win: false, count: count };

    let winCount = Infinity;
    let loseCount = 0;

    const curLoc = turn === 0 ? aLoc : bLoc;
    // 현재 발판을 없앤다.
    board[curLoc[0]][curLoc[1]] = 0;

    for (let [dy, dx] of directions) {
      const [nextY, nextX] = [curLoc[0] + dy, curLoc[1] + dx];
      if (nextY < 0 || nextX < 0 || nextY >= R || nextX >= C) continue;
      if (!board[nextY][nextX]) continue;

      const next = turn === 0 ? dfs([nextY, nextX], bLoc, 1, count + 1) : dfs(aLoc, [nextY, nextX], 0, count + 1);

      // 다음턴에 상대방이 이기는 경우 loseCount 는 최대값. 즉 패배자가 제일 긴 루트로 이동한다.
      if (next.win) {
        loseCount = Math.max(loseCount, next.count);
      } else {
        winCount = Math.min(winCount, next.count);
      }
    }

    // 옆 탐색을 위해 다시 돌린다.
    board[curLoc[0]][curLoc[1]] = 1;

    // 현재까지의 이기는 최소수, 지는 최대수를 리턴
    // 갈곳이 없는 경우
    if (winCount === Infinity && loseCount === 0) return { win: false, count: count };
    // 이긴 경우 먼저 리턴
    if (winCount !== Infinity) return { win: true, count: winCount };
    return { win: false, count: loseCount };
  };

  return dfs(aloc, bloc, 0, 0).count;
}

// [[1, 1, 1], [1, 1, 1], [1, 1, 1]]	[1, 0]	[1, 2]	5
// [[1, 1, 1], [1, 0, 1], [1, 1, 1]]	[1, 0]	[1, 2]	4
// [[1, 1, 1, 1, 1]]	[0, 0]	[0, 4]	4
// [[1]]	[0, 0]	[0, 0]	0

const board = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];
const aloc = [1, 0];
const bloc = [1, 2];

console.log(solution(board, aloc, bloc));
