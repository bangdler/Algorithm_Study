// https://school.programmers.co.kr/learn/courses/30/lessons/150369

// 최대한의 개수로 먼 곳부터 배달하고, 돌아오면서 최대한 회수한다. => 그리디
// 배열을 뒤집어 생각한다.
// 인덱스에 필요한 배달, 수거 개수를 더한다. 개수가 0이 될 때까지 cap 만큼 빼주면서 거리를 더한다.
// 인덱스의 배달, 수거 개수가 모두 0이 되면 다음으로 넘어간다.
// 하나만 음수가 된 경우는 이 다음번에 배달, 수거할 몫을 미리 사용한다고 보면 된다.
function solution(cap, n, deliveries, pickups) {
  let answer = 0;
  const reverseDeliveries = deliveries.reverse();
  const reversePickups = pickups.reverse();
  let curDelivery = 0;
  let curPickups = 0;

  for (let i = 0; i < n; i++) {
    curDelivery += reverseDeliveries[i];
    curPickups += reversePickups[i];
    while (curDelivery > 0 || curPickups > 0) {
      curDelivery -= cap;
      curPickups -= cap;
      answer += (n - i) * 2;
    }
  }
  return answer;
}

const test = [4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]]; //16
const test1 = [2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]];

console.log(solution(test1[0], test1[1], test1[2], test1[3]));
