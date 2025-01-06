const getInput = require('./utils/util');

const run = () => {
  const input = getInput(2798);

  const [[N, M], list] = input.map(it => it.split(' ').map(Number));

  let max = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      for (let k = j + 1; k < N; k++) {
        const sum = list[i] + list[j] + list[k];
        if (sum <= M) {
          max = Math.max(max, sum);
        }
      }
    }
  }
  console.log(max);
};

run();
