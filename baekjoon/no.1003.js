function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 1003;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `test_${numOfProblem}.txt`);

  const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(Number);
  return input;
}

// 피보나치는 앞의 두 항을 합한 값이 현재 항이므로, 앞의 두항의 0 호출, 1호출을 각각 더하면 된다.

function run() {
  const [n, ...inputArr] = getInput();
  const max = Math.max(...inputArr);
  const memo = Array.from({ length: max });

  memo[0] = [1, 0];
  memo[1] = [0, 1];

  for (let i = 2; i <= max; i++) {
    memo[i] = [memo[i - 1][0] + memo[i - 2][0], memo[i - 1][1] + memo[i - 2][1]];
  }

  inputArr.forEach(num => {
    console.log(...memo[num]);
  });
}

run();
