// https://school.programmers.co.kr/learn/courses/30/lessons/17677

function solution(str1, str2) {
  var answer = 0;
  // 2글자씩 나누고 문자열 집합 만들기
  const makeMultiset = str =>
    str
      .split('')
      .map((it, idx) => {
        if (idx === str.length) {
          return it.toUpperCase();
        } else {
          return (it + str[idx + 1]).toUpperCase();
        }
      })
      .filter(it => it.length === 2 && it.match(/([a-z]{2})/i));
  const arr1 = makeMultiset(str1);
  const arr2 = makeMultiset(str2);

  // 비교할 문자열이 없다면 유사도는 1이므로 바로 리턴한다.
  if (arr1.length === 0 && arr2.length === 0) return 65536;

  // 동일한 배열인 경우에도 유사도가 1이다.
  arr1.sort();
  arr2.sort();
  if (JSON.stringify(arr1) == JSON.stringify(arr2)) return 65536;

  // 주의할 점은 단순 unique 배열이 아니라 중복을 허용하는 배열이므로,
  // 찾은 요소를 제거해주어야 한다.
  const tempArr2 = JSON.parse(JSON.stringify(arr2));
  const intersection = arr1.reduce((acc, cur) => {
    if (tempArr2.includes(cur)) {
      const index2 = tempArr2.indexOf(cur);
      tempArr2.splice(index2, 1);
      return [...acc, cur];
    } else {
      return acc;
    }
  }, []);

  const union = arr1.length + arr2.length - intersection.length;
  return Math.floor((intersection.length / union) * 65536);
}

const tests = [
  ['FRANCE', 'france'],
  ['handshake', 'shake hands'],
  ['E=M*C^2', 'e=m*c^2'],
  ['aa1+aa2', 'AAAA12'],
];
console.log(solution(tests[3][0], tests[3][1]));
