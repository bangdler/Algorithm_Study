// https://school.programmers.co.kr/learn/courses/30/lessons/12978

// 다익스트라
function solution(N, road, K) {
  const distances = Array(N + 1).fill(Infinity);

  // 나라에 따른 이웃 [번호, 거리] 객체
  const neighbors = {};

  for (let [a, b, distance] of road) {
    neighbors[a] = neighbors[a] ? [...neighbors[a], [b, distance]] : [[b, distance]];
    neighbors[b] = neighbors[b] ? [...neighbors[b], [a, distance]] : [[a, distance]];
  }

  // 1번 나라에서 출발한다.
  distances[1] = 0;
  const visited = Array(N + 1).fill(false);
  const queue = [1];
  visited[1] = true;

  while (queue.length) {
    // 가장 가까운 값을 꺼내야한다.
    const cur = queue.sort((a, b) => distances[a] - distances[b]).shift();
    // 현재나라까지 거리
    const curDis = distances[cur];

    // 이웃 거리 업데이트
    for (let [neighbor, nDis] of neighbors[cur]) {
      distances[neighbor] = Math.min(distances[neighbor], curDis + nDis);
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
  // 거리가 K 이하인 나라 개수 구하기
  return distances.filter(x => x <= K).length;
}

const test = [
  5,
  [
    [1, 2, 1],
    [2, 3, 3],
    [5, 2, 2],
    [2, 4, 1],
    [1, 4, 3],
    [5, 3, 1],
    [5, 4, 2],
  ],
  3,
];

const test2 = [
  5,
  [
    [2, 1, 90],
    [3, 2, 1],
    [4, 2, 4],
    [3, 1, 100],
    [4, 1, 60],
    [4, 3, 1],
    [4, 5, 1],
    [3, 5, 10],
  ],
  3,
];
console.log(solution(test2[0], test2[1], test2[2]));
