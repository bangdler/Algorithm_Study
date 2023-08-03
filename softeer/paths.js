const getInput = require('./util');

function run_fail() {
  const [[n, m], ...input] = getInput().map(it => it.split(' ').map(Number));

  const [start, end] = input.pop();

  const pathMap = {};

  for (let [a, b] of input) {
    if (pathMap[a]) {
      pathMap[a].push(b);
    } else {
      pathMap[a] = [b];
    }
  }
  const dfs = (start, end, visited, total) => {
    total.add(start);

    if (start === end) {
      return;
    }

    const nextPaths = pathMap[start];

    if (!nextPaths) return;

    for (let nextPath of nextPaths) {
      const newVisited = { ...visited };

      if (newVisited[start] && newVisited[start].includes(nextPath)) continue;
      if (newVisited[start]) {
        newVisited[start].push(nextPath);
      } else {
        newVisited[start] = [nextPath];
      }
      dfs(nextPath, end, newVisited, total);
    }
  };

  const startToEnd = new Set();
  const endToStart = new Set();
  dfs(start, end, {}, startToEnd);
  dfs(end, start, {}, endToStart);

  const overloaded = [...startToEnd].filter(it => [...endToStart].includes(it));

  console.log(overloaded.length - 2);
}

// 한 지점을 여러번 통과할 수 있다. 즉 마지막 장소가 아니라면 다시 돌아오는 것도 고려해야한다.
// 이것을 매번 다음 장소마다 dfs 를 돌리면 시간 초과가 발생하기 때문에 한 경로로만 가는 dfs 를 구하고, 간선의 방향을 바꾼 상태로 다시 dfs 를 돌린다.
// 두 경로에서 모두 방문한 경우 방문했다고 볼 수 있다.
// 즉 시작 -> 끝으로 가는 dfs 2번 (정간선 방향, 역간선 방향)
// 끝 -> 시작으로 가는 dfs 2번

function run() {
  const [[n, m], ...input] = getInput().map(it => it.split(' ').map(Number));
  // const fs = require('fs');
  // const readInput = fs.readFileSync('/dev/stdin').toString().trim().split(/\n/);
  // const [[n, m], ...input] = readInput.map(it => it.split(' ').map(Number));

  const [start, end] = input.pop();

  const adjList = Array.from({ length: n + 1 }, () => []);
  const reverseAdjList = Array.from({ length: n + 1 }, () => []);

  for (let [x, y] of input) {
    adjList[x].push(y);
    reverseAdjList[y].push(x);
  }

  // 재귀 - 스택오버플로우 발생
  const dfs = (now, adj, visited) => {
    if (visited[now]) return;
    visited[now] = 1;
    for (let neighbor of adj[now]) {
      dfs(neighbor, adj, visited);
    }
  };

  // stack 반복문으로 하면 정답
  const dfs2 = (start, adj, visited) => {
    visited[start] = 1;
    const stack = [start];

    while (stack.length) {
      const cur = stack.pop();
      for (let neighbor of adj[cur]) {
        if (visited[neighbor]) continue;
        visited[neighbor] = 1;
        stack.push(neighbor);
      }
    }
  };

  const fromS = Array(n + 1).fill(0);
  const fromT = Array(n + 1).fill(0);
  const toS = Array(n + 1).fill(0);
  const toT = Array(n + 1).fill(0);
  // 종료 지점에서 더이상 가지 않도록 미리 방문처리한다.
  fromS[end] = 1;
  fromT[start] = 1;
  dfs2(start, adjList, fromS);
  dfs2(end, adjList, fromT);
  dfs2(start, reverseAdjList, toS);
  dfs2(end, reverseAdjList, toT);

  let count = 0;
  for (let i = 1; i < m + 1; i++) {
    if (fromS[i] && fromT[i] && toS[i] && toT[i]) {
      count++;
    }
  }

  // 시작, 출발점 제외
  console.log(count - 2);
}
run();
