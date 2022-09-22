class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// singlyLinkedList 와 유사하지만 push, pop 의 시간복잡도가 상수가 되도록 push 시 unshift 처럼 앞에 붙이고 pop 시 shift 처럼 앞에서 제거한다.
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }
    this.size++;
    return this.size;
  }

  pop() {
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

const stack = new Stack();

console.log(stack, stack.push(1), stack.push(2), stack.pop(), stack.pop(), stack.push(3), stack.pop(), stack.pop());
