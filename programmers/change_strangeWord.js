function solution(s) {
  let answer = '';
  // 공백 기준으로 분리
  const spaceSplitArr = s.split(' ');

  let changedWordArr = [];
  // 구분된 문자열을 한글자씩 배열로 변환하여 인덱스마다 대문자 소문자 변환
  spaceSplitArr.forEach(function (splitWord, idx) {
    const stringArr = splitWord.split('');
    let changedStringArr = [];
    console.log(stringArr);
    stringArr.forEach((string, idx) => {
      console.log(string);
      if (idx % 2 === 1) {
        changedStringArr.push(string.toLowerCase());
      }
      if (idx % 2 === 0) {
        changedStringArr.push(string.toUpperCase());
      }
    });
    changedWordArr.push(changedStringArr.join(''));
  });
  answer = changedWordArr.join(' ');
  return answer;
}

console.log(solution2(' hello   world'));

function solution2(s) {
  let answer = '';
  // 공백 기준으로 분리
  const spaceSplitArr = s.split(' ');
  console.log(spaceSplitArr);
  let changedWordArr = spaceSplitArr.map(function (splitWord) {
    const stringArr = splitWord.split('');
    console.log(stringArr); // 빈배열이 들어가도 빈배열로 나온다.
    return stringArr
      .map((string, idx) => {
        return idx % 2 === 0 ? string.toUpperCase() : string.toLowerCase();
      })
      .join('');
  });
  answer = changedWordArr.join(' ');
  return answer;
}
