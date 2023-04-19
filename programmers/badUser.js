// https://school.programmers.co.kr/learn/courses/30/lessons/64064

// 1. banId 에 해당하는 제재 아이디 목록을 구한다.
// 2. 완전탐색을 통해 각 제제 아이디 목록의 조합을 구한다.
// 3. key 로 만들어 중복을 제거한다.
function solution(user_id, banned_id) {
  const restrictedArr = [];
  for (let banId of banned_id) {
    const pattern = `^${banId.replace(/\*/g, '.')}$`;
    const regExp = new RegExp(pattern);
    const restricted = [];
    for (let userId of user_id) {
      if (regExp.test(userId)) {
        restricted.push(userId);
      }
    }
    restrictedArr.push(restricted);
  }

  const combinationSet = new Set();
  const backTrack = (num = 0, set = new Set()) => {
    if (num === restrictedArr.length) {
      if (set.size === restrictedArr.length) {
        const combinationKey = [...set].sort().join('');
        combinationSet.add(combinationKey);
      }
      return;
    }
    const curArr = restrictedArr[num];
    for (let cur of curArr) {
      backTrack(num + 1, new Set([...set, cur]));
    }
  };
  backTrack();
  return combinationSet.size;
}

const test = [
  ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
  ['fr*d*', 'abc1**'],
]; // 2
const test2 = [
  ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
  ['*rodo', '*rodo', '******'],
]; //3
console.log(solution(test2[0], test2[1]));
