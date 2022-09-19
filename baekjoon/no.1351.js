function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 1351;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs.readFileSync(filePath).toString().trim().split(' ').map(Number);
  return input;
}

function run() {
  const [N, P, Q] = getInput();

  let dp = { 0: 1, 1: 2 };

  console.log(solve(N));

  function solve(n) {
    if (dp[n]) return dp[n];
    const left = solve(Math.floor(n / P));
    const right = solve(Math.floor(n / Q));
    return (dp[n] = left + right);
  }
}

run();
