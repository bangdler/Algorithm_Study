const getInput = require('./utils/util');

function run() {
  const [...nlList] = getInput(1024).map(it => it.split(' ').map(Number));
  // const [[N, L]] = getInput(1024).map(it => it.split(' ').map(Number));

  // 투포인터로 풀기 - 매우 느림 2690ms
  const getResultByTwoPointer = (N, L) => {
    let pointer1 = 0;
    let pointer2 = 1;
    let max = Math.ceil(N / 2);

    let sum = 1;

    let minL = Infinity;
    let minStart;
    let minEnd;

    while (pointer1 <= pointer2 && pointer2 <= max) {
      if (sum < N) {
        pointer2++;
        sum += pointer2;
      } else if (sum === N) {
        const curL = pointer2 - pointer1 + 1;
        if (curL < L) {
          pointer2++;
          sum += pointer2;
          continue;
        }
        if (curL > 100) {
          sum -= pointer1;
          pointer1++;
          continue;
        }
        if (curL < minL) {
          minL = curL;
          minStart = pointer1;
          minEnd = pointer2;
          sum -= pointer1;
          pointer1++;
        }
      } else {
        sum -= pointer1;
        pointer1++;
      }
    }

    return minStart !== undefined ? Array.from({ length: minL }, (_, idx) => minStart + idx) : [-1];
  };

  // 수학공식으로 풀기 - 훨씬 빠름 128ms
  const getResultByMath = (N, L) => {
    for (let i = L; i < 101; i++) {
      // 길이가 i 인 수열 (x+0) ~ (x+i-1) 를 더해서 N 이 나오는 경우에 x 를 구한다. 단 0 이 나오는 경우가 있으므로 고려한다.

      const xi = N - (i * (i - 1)) / 2;
      if (xi === 0) {
        return Array.from({ length: i }, (_, idx) => idx);
      }
      const x = xi / i;
      if (Number.isInteger(x) && x > 0) {
        return Array.from({ length: i }, (_, idx) => x + idx);
      }
    }
    return [-1];
  };

  nlList.forEach(([n, l]) => {
    console.log(getResultByMath(n, l).join(' '));
  });

  // console.log(getResult(N, L).join(' '));
}

run();
