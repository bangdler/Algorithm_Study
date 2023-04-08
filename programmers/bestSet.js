// https://school.programmers.co.kr/learn/courses/30/lessons/12938

// n 으로 s 를 나눴을 때 나눈 값으로 구성한 경우가 곱했을 때 제일 크다. 단 떨어지지 않는 경우 내림 수에서 모자란 부분만 높임 수로 변경
// ex: 4, 20 => {5,5,5,5} , 5, 7 => {1, 1, 1, 2, 2}
function solution(n, s) {
  const answer = [];
  if (s / n === 0 || Math.floor(s / n) === 0) {
    return [-1];
  }
  if (s % n) {
    const lower = Math.floor(s / n);
    const higher = lower + 1;
    const numOfHigher = s - n * lower;
    for (let i = 0; i < n - numOfHigher; i++) {
      answer.push(lower);
    }
    for (let i = 0; i < numOfHigher; i++) {
      answer.push(higher);
    }
  } else {
    return Array(n).fill(s / n);
  }
  return answer;
}

const test = [2, 9]; //[4, 5]
const test1 = [2, 1]; //	[-1]
console.log(solution(test1[0], test1[1]));
