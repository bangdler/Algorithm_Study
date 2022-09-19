// n명의 죄수, m개의 사탕, s 번째 죄수부터 사탕을 줄 때 마지막 사탕을 받는 사람은?

function saveThePrisoner(n, m, s) {
  let idx = m % n;
  idx === 0 ? (idx = n) : idx;
  const result = s + idx - 1;
  if (result > n) return result - n;
  return result;
}

console.log(saveThePrisoner(1, 1, 1));
