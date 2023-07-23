const getInput = require('./utils/util');

function run_fail() {
  const [[N], ...nums] = getInput(1780).map(it => it.split(' ').map(Number));

  const answerMap = {
    1: 0,
    0: 0,
    '-1': 0,
  };

  const check = arr => {
    if (arr.length === 1) {
      return true;
    }
    const set = new Set(arr.flat());
    return set.size === 1;
  };

  // 배열 직접 나누기 => 메모리 초과
  const divide = arr => {
    const results = [];
    const N = arr.length;

    if (N < 3) {
      return false;
    }

    const divideNum = N / 3;

    for (let i = 0; i < 3; i++) {
      const curRow = arr.slice(divideNum * i, divideNum * (i + 1));
      for (let j = 0; j < 3; j++) {
        const dividedArr = curRow.map(row => row.slice(divideNum * j, divideNum * (j + 1)));
        results.push(dividedArr);
      }
    }

    return results;
  };

  const countNum = arr => {
    if (check(arr)) {
      answerMap[arr[0][0]] += 1;
      return;
    }
    const dividedArr = divide(arr);

    if (dividedArr) {
      dividedArr.forEach(arr => countNum(arr));
    }
  };

  countNum(nums);

  // console.log(`${answerMap['-1']}\n${answerMap['0']}\n${answerMap['1']}`);
  console.log(answerMap[-1]);
  console.log(answerMap[0]);
  console.log(answerMap[1]);
}

function run() {
  const [[N], ...nums] = getInput(1780).map(it => it.split(' ').map(Number));

  const answerMap = {
    1: 0,
    0: 0,
    '-1': 0,
  };

  const countNum = (row, column, len) => {
    // 같은지 확인
    let start = nums[row][column];
    let check = true;
    for (let i = row; i < row + len; i++) {
      for (let j = column; j < column + len; j++) {
        if (start === nums[i][j]) continue;
        check = false;
        break;
      }
    }
    // 분할
    if (!check) {
      const nextLen = len / 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          countNum(row + nextLen * i, column + nextLen * j, nextLen);
        }
      }
    } else {
      answerMap[start] += 1;
    }
  };

  countNum(0, 0, N);

  console.log(answerMap[-1]);
  console.log(answerMap[0]);
  console.log(answerMap[1]);
}

run();
