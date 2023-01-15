// https://school.programmers.co.kr/learn/courses/30/lessons/42889

function solution(N, stages) {
  const fail = Array.from({ length: N + 1 }, (_, idx) => [idx + 1, 0]);
  // 큰거부터
  const sorted = stages.sort((a, b) => b - a);
  let prev = sorted[0];
  let num = 0;
  // prev 와 같은 값이면 num 을 올려주고, 다른값이면 실패율에 반영해준다.
  for (let i = 0; i < sorted.length; i++) {
    const cur = sorted[i];
    if (prev === cur) {
      num++;
    } else {
      fail[prev - 1] = [prev, num / i];
      // 초기화
      prev = cur;
      num = 1;
    }
    // 마지막 fail 업데이트
    if (i === sorted.length - 1) {
      fail[prev - 1] = [prev, num / (i + 1)];
    }
  }
  // 마지막 단계 빼주기
  fail.pop();
  // 정렬 후 stages 만 추출
  const failStages = fail.sort((a, b) => b[1] - a[1]).map(x => x[0]);
  return failStages;
}

const test = [5, [2, 1, 2, 6, 2, 4, 3, 3]];

console.log(solution(test[0], test[1]));
