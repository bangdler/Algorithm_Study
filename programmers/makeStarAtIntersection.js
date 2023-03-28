// https://school.programmers.co.kr/learn/courses/30/lessons/87377

const getIntersection = (eq1, eq2) => {
  const [A, B, C] = eq1;
  const [D, E, F] = eq2;
  const mod = A * E - D * B;
  if (mod === 0) return false;
  const xNum = B * F - C * E;
  const yNum = C * D - A * F;
  if (xNum % mod || yNum % mod) return false;
  return [xNum / mod, yNum / mod];
};

// 모든 경우의 수에 대해 getIntersection 실시
function solution(line) {
  const intersectionArr = [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < line.length; i++) {
    const cur = line[i];
    for (let j = i + 1; j < line.length; j++) {
      const intersection = getIntersection(cur, line[j]);
      if (intersection) {
        intersectionArr.push(intersection);
        minX = Math.min(intersection[0], minX);
        maxX = Math.max(intersection[0], maxX);
        minY = Math.min(intersection[1], minY);
        maxY = Math.max(intersection[1], maxY);
      }
    }
  }
  // 별찍기
  const lengthX = maxX - minX + 1;
  const lengthY = maxY - minY + 1;
  const starMap = [...Array(lengthY)].map(() => [...Array(lengthX)].map(() => '.'));
  for (let [curX, curY] of intersectionArr) {
    starMap[maxY - curY][curX - minX] = '*';
  }

  return starMap.map(map => map.join(''));
}

const test = [
  [2, -1, 4],
  [-2, -1, 4],
  [0, -1, 1],
  [5, -8, -12],
  [5, 8, 12],
];
console.log(solution(test));
