// 모음사전
function solution_fail(word) {
  let answer = 0;
  const vowel = ['A', 'E', 'I', 'O', 'U'];
  for (let i = 0; i < word.length; i++) {
    const str = word[i];
    const restDigit = vowel.length - (i + 1);
    const num = i === 0 ? vowel.length : vowel.length + 1;
    answer += vowel.findIndex(el => el === str) * num ** restDigit + 1;
  }
  return answer;
}

// console.log(solution('AAAE')); // 10

// 점프&순간이동 효율성 시간초과
function solution_1_fail(n) {
  let battery = 0;
  const memo = Array.from({ length: n + 1 }, el => 0);
  memo[1] = 1;
  battery++;
  memo[2] = 1;
  for (let i = 2; i <= n; i++) {
    if (memo[i] === 0 || memo[i] > memo[i - 1] + 1) {
      memo[i] = memo[i - 1] + 1;
      battery++;
    }
    if (2 * i <= n) {
      memo[2 * i] = memo[i];
    }
  }
  return memo[n];
}

function solution_1(n) {
  // 재귀 풀이
  if (n === 1) return 1;
  if (n % 2 === 0) {
    return solution(n / 2);
  } else {
    return solution(n - 1) + 1;
  }
}

// 압축
function solution_2(msg) {
  const answer = [];
  const dic = {};
  for (let i = 1; i <= 26; i++) {
    const alphabet = String.fromCharCode(i + 64);
    dic[alphabet] = i;
  }
  let num = 27;
  let start = 0;
  let str = msg[0];
  let prev;
  while (start < msg.length) {
    if (dic[str]) {
      start += 1;
      prev = str;
      str += msg[start];
      continue;
    }
    dic[str] = num++;
    str = msg[start];
    answer.push(dic[prev]);
  }
  answer.push(dic[prev]);
  return answer;
}

console.log(solution_2('KAKAO'));
