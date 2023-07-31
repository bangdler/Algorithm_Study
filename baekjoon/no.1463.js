const getInput = require('./utils/util');

function run() {
  const [N] = getInput(1463);

  const dp = [0, 0, 1, 1];

  for (let i = 4; i <= N; i++) {
    let min = dp[i - 1] + 1;
    let divide2;
    let divide3;
    if (i % 2 === 0) {
      divide2 = dp[i / 2] + 1;
      min = Math.min(min, divide2);
    }
    if (i % 3 === 0) {
      divide3 = dp[i / 3] + 1;
      min = Math.min(min, divide3);
    }
    dp[i] = min;
  }

  console.log(dp[N]);
}

run();
