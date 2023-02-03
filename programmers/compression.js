// https://school.programmers.co.kr/learn/courses/30/lessons/17684

function solution(msg) {
  const answer = [];

  const dic = {};
  const initial = 'AZ';
  const start = initial.charCodeAt(0);
  const end = initial.charCodeAt(1);
  for (let i = start; i <= end; i++) {
    const str = String.fromCharCode(i);
    dic[str] = i - start + 1;
  }

  let idx = dic['Z'] + 1;
  let i = 0;
  while (i < msg.length) {
    let str = msg[i];
    let curIdx;
    while (dic[str]) {
      curIdx = dic[str];
      i++;
      str += msg[i];
    }
    dic[str] = idx++;
    answer.push(curIdx);
  }
  return answer;
}

console.log(solution('KAKAO'));
