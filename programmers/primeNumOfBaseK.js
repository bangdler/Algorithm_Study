function solution(n, k) {
  const answer = [];

  // n 을 k 진수로 변환
  const baseK = n.toString(k);

  // 0 으로 구분
  const splitZero = baseK.split(0).map(Number);

  // 순회하며 소수 구분
  const isPrime = num => {
    if (!num || num === 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  splitZero.forEach(num => {
    if (isPrime(num)) {
      answer.push(num);
    }
  });

  return answer.length;
}

console.log(solution(437674, 3));
