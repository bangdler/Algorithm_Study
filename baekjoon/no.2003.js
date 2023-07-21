const getInput = require('./utils/util');

function run() {
  const [[N, M], nums] = getInput(2003).map(it => it.split(' ').map(Number));

  let pointer1 = 0;
  let pointer2 = 1;
  let count = 0;
  let sum = nums[0];
  while (pointer1 < N || pointer2 < N) {
    if (sum === M) {
      count += 1;
      sum += nums[pointer2];
      pointer2++;
    } else if (sum < M) {
      sum += nums[pointer2];
      pointer2++;
    } else {
      sum -= nums[pointer1];
      pointer1++;
    }
  }

  console.log(count);
}

run();
