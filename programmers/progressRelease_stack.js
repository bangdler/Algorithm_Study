function solution(progresses, speeds) {
  let answer = [];

  let requiredDays = progresses.map((progress, idx) => Math.ceil((100 - progress) / speeds[idx]));
  let max = requiredDays.shift();
  let count = 1;
  while (requiredDays.length) {
    let cur = requiredDays.shift();
    if (cur > max) {
      answer.push(count);
      max = cur;
      count = 1;
    } else {
      count++;
    }
  }
  answer.push(count);

  return answer;
}

const test_progresses = [93, 30, 55];
const test_speeds = [1, 30, 5];

console.log(solution(test_progresses, test_speeds));
