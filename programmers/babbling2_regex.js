// https://school.programmers.co.kr/learn/courses/30/lessons/133499

function solution(babbling) {
  var answer = 0;
  // 같은 단어가 연속으로 반복되는 경우는 제외 필요함.
  // 왜 /(aya|ye|woo|ma){2,}/ 이 방식은 or 에 포함된 단어가 연속한 경우이고, 아래 방식은 찾은 단어를 반복한 경우를 나타내는지 모르겠다.
  const regexp1 = /(aya|ye|woo|ma)\1+/;

  // 해당 단어로만 이루어진 경우
  const regexp2 = /^(aya|ye|woo|ma)+$/;

  // 연속하지 않으면서, 해당 단어로만 이루어진 경우
  for (let word of babbling) {
    if (!regexp1.test(word) && regexp2.test(word)) {
      answer++;
    }
  }
  return answer;
}

// 다른 사람 풀이
// function solution(babbling) {
//   let reg = new RegExp("^(aya(?!(aya))|ye(?!(ye))|woo(?!(woo))|ma(?!(ma)))+$");
//   return babbling.reduce((acc, cur) => {
//     return reg.test(cur) ? acc + 1 : acc;
//   }, 0);
// }

const babbling = ['ayaye', 'uuu', 'yeye', 'yemawoo', 'ayaayaa'];

console.log(solution(babbling));
