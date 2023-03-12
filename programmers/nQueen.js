// https://school.programmers.co.kr/learn/courses/30/lessons/12952

// 서로 같은 열에는 올 수 없다. 한 줄에 하나씩 올 수 있다.
function solution(n) {
  let answer = 0;
  // 현재 남은 column index 리스트
  const map = Array.from({ length: n }, (_, i) => i);
  // queen 을 놓을 수 있는 자리 배열
  const possible = map.map(() => Array.from({ length: n }, () => 1));

  const backTrack = (row, map, possible) => {
    if (row === n) return answer++;
    // 현재 row 에서 남은 column 을 순회
    for (let i = 0; i < map.length; i++) {
      const column = map[i];
      if (!possible[row][column]) continue;
      // possible 객체 복사하여 현재 row, column 에 queen 을 놨을 때 불가능한 자리를 표시한다.
      const newPossible = JSON.parse(JSON.stringify(possible));
      for (let j = row; j < n; j++) {
        for (let k = 0; k < n; k++) {
          if (!newPossible[j][k]) continue;
          if (j === row) {
            newPossible[j][k] = 0;
            continue;
          }
          if (k === column) {
            newPossible[j][k] = 0;
            continue;
          }
          if (k - column === row - j || k - column === -(row - j)) {
            newPossible[j][k] = 0;
          }
        }
      }
      map.slice(i, 1);
      backTrack(row + 1, map, newPossible);
    }
  };

  backTrack(0, map, possible);
  return answer;
}

// 최적화한 풀이. queen 의 위치를 1차원 배열로 표현. 이전 퀸의 위치와 비교를 통해 유효성 검사를 수행한다.
function solution_optimize(n) {
  let answer = 0;
  // queen 의 위치를 나타내는 배열 index = row, map[index] = column
  const map = Array.from({ length: n });

  const isValid = (row, map) => {
    for (let prev = 0; prev < row; prev++) {
      // 열이 같은 경우
      if (map[prev] === map[row]) return false;
      // 대각선인 경우
      if (Math.abs(map[prev] - map[row]) === Math.abs(prev - row)) return false;
    }
    return true;
  };

  const backTrack = (row, map) => {
    if (row === n) return answer++;
    // 현재 row 에 column 을 순회하면서 queen 위치를 정한다.
    for (let column = 0; column < map.length; column++) {
      map[row] = column;
      // 현재 row 이전까지의 row 에서 현재 queen 위치가 가능한지 확인한다.
      if (isValid(row, map)) {
        backTrack(row + 1, map);
      }
    }
  };

  backTrack(0, map);
  return answer;
}

console.log(solution_optimize(4));
