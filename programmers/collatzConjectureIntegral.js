// https://school.programmers.co.kr/learn/courses/30/lessons/134239

// 콜라즈 수를 구하고 이전 점과 현재 점의 평균값을 별도로 기록한다.

function solution(k, ranges) {
  const answer = [];
  const collatzArr = [k];
  const avgArr = [];
  let prev = k;
  while (k > 1) {
    if (k % 2) {
      k = 3 * k + 1;
    } else {
      k = k / 2;
    }
    const avg = (prev + k) / 2;
    avgArr.push(avg);
    prev = k;
    collatzArr.push(k);
  }

  const max = collatzArr.length - 1;
  for (let [startOffset, endOffset] of ranges) {
    const startIdx = startOffset;
    const endIdx = max + endOffset;
    if (startIdx > endIdx) {
      answer.push(-1);
      continue;
    }
    let sum = 0;
    for (let i = startIdx; i < endIdx; i++) {
      sum += avgArr[i];
    }
    answer.push(sum);
  }
  return answer;
}

// 효율성을 위해 적분값 누적하기
function solution_2(k, ranges) {
  const answer = [];
  const collatzArr = [k];
  const accArr = [0];
  let prev = k;
  while (k > 1) {
    if (k % 2) {
      k = 3 * k + 1;
    } else {
      k = k / 2;
    }
    const avg = (prev + k) / 2;
    accArr.push((accArr[accArr.length - 1] ?? 0) + avg);
    prev = k;
    collatzArr.push(k);
  }
  const max = collatzArr.length - 1;
  for (let [startOffset, endOffset] of ranges) {
    const startIdx = startOffset;
    const endIdx = max + endOffset;
    if (startIdx > endIdx) {
      answer.push(-1);
      continue;
    }
    const sum = accArr[endIdx] - accArr[startIdx];
    answer.push(sum);
  }
  return answer;
}

const test = [
  5,
  [
    [0, 0],
    [0, -1],
    [2, -3],
    [3, -3],
  ],
]; // [33.0,31.5,0.0,-1.0]

console.log(solution_2(test[0], test[1]));
