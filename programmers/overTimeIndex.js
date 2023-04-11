// https://school.programmers.co.kr/learn/courses/30/lessons/12927

function solution(n, works) {
  let answer = 0;
  const heap = new MaxBinaryHeap();
  for (let work of works) {
    heap.insert(work);
  }
  while (n > 0) {
    const max = heap.extractMax();
    if (max === 0) break;
    n--;
    heap.insert(max - 1);
  }
  answer = heap.values.reduce((acc, cur) => acc + cur ** 2, 0);
  return answer;
}

class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    this.bubbleUp();
    return this.values;
  }

  bubbleUp() {
    let currentIdx = this.values.length - 1;
    const current = this.values[currentIdx];
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      const parent = this.values[parentIdx];
      if (current <= parent) break;
      this.values[currentIdx] = parent;
      this.values[parentIdx] = current;
      currentIdx = parentIdx;
    }
  }

  extractMax() {
    if (this.values.length === 0) return undefined;
    if (this.values.length === 1) return this.values.pop();

    const max = this.values[0];
    const end = this.values.pop();
    this.values[0] = end;

    this.sinkDown();

    return max;
  }

  sinkDown() {
    let currentIdx = 0;
    const current = this.values[currentIdx];
    const maxCurrentIdx = Math.floor((this.values.length - 2) / 2);

    while (currentIdx <= maxCurrentIdx) {
      const leftIdx = 2 * currentIdx + 1;
      const rightIdx = 2 * currentIdx + 2;
      const left = this.values[leftIdx];
      const right = this.values[rightIdx];
      const largestChild = right ? Math.max(left, right) : left;
      if (current >= largestChild) break;
      if (left > right || !right) {
        this.values[leftIdx] = current;
        this.values[currentIdx] = left;
        currentIdx = leftIdx;
      } else {
        this.values[rightIdx] = current;
        this.values[currentIdx] = right;
        currentIdx = rightIdx;
      }
    }
  }
}

console.log(solution(4, [4, 3, 3])); // 12
