// https://school.programmers.co.kr/learn/courses/30/lessons/17687

function solution(n, t, m, p) {
  // 숫자 배열의 개수가 (m * t) - (m - p) 보다 많으면 p 번째인 사람이 t 개만큼 말할 수 있다.
  let numbers = '';
  let cur = 0;
  const limit = m * t - (m - p);
  while (numbers.length < limit) {
    const baseN = cur.toString(n).toUpperCase();
    numbers += baseN;
    cur++;
  }
  let answer = '';
  for (let i = p - 1; i < numbers.length; i = i + m) {
    if (answer.length >= t) break;
    answer += numbers[i];
  }
  return answer;
}

// 시간초과
function solutionFail(n, t, m, p) {
  let numbers = [];
  let cur = 0;
  const limit = m * t - (m - p);
  while (numbers.length < limit) {
    const baseN = cur.toString(n).toUpperCase();
    numbers = [...numbers, ...baseN.split('')];
    cur++;
  }
  return numbers
    .filter((num, idx) => idx % m === p - 1)
    .slice(0, t)
    .join('');
}
console.log(solution(16, 16, 2, 2));
