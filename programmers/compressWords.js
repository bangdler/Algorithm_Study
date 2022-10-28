// 문자열 압축하기
/* 문자열에서 같은 값이 연속해서 나타나는 것을 그 문자의 개수와 반복되는 값으로 표현하여 더 짧은 문자열로 줄여서 표현하는 알고리즘을 공부하고 있습니다.
   "abcabcdede"와 같은 경우, 문자를 2개 단위로 잘라서 압축하면 "abcabc2de"가 되지만, 3개 단위로 자른다면 "2abcdede"가 되어 3개 단위가 가장 짧은 압축 방법이 됩니다.
   이때 3개 단위로 자르고 마지막에 남는 문자열은 그대로 붙여주면 됩니다.
   압축할 문자열 s가 매개변수로 주어질 때, 위에 설명한 방법으로 1개 이상 단위로 문자열을 잘라 압축하여 표현한 문자열 중 가장 짧은 것의 길이를 return 하도록 solution 함수를 완성해주세요.

   문자열은 제일 앞부터 정해진 길이만큼 잘라야 합니다.
   따라서 주어진 문자열을 x / ababcdcd / ababcdcd 로 자르는 것은 불가능 합니다.
   이 경우 어떻게 문자열을 잘라도 압축되지 않으므로 가장 짧은 길이는 17이 됩니다.
*/

// 솔루션 찾아봄.
// 압축단위를 1부터 s 길이의 절반(최대압축단위)까지로 실시한다.
// 압축단위가 정해지면 단어를 순회하면서 자기 + 압축단위 의 글자와 비교하여 count 를 늘리면서 단어를 만든다.
function solution(s) {
  if (s.length === 1) return 1;

  const compressions = [];
  // 압축 단위
  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    let word = ``;
    let count = 1;
    // 앞에서부터 압축 단위만큼 잘라서 비교한다.
    for (let j = 0; j < s.length; j += i) {
      const cur = s.substring(j, j + i);
      // 범위를 넘어가면 둘다 s.length 가 되고 start = end 이면 빈 문자열을 반환
      const next = s.substring(j + i, j + i + i);
      if (cur === next) {
        count++;
      } else {
        word = count > 1 ? word + count + cur : word + cur;
        count = 1;
      }
    }
    compressions.push(word.length);
  }

  return Math.min(...compressions);
}

const str1 = 'aabbaccc';
const str2 = 'ababcdcdababcdcd';
console.log(solution(str2));
