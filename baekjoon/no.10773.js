const getInput = require('./utils/util');

const run = () => {
  const [n, ...arr] = getInput(10773).map(Number);

  const stack = [];

  for (let i = 0; i < n; i++) {
    const num = arr[i];
    if (num === 0) {
      stack.pop();
    } else {
      stack.push(num);
    }
  }
  console.log(stack.reduce((acc, cur) => acc + cur, 0));
};

run();
