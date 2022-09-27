// 특정 단어를 변환하여 특정 길이의 배열에 인덱스를 구한다.
// 문제점 1. string 만 hash 가능 2. hash 처리가 non-constant time (단어 길이에 영향) 3. 데이터가 clustering 되기 쉽다.
function basicHash(word, arrayLength) {
  let total = 0;
  for (let string of word) {
    const value = string.charCodeAt(0) - 96;
    total += value;
  }
  const index = total % arrayLength;
  return index;
}

console.log(basicHash('pink', 10));
console.log(basicHash('orangered', 10));
console.log(basicHash('orange', 10));
console.log(basicHash('hello', 10));

// 2,3번 문제 개선. 2번 -> 최대 50글자까지로 index 를 구함. 3번 -> 배열 길이를 소수로 하고, total 에 소수를 곱하면서 index 값을 분산시킨다.
function improvedHash(word, arrayPrimeLength) {
  let total = 0;
  const PRIME_NUM = 31;
  for (let i = 0; i < Math.min(word.length, 50); i++) {
    const string = word[i];
    const value = string.charCodeAt(0) - 96;
    total = (total * PRIME_NUM + value) % arrayPrimeLength;
  }
  return total;
}

console.log(improvedHash('pink', 13));
console.log(improvedHash('orangered', 13));
console.log(improvedHash('orange', 13));
console.log(improvedHash('hello', 13));

// hash 충돌 시 해결법
// 1. separate chaining : 같은 Index 자리에 중첩된 배열을 만들어 넣는다. 정해진 배열 길이보다 더 많은 값을 넣을 수 있다.
// 2. linear probing : 같은 index 자리에 값이 있을 경우 다음 index 에 넣는다.
