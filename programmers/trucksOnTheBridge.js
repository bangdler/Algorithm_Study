// https://school.programmers.co.kr/learn/courses/30/lessons/42583

function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  const queue = Array(bridge_length).fill(0);
  let sum = 0;

  while (truck_weights.length || sum !== 0) {
    // 매 초당 변화, 다리 첫 차 무게 빼기
    time++;
    sum -= queue.shift();
    // truck 중 제일 앞에 차 추가 여부 확인
    const curTruck = truck_weights[0];
    if (sum + curTruck <= weight) {
      queue.push(curTruck);
      truck_weights.shift();
      sum += curTruck;
    } else {
      queue.push(0);
    }
  }

  return time;
}
