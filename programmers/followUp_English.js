// https://school.programmers.co.kr/learn/courses/30/lessons/12981

function solution(n, words) {
  let curSpeaker = 1;
  let round = 1;
  let curWordLast = '';
  const wordDic = new Set();

  while (words.length) {
    const word = words.shift();

    if (curWordLast !== word[0] && curWordLast !== '') {
      return [curSpeaker, round];
    } else if (wordDic.has(word)) {
      return [curSpeaker, round];
    }

    round = curSpeaker === n ? round + 1 : round;
    curSpeaker = curSpeaker === n ? 1 : curSpeaker + 1;
    curWordLast = word[word.length - 1];
    wordDic.add(word);
  }

  return [0, 0];
}

const n = 3;
const words = ['tank', 'kick', 'know', 'wheel', 'land', 'dream', 'mother', 'robot', 'tank'];
const n2 = 2;
const words2 = ['hello', 'one', 'even', 'never', 'now', 'world', 'draw'];

console.log(solution(n2, words2));
