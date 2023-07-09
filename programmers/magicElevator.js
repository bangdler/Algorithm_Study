// https://school.programmers.co.kr/learn/courses/30/lessons/148653

// 숫자배열을 뒤에서부터 보면서 하나씩 최선의 선택하는 방식 -> 아래 재귀보다 속도 더 빠름
// 현재값이 5인 경우, 올라가느냐 내려가느냐는 앞의 자리 숫자에 따라 바뀐다.
// 올라가는 경우, 앞자리 수에 1을 더해줘야하며, 앞자리가 10이 되는 경우에 대한 처리가 필요해서 복잡해진다.
function solution(storey) {
  var answer = 0;
  const nums = String(storey).split('').map(Number);
  for (let i = nums.length - 1; i >= 0; i--) {
    const cur = nums[i];
    if (cur > 5) {
      answer += 10 - cur;
      if (i === 0) {
        answer += 1;
      } else {
        nums[i - 1] += 1;
      }
    } else if (cur === 5) {
      if (i !== 0 && nums[i - 1] >= 5) {
        nums[i - 1] += 1;
      }
      answer += cur;
    } else if (cur === 10) {
      if (i === 0) {
        answer += 1;
      } else {
        nums[i - 1] += 1;
      }
    } else {
      answer += cur;
    }
  }
  return answer;
}

// 재귀 풀이 (최소값(밑으로 간 경우, 위로 간 경우))
function solution_recursive(storey) {
  if (storey < 5) return storey;
  const r = storey % 10;
  const m = (storey - r) / 10;
  return Math.min(r + solution(m), 10 - r + solution(m + 1));
}

console.log(solution(2554)); // 16
