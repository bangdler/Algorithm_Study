//그리디 알고 풀었지만 못풀어서 좀 찾아봄.

function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 11501;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' ').map(Number));
  return input;
}

function run() {
  const [[T], ...array] = getInput();
  const cases = Array.from({ length: T }, (_, i) => [array[i * 2], array[i * 2 + 1]]);
  let answers = [];
  cases.forEach(eachCase => {
    const [[N], ...[prices]] = eachCase;
    let maxPrice = prices[N - 1];
    let maxProfit = 0;
    // 마지막 값을 최대값으로 설정, 배열 뒤에서부터 비교하면서 최대값보다 작으면 차익실현, 최대값보다 크면 최대값을 업데이트해준다.
    for (let i = N - 2; i >= 0; i--) {
      if (prices[i] < maxPrice) {
        maxProfit += maxPrice - prices[i];
      }
      if (prices[i] > maxPrice) {
        maxPrice = prices[i];
      }
    }
    answers.push(maxProfit);
  });
  console.log(answers.join(`\n`));
}

run();
