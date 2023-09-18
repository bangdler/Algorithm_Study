// https://school.programmers.co.kr/learn/courses/30/lessons/172927
// 완전탐색
function solution(picks, minerals) {
  let answer = Infinity;

  const table = {
    diamond: [1, 5, 25],
    iron: [1, 1, 5],
    stone: [1, 1, 1],
  };

  const backtrack = (picks, minerals, curIdx, fatigue, totalPicks) => {
    if (curIdx >= minerals.length || totalPicks === 0) {
      answer = Math.min(answer, fatigue);
      return;
    }

    for (let i = 0; i < 3; i++) {
      const newPicks = [...picks];
      const num = newPicks[i];
      if (num === 0) continue;
      let nextFatigue = fatigue;
      for (let j = 0; j < 5; j++) {
        if (curIdx + j >= minerals.length) {
          break;
        }
        const curMineral = minerals[curIdx + j];
        nextFatigue += table[curMineral][i];
      }
      newPicks[i] -= 1;
      backtrack(newPicks, minerals, curIdx + 5, nextFatigue, totalPicks - 1);
    }
  };

  const totalPicks = picks.reduce((acc, cur) => acc + cur);
  backtrack(picks, minerals, 0, 0, totalPicks);
  return answer;
}

const test = [
  [0, 1, 1],
  ['diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'iron', 'iron', 'iron', 'iron', 'iron', 'diamond'],
];
const test2 = [
  [1, 1, 0],
  ['stone', 'stone', 'iron', 'stone', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond'],
];

console.log(solution(test2[0], test2[1]));
