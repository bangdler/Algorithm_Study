const getInput = require('./utils/util');

const run = () => {
  const input = getInput(2346);
  const [[N], list] = input.map(it => it.split(' ').map(Number));

  const balloonList = list.map((it, idx) => [it, idx + 1]);
  const result = [];

// dequeue 방식... 메모리초과
//   const first = idxList.shift();

//   result.push(first[1]);
//   let sign = first[0] > 0 ? true : false;

//   for (let i = 0; i < Math.abs(first[0]) - 1; i++) {
//     if (sign) {
//       idxList.push(idxList.shift());
//     } else {
//       idxList.unshift(idxList.pop());
//     }
//   }
//   while (idxList.length) {
//     const next = sign ? idxList.shift() : idxList.pop();
//     if (!next) break;
//     result.push(next[1]);
//     sign = next[0] > 0 ? true : false;
//     for (let i = 0; i < Math.abs(next[0]) - 1; i++) {
//       if (sign) {
//         idxList.push(idxList.shift());
//       } else {
//         idxList.unshift(idxList.pop());
//       }
//     }
//   }

// 인덱스 조절 방식 메모리초과 찾아보니 js 로는 모두 초과라고 한다.
  let currentIndex = 0;

  while (balloonList.length > 0) {
    // 현재 풍선 터뜨리기
    const [ value, number ] = balloonList[currentIndex];
    result.push(number);
    balloonList.splice(currentIndex, 1);

    if (balloonList.length === 0) break;

    // 다음 풍선으로 이동
    if (value > 0) {
      currentIndex = (currentIndex + value - 1) % balloonList.length;
    } else {
      currentIndex = (currentIndex + value + balloonList.length) % balloonList.length;
    }
  }
  console.log(result.join(' '));
};

run();
