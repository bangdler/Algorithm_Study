const { PriorityQueue } = require('./priorityQueue');

// 가중 그래프에서 다익스트라 알고리즘을 통한 최단 거리 찾기

/* 알고리즘 순서
https://cs.slides.com/colt_steele/graphs#/83
1. 방문하지 않은 노드들 중 시작점에서 가장 가까운 거리를 가진 노드를 방문한다.
2. 방문 후 해당 노드의 이웃 노드를 확인, 시작점에서 이웃 노드까지의 거리를 확인하여 최소값으로 업데이트
3. 방문 노드 객체, 이전 경로 노드를 나타내는 객체 업데이트
4. 반복

비고) 1 을 위해서 우선순위큐를 사용한다.
*/

// 가중 그래프
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (this.adjacencyList[vertex]) return false;
    this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return false;
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  Dijkstra(start, finish) {
    if (!this.adjacencyList[start] || !this.adjacencyList[finish]) return false;

    // 순회 시 미방문한 노드 중 시작점에서 가장 가까운 노드를 고르기 위한 우선순위큐
    const nodes = new SimplePriorityQueue();
    // const nodes = new PriorityQueue(); 성능 향상을 위한 이진힙 우선순위큐

    // 시작점에서 각 노드까지 최단 거리 객체
    const distances = {};
    // 각 노드의 바로 이전 노드가 무엇인지
    const previous = {};

    let shortestPath; // 마지막에 리턴할 start -> finish 경로
    let minDistance; // 마지막에 리턴할 start -> finish 최단거리

    // 초기값 세팅 (자기자신만 0, 나머지는 무한)
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // 우선순위 큐가 빌 때까지 순회 (거리가 가까운 순으로 dequeue)
    while (nodes.queue.length) {
      // 방문할 최단거리 노드
      const smallest = nodes.dequeue().value;
      // 최종 경로일 경우 종료
      if (smallest === finish) {
        const path = [];
        let current = smallest;
        // 최종점부터 역순으로 경로를 따라가면서 start = null 이 나올때까지
        while (previous[current]) {
          path.push(current);
          current = previous[current];
        }
        // 시작점 넣어주고 역순으로 뒤집기
        path.push(current);
        minDistance = distances[smallest];
        shortestPath = path.reverse();
        break;
      }

      // 인접 노드까지의 거리 확인 및 업데이트
      if (smallest !== finish && distances[smallest] !== Infinity) {
        const curAdjacentNodes = this.adjacencyList[smallest];
        for (let adjacentNode of curAdjacentNodes) {
          // 인접 노드까지 거리값 비교 :
          // (시작점에서 방문한 smallest 까지 거리 + smallest 에서 인접노드거리까지 거리) vs 알고 있던 시작점에서 인접노드까지 거리
          const candidateDistance = distances[smallest] + adjacentNode.weight;
          if (candidateDistance < distances[adjacentNode.node]) {
            // 계산한 시작점 -> 이웃노드까지 거리가 기존값보다 작다면 업데이트
            distances[adjacentNode.node] = candidateDistance;
            // 이전노드 객체 수정
            previous[adjacentNode.node] = smallest;
            // 우선순위큐에 새로운 최단거리로 enqueue
            nodes.enqueue(adjacentNode.node, candidateDistance);
          }
        }
      }
    }
    return { shortestPath, minDistance };
  }
}

// heap 이 아닌 sort 를 활용한 간단 우선순위큐 - 정렬 시 시간복잡도 O(N*logN)
class SimplePriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(value, priority) {
    this.queue.push({ value, priority });
    this.sort();
  }

  dequeue() {
    return this.queue.shift();
  }
  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }
}

const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

console.log(graph.adjacencyList);
console.log(graph.Dijkstra('A', 'E'));
// console.log(graph.Dijkstra('A', 'C'));

/*
      A (4) B
 (2)          (3)
 C  (2) D  (3) E
  (4)  (1)  (1)
        F
*/
