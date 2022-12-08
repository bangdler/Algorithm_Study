// https://school.programmers.co.kr/learn/courses/30/lessons/42747

function solution(citations) {
  let Hidx = 0;
  // 내림차순으로 정렬
  const descendingCitations = citations.sort((a, b) => b - a);
  for (let i = 0; i < descendingCitations.length; i++) {
    const numOfCitation = descendingCitations[i];
    if (numOfCitation > Hidx) {
      Hidx++;
    }
  }
  return Hidx;
}

const citations = [
  [3, 0, 6, 1, 5],
  [3, 3, 5, 5, 5, 6, 1, 1],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [6],
  [6, 6],
  [6, 1],
  [10000],
  [10000, 9999, 9998, 9997, 9996],
  [10000, 5000, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0],
  [1],
  [10000, 10000, 10000, 10000, 10000, 10000],
];

citations.forEach(it => {
  console.log(it, ':', solution(it));
});
