// https://school.programmers.co.kr/learn/courses/30/lessons/135807

function solution(arrayA, arrayB) {
  const getCardNum = (A, B) => {
    // arrayA 의 가장 작은 값의 약수 배열을 구한다.

    const smallestA = A[0];
    let divisor = [];
    for (let i = 1; i <= Math.floor(Math.sqrt(smallestA)); i++) {
      if (smallestA % i === 0) {
        divisor = [...divisor, i, smallestA / i];
      }
    }

    const sortedDivisor = divisor.sort((a, b) => b - a);
    // 약수 큰 값부터 A 를 모두 나누고, B 를 모두 나누지 못하는 경우 return
    outer: for (let divisor of sortedDivisor) {
      for (let i = 0; i < A.length; i++) {
        if (A[i] % divisor !== 0 || B[i] % divisor === 0) {
          continue outer;
        }
      }
      return divisor;
    }
    return 0;
  };

  const A = getCardNum(arrayA, arrayB);
  const B = getCardNum(arrayB, arrayA);
  return Math.max(A, B);
}

const A = [10, 20];
const B = [5, 17];

console.log(solution(A, B));
