// https://school.programmers.co.kr/learn/courses/30/lessons/64062

// 이분탐색
// 징검다리를 건널 수 있는 인원의 최소값 1 ~ 최대값 2억 중 적정값을 찾기
function solution(stones, k) {
  let left = 1;
  let right = 200000000;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // 별도 배열을 만들어 mid 값을 뺀 경우 효율성 통과 못함
    // const copy = stones.slice();
    // for (let i = 0; i < copy.length; i++) {
    //   copy[i] -= mid;
    // }
    let numOfZero = 0;
    for (let num of stones) {
      numOfZero = num - mid > 0 ? 0 : numOfZero + 1;
      if (numOfZero === k) {
        break;
      }
    }
    if (numOfZero === k) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

const stones = [2, 4, 5, 3, 2, 1, 4, 2, 5, 1];
const k = 3;

console.log(solution(stones, k));
