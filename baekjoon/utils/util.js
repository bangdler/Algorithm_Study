function getInput(numOfProblem) {
  const fs = require('fs');
  const path = require('path');

  const filePath =
    process.platform === 'linux' ? '/dev/stdin' : path.join(process.cwd(), `baekjoon/test/${numOfProblem}.txt`);

  const input = fs.readFileSync(filePath).toString().trim().split(/\n/);
  return input;
}

module.exports = getInput;
