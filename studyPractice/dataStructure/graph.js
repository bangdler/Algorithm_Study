// adjacency list vs adjacency matrix
// https://cs.slides.com/colt_steele/graphs
// adjacency list 가 적은 공간을 차지한다.
// 실제 graph 에서는 모든 점들 중에 적은 부분만 서로 연결되어 있기 때문에 adjacency list 를 사용할 예정

// 무방향 그래프
// 매개변수의 유효성 검사는 크게 고려하지 않음.
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (this.adjacencyList[vertex]) return false;
    this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return false;
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return false;
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(vertex => vertex !== vertex2);
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(vertex => vertex !== vertex1);
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return false;
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  recursiveDFS(startVertex) {
    if (!this.adjacencyList[startVertex]) return false;
    const visited = {};
    const result = [];

    const traverse = vertex => {
      if (!vertex) return;
      visited[vertex] = true;
      result.push(vertex);
      // 방문 여부는 재귀를 실행하기 전에 확인한다.
      this.adjacencyList[vertex].forEach(adjacentVertex => {
        if (visited[adjacentVertex]) return;
        return traverse(adjacentVertex);
      });
    };

    traverse(startVertex);
    return result;
  }

  iterativeDFS(startVertex) {
    if (!this.adjacencyList[startVertex]) return false;
    const visited = {};
    const result = [];
    const stack = [startVertex];
    visited[startVertex] = true;

    while (stack.length) {
      const currentVertex = stack.pop();
      result.push(currentVertex);
      // 방문여부는 stack 추가 전에 확인, 인접점들을 방문 표시한다. (stack 중복 push 방지)
      this.adjacencyList[currentVertex].forEach(adjacentVertex => {
        if (visited[adjacentVertex]) return;
        visited[adjacentVertex] = true;
        stack.push(adjacentVertex);
      });
    }
    return result;
  }

  BFS(startVertex) {
    if (!this.adjacencyList[startVertex]) return false;
    const visited = {};
    const result = [];
    const queue = [startVertex];
    visited[startVertex] = true;

    while (queue.length) {
      const currentVertex = queue.shift();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach(adjacentVertex => {
        if (visited[adjacentVertex]) return;
        visited[adjacentVertex] = true;
        queue.push(adjacentVertex);
      });
    }
    return result;
  }
}

const graph = new Graph();
graph.addVertex('seoul');
graph.addVertex('la');
graph.addVertex('tokyo');
graph.addVertex('texas');
graph.addVertex('madrid');
graph.addVertex('hawaii');
graph.addEdge('seoul', 'la');
graph.addEdge('seoul', 'madrid');
graph.addEdge('seoul', 'texas');
graph.addEdge('tokyo', 'la');
graph.addEdge('texas', 'hawaii');
graph.addEdge('tokyo', 'hawaii');
graph.addEdge('texas', 'madrid');
// graph.removeEdge('la', 'seoul');
// console.log(graph.removeEdge('torino', 'seoul'));
// graph.removeVertex('seoul');

console.log(graph.adjacencyList);
console.log(graph.recursiveDFS('tokyo'));
console.log(graph.iterativeDFS('tokyo'));
console.log(graph.BFS('tokyo'));
