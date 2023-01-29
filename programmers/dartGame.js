// https://school.programmers.co.kr/learn/courses/30/lessons/17682

function solution(dartResult) {
  let cur = '';
  const stack = [];

  for (let i = 0; i < dartResult.length; i++) {
    const str = dartResult[i];
    if (!str.match(/[SDT\*#]/)) {
      cur += str;
    } else if (str === 'S') {
      cur = Number(cur);
      stack.push(cur);
      cur = '';
    } else if (str === 'D') {
      cur = Number(cur) ** 2;
      stack.push(cur);
      cur = '';
    } else if (str === 'T') {
      cur = Number(cur) ** 3;
      stack.push(cur);
      cur = '';
    } else if (str === '*') {
      if (stack.length > 1) {
        stack[stack.length - 2] *= 2;
      }
      stack[stack.length - 1] *= 2;
    } else if (str === '#') {
      stack[stack.length - 1] *= -1;
    }
  }
  return stack.reduce((acc, cur) => acc + cur);
}

console.log(solution('1S2D*3T'));

// 다른 사람 풀이. 정규식을 잘 써서 코드가 간략해졌다.

function solution2(dartResult) {
  const bonus = { S: 1, D: 2, T: 3 },
    options = { '*': 2, '#': -1, undefined: 1 };

  let darts = dartResult.match(/\d.?\D/g);

  for (let i = 0; i < darts.length; i++) {
    let split = darts[i].match(/(^\d{1,})(S|D|T)(\*|#)?/),
      score = Math.pow(split[1], bonus[split[2]]) * options[split[3]];

    if (split[3] === '*' && darts[i - 1]) darts[i - 1] *= options['*'];

    darts[i] = score;
  }

  return darts.reduce((a, b) => a + b);
}
