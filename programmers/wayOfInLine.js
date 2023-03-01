// https://school.programmers.co.kr/learn/courses/30/lessons/12936

// backtracking 시간초과
function solution_fail(n, k) {
  const answer = [];
  const start = Array.from({ length: n }, (_, idx) => idx + 1);
  const backtrack = (array = start, cur = 1, way = []) => {
    if (cur > n) return answer.push(way);
    for (let i = 0; i < array.length; i++) {
      const num = array.splice(i, 1);
      backtrack(array, cur + 1, [...way, ...num]);
      array.splice(i, 0, ...num);
    }
  };
  backtrack();
  console.log(answer);
  return answer[k - 1];
}

// 전체 경우의 수를 구하고, 범위를 좁혀나가는 방법으로 풀이
// 전체 경우의 수가 sum 이라면 첫번째 자리수는 sum / n 배수 = 첫번째 배수 로 바뀐다.
// 즉 k 번째 / 첫번째 배수 의 몫에 해당하는 index 숫자가 첫번째 숫자이다. (나머지가 0 인 경우 index-1 해줘야함)
// 해당하는 숫자를 배열에서 제거한다.
// 두번째 숫자는 첫번째 배수 / n-1 의 배수 = 두번째 배수 씩 바뀐다.
// 첫번째 인덱스를 구한 나머지 / 두번째 배수 의 몫에 해당하는 index 숫자가 두번째 숫자이다.
// 이런식으로 하다가 n-1 이 1 이 되면 종료한다.
function solution(n, k) {
  const answer = [];
  if (n === 1) return [1];
  const start = Array.from({ length: n }, (_, idx) => idx + 1);
  const totalCase = start.reduce((acc, cur) => acc * cur);
  let digit = n;
  let range = totalCase / digit;
  while (digit > 1) {
    const next = k % range;
    const index = next > 0 ? Math.floor(k / range) : Math.floor(k / range) - 1;
    const cur = start.splice(index, 1);
    answer.push(...cur);
    k = next;
    digit -= 1;
    range = range / digit;
  }
  // digit 이 1 이면 start 는 하나의 숫자만 남는다.
  answer.push(start[0]);
  return answer;
}

console.log(solution(4, 5));
