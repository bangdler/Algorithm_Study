// https://school.programmers.co.kr/learn/courses/30/lessons/17680

function solution(cacheSize, cities) {
  let answer = 0;
  const cache = [];

  for (let city of cities) {
    const lowerCity = city.toLowerCase();
    const cacheIdx = cache.indexOf(lowerCity);
    if (cacheIdx !== -1) {
      cache.splice(cacheIdx, 1);
      answer += 1;
    } else {
      if (cache.length === cacheSize) cache.shift();
      answer += 5;
    }
    if (cache.length < cacheSize) cache.push(lowerCity);
  }

  return answer;
}
