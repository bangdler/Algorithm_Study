const getInput = require('./utils/util');

function run() {
  const [N, ...nums] = getInput(9095).map(Number);

  const getNumOfMakingSum = n => {
    const dp = [0, 1, 2, 4];

    for (let i = 4; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }

    return dp[n];
  };

  const results = nums.map(n => getNumOfMakingSum(n));

  console.log(results.join('\n'));
}

run();
