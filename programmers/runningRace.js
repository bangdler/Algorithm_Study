// https://school.programmers.co.kr/learn/courses/30/lessons/178871

function solution(players, callings) {
  const playerIdx = {};
  for (let i = 0; i < players.length; i++) {
    const name = players[i];
    if (!playerIdx[name]) {
      playerIdx[name] = i;
    }
  }
  for (let call of callings) {
    const curIdx = playerIdx[call];
    const prevIdx = curIdx - 1;
    const temp = players[prevIdx];
    players[prevIdx] = players[curIdx];
    players[curIdx] = temp;
    playerIdx[call] -= 1;
    playerIdx[temp] += 1;
  }
  return players;
}

const test = [
  ['mumu', 'soe', 'poe', 'kai', 'mine'],
  ['kai', 'kai', 'mine', 'mine'],
];

console.log(solution(test[0], test[1]));
