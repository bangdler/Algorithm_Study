// https://school.programmers.co.kr/learn/courses/30/lessons/136798

function solution(number, limit, power) {
  let answer = 0;

  const getDivisor = num => {
    const result = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i !== 0) continue;
      result.push(i);
      if (i === num / i) continue;
      result.push(num / i);
    }
    return result;
  };

  for (let i = 1; i <= number; i++) {
    const countDivisor = getDivisor(i).length;
    const weight = countDivisor > limit ? power : countDivisor;
    answer += weight;
  }
  return answer;
}

const num = 5;
const limit = 3;
const power = 2;

console.log(solution(num, limit, power));
