// https://school.programmers.co.kr/learn/courses/30/lessons/42884

// 그리디
// 차량을 진입 시점이 아닌 진출 시점 기준으로 정렬한다.
// 카메라는 진출 시점에 설치한다.
// 현재 카메라 위치보다 진입 시점이 앞이라면 통과, 아니라면 진출 시점에 카메라를 새로 설치한다.
function solution(routes) {
  let answer = 0;
  let curPosition = -30000;
  const sorted = routes.sort((a, b) => a[1] - b[1]);
  for (let [inPosition, outPosition] of sorted) {
    if (inPosition <= curPosition) continue;
    answer += 1;
    curPosition = outPosition;
  }
  return answer;
}
