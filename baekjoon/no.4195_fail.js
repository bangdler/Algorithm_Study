function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 4195;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' '));
  return input;
}

function run() {
  const [[T], ...arr] = getInput();
  let answer = [];

  for (let i = 0; i < Number(T); i++) {
    const relationshipNum = arr.splice(0, 1)[0][0];
    const relationshipArr = arr.splice(0, Number(relationshipNum));

    const network = {};
    relationshipArr.forEach(list => {
      const [a, b] = list;

      if (!network[a]) {
        network[a] = new Set([a]);
      }
      if (!network[b]) {
        network[b] = new Set([b]);
      }

      const union = new Set([...network[a], ...network[b]]); // 메모리 초과
      network[a] = union;
      network[b] = network[a];

      answer.push(network[a].size);
    });
  }

  console.log(answer.join('\n'));
}

run();
