const getInput = require('./utils/util');

function run() {
  const [[N, M, V], ...nums] = getInput(1260).map(it => it.split(' ').map(Number));

  const adjList = Array.from({ length: N + 1 }, () => []);
  for (let [a, b] of nums) {
    adjList[a].push(b);
    adjList[b].push(a);
  }

  adjList.forEach(list => list.sort((a, b) => a - b));

  const dfs = (start, adj, visited, route) => {
    if (visited[start]) return;
    visited[start] = 1;
    route.push(start);
    for (let neighbor of adj[start]) {
      dfs(neighbor, adj, visited, route);
    }
  };

  const bfs = (start, adj, visited, route) => {
    const queue = [start];
    visited[start] = 1;
    while (queue.length) {
      const cur = queue.shift();
      route.push(cur);
      for (let neighbor of adj[cur]) {
        if (visited[neighbor]) continue;
        visited[neighbor] = 1;
        queue.push(neighbor);
      }
    }
  };

  const dfsVisited = Array(N + 1).fill(0);
  const bfsVisited = Array(N + 1).fill(0);
  const dfsRoute = [];
  const bfsRoute = [];
  dfs(V, adjList, dfsVisited, dfsRoute);
  bfs(V, adjList, bfsVisited, bfsRoute);
  console.log(dfsRoute.join(' '));
  console.log(bfsRoute.join(' '));
}

run();
