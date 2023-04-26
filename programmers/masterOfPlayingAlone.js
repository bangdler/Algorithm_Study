// https://school.programmers.co.kr/learn/courses/30/lessons/131130

function solution(cards) {
  const groups = [];
  const visited = Array(cards.length).fill(false);

  for (let i = 0; i < cards.length; i++) {
    if (visited[i]) continue;
    let cur = i;
    let count = 1;
    while (true) {
      visited[cur] = true;
      const next = cards[cur] - 1;
      if (cur === next) {
        break;
      }
      if (visited[next]) {
        break;
      }
      cur = next;
      count++;
    }
    groups.push(count);
  }
  if (groups.length === 1) return 0;

  groups.sort((a, b) => b - a);

  return groups[0] * groups[1];
}

// 굳이 이렇게 풀 필요가 없었다.
function solution2(cards) {
  const groups = [];
  // 순환하는 경우와 아닌 경우를 구분한다.
  const isGroup = Array(cards.length).fill(false);

  for (let i = 0; i < cards.length; i++) {
    if (isGroup[i]) continue;
    const group = [i];
    let groupFlag = false;
    let index = 0;
    while (index < cards.length) {
      const cur = group[index];
      const next = cards[cur] - 1;
      if (cur === next) {
        break;
      }
      if (group[0] === next) {
        groupFlag = true;
        break;
      }
      index++;
      group.push(next);
    }
    if (groupFlag) {
      for (let idx of group) {
        isGroup[idx] = true;
      }
    }
    groups.push(group.length);
  }
  if (groups.length === 1) return 0;

  groups.sort((a, b) => b - a);

  return groups[0] * groups[1];
}

console.log(solution([8, 6, 3, 7, 2, 5, 1, 4])); // 12
