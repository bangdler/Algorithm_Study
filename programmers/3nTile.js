// https://school.programmers.co.kr/learn/courses/30/lessons/12902

// 짝수 일 때만 타일을 깔 수 있다.
// 가로가 2 로 만들 수 있는 경우의 수 3가지
// 가로가 4 인 경우 : 2 일 때 경우 * 3 + 새로운 경우 2가지
// 가로가 6 인 경우 : 2칸 이전 * 3 + 4칸 이전 * 2 (앞 뒤로) + 새로운 경우 2가지
// 즉 2칸 이전 * 3 + 2n 만큼 이전 * 2 + 새로운 경우 2가지
// 점화식 : f(n) = f(n-2) x 3 + f(n-4) x 2 + … + f(2) x 2 + 2
// 짝수만 가능하므로 축약 표현 :  f(n) = f(n-1) x 3 + f(n-2) x 2 + … + f(2) x 2 + 2

function solution(n) {
  if (n % 2 !== 0) return 0;
  const memo = [0, 3];
  const sum = [0, 3];
  for (let i = 2; i <= n / 2; i++) {
    memo[i] = (memo[i - 1] * 3 + sum[i - 2] * 2 + 2) % 1000000007;
    sum[i] = sum[i - 1] + memo[i];
  }
  return memo[n / 2];
}
