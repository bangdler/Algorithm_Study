// binary tree 와 다르게 부모 요소를 기준으로 자식 요소는 동등하다.
// 자식요소 2개 모두 채워야 다음 depth 로 간다. -> 비정상 구조 tree 를 만들지 않는다.
// max binary heap : 부모요소는 항상 자식요소보다 크다.
// min binary heap : 부모요소는 항상 자식요소보다 작다.
// 힙을 배열로 늘어뜨려 정렬했을 때, 한 요소의 자식요소를 찾는 방법은 아래와 같다
// 부모요소 index 가 n 일 때, left child index: 2n+1, right child index : 2n+2
// 거꾸로 하면 한 요소의 부모요소도 찾을 수 있다. 자식요소 index 가 n 일 때, 부모요소 index : Math.floor(n-1/2)
// https://cs.slides.com/colt_steele/heaps#/18

// 시간복잡도 : insert / remove 모두 O(lonN), search O(N)
// insert : n 이 2배가 되어도 부모 요소와 비교하는 횟수는 1번 증가한다.
// remove : n 이 2배가 되어도 자식 요소와 비교하는 횟수는 1번 증가한다.
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  // 힙은 배열로 나타낼 수 있고, 배열에 값을 추가한다.
  // 일단 배열 마지막에 push 한 후 bubble up (부모 요소와 비교하여 크면 -> swap, 반복) 으로 제 위치를 찾아준다.
  insert(value) {
    this.values.push(value);
    this.bubbleUp();
    return this.values;
  }

  bubbleUp() {
    let currentIdx = this.values.length - 1;
    const current = this.values[currentIdx];
    // currentIdx 가 0 이면 부모 Index 가 음수가 되므로 중지
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      const parent = this.values[parentIdx];
      if (current <= parent) break;
      // 부모 요소보다 현재값이 클 경우 swap
      this.values[currentIdx] = parent;
      this.values[parentIdx] = current;
      currentIdx = parentIdx;
    }
  }

  // maxBinaryHeap 에서는 주로 가장 큰 값인 root 를 제거하여 사용하곤 한다.
  // 1. root 값과 배열 마지막 값을 swap 하고, root 값을 제거한다.
  // 2. swap 한 값부터 sink down (자식요소 비교하여 현재보다 클 경우 swap, left & right 모두 클 경우 가장 큰 값을 swap) 한다.
  extractMax() {
    // heap 길이가 0 이었을 경우 undefined, 1 이었을 경우 max 만 반환한다.
    if (this.values.length === 0) return undefined;
    if (this.values.length === 1) return this.values.pop();

    // max(root) 와 마지막 값 swap 후 max 를 제거
    const max = this.values[0];
    const end = this.values.pop();
    this.values[0] = end;

    // 자식요소 left, right 비교하며 swap
    this.sinkDown2();

    return max;
  }

  // 초기 version
  sinkDown1() {
    let currentIdx = 0;
    const current = this.values[currentIdx];
    // 자식요소를 가지고 있는 최대 Index (= left child 를 무조건 가지는)
    const maxCurrentIdx = Math.floor((this.values.length - 2) / 2);

    while (currentIdx <= maxCurrentIdx) {
      const leftIdx = 2 * currentIdx + 1;
      const rightIdx = 2 * currentIdx + 2;
      const left = this.values[leftIdx];
      const right = this.values[rightIdx];
      // right 가 undefined 인 경우가 있다.
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

  sinkDown2() {
    let currentIdx = 0;
    const current = this.values[currentIdx];
    // 자식요소를 가지고 있는 최대 Index (= left child 를 무조건 가지는)
    const maxCurrentIdx = Math.floor((this.values.length - 2) / 2);

    while (currentIdx <= maxCurrentIdx) {
      const leftIdx = 2 * currentIdx + 1;
      const rightIdx = 2 * currentIdx + 2;
      const left = this.values[leftIdx];
      const right = this.values[rightIdx];
      // maxCurrentIdx 는 left 의 존재만 보장하기 때문에 right 가 undefined 인 경우가 있다.
      // 바꿀 자식요소(=가장 큰 값)에 해당하는 swapIndex 를 먼저 지정하고 swap 한다.
      const swapIdx = right ? (left > right ? leftIdx : rightIdx) : leftIdx;
      const largestChild = this.values[swapIdx];
      if (current >= largestChild) break;
      this.values[swapIdx] = current;
      this.values[currentIdx] = largestChild;
      currentIdx = swapIdx;
    }
  }
}

const heap = new MaxBinaryHeap();

console.log(heap.insert(10));
heap.insert(15);
heap.insert(77);
heap.insert(76);
heap.insert(40);
heap.insert(90);
console.log(heap.insert(87));
console.log(heap.insert(60));
console.log(heap.extractMax(), heap.values);
console.log(heap.extractMax(), heap.values);
console.log(heap.extractMax(), heap.values);
console.log(heap.extractMax(), heap.values);
console.log(heap.extractMax(), heap.values);
console.log(heap.extractMax(), heap.values);
console.log(heap.extractMax(), heap.values);
console.log(heap.extractMax(), heap.values);
console.log(heap.extractMax(), heap.values);
