// https://school.programmers.co.kr/learn/courses/30/lessons/131705

function solution(number) {
  let answer = 0;

  const backtrack = (arr = [], first = 0, sum = 0) => {
    if (arr.length === 3) {
      if (sum === 0) return answer++;
      return;
    }

    for (let i = first; i < number.length; i++) {
      backtrack([...arr, number[i]], i + 1, sum + number[i]);

      // 위의 방식과 같다.
      // arr.push(number[i]);
      // backtrack(arr, i + 1, sum + number[i]);
      // arr.pop();
    }
  };

  backtrack();

  return answer;
}

const num = [-2, 3, 0, 2, -5]; // 2
console.log(solution(num));
