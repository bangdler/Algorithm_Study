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

// 그래프를 사용한 탐색 - 메모리 초과ㅠ
function run2() {
  const [[T], ...arr] = getInput();
  const answer = [];

  for (let i = 0; i < Number(T); i++) {
    const [relationshipNum] = arr.splice(0, 1).flat();
    const relationshipArr = arr.splice(0, Number(relationshipNum));

    const network = {};
    relationshipArr.forEach(list => {
      const [a, b] = list;
      // add vertex
      if (!network[a]) {
        network[a] = [];
      }
      if (!network[b]) {
        network[b] = [];
      }

      // add edge
      network[a].push(b);
      network[b].push(a);

      // dfs
      const networkPaths = dfs(network, a);

      answer.push(networkPaths.length);
    });
  }

  console.log(answer.join('\n'));
}

function dfs(network, start) {
  const visited = {};
  const result = [];
  visited[start] = true;
  const stack = [start];

  while (stack.length) {
    const cur = stack.pop();
    result.push(cur);
    network[cur].forEach(neighbor => {
      if (visited[neighbor]) return;
      visited[neighbor] = true;
      stack.push(neighbor);
    });
  }

  return result;
}

// 실패한 방법
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

run2();
