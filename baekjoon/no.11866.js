const getInput = require('./utils/util');

const run = () => {
  const input = getInput(11866);
  const [n, k] = input[0].split(' ').map(Number);

  const result = [];

  const nums = Array.from({ length: n }, (_, idx) => idx + 1);
  let i = 0;
  while (result.length < n) {
    if ((i + 1) % k === 0) {
      result.push(nums[i]);
    } else {
      nums.push(nums[i]);
    }
    i++;
  }

  console.log(`<${result.join(', ')}>`);
};

run();
