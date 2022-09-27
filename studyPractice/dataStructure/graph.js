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
}

const graph = new Graph();
graph.addVertex('seoul');
graph.addVertex('la');
graph.addVertex('tokyo');
graph.addVertex('texas');
graph.addVertex('madrid');
graph.addEdge('seoul', 'la');
graph.addEdge('seoul', 'madrid');
graph.addEdge('seoul', 'texas');
graph.addEdge('tokyo', 'la');
graph.addEdge('texas', 'tokyo');
graph.addEdge('texas', 'madrid');
// graph.removeEdge('la', 'seoul');
// console.log(graph.removeEdge('torino', 'seoul'));
graph.removeVertex('seoul');

console.log(graph.adjacencyList);
