// priority queue 는 우선순위가 높은(숫자가 낮은) 것부터 처리해야한다.
// 일반적으로 높거나 낮은 값부터 구성된 heap 을 활용한다.
class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

// minBinaryHeap 과 거의 동일함.
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  // node 삽입, 제거 시 같은 우선순위는 별다른 구분이 없기 때문에 삽입 순서가 보장되지 않는다.
  // 삽입 순서를 보장하기 위해서는 같은 우선순위 비교를 위한 insertTime 같은 변수를 만들어야 함.
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

  // min 값을 반환
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

const pQue = new PriorityQueue();

console.log(pQue.enqueue('eat', 3));
console.log(pQue.enqueue('run', 5));
console.log(pQue.enqueue('jump', 5));
console.log(pQue.enqueue('sleep', 1));
console.log(pQue.enqueue('drink', 4));
console.log(pQue.enqueue('sing', 4));
console.log(pQue.dequeue());
console.log(pQue.dequeue());
console.log(pQue.dequeue());
console.log(pQue.dequeue());
console.log(pQue.dequeue());
console.log(pQue.dequeue());
console.log(pQue.dequeue());

module.exports = { PriorityQueue };
