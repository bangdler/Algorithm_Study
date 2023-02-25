// https://school.programmers.co.kr/learn/courses/30/lessons/12923

// begin ~ end 까지 순회하면서 각 숫자에 해당하는 block number 를 구한다.
// block number 는 최대값인 10000000 이하에서 해당 숫자의 최대 약수를 구하면 된다.
// 소수인 경우 1, 1인 경우는 0 이다.
function solution(begin, end) {
  const answer = [];

  const getNumber = num => {
    if (num === 1) return 0;
    const blockMax = 10000000;
    let divisor = 1; // 기본값 소수인 경우
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
      const blockNum = num / i; //가장 작은 약수로 나눈 값 = 가장 큰 약수
      if (num % i === 0 && blockNum > blockMax) {
        divisor = Math.max(divisor, i);
      } else if (num % i === 0) {
        return blockNum;
      }
    }
    return divisor;
  };

  for (let i = begin; i < end + 1; i++) {
    answer[i - begin] = getNumber(i);
  }

  return answer;
}

console.log(solution(100000014, 100000016));
