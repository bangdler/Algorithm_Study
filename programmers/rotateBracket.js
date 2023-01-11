// https://school.programmers.co.kr/learn/courses/30/lessons/76502

function solution(s) {
  let answer = 0;
  const max = s.length;
  for (let i = 0; i < max; i++) {
    const queue = [];
    let j = i;
    for (j; j < max + i; j++) {
      const str = s[j];
      if (str === '(' || str === '{' || str === '[') {
        queue.push(str);
      } else if ((str === ')' || str === '}' || str === ']') && queue.length === 0) {
        break;
      } else if (str === ')' && queue.pop() !== '(') {
        break;
      } else if (str === '}' && queue.pop() !== '{') {
        break;
      } else if (str === ']' && queue.pop() !== '[') {
        break;
      }
    }
    s = s + s[i];
    if (queue.length || j !== max + i) continue;
    answer++;
  }
  return answer;
}

const s = '[](){}';
const s2 = '([{)}]';
console.log(solution(s2));
