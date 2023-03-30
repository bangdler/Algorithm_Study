// https://school.programmers.co.kr/learn/courses/30/lessons/72413

// s 에서 나머지 경로로 최단 금액 + 각 경로에서 a 까지의 최단 금액 + 각 경로에서 b 까지의 최단 금액 중 최소값
// 다익스트라 사용 시 현재 start 로부터의 금액 배열(nodes)을 sort 로 갱신하면 시간초과임. 우선순위큐로 적용하니까 통과.
function solution(n, s, a, b, fares) {
  const graph = makeGraph(n, fares);
  const calculatedFares = [];
  for (let i = 1; i <= n; i++) {
    const sToSome = dijkstra(s, i, graph);
    const someToA = dijkstra(i, a, graph);
    const someToB = dijkstra(i, b, graph);
    const calculatedFare = sToSome + someToA + someToB;
    calculatedFares.push(calculatedFare);
  }
  return Math.min(...calculatedFares);
}

// fares = [a, b, fare][]
const makeGraph = (n, fares) => {
  const graph = {};
  for (let i = 1; i <= n; i++) {
    graph[i] = [];
  }
  for (let [v1, v2, fare] of fares) {
    graph[v1].push([v2, fare]);
    graph[v2].push([v1, fare]);
  }
  return graph;
};

// start -> finish 까지의 최단 경로 구하기
const dijkstra = (start, finish, graph) => {
  if (start === finish) return 0;
  // 금액을 갱신할 배열
  const nodes = new PriorityQueue();
  const faresFromStart = {};
  let minFare;

  for (let vertex in graph) {
    if (+vertex === start) {
      faresFromStart[vertex] = 0;
      nodes.enqueue(+vertex, 0);
    } else {
      faresFromStart[vertex] = Infinity;
      nodes.enqueue(+vertex, Infinity);
    }
  }

  while (nodes.queue.length) {
    const smallestVertex = nodes.dequeue().value;
    if (smallestVertex === finish) {
      minFare = faresFromStart[smallestVertex];
      break;
    }
    if (smallestVertex !== finish && faresFromStart[smallestVertex] !== Infinity) {
      const adjacentNodes = graph[smallestVertex];
      for (let [adjacentVertex, adjacentFare] of adjacentNodes) {
        const candidateFare = faresFromStart[smallestVertex] + adjacentFare;
        if (candidateFare < faresFromStart[adjacentVertex]) {
          faresFromStart[adjacentVertex] = candidateFare;
          nodes.enqueue(adjacentVertex, candidateFare);
        }
      }
    }
  }

  return minFare;
};

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    this.queue.push(newNode);
    this.bubbleUp();
    return this.queue;
  }

  bubbleUp() {
    let currentIdx = this.queue.length - 1;
    const current = this.queue[currentIdx];

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      const parent = this.queue[parentIdx];
      if (current.priority >= parent.priority) break;
      this.queue[currentIdx] = parent;
      this.queue[parentIdx] = current;
      currentIdx = parentIdx;
    }
  }

  dequeue() {
    if (!this.queue.length) return undefined;
    if (this.queue.length === 1) return this.queue.pop();

    const min = this.queue[0];
    const end = this.queue.pop();
    this.queue[0] = end;

    this.sinkDown();

    return min;
  }

  sinkDown() {
    let currentIdx = 0;
    const current = this.queue[currentIdx];
    const maxCurrentIdx = Math.floor((this.queue.length - 2) / 2);

    while (currentIdx <= maxCurrentIdx) {
      const leftIdx = currentIdx * 2 + 1;
      const rightIdx = currentIdx * 2 + 2;
      const left = this.queue[leftIdx];
      const right = this.queue[rightIdx];
      const swapIdx = right ? (left.priority < right.priority ? leftIdx : rightIdx) : leftIdx;
      const minChild = this.queue[swapIdx];

      if (current.priority < minChild.priority) break;
      this.queue[currentIdx] = minChild;
      this.queue[swapIdx] = current;
      currentIdx = swapIdx;
    }
  }
}

const test = [
  6,
  4,
  6,
  2,
  [
    [4, 1, 10],
    [3, 5, 24],
    [5, 6, 2],
    [3, 1, 41],
    [5, 1, 24],
    [4, 6, 50],
    [2, 4, 66],
    [2, 3, 22],
    [1, 6, 25],
  ],
];

const test1 = [
  7,
  3,
  4,
  1,
  [
    [5, 7, 9],
    [4, 6, 4],
    [3, 6, 1],
    [3, 2, 3],
    [2, 1, 6],
  ],
];

console.log(solution(test1[0], test1[1], test1[2], test1[3], test1[4]));
