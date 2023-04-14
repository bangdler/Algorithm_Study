// https://school.programmers.co.kr/learn/courses/30/lessons/12971

// dp 문제
// 2종류의 dp 를 만든다. 첫번째를 포함한 dp, 두번째를 포함한 dp, 두 dp 마지막 값 중 최대값 반환
function solution(sticker) {
  if (sticker.length === 1) return sticker[0];
  if (sticker.length === 2 || sticker.length === 3) return Math.max(...sticker);

  const dp1 = Array(sticker.length - 1);
  const dp2 = Array(sticker.length);

  dp1[0] = sticker[0];
  dp1[1] = sticker[0];

  dp2[0] = 0;
  dp2[1] = sticker[1];

  for (let i = 2; i < sticker.length - 1; i++) {
    dp1[i] = Math.max(dp1[i - 2] + sticker[i], dp1[i - 1]);
  }
  for (let i = 2; i < sticker.length; i++) {
    dp2[i] = Math.max(dp2[i - 2] + sticker[i], dp2[i - 1]);
  }

  return Math.max(dp1[sticker.length - 2], dp2[sticker.length - 1]);
}

console.log(solution([14, 6, 5, 11, 3, 9, 2, 10])); //36
