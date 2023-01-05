// https://school.programmers.co.kr/learn/courses/30/lessons/133502

function solution(ingredient) {
  var answer = 0;
  const stack = [];
  for (let i = 0; i < ingredient.length; i++) {
    if (stack.length >= 3 && ingredient[i] === 1) {
      if (stack[stack.length - 1] === 3 && stack[stack.length - 2] === 2 && stack[stack.length - 3] === 1) {
        answer++;
        stack.pop();
        stack.pop();
        stack.pop();
      } else {
        stack.push(ingredient[i]);
      }
    } else {
      stack.push(ingredient[i]);
    }
  }
  return answer;
}

// 시간초과
function solution_fail(ingredient) {
  var answer = 0;
  let strIng = ingredient.join('');
  while (true) {
    if (!strIng.match('1231')) break;
    answer++;
    strIng = strIng.replace('1231', '');
  }
  return answer;
}

const ingredient = [2, 1, 1, 2, 3, 1, 2, 3, 1];
const ingredient2 = [1, 3, 2, 1, 2, 1, 3, 1, 2];
console.log(solution(ingredient2));
