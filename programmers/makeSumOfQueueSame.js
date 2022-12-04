// https://school.programmers.co.kr/learn/courses/30/lessons/118667

function solution(queue1, queue2) {
  const maxCount = queue1.length * 3;
  let count = 0;
  const sum = nums => nums.reduce((acc, cur) => acc + cur);
  let sum1 = sum(queue1);
  let sum2 = sum(queue2);
  const avg = (sum1 + sum2) / 2;
  if (!Number.isInteger(avg)) return -1;
  let idx1 = 0;
  let idx2 = 0;
  while (count <= maxCount) {
    if (sum1 === avg) return count;
    if (sum1 > avg) {
      const a = queue1[idx1];
      sum1 -= a;
      sum2 += a;
      queue2.push(a);
      idx1++;
      count++;
    } else {
      const b = queue2[idx2];
      sum2 -= b;
      sum1 += b;
      queue1.push(b);
      idx2++;
      count++;
    }
  }
  return -1;
}

const queue1 = [3, 2, 7, 2];
const queue2 = [4, 6, 5, 1];
const queue3 = [1, 2, 1, 2];
const queue4 = [1, 10, 1, 2];
// 이 test case 덕분에 max count 가 길이 * 2 보다 커야함을 알게 되었음.
const queue5 = [3, 3, 3, 3];
const queue6 = [3, 3, 21, 3];
console.log(solution(queue5, queue6));
