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

  // BFS, DFS 시간복잡도는 같지만, Tree 모양에 따라 메모리 공간 사용량이 다르다.
  // Tree 가 넓게 퍼져있을수록 BFS 사용 시 queue 에 node 가 많이 쌓이게 되므로 DFS 가 좋고, 반대로 깊을수록 DFS 사용 시 call stack 이 쌓이므로 BFS 가 좋다.
  // Breadth First Search
  BFS() {
    if (!this.root) return [];
    let current = this.root;
    const queue = [];
    const visited = [];
    queue.push(current);
    while (queue.length) {
      current = queue.shift();
      visited.push(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return visited;
  }

  //Depth First Search
  // root 를 보존하면서 배열을 만들어 순서대로 다시 tree 를 만들 수 있다.
  preOrderDFS() {
    if (!this.root) return [];
    const visited = [];
    const traverse = node => {
      visited.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return visited;
  }

  postOrderDFS() {
    if (!this.root) return [];
    const visited = [];
    const traverse = node => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.value);
    };
    traverse(this.root);
    return visited;
  }

  // 오름차순으로 정렬 가능하다.
  inOrderDFS() {
    if (!this.root) return [];
    const visited = [];
    const traverse = node => {
      if (node.left) traverse(node.left);
      visited.push(node.value);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return visited;
  }
}

const tree = new BinarySearchTree();
//     2
//  1     4
//0     3   5
//            8
//          6
console.log(tree.BFS());
console.log(tree.insert(2));
console.log(tree.insert(4));
console.log(tree.insert(1));
tree.insert(0);
tree.insert(5);
tree.insert(3);
tree.insert(8);
tree.insert(6);
console.log(tree.root.right);
console.log(tree.find(8));
console.log(tree.BFS());
console.log('preorder', tree.preOrderDFS());
console.log('postorder', tree.postOrderDFS());
console.log('inorder', tree.inOrderDFS());
