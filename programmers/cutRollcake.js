// https://school.programmers.co.kr/learn/courses/30/lessons/132265

function solution(topping) {
  const toppingMap = new Map();
  for (let num of topping) {
    if (toppingMap.has(num)) {
      const val = toppingMap.get(num);
      val.count++;
    } else {
      toppingMap.set(num, { count: 1, visited: false });
    }
  }

  let answer = 0;
  let [A, B] = [0, toppingMap.size];
  for (let i = 0; i < topping.length; i++) {
    const val = toppingMap.get(topping[i]);
    if (val.count >= 1) {
      val.count--;
      if (val.count === 0) B--;
    }
    if (!val.visited) {
      val.visited = true;
      A++;
    }
    if (A === B) answer++;
  }

  return answer;
}

const test = [1, 2, 1, 3, 1, 4, 1, 2];
const test2 = [1, 2, 3, 1, 4];
console.log(solution(test2));
