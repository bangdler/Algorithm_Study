//Write a function called findLongestSubstring, which accepts a string and returns the length of the longest substring with all distinct characters.
//
// findLongestSubstring('') // 0
// findLongestSubstring('rithmschool') // 7
// findLongestSubstring('thisisawesome') // 6
// findLongestSubstring('thecatinthehat') // 7
// findLongestSubstring('bbbbbb') // 1
// findLongestSubstring('longestsubstring') // 8
// findLongestSubstring('thisishowwedoit') // 6
// Time Complexity - O(n)

// 해설을 보고도 이해하기가 어려웠다.
function findLongestSubstring(word) {
  let start = 0;
  let longest = 0;
  let seen = {}; // 알파벳을 key, 해당 알파벳의 다음 위치 index 를 value 로 가진다.

  for (let i = 0; i < word.length; i++) {
    // 문자를 순회하면서 이전에 나왔던 문자인지 확인한다.
    const char = word[i];
    if (seen[char]) {
      // 이전에 나왔던 문자인 경우 substring 의 시작 위치를 이전 문자의 다음부터로 바꿔줘야 한다.
      // 단 다른 중복 문자로 인해 변경된 start 위치가 현재 중복 문자의 다음 위치(seen[char]) 보다 클 경우가 있으므로 max 사용
      start = Math.max(start, seen[char]);
    }
    // 가장 긴 단어를 비교한다. 현재 단어 인덱스 - 시작 위치 + 1
    longest = Math.max(longest, i - start + 1);
    // seen 업데이트(현재의 다음위치로)
    seen[char] = i + 1;
  }
  return longest;
}
