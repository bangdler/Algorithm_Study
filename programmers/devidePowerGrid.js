// https://school.programmers.co.kr/learn/courses/30/lessons/86971

function solution(n, wires) {
  let answer = n;

  // wires 순회하며 트리 만들기
  const tree = {};
  for (let [v1, v2] of wires) {
    if (!tree[v1]) {
      tree[v1] = [v2];
    } else {
      tree[v1].push(v2);
    }
    if (!tree[v2]) {
      tree[v2] = [v1];
    } else {
      tree[v2].push(v1);
    }
  }

  // 탐색 함수 (root 부터 disconnect 를 제외하고 탐색하여 개수 반환)
  const dfs = (root, disconnect) => {
    const visited = {};
    const stack = [root];
    visited[root] = true;
    let count = 1;
    while (stack.length) {
      const cur = stack.pop();
      for (let child of tree[cur]) {
        if (visited[child]) continue;
        if (child === disconnect) continue;
        if (tree[child]) {
          visited[child] = true;
          stack.push(child);
        }
        count += 1;
      }
    }
    return count;
  };

  // wires 를 순회하면서 각 연결이 끊겼을 때 나머지 부분의 개수를 구한다.
  for (let [disconnect, root] of wires) {
    const countFromRoot = dfs(disconnect, root);
    const rest = n - countFromRoot;
    const curDiff = Math.abs(rest - countFromRoot);
    answer = Math.min(answer, curDiff);
  }
  return answer;
}

const test = [
  9,
  [
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [7, 8],
    [7, 9],
  ],
];
const test1 = [
  6,
  [
    [1, 4],
    [6, 3],
    [2, 5],
    [5, 1],
    [5, 3],
  ],
];
console.log(solution(test1[0], test1[1]));
