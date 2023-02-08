// https://school.programmers.co.kr/learn/courses/30/lessons/12914

// 완전 탐색  -> 시간 초과
function solution_fail(n) {
  const cases = [];
  const steps = [1, 2];
  const search = (start, target) => {
    if (start === target) {
      cases.push(target);
      return;
    }
    for (let step of steps) {
      if (step + start > target) continue;
      search(start + step, target);
    }
  };
  search(0, n);
  return cases.length % 1234567;
}

// dp 풀이
function solution(n) {
  const cases = Array(n + 1).fill(0);
  cases[1] = 1;
  cases[2] = 2;
  for (let i = 3; i < cases.length; i++) {
    cases[i] = (cases[i - 1] + cases[i - 2]) % 1234567;
  }
  return cases[n];
}

console.log(solution(4));
