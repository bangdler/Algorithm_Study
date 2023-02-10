// https://school.programmers.co.kr/learn/courses/30/lessons/142085

class MaxHeap {
  constructor() {
    this.val = [];
  }

  insert(val) {
    this.val.push(val);
    this.bubbleUp();
    return this.val;
  }

  bubbleUp() {
    let currentIdx = this.val.length - 1;
    const current = this.val[currentIdx];
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      const parent = this.val[parentIdx];
      if (current <= parent) break;
      //부모요소보다 클 경우 바꿔준다.
      this.val[currentIdx] = parent;
      this.val[parentIdx] = current;
      currentIdx = parentIdx;
    }
  }

  extractMax() {
    if (this.val.length === 0) return undefined;
    if (this.val.length === 1) return this.val.pop();
    const max = this.val[0];
    const end = this.val.pop();
    this.val[0] = end;
    this.sinkDown();
    return max;
  }

  sinkDown() {
    let currentIdx = 0;
    const current = this.val[currentIdx];
    const maxIdx = Math.floor((this.val.length - 2) / 2);

    while (currentIdx <= maxIdx) {
      const leftIdx = 2 * currentIdx + 1;
      const rightIdx = 2 * currentIdx + 2;
      const left = this.val[leftIdx];
      const right = this.val[rightIdx];
      const swapIdx = right ? (left > right ? leftIdx : rightIdx) : leftIdx;
      const largestChild = this.val[swapIdx];
      if (current >= largestChild) break;
      this.val[swapIdx] = current;
      this.val[currentIdx] = largestChild;
      currentIdx = swapIdx;
    }
  }
}

function solution(n, k, enemy) {
  let answer = 0;

  // 일단 병사를 사용하다가 적이 더 클 경우 여태까지 거쳐온 병사들 중에 가장 큰 값에 K를 쓴다.
  let heap = new MaxHeap();

  for (let i = 0; i < enemy.length; i++) {
    const bad = enemy[i];
    n -= bad;
    heap.insert(bad);
    if (n < 0) {
      if (k > 0) {
        const max = heap.extractMax();
        n += max;
        k -= 1;
      } else {
        break;
      }
    }
    answer++;
  }
  return answer;
}

const test = [7, 3, [4, 2, 4, 5, 3, 3, 1]];
const test1 = [2, 4, [3, 3, 3, 3]];
console.log(solution(test1[0], test1[1], test1[2]));
