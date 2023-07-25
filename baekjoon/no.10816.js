const getInput = require('./utils/util');

function run() {
  const [[N], cards, [M], targets] = getInput(10816).map(it => it.split(' ').map(Number));

  const hash = {};

  for (let num of cards) {
    if (!hash[num]) {
      hash[num] = 1;
    } else {
      hash[num] += 1;
    }
  }

  const answer = targets.map(target => {
    if (hash[target]) {
      return hash[target];
    } else {
      return 0;
    }
  });

  console.log(answer.join(' '));
}

run();
