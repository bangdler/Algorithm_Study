const getInput = require('./utils/util');

function run() {
  const [[N], ...nums] = getInput(1149).map(it => it.split(' ').map(Number));

  const prices = [Array(3).fill(0), ...nums];
  const dp = Array.from({ length: N + 1 }, () => Array(3).fill(0));

  for (let i = 1; i < N + 1; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + prices[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + prices[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + prices[i][2];
  }

  console.log(Math.min(...dp[N]));
}

run();
