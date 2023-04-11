// https://school.programmers.co.kr/learn/courses/30/lessons/87390

// 붙인 배열의 인덱스를 알면 들어갈 숫자를 알 수 있다.
// n^2 배열일 때 array[i] 의 값은 아래와 같다.
// i / n 의 몫 + 1 과 i % n + 1 중 최대값을 가진다.
function solution(n, left, right) {
  const answer = [];
  for (let i = left; i < right + 1; i++) {
    const num = Math.max(Math.floor(i / n) + 1, (i % n) + 1);
    answer.push(num);
  }
  return answer;
}

// 실제 n^2 배열 만들기 : core dumped 됨.
function solution_fail(n, left, right) {
  const n2Array = Array.from({ length: n }, (_, column) =>
    Array.from({ length: n }, (_, row) => Math.max(column + 1, row + 1)),
  );

  return n2Array.flat().slice(left, right + 1);
}

console.log(solution(3, 2, 5)); // [3,2,2,3]
