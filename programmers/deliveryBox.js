// https://school.programmers.co.kr/learn/courses/30/lessons/131704

// 컨베이어벨트 = queue, 보조컨베이어 = stack
// 현재 택배 값 > 현재 컨베이어벨트 값 => 보조컨베이어 벨트에 push
// 현재 컨베이어벨트 값 > 현재 택배 순서 => 보조컨베이어 벨트를 뒤에서부터 확인. 없다면 종료
// 현재 택배 값 = 현재 컨베이어벨트 값 => answer 에 넣기
// 보조컨베이어벨트 = 현재 택배 값 => answer 에 넣기
function solution(order) {
  const answer = [];
  const queue = Array.from({ length: order.length }, (_, idx) => idx + 1);
  const stack = [];
  let queueIdx = 0;
  let curIdx = 0;
  while (curIdx < order.length) {
    const cur = order[curIdx];
    if (cur > queue[queueIdx]) {
      stack.push(queue[queueIdx]);
      queueIdx++;
      continue;
    }
    if (cur === queue[queueIdx]) {
      answer.push(queue[queueIdx]);
      queueIdx++;
      curIdx++;
      continue;
    }
    if (cur === stack[stack.length - 1]) {
      answer.push(stack.pop());
      curIdx++;
      continue;
    }
    break;
  }
  return answer.length;
}
//
// console.log(solution([5, 4, 3, 2, 1]));
// console.log(solution([4, 3, 1, 2, 5]));
// console.log(solution([1, 2, 4, 3, 5]));
// console.log(solution([3, 1, 2, 5, 4]));
// console.log(solution([2, 1, 3, 5, 4]));
console.log(solution([3, 5, 4, 2, 1]));
