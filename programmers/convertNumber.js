// https://school.programmers.co.kr/learn/courses/30/lessons/154538

// dp, bfs 활용
function solution(x, y, n) {
  if (x === y) return 0;
  const dp = {};
  const queue = [{ num: y, count: 0 }];

  while (queue.length) {
    const { num: curNum, count: curCount } = queue.shift();
    dp[curNum] = curCount;

    if (curNum === x) break;
    if (curNum % 3 === 0 && curNum / 3 >= x && !dp[curNum / 3]) {
      queue.push({ num: curNum / 3, count: curCount + 1 });
    }
    if (curNum % 2 === 0 && curNum / 2 >= x && !dp[curNum / 2]) {
      queue.push({ num: curNum / 2, count: curCount + 1 });
    }
    if (curNum - n >= x && !dp[curNum - n]) {
      queue.push({ num: curNum - n, count: curCount + 1 });
    }
  }

  return dp[x] || -1;
}
console.log(solution(10, 40, 30));
// dp, dfs 런타임에러
function solution_fail(x, y, n) {
  const dp = {};
  if (x === y) return 0;
  const conversion = (num, count) => {
    dp[num] = count;

    if (num <= x) return;

    if (num % 3 === 0 && (!dp[num / 3] || dp[num / 3] > count + 1)) {
      // 3을 곱한 값보다 n 을 더한 게 크면 n을 더한다.
      conversion(num / 3, count + 1);
    }
    if (num % 2 === 0 && (!dp[num / 2] || dp[num / 2] > count + 1)) {
      conversion(num / 2, count + 1);
    }
    if (!dp[num - n] || dp[num - n] > count + 1) {
      conversion(num - n, count + 1);
    }
  };

  conversion(y, 0);

  return dp[x] || -1;
}
