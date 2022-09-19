// Write a recursive function called isPalindrome which returns true if the string passed to it is a palindrome
// (reads the same forward and backward). Otherwise it returns false.

function isPalindrome(word) {
  if (word[0] !== word[word.length - 1]) return false;
  if (word.length === 1) return true;
  return isPalindrome(word.slice(1, word.length - 1));
}

console.log(isPalindrome('awesome')); // false
// isPalindrome('foobar') // false
console.log(isPalindrome('tacocat')); // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false
