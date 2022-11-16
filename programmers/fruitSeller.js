// https://school.programmers.co.kr/learn/courses/30/lessons/135808

function solution(k, m, score) {
  var answer = 0;

  // 오름차순 정렬
  const sortedScore = score.sort((a, b) => a - b);

  // 뒤에서부터 m 개씩 이동, 최소값은 i-m+1 번째
  for (let i = sortedScore.length - 1; i >= m - 1; i = i - m) {
    answer += sortedScore[i - m + 1] * m;
  }
  return answer;
}

const [k, m, score] = [3, 4, [1, 2, 3, 1, 2, 3, 1]];

console.log(solution(k, m, score)); // 8
