const getInput = require('./utils/util');

function run() {
  const [[N], [M], ...nums] = getInput(2606).map(it => it.split(' ').map(Number));

  const adjList = Array.from({ length: N + 1 }, () => []);
  for (let [a, b] of nums) {
    adjList[a].push(b);
    adjList[b].push(a);
  }

  const dfs = (start, adj, visited) => {
    if (visited[start]) return;
    visited[start] = 1;
    for (let neighbor of adj[start]) {
      dfs(neighbor, adj, visited);
    }
  };
  const visited = Array(N + 1).fill(0);
  dfs(1, adjList, visited);

  const numOfVirus = visited.filter(it => it === 1).length;
  console.log(numOfVirus - 1);
}

run();
