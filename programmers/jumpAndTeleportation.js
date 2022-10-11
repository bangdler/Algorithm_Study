// https://school.programmers.co.kr/learn/courses/30/lessons/12980

// 거리가 짝수면 절반까지 가는데 들어가는 건전지와 같다.
// 거리가 홀수면 -1 거리까지 가는데 들어가는 건전지에 +1 해준 것과 같다.

function solution(n) {
  // n 거리까지 가는데 들어가는 최소 건전지 수
  // 재귀 풀이
  if (n === 1) return 1;
  if (n % 2 === 0) {
    return solution(n / 2);
  } else {
    return solution(n - 1) + 1;
  }

  // 시간 초과
  // for (let i = 2; i <= n; i++) {
  //   if (i % 2 === 0) {
  //     battery[i] = battery[i / 2];
  //   } else {
  //     battery[i] = battery[i - 1] + 1;
  //   }
  // };
}

console.log(solution(6));
