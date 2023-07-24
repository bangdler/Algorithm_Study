const getInput = require('./utils/util');

function run() {
  const [[N, K], ...nums] = getInput(11047).map(it => it.split(' ').map(Number));

  const coins = nums.flat();
  let curMoney = K;
  let answer = 0;
  while (curMoney) {
    const curCoin = coins.pop();
    const n = Math.floor(curMoney / curCoin);
    answer += n;
    curMoney = curMoney % curCoin;
  }
  console.log(answer);
}

run();
