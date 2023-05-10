// https://school.programmers.co.kr/learn/courses/30/lessons/67258

// 투포인터
// 모든 종류가 될 때까지 두번째 포인터를 움직인다. 보석을 추가한다.
// 모든 종류가 되면 첫번째 포인터를 움직인다. 기존 보석을 제거한다.
// while 문에서 pointer 경계조건 때문에 여러번 틀렸다.
function solution(gems) {
  const gemTypes = new Set(gems);
  const typeNum = gemTypes.size;
  let pointer1 = 0;
  let pointer2 = 0;
  let minPointer1, minPointer2;
  let minDiff = Infinity;
  const boxTypes = new Set();
  const box = {};

  const updateMinPointer = () => {
    const curDiff = pointer2 - pointer1;
    if (curDiff >= 0 && curDiff < minDiff) {
      minPointer1 = pointer1;
      minPointer2 = pointer2 - 1;
      minDiff = curDiff;
    }
  };

  while (pointer1 <= pointer2 && pointer1 < gems.length) {
    // 모든 종류 확인 업데이트
    if (boxTypes.size === typeNum) {
      updateMinPointer();
      const deleteGem = gems[pointer1];
      // 보석 제거
      box[deleteGem] -= 1;
      if (box[deleteGem] === 0) {
        boxTypes.delete(deleteGem);
      }
      pointer1++;
    } else {
      // 보석 추가
      if (pointer2 < gems.length) {
        const curGem = gems[pointer2];
        if (boxTypes.has(curGem)) {
          box[curGem] += 1;
        } else {
          box[curGem] = 1;
          boxTypes.add(curGem);
        }
        pointer2++;
      } else {
        break;
      }
    }
  }
  return [minPointer1 + 1, minPointer2 + 1];
}

console.log(solution(['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'])); //[3,7]
console.log(solution(['XYZ', 'XYZ', 'XYZ'])); //[1,1]
console.log(solution(['DIA', 'EM', 'EM', 'RUB', 'DIA']));

// 다른 풀이 Map 을 활용한 투포인터
function solution_ref(gems) {
  const gemVarietyCounts = new Set(gems).size;

  const gemMap = new Map();
  const gemLengths = [];
  gems.forEach((gem, i) => {
    gemMap.delete(gem);
    gemMap.set(gem, i);
    if (gemMap.size === gemVarietyCounts) {
      gemLengths.push([gemMap.values().next().value + 1, i + 1]);
    }
  });

  gemLengths.sort((a, b) => {
    if (a[1] - a[0] === b[1] - b[0]) {
      return a[1] - b[1];
    }
    return a[1] - a[0] - (b[1] - b[0]);
  });

  return gemLengths[0];
}
