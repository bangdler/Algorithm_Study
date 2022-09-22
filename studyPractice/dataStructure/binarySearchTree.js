class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 시간복잡도
// insert, find 모두 best/average : O(logN)
// worst case : tree 가 한쪽으로 치우칠 경우 O(N) 이 될 수 있다.
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 존재하는 값을 넣는 경우에는 별도 작업 없이 this return
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (current) {
      if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      } else {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      }
    }
    return this;
  }

  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value > current.value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return undefined;
  }
}

const tree = new BinarySearchTree();
//     2
//  1     4
//      3   5
//            8
//          6
console.log(tree.insert(2));
console.log(tree.insert(4));
console.log(tree.insert(1));
console.log(tree.insert(5));
console.log(tree.insert(8));
console.log(tree.insert(6));
console.log(tree.root.right);
console.log(tree.find(8));
