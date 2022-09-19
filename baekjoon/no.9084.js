// 블로그 보고 이해하느라 힘들었던 문제.

function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 9084;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `test_${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' ').map(Number));
  return input;
}

function run() {
  const [T, ...arr] = getInput();
  const testCase = T[0];
  let caseArray = [];
  // 3개씩 케이스로 묶어서 배열에 넣기
  for (let i = 0; i < testCase; i++) {
    const eachCase = arr.splice(0, 3);
    caseArray = [...caseArray, eachCase];
  }
  let answers = [];
  caseArray.forEach(eachCase => {
    const coinCase = eachCase[0][0];
    const coins = eachCase[1];
    const targetMoney = eachCase[2][0];

    // dp[i] = i 원을 만들 수 있는 가지수로, 각 동전마다 i 원을 만들 수 있는 가지수를 구하면서 누적한다.
    let dp = Array.from({ length: targetMoney + 1 }).fill(0);
    dp[0] = 1;

    // i 원을 만드는 가지수 = 기존 i 원을 만드는 가지수 + (i - coin) 원을 만드는 가지수
    // 즉 2원, 3원으로 5원 만들기 => 기존 5원 만들기(2원 = 0) + (5-3 = 2)원 만들기 가지수 (1)
    coins.forEach(coin => {
      for (let i = coin; i < dp.length; i++) {
        dp[i] += dp[i - coin];
      }
    });
    answers.push(dp[targetMoney]);
  });

  answers.forEach(answer => console.log(answer));
}

run();
