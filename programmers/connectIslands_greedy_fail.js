function solution(n, costs) {
  let answer = 0;

  // 방문 여부
  const visited = Array.from({ length: n }).fill(false);

  // 0을 기준으로 연결한다. 0에서 연결되는 다리의 비용을 모두 infinity 로 두고 min 값을 갱신한다.
  const islandCost = Array.from({ length: n }).fill(0);
  const accumulatedCosts = Array.from({ length: n }).fill(Infinity);
  islandCost[0] = 0;
  accumulatedCosts[0] = 0;
  visited[0] = true;

  // costs 가 정렬되어 있다고 가정...
  costs.forEach(x => {
    const [index1, index2, cost] = x;

    // 1개만 방문한 적이 있는 경우,
    if (visited[index1] && !visited[index2]) {
      visited[index2] = true;
      islandCost[index2] = cost;
      accumulatedCosts[index2] = accumulatedCosts[index1] + cost;
    } else if (visited[index2] && !visited[index1]) {
      visited[index1] = true;
      islandCost[index1] = cost;
      accumulatedCosts[index1] = accumulatedCosts[index2] + cost;
    }
    // 둘다 방문
    else if (visited[index1] && visited[index2]) {
      if (accumulatedCosts[index1] + accumulatedCosts[index2] > cost) {
      }
    }
  });

  return answer;
}
