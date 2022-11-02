// 재귀를 이용한 완전탐색
// 풀이 참고함...
// https://velog.io/@tnehd1998/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%96%91%EA%B6%81%EB%8C%80%ED%9A%8C-JavaScript

function solution(n, info) {
  let answer = Array(11).fill(0);
  let maxPoint = 0;
  function findMaxPoint(apeachPoint, ryanPoint, shotCount, curPoint, shotArr) {
    // n 보다 많은 화살을 쏜 경우
    if (shotCount > n) return;

    // 현재 맞출 점수가 10점이 넘어간 경우 탐색이 완료
    if (curPoint > 10) {
      const diff = ryanPoint - apeachPoint;
      if (maxPoint < diff) {
        // 남은 화살은 0점에 몰아준다.
        shotArr[10] += n - shotCount;
        maxPoint = diff;
        answer = shotArr;
      }
      return;
    }

    // 쏠 화살이 있는 경우에만 라이언이 쏜다.
    // 라이언이 포인트를 얻는 경우
    if (shotCount < n) {
      const cur = [...shotArr];
      const curApeachShot = info[10 - curPoint];
      cur[10 - curPoint] = curApeachShot + 1;
      findMaxPoint(apeachPoint, ryanPoint + curPoint, shotCount + cur[10 - curPoint], curPoint + 1, cur);
    }

    // 어피치가 쏜 화살이 있는 경우에만 어피치가 포인트를 얻는다.
    if (info[10 - curPoint] > 0) {
      findMaxPoint(apeachPoint + curPoint, ryanPoint, shotCount, curPoint + 1, shotArr);
    }
    // 아무도 점수를 못 얻는 경우
    else {
      findMaxPoint(apeachPoint, ryanPoint, shotCount, curPoint + 1, shotArr);
    }
  }
  findMaxPoint(0, 0, 0, 0, answer);
  return maxPoint <= 0 ? [-1] : answer;
}

const test1 = [5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]]; // result [0,2,2,0,1,0,0,0,0,0,0]
//1	[1,0,0,0,0,0,0,0,0,0,0]	[-1]
//9	[0,0,1,2,0,1,1,1,1,1,1]	[1,1,2,0,1,2,2,0,0,0,0]
//10	[0,0,0,0,0,0,0,0,3,4,3]	[1,1,1,1,1,1,1,1,0,0,2]

console.log(solution(test1[0], test1[1]));
