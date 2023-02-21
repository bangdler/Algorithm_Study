// https://school.programmers.co.kr/learn/courses/30/lessons/12911

// 2진수로 바꾸고 1씩 더하면서 1의 자리를 세어주는 방법
function solution(n) {
  const originNum = n.toString(2).match(/1/g).length;
  while (true) {
    n++;
    if (originNum === n.toString(2).match(/1/g).length) return n;
  }
}

console.log(solution(78));
