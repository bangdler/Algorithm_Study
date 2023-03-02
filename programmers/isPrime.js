// https://school.programmers.co.kr/learn/courses/30/lessons/12921

// 에라토스테네스의 채
// 2 ~ n 까지 배수를 거른다.
// i 일 때 i * i <= n 인 이유는, j 가 i * i 부터 거르기 때문이다.
// j 가 i * i 부터 거르는 이유는 (i-1) * i 까지는 이전의 i 에서 걸러지기 때문이다.
function solution(n) {
  const eratos = Array.from({ length: n + 1 }, (_, idx) => idx);
  eratos[1] = 0;
  for (let i = 2; i * i <= n; i++) {
    if (!eratos[i]) continue;
    for (let j = i * i; j <= n; j += i) {
      eratos[j] = 0;
    }
  }
  return eratos.filter(num => num).length;
}

console.log(solution(5));
