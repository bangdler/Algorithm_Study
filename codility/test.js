function emojify(message, emoji) {
  //You can use console.log for debugging
  const INVALID_STRING = 'invalid string';
  if (message === undefined || message === null) return INVALID_STRING;
  const stringifyMessage = message.toString();
  if (stringifyMessage.match(/\s/g)) {
    return stringifyMessage.replace(/\s/g, emoji);
  }
  return INVALID_STRING;
}

// console.log(emojify(false, 'e'));
// console.log(emojify('    ', 'e'));

function cmp(a, b) {
  return a - b;
}

function solution(A, B) {
  var n = A.length;
  var m = B.length;
  A.sort(cmp);
  B.sort(cmp);
  var i = 0;
  for (var k = 0; k < n; ) {
    if (i < m - 1 && B[i] < A[k]) i += 1;
    if (B[i] > A[k]) k += 1;
    if (A[k] === B[i]) return A[k];
  }
  // 고치기전 부분 (2줄 고치기)
  // for (var k = 0; k < n; k++) {
  //   if (i < m - 1 && B[i] < A[k]) {
  //     i += 1;
  //     k -= 1;
  //   }
  //   if (A[k] === B[i]) return A[k];
  // }
  return -1;
}

const B = [1, 3, 2, 1];
const A = [4, 2, 5, 3, 2];

// console.log(solution(A, B));

function solution(N) {
  // write your code in JavaScript (Node.js 14)
  let stringNum = '';
  const numArr = N.toString().split('');
  const fiveArr = numArr.filter(x => x === '5');

  if (fiveArr.length === 1) {
    return Number(numArr.join('').replace(/5/, ''));
  }

  if (N >= 0) {
    for (let i = 0; i < numArr.length; i++) {
      if (numArr[i] !== '5') {
        stringNum += numArr[i];
        continue;
      }
      if (stringNum.match(/5/)) {
        const cur = Number(stringNum);
        const compare = Number(stringNum.replace(/5/, '') + '5');
        if (compare > cur) {
          stringNum = compare;
        }
      } else {
        stringNum += numArr[i];
      }
    }
  } else {
    for (let i = 1; i < numArr.length; i++) {
      if (numArr[i] !== '5') {
        stringNum += numArr[i];
        continue;
      }
      if (stringNum.match(/5/)) {
        const cur = Number(stringNum);
        const compare = Number(stringNum.replace(/5/, '') + '5');
        if (compare < cur) {
          stringNum = compare;
        }
      } else {
        stringNum += numArr[i];
      }
    }
    stringNum = `-${stringNum}`;
  }
  return Number(stringNum);
}

console.log(solution(-99995));
