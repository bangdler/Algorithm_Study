// https://school.programmers.co.kr/learn/courses/30/lessons/12946

// 재귀를 이용한 풀이
// n 개를 a -> c 로 이동하는 과정 = n-1개를 a->b 로 이동 + 큰 판을 a->c 로 이동 + n-1개를 b->c 로 이동
function solution(n) {
  const answer = [];
  const move = (start, end) => {
    answer.push([start, end]);
  };
  const hanoi = (n, start, end, via) => {
    if (n === 1) {
      move(start, end);
      return;
    }
    hanoi(n - 1, start, via, end);
    move(start, end);
    hanoi(n - 1, via, end, start);
  };
  hanoi(n, 1, 3, 2);
  return answer;
}
