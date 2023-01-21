// https://school.programmers.co.kr/learn/courses/30/lessons/68936
function solution(arr) {
  // 모두 같은 값인 경우 나누지 않는다.
  const flat = arr.flat();
  if (flat.every(x => x === 1)) return [0, 1];
  if (flat.every(x => x === 0)) return [1, 0];

  const quadCompress = arr => {
    if (arr.length === 1) return arr;
    // 사등분으로 나누기
    const L = arr.length;
    const half = L / 2;
    const quad = Array.from({ length: 4 }, () => []);
    for (let i = 0; i < L; i++) {
      const row = arr[i];
      const first = row.slice(0, half);
      const second = row.slice(half);

      if (i < half) {
        quad[0].push(first);
        quad[1].push(second);
      } else {
        quad[2].push(first);
        quad[3].push(second);
      }
    }
    // 영역 압축하기
    for (let j = 0; j < quad.length; j++) {
      const flat = quad[j].flat();
      if (flat.includes(0) && flat.includes(1)) {
        // 재귀호출
        quad[j] = quadCompress(quad[j]);
      } else if (flat.includes(0)) {
        quad[j] = [0];
      } else {
        quad[j] = [1];
      }
    }
    return quad;
  };
  const finalQuad = quadCompress(arr);
  const finalFlat = finalQuad.flat(Infinity);
  const answer = [finalFlat.filter(x => x === 0).length, finalFlat.filter(x => x === 1).length];
  return answer;
}

const test = [
  [1, 1, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 1],
  [1, 1, 1, 1],
];
const test2 = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1],
  [0, 1, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 1, 1, 1, 1],
];

const test3 = [
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
];

console.log(solution(test3));
