class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 시간복잡도 O(1)
  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // 시간복잡도 O(N)
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (!this.length) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  // 시간복잡도 O(1)
  shift() {
    if (!this.head) return undefined;
    let current = this.head;
    this.head = current.next;
    this.length--;
    if (!this.length) {
      this.tail = null;
    }
    return current;
  }

  // 시간복잡도 O(1)
  unshift(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // 시간복잡도 O(N)
  get(index) {
    if (typeof index !== 'number' || index < 0 || index >= this.length) return undefined;
    let current = this.head;
    let counter = 0;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  set(index, value) {
    const foundNode = this.get(index);
    if (typeof index !== 'number' || !foundNode) return false;
    foundNode.value = value;
    return true;
  }

  // 시간복잡도 O(1) ~ O(N)
  insert(index, value) {
    if (typeof index !== 'number' || index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    const prevNode = this.get(index - 1);
    const newNode = new Node(value);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length++;
    return true;
  }

  // 시간복잡도 O(1) ~ O(N)
  remove(index) {
    if (typeof index !== 'number' || index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prevNode = this.get(index - 1);
    const removedNode = prevNode.next;
    prevNode.next = removedNode.next;
    this.length--;
    return removedNode;
  }

  reverse() {
    // head tail swap
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    // tail 부터 방향을 바꾼다.
    // prev, next, current 를 이동시키면서 current -> prev 를 가리키도록 바꾼다.
    let nextNode;
    let prevNode = null;
    for (let i = 0; i < this.length; i++) {
      nextNode = current.next;
      current.next = prevNode;
      prevNode = current;
      current = nextNode;
    }
    return this;
  }
}

const linkedList = new SinglyLinkedList();

linkedList.push('hi');
linkedList.push('bye');
linkedList.push('heel');
console.log(linkedList.pop());
console.log(linkedList.get(1));
console.log(linkedList.set(0, 'hii'));
console.log(linkedList.insert(1, 'zz'));
console.log(linkedList.insert(3, 'zzz'));
console.log(linkedList.remove(1));
console.log(linkedList.reverse(), linkedList.head, linkedList.tail);
console.log(linkedList);
