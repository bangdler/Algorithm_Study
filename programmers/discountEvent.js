// https://school.programmers.co.kr/learn/courses/30/lessons/131127

function solution(want, number, discount) {
  let answer = 0;

  const check = (wantObj, i) => {
    for (let k = i; k < i + 10; k++) {
      if (!wantObj[discount[k]]) {
        return 0;
      }
      wantObj[discount[k]]--;
    }
    return 1;
  };

  for (let i = 0; i < discount.length; i++) {
    const wantObj = {};
    want.forEach((it, idx) => (wantObj[it] = number[idx]));

    answer += check(wantObj, i);
  }
  return answer;
}

// 슬라이딩 윈도우로 풀어보려고 했지만 틀림 ㅠㅠ 반례를 못찾겠다.
function solution_fail(want, number, discount) {
  let answer = 0;

  // 이름 - 배열인덱스 로 구성된 객체
  const wantIndex = {};
  want.forEach((it, idx) => (wantIndex[it] = idx));

  // 최대 개수 이내에서 발견된 위치를 배열로 가진다.
  // { 'apple' : [0, 1, 4] ...}
  let seen = {};

  // [0, 0, 0] 현재 개수
  let curNums = Array(number.length).fill(0);

  let discountStartIdx = 0;

  for (let i = 0; i < discount.length; i++) {
    const cur = discount[i];
    // 없는 항목일 경우 초기화
    if (wantIndex[cur] === undefined) {
      discountStartIdx = i + 1;
      curNums = Array(number.length).fill(0);
      seen = {};
      continue;
    }
    // 있는 항목일 경우 개수 비교
    const idx = wantIndex[cur];

    // 중복 항목일 경우, 시작점을 이동시킨다. 단 이전에 발견된 위치와 현재 discountStart 위치 중 큰 값에 다음값으로 한다.
    if (curNums[idx] >= number[idx]) {
      const seenIdx = seen[cur].shift();
      discountStartIdx = Math.max(seenIdx, discountStartIdx) + 1;
      seen[cur].push(idx);
    }
    // 중복 아닐 경우
    else {
      curNums[idx] += 1;
      if (!seen[cur]) {
        seen[cur] = [idx];
      } else {
        seen[cur].push(i);
      }
    }

    // 현재 지점에서 시작점까지 10개면 count ++
    if (i - discountStartIdx + 1 === 10) {
      answer++;
    }
  }
  return answer;
}

const want = ['banana', 'apple', 'rice', 'pork', 'pot'];
const number = [3, 2, 2, 2, 1];
const discount = [
  'chicken',
  'apple',
  'apple',
  'banana',
  'rice',
  'apple',
  'pork',
  'banana',
  'pork',
  'rice',
  'pot',
  'banana',
  'apple',
  'banana',
];

console.log(solution(want, number, discount));
