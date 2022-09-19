function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 2493;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' ').map(Number));
  return input;
}

// 앞에서부터 stack 과 비교하고, [index, height] 형태로 넣는다.
// 현재 값이 stack 값보다 크면 stack 를 pop 한다. 작은 값이 나올때까지 pop 한다.
// stack 이 0이 되면 넣고 다음으로 넘어간다. (신호가 닿지 않는 탑이므로 0)
// stack 이 0이 되기 전에 작은 값이 나오면 answer[현재 인덱스] 에 stack 의 인덱스 값 + 1(신호가 닿은 탑 위치)을 넣어준다.
// 작으면 answer[현재 인덱스] 에 stack 의 인덱스 값 + 1(신호가 닿은 탑 위치)을 넣어준다. stack 에 push 한다.
function run3() {
  const [[N], ...[towers]] = getInput();
  let answer = Array.from({ length: N }).fill(0);

  let stack = [{ index: 0, height: towers[0] }];
  for (let i = 1; i < towers.length; i++) {
    const cur = { index: i, height: towers[i] };
    let lastQue = stack[stack.length - 1];
    if (lastQue.height < cur.height) {
      while (stack.length !== 0 && stack[stack.length - 1].height < cur.height) {
        stack.pop();
      }
      if (stack.length === 0) {
        stack.push(cur);
        continue;
      }
      lastQue = stack[stack.length - 1];
    }
    if (lastQue.height >= cur.height) {
      stack.push(cur);
      answer[i] = lastQue.index + 1;
    }
  }
  console.log(answer.join(' '));
}

// 앞에서부터 탐색하면서 값을 배열에 넣는다. 넣은 배열에서 뒤에서부터 탐색해서 본인보다 큰 값의 인덱스를 찾는다.
// 시간초과
function run2() {
  const [[N], ...[towers]] = getInput();
  let answer = Array.from({ length: N }).fill(0);

  let searched = [];
  for (let i = 0; i < towers.length; i++) {
    for (let j = searched.length - 1; j >= 0; j--) {
      if (searched[j] >= towers[i]) {
        answer[i] = j + 1;
        break;
      }
    }
    searched.push(towers[i]);
  }
  console.log(answer.join(' '));
}

// 시간 초과
function run() {
  const [[N], ...[towers]] = getInput();
  let answer = Array.from({ length: N }).fill(0);
  while (towers.length > 0) {
    const lastIdx = towers.length - 1;
    const curTower = towers.pop();
    for (let i = towers.length - 1; i >= 0; i--) {
      if (curTower <= towers[i]) {
        answer[lastIdx] = i + 1;
        break;
      }
    }
  }
  console.log(answer.join(' '));
}

run3();
