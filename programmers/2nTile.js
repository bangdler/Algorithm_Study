// https://school.programmers.co.kr/learn/courses/30/lessons/12900

// 개수 변화 : 피보나치
// 1 -> 2 -> 3 -> 5 -> 8 -> 13
function solution(n) {
  const memo = [0, 1, 2];
  const bigNum = 1000000007;
  for (let i = 3; i <= n % bigNum; i++) {
    memo[i] = (memo[i - 2] + memo[i - 1]) % bigNum;
  }
  return memo[n];
}
