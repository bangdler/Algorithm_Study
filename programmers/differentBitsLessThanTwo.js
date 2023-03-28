// https://school.programmers.co.kr/learn/courses/30/lessons/77885

/*
    규칙
    1. 짝수 : 이진수로 변경했을 때 0으로 끝나므로, 맨 마지막 0을 1로 바꿔준다. 즉 n + 1 이 정답
    2. 홀수 : 이진수로 바꾸고 맨 뒤에서부터 가장 처음으로 나오는 0을 찾아주고,0의 바로 전 자리에서 1을 더해준다. 즉, 해당 0을 1로 바꾸고 바로 전 자리의 1을 0으로 바꿔준다.
*/

function solution(numbers) {
  const answer = [];
  for (let number of numbers) {
    if (number % 2 === 0) {
      answer.push(number + 1);
      continue;
    }
    let bit = '0' + number.toString(2);
    let lastIdx = bit.lastIndexOf('0');
    const result = bit.slice(0, lastIdx) + '10' + bit.slice(lastIdx + 2);
    answer.push(parseInt(result, 2));
  }
  return answer;
}

// number 보다 큰 수 중에 (number ^ 큰 수) 연산의 결과가 2진수로 변환 시 1이 2개 이하인 경우면 반환.
// 이 방법은 숫자가 '2진수 최대값인 32비트' 이상인 경우에 앞자리부터 잘리기 때문에 실패한다.

function solution_fail(numbers) {
  const answer = [];
  for (let number of numbers) {
    number = BigInt(number);
    let cur = BigInt(number + 1);
    while (cur < 10 ** 15) {
      const diffNum = number ^ cur;
      const diffBit = diffNum.toString(2);
      const numOfOne = diffBit.match(/1/g, '');
      if (numOfOne.length && numOfOne.length <= 2) {
        answer.push(cur);
        break;
      }
      cur += 1;
    }
  }
  return answer;
}

console.log(solution([0, 2, 7]));
// [1002, 338, 1, 2, 334, 674, 347, 222, 899, 998, 122, 1019, 666, 781, 893, 422, 223, 257, 513, 129, 101]
console.log(
  solution([1001, 337, 0, 1, 333, 673, 343, 221, 898, 997, 121, 1015, 665, 779, 891, 421, 222, 256, 512, 128, 100]),
);
