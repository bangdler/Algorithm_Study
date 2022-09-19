function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 13414;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' '));
  return input;
}

// 메모리 초과
function run() {
  const [[K, L], ...arr] = getInput();
  const clickQue = arr.flat();
  let waitQue = {};
  let successQue = [];
  clickQue.forEach(num => {
    if (!waitQue[num]) {
      waitQue[num] = true;
      successQue.push(num);
    } else {
      successQue = successQue.filter(x => x !== num);
      successQue.push(num);
    }
  });

  const answer = successQue.splice(0, Number(K)).join('\n');
  console.log(answer);
}

function run2() {
  const [[K, L], ...arr] = getInput();
  const clickQue = arr.flat();
  let waitQue = new Map();
  clickQue.forEach(num => {
    if (!waitQue.has(num)) {
      waitQue.set(num, true);
    } else {
      waitQue.delete(num);
      waitQue.set(num, true);
    }
  });

  let answer = [...waitQue.keys()].slice(0, Number(K));
  console.log(answer.join('\n'));
}

run2();
