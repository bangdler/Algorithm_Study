const getInput = require('./utils/util');

function run() {
  const [[N, M], nums] = getInput(2559).map(it => it.split(' ').map(Number));

  let pointer1 = 0;
  let pointer2 = M;
  let max = 0;
  let sum = 0;

  for (let i = 0; i < M; i++) {
    sum += nums[i];
  }
  max = sum;

  while (pointer2 < N) {
    sum -= nums[pointer1];
    pointer1++;
    sum += nums[pointer2];
    pointer2++;
    max = Math.max(max, sum);
  }

  console.log(max);
}

run();
