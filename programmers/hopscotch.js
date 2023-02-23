// https://school.programmers.co.kr/learn/courses/30/lessons/12913

// 땅따먹기
// 첫번째 배열에서 시작.
// sum 배열은 현재까지 각 요소는 위의 배열에서 자신을 제외한 나머지 값들 중 최대값을 더한 값으로 이루어짐.
// 두번째 배열부터는 이전 배열(sum)에서 자신의 idx 를 제외한 나머지 중 최대값을 더한다.
function solution(land) {
  const sum = land[0];
  for (let i = 1; i < land.length; i++) {
    const curArr = land[i];
    const curSum = [...sum];
    for (let j = 0; j < 4; j++) {
      const curNum = curArr[j];
      const temp = curSum[j];
      curSum[j] = 0;
      let max = Math.max(...curSum);
      sum[j] = curNum + max;
      curSum[j] = temp;
    }
  }
  return Math.max(...sum);
}

// 깔끔한 풀이
function solution_other(land) {
  let answer = 0;
  const dp = [land[0]];
  for (let i = 1; i < land.length; i++) {
    const column = [];
    column.push(Math.max(dp[i - 1][1], dp[i - 1][2], dp[i - 1][3]) + land[i][0]);
    column.push(Math.max(dp[i - 1][0], dp[i - 1][2], dp[i - 1][3]) + land[i][1]);
    column.push(Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][3]) + land[i][2]);
    column.push(Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]) + land[i][3]);
    dp.push(column);
  }
  return Math.max(dp[land.length - 1][0], dp[land.length - 1][1], dp[land.length - 1][2], dp[land.length - 1][3]);
}

console.log(
  solution([
    [1, 2, 3, 5],
    [5, 6, 7, 8],
    [4, 3, 2, 1],
  ]),
);
