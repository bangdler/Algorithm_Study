// https://school.programmers.co.kr/learn/courses/30/lessons/86052
/*
 풀이 참고 https://velog.io/@front/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EB%B9%9B%EC%9D%98-%EA%B2%BD%EB%A1%9C-%EC%82%AC%EC%9D%B4%ED%81%B4

 1. map : 주어진 격자를 담은 맵 ex) [[S, L], [L, R]]
 2. 한 격자당 4가지 방향에서 출발하여 다시 제자리 & 같은 방향일 때 길이를 answer 에 담는다.
 3. directions : 빛이 4가지 방향으로 갈 때 만나는 격자에 따른 다음 방향을 담은 객체
 4. visit : 한 격자 당 네가지 방향에서 빛이 들어온 적이 있는지 기록하는 객체 (3차원 배열)
    ex) [[{up:0, left:0, right:0, down:0}, {up:0, left:0, right:0, down:0}], [{up:0, left:0, right:0, down:0}, {up:0, left:0, right:0, down:0}]]
 5. 이미 방문한 경로인 경우 가지 않는다. (중복 경로는 세지 않는다.)
 6. 순서
    - 모든 격자 순서대로, 격자 당 모든 방향에서 시작한다.
    - 시작점이 이미 방문한 경로(격자로 들어오는 빛의 방향)인 경우 순회하지 않는다.
    - 방문하지 않은 경로인 경우 사이클을 순회한다. (방문한 경로가 나올 때까지)
    - 해당 방향에서 격자 방문 후, 해당 방향에서 해당 격자로 들어올 시 변경될 방향으로 업데이트 해준다. 경로 count 를 증가한다.
    - 순회 종료 시 count 를 넣고, 다음 시작점 격자로 넘어간다.
*/

function solution(grid) {
  const answer = [];
  const map = grid.map(row => [...row]);
  const R = map.length;
  const C = map[0].length;
  const directions = {
    up: { S: 'up', L: 'left', R: 'right' },
    left: { S: 'left', L: 'down', R: 'up' },
    right: { S: 'right', L: 'up', R: 'down' },
    down: { S: 'down', L: 'right', R: 'left' },
  };
  const dy = { up: 1, down: -1, left: 0, right: 0 };
  const dx = { up: 0, down: 0, left: -1, right: 1 };

  const visit = [...Array(R)].map(() => [...Array(C)].map(() => ({ up: 0, left: 0, right: 0, down: 0 })));

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      for (let dir in directions) {
        if (visit[i][j][dir]) continue;
        let curY = i;
        let curX = j;
        let curDir = dir;
        let count = 0;

        while (!visit[curY][curX][curDir]) {
          count++;
          visit[curY][curX][curDir] = 1;
          let curGrid = map[curY][curX]; // S, L, R 중 하나
          // 방향전환
          curDir = directions[curDir][curGrid];
          curY = curY + dy[curDir];
          curX = curX + dx[curDir];
          curY = curY >= R ? 0 : curY < 0 ? R - 1 : curY;
          curX = curX >= C ? 0 : curX < 0 ? C - 1 : curX;
        }
        answer.push(count);
      }
    }
  }

  return answer.sort((a, b) => a - b);
}

console.log(solution(['SL', 'LR']));
