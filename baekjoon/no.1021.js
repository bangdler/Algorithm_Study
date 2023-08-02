const getInput = require('./utils/util');

function run() {
  const [[N, M], [...nums]] = getInput(1021).map(it => it.split(' ').map(Number));

  let pointer = 1;
  const pass = [];
  let answer = 0;
  for (let num of nums) {
    // 왼쪽으로 갈 지 오른쪽으로 갈 지 계산
    let left;
    let right;

    if (pointer < num) {
      const betweenNum = pass.filter(it => it > pointer && it < num).length;
      right = num - pointer - betweenNum;
      left = N - num + pointer - (pass.length - betweenNum);
    } else if (pointer > num) {
      const betweenNum = pass.filter(it => it < pointer && it > num).length;
      left = pointer - num - betweenNum;
      right = N - pointer + num - (pass.length - betweenNum);
    }

    if (left && right) {
      pointer = num;
      answer += Math.min(left, right);
    }

    if (pointer === num) {
      pass.push(pointer);
      while (pass.length < M) {
        const next = pointer === N ? 1 : pointer + 1;
        if (pass.includes(next)) {
          pointer = next;
        } else {
          pointer = next;
          break;
        }
      }
    }
  }

  console.log(answer);
}

run();
