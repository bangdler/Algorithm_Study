// https://school.programmers.co.kr/learn/courses/30/lessons/12920

// 이분탐색을 통한 풀이법 참고함.
// https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.4-%EC%84%A0%EC%9E%85-%EC%84%A0%EC%B6%9C-%EC%8A%A4%EC%BC%80%EC%A4%84%EB%A7%81-JS
// 시간에 따라 몇개의 작업을 했는지 구할 수 있다. n 개의 작업을 수행하는 최소 시간을 이분탐색을 통해 구한다.
// 최소 시간 - 1 의 시간까지 진행한 작업을 n개 작업에서 제외하고, 나머지 작업을 최소 시간에 진행할 수 있는 마지막 코어를 찾는다.
// 어떤 시간 H가 주어졌을 때, cores의 요소가 H의 약수에 해당하는 경우 해당 요소는 새로운 작업이 할당됨. => H 시간에 가능한 작업 수를 구할 수 있다.
// 1시간부터 max 시간까지 이분탐색을 통해 n 개의 작업을 할 수 있는 H 시간을 구한다.

function solution(n, cores) {
  let min = 1;
  let max = (Math.max(...cores) * n) / cores.length;

  while (min < max) {
    let mid = Math.floor((min + max) / 2);
    // 초기 cores 만큼 작업 수행
    let total = cores.length;
    for (let core of cores) {
      total += Math.floor(mid / core);
    }
    if (total >= n) {
      max = mid;
    } else {
      min = mid + 1;
    }
  }

  let restWork = n - cores.length;
  // max-1 시간까지 작업량을 제거해준다.
  for (let core of cores) {
    restWork -= Math.floor((max - 1) / core);
  }
  // max 시간에 작업이 가능한 코어 중에 마지막 코어를 찾는다.
  for (let i = 0; i < cores.length; i++) {
    if (max % cores[i] === 0) {
      restWork -= 1;
      if (restWork === 0) {
        return i + 1;
      }
    }
  }
}

// 우선순위큐 사용 풀이 - 효율성테스트 마지막 3케이스 시간 초과
function solution_fail(n, cores) {
  const queue = new PriorityQueue();
  cores.forEach((time, num) => queue.enqueue(num + 1, 0));
  while (n > 0) {
    const cur = queue.dequeue();
    if (n === 1) {
      return cur.value;
    }
    n--;
    queue.enqueue(cur.value, cur.priority + cores[cur.value - 1]);
  }
}

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

// enqueue, dequeue 조건 변경
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    this.queue.push(newNode);
    this.bubbleUp();
    return this.queue;
  }

  bubbleUp() {
    let currentIdx = this.queue.length - 1;
    const current = this.queue[currentIdx];

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      const parent = this.queue[parentIdx];
      if (current.priority > parent.priority) break;
      if (current.priority === parent.priority && current.value >= parent.value) break;
      this.queue[currentIdx] = parent;
      this.queue[parentIdx] = current;
      currentIdx = parentIdx;
    }
  }

  dequeue() {
    if (!this.queue.length) return undefined;
    if (this.queue.length === 1) return this.queue.pop();

    const min = this.queue[0];
    const end = this.queue.pop();
    this.queue[0] = end;

    this.sinkDown();

    return min;
  }

  sinkDown() {
    let currentIdx = 0;
    const current = this.queue[currentIdx];
    const maxCurrentIdx = Math.floor((this.queue.length - 2) / 2);

    while (currentIdx <= maxCurrentIdx) {
      const leftIdx = currentIdx * 2 + 1;
      const rightIdx = currentIdx * 2 + 2;
      const left = this.queue[leftIdx];
      const right = this.queue[rightIdx];
      const swapIdx = right
        ? left.priority < right.priority
          ? leftIdx
          : left.priority === right.priority && left.value < right.value
          ? leftIdx
          : rightIdx
        : leftIdx;
      const minChild = this.queue[swapIdx];

      if (current.priority < minChild.priority) break;
      if (current.priority === minChild.priority && current.value <= minChild.value) break;
      this.queue[currentIdx] = minChild;
      this.queue[swapIdx] = current;
      currentIdx = swapIdx;
    }
  }
}

console.log(solution(6, [1, 2, 3])); // 2
