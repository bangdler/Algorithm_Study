// 배열 중 양쪽 값보다 큰 경우를 peak 라 한다. peak 에 꽂을 수 있는 깃발의 최대수
// 단, k 개의 깃발을 꼽으려면 각 깃발은 최소 k 만큼 떨어져 있어야 한다.
// Flags can only be set on peaks.
// What's more, if you take K flags, then the distance between any two flags should be greater than or equal to K.
// The distance between indices P and Q is the absolute value |P − Q|.

// 시간초과
function solution_fail(A) {
  // write your code in JavaScript (Node.js 14)
  if (A.length === 1 || A.length === 2) return 0;
  const peaks = [];
  for (let i = 1; i < A.length - 1; i++) {
    const prev = A[i - 1];
    const cur = A[i];
    const next = A[i + 1];
    if (prev < cur && cur > next) {
      peaks.push(i);
    }
  }

  const peaksDistances = [];
  let maxDistances = 0;
  for (let i = 1; i < peaks.length; i++) {
    const distance = peaks[i] - peaks[i - 1];
    peaksDistances.push(distance);
    maxDistances = Math.max(maxDistances, distance);
  }
  // 가능성 있는 최대깃발수
  const maxFlag = Math.max(maxDistances, peaks.length);

  for (let i = maxFlag; i > 0; i--) {
    const flags = [peaks[0]];
    for (j = 1; j < peaks.length; j++) {
      const distance = peaks[j] - flags[flags.length - 1];
      if (distance >= i) {
        flags.push(peaks[j]);
        if (flags.length >= i) {
          return i;
        }
      }
    }
  }
}

function solution(A) {
  // write your code in JavaScript (Node.js 14)
  if (A.length <= 2) return 0;
  const peaks = [];
  for (let i = 1; i < A.length - 1; i++) {
    const prev = A[i - 1];
    const cur = A[i];
    const next = A[i + 1];
    if (prev < cur && cur > next) {
      peaks.push(i);
    }
  }

  let size = peaks.length;

  if (size <= 2) return size;

  let maxFlag = parseInt(Math.sqrt(peaks[size - 1] - peaks[0]) + 1);

  for (let i = maxFlag; i >= 2; i--) {
    let count = 1;
    let curPos = peaks[0];
    for (let j = 1; j < size; j++) {
      if (curPos + i <= peaks[j]) {
        curPos = peaks[j];
        count++;
      }
    }
    if (count >= i) return i;
  }

  return 2;
}

const A = [1, 5, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2];
const B = [3, 2, 1];
const C = [0, 0, 0, 0, 0, 1, 0, 1, 0, 1];
console.log(solution(A));
console.log(solution(B));
console.log(solution(C));
