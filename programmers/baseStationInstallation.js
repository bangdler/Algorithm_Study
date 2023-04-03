// https://school.programmers.co.kr/learn/courses/30/lessons/12979

function solution(n, stations, w) {
  let answer = 0;
  let start = 1;
  let end;
  const length = 2 * w + 1;
  for (let num of stations) {
    end = num - w - 1;
    const distance = end - start + 1;
    const count = Math.ceil(distance / length);
    answer += count;
    start = num + w + 1;
  }

  if (start <= n) {
    const distance = n - start + 1;
    const count = Math.ceil(distance / length);
    answer += count;
  }
  return answer;
}

const test = [11, [4, 11], 1]; // 3
const test1 = [16, [9], 2]; //3

console.log(solution(test[0], test[1], test[2]));
console.log(solution(test1[0], test1[1], test1[2]));
