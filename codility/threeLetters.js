// A, B 숫자만큼 a, b 를 사용하여 단어 만들기. 단 aaa, bbb 가 오면 안된다.

// brute force 타임아웃
function solution_fail(A, B) {
  // write your code in JavaScript (Node.js 14)
  const strings = [];
  const addString = (string, A, B) => {
    if (string.match(/aaa/g) || string.match(/bbb/g)) return;
    if (A === 0 && B === 0) return strings.push(string);
    if (A > 0) {
      addString(string + 'a', A - 1, B);
    }
    if (B > 0) {
      addString(string + 'b', A, B - 1);
    }
  };
  addString('', A, B);
  return strings[0];
}

// If occurrence(a) > occurrence(b) then append “aab”
// If occurrence(b) > occurrence(a) then append “bba”
// If occurrence(a) = occurrence(b) then append “ab”
// Since we reduce the difference between the occurrences of ‘a’ and ‘b’by at most 1 in each iteration
// so “bba” and “aab” are guaranteed not to be followed by “aab” and “bba” respectively.
function solution(A, B) {
  let string = '';
  while (A > 0 || B > 0) {
    if (A > B) {
      if (A > 0) {
        string += 'a';
        A--;
      }
      if (A > 0) {
        string += 'a';
        A--;
      }
      if (B > 0) {
        string += 'b';
        B--;
      }
    } else if (B > A) {
      if (B > 0) {
        string += 'b';
        B--;
      }
      if (B > 0) {
        string += 'b';
        B--;
      }
      if (A > 0) {
        string += 'a';
        A--;
      }
    } else {
      if (A > 0) {
        string += 'a';
        A--;
      }
      if (B > 0) {
        string += 'b';
        B--;
      }
    }
  }
  return string;
}
console.log(solution(5, 2));
