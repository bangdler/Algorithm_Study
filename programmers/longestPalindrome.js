// https://school.programmers.co.kr/learn/courses/30/lessons/12904

// s 를 순회하면서 해당 글자를 기준으로 양 옆으로 팔린드롬인지 확인한다. 팔린드롬이 아닐때까지 진행 후 길이를 배열에 담는다.
// 기준 글자를 기준으로 양 옆으로 기준 글자와 같은 글자가 있으면 기준에 같은 글자를 포함한다.
// 'aabbaa' 일때 bb 를 기준으로 양 옆을 탐색한다.
function solution(s) {
  const maxArray = [];
  const checkPalindrome = (index, s) => {
    let prev = index - 1;
    let next = index + 1;
    let length = 1;
    // 기준글자 탐색
    while (prev >= 0 && s[prev] === s[index]) {
      prev -= 1;
      length += 1;
    }
    while (next < s.length && s[next] === s[index]) {
      next += 1;
      length += 1;
    }
    while (prev >= 0 && next < s.length) {
      if (s[prev] !== s[next]) break;
      prev -= 1;
      next += 1;
      length += 2;
    }
    return length;
  };
  for (let i = 0; i < s.length; i++) {
    const maxPalindromeAtIndex = checkPalindrome(i, s);
    maxArray.push(maxPalindromeAtIndex);
  }
  return Math.max(...maxArray);
}

console.log(solution('abcdcba'));
console.log(solution('aaaabbaaa'));
