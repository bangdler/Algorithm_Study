// https://school.programmers.co.kr/learn/courses/30/lessons/131128

function solution(X, Y) {
  const common = [];
  const arrX = X.split('').sort((a, b) => b - a);
  const arrY = Y.split('').sort((a, b) => b - a);

  let idxX = 0;
  let idxY = 0;
  while (idxY < arrY.length && idxX < arrX.length) {
    const curX = arrX[idxX];
    const curY = arrY[idxY];
    if (curX === curY) {
      idxX++;
      idxY++;
      common.push(curX);
    } else if (curX > curY) {
      idxX++;
    } else {
      idxY++;
    }
  }

  if (!common.length) return '-1';
  if (common[0] === '0') return '0';
  return common.join('');
}

const test = {
  x1: '100',
  y1: '2345',
  x2: '100',
  y2: '203045',
};

console.log(solution(test.x2, test.y2));
