// https://school.programmers.co.kr/learn/courses/30/lessons/42839

function isPrime(num) {
  if (num <= 1) return false;
  else if (num === 2 || num === 3) return true;
  else if (num % 2 === 0) return false;
  let sqrt = parseInt(Math.sqrt(num));
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function solution(numbers) {
  const answer = new Set();
  const numArr = numbers.split('');

  const backtrack = (start = 0, array = numArr, str = '') => {
    if (start === array.length) return;
    for (let i = start; i < array.length; i++) {
      const curStr = str + array[i];
      const num = Number(curStr);
      if (isPrime(num)) {
        answer.add(num);
      }
      [array[start], array[i]] = [array[i], array[start]];
      backtrack(start + 1, array, curStr);
      [array[start], array[i]] = [array[i], array[start]];
    }
  };

  backtrack();

  return answer.size;
}

console.log(solution('011'));
