// https://school.programmers.co.kr/learn/courses/30/lessons/12953
// N개의 최소공배수

// 최소공배수를 구하는 방법 : 유클리드 호제법을 통한 최대공약수를 구하고, 두수의 곱 / 최대공약수 = 최소공배수
// N개의 최소공배수를 구하는 방법 : 배열을 순회하며 두 수의 최소공배수를 구하고, 구해진 최소공배수와 다음 숫자의 최소공배수를 구하며 업데이트
function solution(arr) {
  let answer = 1;

  // 최대공약수 구하기
  const gcd = (a, b) => {
    while (b > 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // 최소공배수 구하기
  const lcm = (a, b) => (a * b) / gcd(a, b);

  // N개의 최소공배수 구하기
  for (let num of arr) {
    answer = lcm(answer, num);
  }

  return answer;
}
