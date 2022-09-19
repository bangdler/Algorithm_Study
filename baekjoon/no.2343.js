// 나중에 풀면 맞출 수 있을까?

function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 2343;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' ').map(Number));
  return input;
}

function run() {
  const [[N, M], records] = getInput();

  let start = Math.max(...records);
  let end = records.reduce((acc, cur) => acc + cur);

  let availableSizes = [];

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let sum = 0;
    let dvdArr = [];
    for (let i = 0; i < N; i++) {
      if (sum + records[i] <= mid) {
        sum += records[i];
      } else {
        dvdArr.push(sum);
        sum = records[i];
      }
    }
    dvdArr.push(sum);

    if (dvdArr.length <= M) {
      end = mid - 1;
      availableSizes.push(Math.max(...dvdArr));
    } else {
      start = mid + 1;
    }

    // 이렇게 하면 틀리는 이유는 모르겠다.
    // if(dvdArr.length < M) {
    //     end = mid - 1
    // }
    // else if(dvdArr.length === M) {
    //     end = mid - 1
    //     availableSizes.push(Math.max(...dvdArr))
    // }
    // else {
    //     start = mid + 1
    // }
  }

  console.log(Math.min(...availableSizes));
}

run();
