class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    const lastNode = this.tail;
    const prevNode = this.tail.prev;
    if (!prevNode) {
      this.head = null;
      this.tail = this.head;
    } else {
      prevNode.next = null;
      this.tail = prevNode;
      lastNode.prev = null;
    }
    this.length--;
    return lastNode;
  }

  shift() {
    if (!this.head) return undefined;
    const firstNode = this.head;
    const nextNode = this.head.next;
    if (!nextNode) {
      this.head = null;
      this.tail = this.head;
    } else {
      nextNode.prev = null;
      this.head = nextNode;
      firstNode.next = null;
    }
    this.length--;
    return firstNode;
  }

  unshift(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= this.length) return undefined;
    let current;
    const half = this.length / 2;
    if (index < half) {
      current = this.head;
      let counter = 0;
      while (counter !== index) {
        current = current.next;
        counter++;
      }
    } else {
      current = this.tail;
      let counter = this.length - 1;
      while (counter !== index) {
        current = current.prev;
        counter--;
      }
    }
    return current;
  }

  set(index, value) {
    const foundNode = this.get(index);
    if (!foundNode) return false;
    foundNode.value = value;
    return true;
  }

  insert(index, value) {
    if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    const newNode = new Node(value);
    const prevNode = this.get(index - 1);
    const nextNode = prevNode.next;

    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = nextNode;
    nextNode.prev = newNode;
    this.length++;
    return true;
  }

  remove(index) {
    if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prevNode = this.get(index - 1);
    const removedNode = prevNode.next;
    const nextNode = removedNode.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    removedNode.prev = null;
    removedNode.next = null;
    this.length--;
    return removedNode;
  }

  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    let prevNode = null;
    let nextNode;

    for (let i = 0; i < this.length; i++) {
      nextNode = current.next;
      current.next = prevNode;
      current.prev = nextNode;
      prevNode = current;
      current = nextNode;
    }
    return this;
  }
}

const ddl = new DoublyLinkedList();

function ddlTest() {
  const test = {
    'push 3,4': () => {
      ddl.push(3);
      ddl.push(4);
    },
    pop: () => ddl.pop(),
    shift: () => ddl.shift(),
    'push 6,7': () => {
      ddl.push(6);
      ddl.push(7);
      return ddl;
    },
    'unshift 8': () => ddl.unshift(8),
    'get 1': () => ddl.get(1),
    'set 1': () => ddl.set(1, -1),
    insert: () => {
      ddl.insert(0, -2);
      ddl.insert(4, 9);
      ddl.insert(1, 0);
      return ddl;
    },
    remove: () => {
      ddl.remove(0);
      ddl.remove(1);
      ddl.remove(3);
      return ddl.remove(4);
    },
    reverse: () => ddl.reverse(),
  };

  for (let key in test) {
    console.log(key, ':', test[key]());
    const array = [];
    let current = ddl.head;
    for (let i = 0; i < ddl.length; i++) {
      array.push(current.value);
      current = current.next;
    }
    console.log('list :', array);
  }
}

ddlTest();
