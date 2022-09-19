// Write a recursive function called reverse which accepts a string and returns a new string in reverse.

function reverse(word) {
  if (word.length === 1) return word;
  return reverse(word.slice(1)) + word[0];
}

console.log(reverse('awesome')); // 'emosewa'
// reverse('rithmschool') // 'loohcsmhtir'

// Write a recursive function called someRecursive which accepts an array and a callback.
// The function returns true if a single value in the array returns true when passed to the callback. Otherwise it returns false.

// SAMPLE INPUT / OUTPUT
const isOdd = val => val % 2 !== 0;

function someRecursive(array, callback) {
  if (!array.length) return false;
  const value = array.pop();
  if (callback(value)) return true;
  return someRecursive(array, callback);
}
console.log(someRecursive([1, 2, 3, 4], isOdd)); // true
// someRecursive([4,6,8,9], isOdd) // true
// someRecursive([4,6,8], isOdd) // false
console.log(someRecursive([4, 6, 8], val => val > 10)); // false
