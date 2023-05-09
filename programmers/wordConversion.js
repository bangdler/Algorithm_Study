// https://school.programmers.co.kr/learn/courses/30/lessons/43163

// bfs
// 전체 단어를 순회하며 현재 단어와 한글자 다른 단어를 queue 에 넣는다.
// visited 에 해당 단어의 depth 를 기록한다.
// queue 에서 하나씩 꺼내어 target 과 같은지 확인한다.

function solution(begin, target, words) {
  if (begin === target) return 0;
  const queue = [begin];
  const visited = { [begin]: 0 };
  const isOneStrDiff = (a, b) => {
    let num = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        num++;
      }
    }
    return num === 1;
  };

  while (queue.length) {
    const cur = queue.shift();
    if (cur === target) return visited[cur];
    for (let word of words) {
      if (visited[word]) continue;
      if (isOneStrDiff(cur, word)) {
        queue.push(word);
        visited[word] = visited[cur] + 1;
      }
    }
  }

  return 0;
}

const test = ['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']];

console.log(solution(test[0], test[1], test[2]));
