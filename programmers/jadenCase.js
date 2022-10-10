// https://school.programmers.co.kr/learn/courses/30/lessons/12951

function solution(s) {
  let answer = '';

  const splitSting = s.split(' ');
  for (let i = 0; i < splitSting.length; i++) {
    let word = splitSting[i];
    if (word === '') continue;
    splitSting[i] = word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  answer = splitSting.join(' ');
  return answer;
}

console.log(solution('3people   unFollowed me'));
console.log(''.charAt(0).toUpperCase()); // 공백 출력
// console.log(''[0].toUpperCase()); // TypeError: Cannot read properties of undefined (reading 'toUpperCase')
