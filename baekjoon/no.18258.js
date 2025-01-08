const getInput = require('./utils/util');

const run = () => {
  const [n, ...arr] = getInput(18258);

  const stack = [];
  const result = [];
  let firstIdx = 0;
  const perf = word => {
    const [a, b] = word.split(' ');

    switch (a) {
      case 'push':
        stack.push(Number(b));
        break;
      case 'pop':
        result.push(stack[firstIdx] || -1);
        stack[firstIdx] && firstIdx++;
        break;
      case 'size':
        result.push(stack.length - firstIdx);
        break;
      case 'empty':
        result.push(stack.length - firstIdx === 0 ? 1 : 0);
        break;
      case 'front':
        result.push(stack.length - firstIdx === 0 ? -1 : stack[firstIdx]);
        break;
      case 'back':
        result.push(stack.length - firstIdx === 0 ? -1 : stack[stack.length - 1]);
        break;
    }
  };

  arr.forEach(word => {
    perf(word);
  });

  console.log(result.join('\n'));
};

run();
