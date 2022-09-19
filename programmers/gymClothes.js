// 전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때,
// 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.
// 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다.
// 전체 학생의 수는 2명 이상 30명 이하입니다.
// 체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
// 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
// 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
// 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.

// 1명만 빌려줄 수 있는 경우부터 빌려준다.
function solution(n, lost, reserve) {
  let answer = 0;
  let lostOb = {};
  lost.forEach(n => (lostOb[n] = 'O'));
  reserve = reserve.sort((a, b) => a - b); // 오름차순 정렬.
  let finalReserve = [];
  // 여벌 체육복이 있는 학생이 도난당한 경우 먼저 거르고 시작한다.
  reserve.forEach(n => {
    if (lostOb[n]) {
      delete lostOb[n];
    } else {
      finalReserve.push(n);
    }
  });
  for (let i = 0; i < finalReserve.length; i++) {
    const cur = finalReserve[i];
    // 빌려줄 수 있는 경우 앞의 애가 있으면 앞의 애한테 주고 없으면 뒤의 애한테 준다.
    if (lostOb[cur - 1]) {
      delete lostOb[cur - 1];
      continue;
    }
    if (lostOb[cur + 1]) {
      delete lostOb[cur + 1];
      continue;
    }
  }
  const finalLostNum = Object.keys(lostOb).length;
  answer = n - finalLostNum;
  return answer;
}

const n = 8;
const lost = [2, 3, 4, 5, 7, 8, 9];
const reserve = [1, 2, 3, 4, 6, 8];
console.log(solution(n, lost, reserve));
