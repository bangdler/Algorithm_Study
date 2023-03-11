// https://school.programmers.co.kr/learn/courses/30/lessons/12949

// m * k 행렬과 k * n 행렬의 곱은 m * n 행렬
function solution(arr1, arr2) {
  const m = arr1.length;
  const k = arr1[0].length;
  const n = arr2[0].length;

  const answer = Array.from({ length: m }, () => Array.from({ length: n }, () => 0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < k; j++) {
      const cur1 = arr1[i][j];
      for (let q = 0; q < arr2[j].length; q++) {
        const cur2 = arr2[j][q];
        answer[i][q] += cur1 * cur2;
      }
    }
  }

  return answer;
}

const test = [
  [
    [1, 4],
    [3, 2],
    [4, 1],
  ],
  [
    [3, 3],
    [3, 3],
  ],
];

const test2 = [
  [
    [2, 3, 2],
    [4, 2, 4],
    [3, 1, 4],
  ],
  [
    [5, 4],
    [2, 4],
    [3, 1],
  ],
];
console.log(solution(test2[0], test2[1]));
