function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 1931;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' ').map(Number));
  return input;
}

// 끝나는 시간 순서로 정렬한다.
// 끝나는 시간이 빠른 것부터 카운트. 끝나는 시간이 곧 현재시간이 되며 다음 값의 시작 시간과 비교한다.
// 끝나는 시간이 같은 경우 시작 시간을 기준으로 정렬을 해야한다. 이유는 [1,3] [3,3] 의 경우 1~3 회의를 먼저하면 3~3 회의를 할 수 있기 때문.
function run() {
  const [[n], ...arr] = getInput();
  const sortedArr = arr.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  let cur = 0;
  let count = 0;

  for (let [start, end] of sortedArr) {
    if (start < cur) continue;
    cur = end;
    count++;
  }

  console.log(count);
}

run();
