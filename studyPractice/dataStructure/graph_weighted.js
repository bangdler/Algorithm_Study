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

  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return false;
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(vertex => vertex.node !== vertex2);
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(vertex => vertex.node !== vertex1);
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return false;
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex.node);
    }
    delete this.adjacencyList[vertex];
  }
}

const graph = new WeightedGraph();
graph.addVertex('seoul');
graph.addVertex('la');
graph.addVertex('tokyo');
graph.addVertex('texas');
graph.addVertex('madrid');
graph.addVertex('hawaii');
graph.addEdge('seoul', 'la', 10);
graph.addEdge('seoul', 'madrid', 20);
graph.addEdge('seoul', 'texas', 30);
graph.addEdge('tokyo', 'la', 40);
graph.addEdge('texas', 'hawaii', 10);
graph.addEdge('tokyo', 'hawaii', 20);
graph.addEdge('texas', 'madrid', 50);
//graph.removeEdge('la', 'seoul');
console.log(graph.removeEdge('torino', 'seoul'));
graph.removeVertex('seoul');

console.log(graph.adjacencyList);
