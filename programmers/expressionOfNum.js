// https://school.programmers.co.kr/learn/courses/30/lessons/12924

// 시간초과
function solution_fail(n) {
  const memo = Array.from({ length: n + 1 }, () => 0);
  for (let i = 1; i < n / 2; i++) {
    let sum = 0;
    for (let j = i; j < n + 1; j++) {
      sum += j;
      if (sum > n) break;
      memo[sum] += 1;
    }
  }
  return memo[n] + 1;
}

// 투포인터를 활용한 방법
// start, end 변수를 두고, sum 과 비교하면서 sum 이 n 보다 작은경우 end++, sum 이 n 보다 큰 경우 start++
function solution(n) {
  let answer = 0;
  if (n === 1) return 1;
  let start = 1;
  let end = 1;
  let sum = 1;
  while (end < n + 1) {
    if (sum > n) {
      sum -= start;
      start++;
    } else if (sum < n) {
      end++;
      sum += end;
    } else {
      answer++;
      end++;
      sum += end;
    }
  }
  return answer;
}

console.log(solution(15));
