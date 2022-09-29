/*
동적계획법 문제 특징
1. 중복되는 부분 문제 (부분 문제를 가지고 상위 문제를 구함)
2. 최적 부분 구조 (상위 문제의 최적값은 하위 문제의 최적값을 포함한다.)
 */

// dp 적용 안한 피보나치 함수
// 시간복잡도 대략 O(2^N)
function fibonacci(n) {
  if (n === 1 || n === 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// dp - memoization (top-down) 적용
// 시간복잡도 대략 O(N)
function fibonacciMemo(n, memo = []) {
  if (memo[n]) return memo[n];
  if (n === 1 || n === 2) {
    memo[n] = 1;
    return memo[n];
  }
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// dp - 상향식 접근 (bottom up) 적용
// 시간복잡도 O(N)
// 재귀방식은 큰 수에서 stack overflow 발생할 수 있으므로 이 방법이 더 나을 수 있다.
function fibonacciTabulation(n) {
  const memo = [undefined, 1, 1];
  if (n === 1 || n === 2) return memo[n - 1];
  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
}

console.time('start');
console.log(fibonacci(20));
console.timeEnd('start');

console.time('memo');
console.log(fibonacciMemo(20));
console.timeEnd('memo');

console.time('Tab');
console.log(fibonacciTabulation(20));
console.timeEnd('Tab');
