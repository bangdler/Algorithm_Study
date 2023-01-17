// https://school.programmers.co.kr/learn/courses/30/lessons/84512

function solution(word) {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const output = [];

  const makeWord = (n = 0, str = '') => {
    if (n > 5) return;
    if (n > 0) output.push(str);
    for (let i = 0; i < vowels.length; i++) {
      makeWord(n + 1, str + vowels[i]);
    }
  };
  makeWord();
  return output.indexOf(word) + 1;
}

// 다른 사람 풀이 - 등비수열의 합을 이용하여 구하기
function solution2(word) {
  return word.split('').reduce((a, b, i) => a + ('AEIOU'.indexOf(b) * (5 ** (5 - i) - 1)) / 4 + 1, 0);
}

console.log(solution('AAAE'));
