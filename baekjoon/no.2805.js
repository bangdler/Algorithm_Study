const getInput = require('./utils/util');

function run() {
  const [[N, target], tree] = getInput(2805).map(it => it.split(' ').map(Number));

  let minH = 0;
  let maxH = Math.max(...tree);
  let curH;
  let totalDiff;
  while (minH <= maxH) {
    curH = Math.floor((minH + maxH) / 2);
    totalDiff = tree.reduce((acc, cur) => {
      if (cur - curH > 0) {
        return acc + (cur - curH);
      } else {
        return acc;
      }
    }, 0);

    if (totalDiff > target) {
      minH = curH + 1;
    } else if (totalDiff < target) {
      maxH = curH - 1;
    } else {
      break;
    }
  }

  if (totalDiff === target) {
    console.log(curH);
    return;
  }

  // 딱 맞는 값이 없는 경우. 적어도 target 보다 큰 값을 만족시키기 위함.
  // left 가 커져서 right 보다 큰 경우, right 가 작아져서 left 보다 작아진 경우 모두 right 값이 target 보다 큰 값.
  console.log(maxH);
}

run();
