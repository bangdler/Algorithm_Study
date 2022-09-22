class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// 추가는 last, 제거는 first => 선입선출
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.first) return undefined;
    const firstNode = this.first;
    this.first = firstNode.next;
    firstNode.next = null;
    this.size--;
    if (!this.size) {
      this.last = null;
    }
    return firstNode.value;
  }
}

const que = new Queue();

console.log(que, que.enqueue('first'), que.enqueue('second'), que.dequeue(), que.dequeue(), que.dequeue());
