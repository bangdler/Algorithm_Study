//https://school.programmers.co.kr/learn/courses/30/lessons/70129

// 재귀로 풀었으나 밑에 정규표현식을 사용하여 풀 수 있음을 확인.
function solution(s) {
  let numOfZero = 0;
  let numOfChange = 0;

  function change(string) {
    if (string.length === 1) return;
    numOfChange++;
    const removedZero = string.split('').filter(it => {
      if (it === '1') return it;
      numOfZero++;
    });
    const removedZeroLength = removedZero.length.toString(2);
    return change(removedZeroLength);
  }
  change(s);

  return [numOfChange, numOfZero];
}

// 다른사람 풀이
function solution2(s) {
  var answer = [0, 0];
  while (s.length > 1) {
    answer[0]++;
    // 1로만 이루어진 경우 match 는 undefined 반환
    answer[1] += (s.match(/0/g) || []).length;
    s = s.replace(/0/g, '').length.toString(2);
  }
  return answer;
}

console.log(solution('110010101001'));
