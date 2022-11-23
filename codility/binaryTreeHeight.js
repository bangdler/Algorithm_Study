function solution(T) {
  // write your code in JavaScript (Node.js 14)
  if (T === null) return -1;

  const DFS = (node, height) => {
    if (node.l === null && node.r === null) {
      return height;
    }
    let left = height;
    let right = height;
    if (node.l) {
      let left = DFS(node.l, left + 1);
    }
    if (node.r) {
      right = DFS(node.r, right + 1);
    }
    return Math.max(left, right);
  };

  return DFS(T, 0);
}

const tree = {
  x: 5,
  l: {
    x: 3,
    l: { x: 20, l: null, r: null },
    r: { x: 21, l: null, r: null },
  },
  r: { x: 10, l: { x: 1, l: null, r: null }, r: null },
};

console.log(solution(tree));
