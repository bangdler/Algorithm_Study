function nestedEvenSum(obj) {
  // 객체 키가 없으면 리턴
  if (!Object.keys(obj)) return;
  // 객체 키값에 짝수를 모두 더한 값을 리턴
  let sum = 0;
  for (let key in obj) {
    const value = obj[key];
    if (typeof value === 'number' && value % 2 === 0) {
      sum += value;
    } else if (typeof value === 'object') {
      sum += nestedEvenSum(value);
    }
  }
  return sum;
}

var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: 'yup',
    },
  },
};

var obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: 'car' },
};

console.log(nestedEvenSum(obj1)); // 6
console.log(nestedEvenSum(obj2)); // 10
