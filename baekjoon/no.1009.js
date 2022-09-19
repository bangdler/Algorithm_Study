// 1~10번까지 10대의 컴퓨터로 데이터를 순차적으로 처리할 때, a^b 개의 데이터가 들어온다면 마지막 데이터를 처리하는 컴퓨터는 몇 번일까.

function getInput() {
  const fs = require('fs');
  const input = fs.readFileSync('/dev/stdin').toString().trim().split(/\s+/);
  const [n, ...arr] = input;
  return [n, ...arr];
}

// a의 지수승을 나누었을 때 반복되는 나머지 배열을 구하고 b 를 나머지 배열 길이만큼 나누었을 때 나머지를 활용하여 나머지 배열에서 맞는 값을 찾아 넣는다.
// 처음엔 a^b 를 10으로 나눈 나머지를 배열에 담도록 하였으나, a^b 가 큰 경우 NaN 이 나오는 것 같아 변경.
function getLastComputerNum() {
  const input = getInput();
  //const input = ['1', '10', '2']
  const dataArr = input.slice(1);
  let answer = [];
  for (let i = 0; i < dataArr.length; i += 2) {
    const dataA = dataArr[i];
    const dataB = dataArr[i + 1];
    // a 를 나누어 나올 수 있는 나머지 배열
    const iteratorArr = getIterator(dataA);
    let remainderIndex = dataB % iteratorArr.length;
    if (remainderIndex === 0) {
      remainderIndex = iteratorArr.length;
    }
    const remainder = iteratorArr[remainderIndex - 1];
    // 나머지가 0 인 경우는 10번째 컴퓨터이므로 10으로 넣어준다.
    remainder === 0 ? answer.push(10) : answer.push(remainder);
  }
  answer.forEach(computerNum => console.log(computerNum));
}

// n 의 지수승을 순차적으로 나누어 반복되는 나머지 배열을 반환한다.
function getIterator(n) {
  let first = n % 10;
  let remainder;
  let iterator = [first];
  for (let i = 2; ; i++) {
    remainder = n ** i % 10;
    if (remainder === first) {
      break;
    } else {
      iterator.push(remainder);
    }
  }
  return iterator;
}

//console.log(getIterator(99))

getLastComputerNum();
