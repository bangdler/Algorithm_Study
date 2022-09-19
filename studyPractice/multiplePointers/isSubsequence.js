//Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string.
//In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.
//
// Examples:
//
// isSubsequence('hello', 'hello world'); // true
// isSubsequence('sing', 'sting'); // true
// isSubsequence('abc', 'abracadabra'); // true
// isSubsequence('abc', 'acb'); // false (order matters)
// Your solution MUST have AT LEAST the following complexities:
//
// Time Complexity - O(N + M)
//
// Space Complexity - O(1)

function isSubsequence(str1, str2) {
  // good luck. Add any arguments you deem necessary.
  let i = 0;
  let j = 0;
  while (i < str1.length && j < str2.length) {
    if (str1[i] === str2[j]) {
      i++;
      j++;
      continue;
    } else {
      j++;
      continue;
    }
  }
  if (i !== str1.length) return false;
  return true;
}

// 재귀
function isSubsequence2(str1, str2) {
  if (str1.length === 0) return true;
  if (str2.length === 0) return false;
  if (str2[0] === str1[0]) return isSubsequence(str1.slice(1), str2.slice(1));
  return isSubsequence(str1, str2.slice(1));
}

console.log(isSubsequence('abc', 'acb'));
