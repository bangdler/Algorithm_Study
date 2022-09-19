function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 1991;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' '));
  return input;
}

function run() {
  const [[N], ...arr] = getInput();

  // tree 만들기

  let tree = new Map();

  for (let i = 0; i < Number(N); i++) {
    const [val, left, right] = arr[i];
    tree.set(val, { left: left === '.' ? null : left, right: right === '.' ? null : right });
  }

  // 전위 순회
  const preOrder = [];
  function preOrderSearch(node) {
    if (node === null) {
      return;
    }
    const cur = tree.get(node);

    preOrder.push(node);
    preOrderSearch(cur.left);
    preOrderSearch(cur.right);
  }

  // 중위 순회
  const inOrder = [];
  function inOrderSearch(node) {
    if (node === null) {
      return;
    }
    const cur = tree.get(node);

    inOrderSearch(cur.left);
    inOrder.push(node);
    inOrderSearch(cur.right);
  }

  const postOrder = [];
  function postOrderSearch(node) {
    if (node === null) {
      return;
    }
    const cur = tree.get(node);

    postOrderSearch(cur.left);
    postOrderSearch(cur.right);
    postOrder.push(node);
  }

  preOrderSearch('A');
  inOrderSearch('A');
  postOrderSearch('A');

  console.log(preOrder.join(''));
  console.log(inOrder.join(''));
  console.log(postOrder.join(''));
}

// 틀린 tree 만들기 - 왜 틀렸는지 모름...
function run2() {
  const [[N], ...arr] = getInput();

  // tree 만들기

  function node(val, left = null, right = null) {
    return {
      val: val,
      left: left,
      right: right,
    };
  }

  let root;
  for (let i = 0; i < Number(N); i++) {
    const [val, left, right] = arr[i];

    if (i === 0) {
      root = node(val, node(left), node(right));
      continue;
    }

    let stack = [root];
    while (stack.length) {
      const cur = stack.pop();
      if (val === cur.val) {
        cur.left = left === '.' ? null : node(left);
        cur.right = right === '.' ? null : node(right);
        break;
      }
      if (cur.left !== null) {
        stack.push(cur.left);
      }
      if (cur.right !== null) {
        stack.push(cur.right);
      }
    }
  }

  // 전위 순회
  const preOrder = [];
  function preOrderSearch(node) {
    if (node === null) {
      return;
    }

    preOrder.push(node.val);
    preOrderSearch(node.left);
    preOrderSearch(node.right);
  }

  // 중위 순회
  const inOrder = [];
  function inOrderSearch(node) {
    if (node === null) {
      return;
    }

    inOrderSearch(node.left);
    inOrder.push(node.val);
    inOrderSearch(node.right);
  }

  const postOrder = [];
  function postOrderSearch(node) {
    if (node === null) {
      return;
    }

    postOrderSearch(node.left);
    postOrderSearch(node.right);
    postOrder.push(node.val);
  }

  preOrderSearch(root);
  inOrderSearch(root);
  postOrderSearch(root);
  console.log(root);
  console.log(preOrder.join(''));
  console.log(inOrder.join(''));
  console.log(postOrder.join(''));
}

run2();
