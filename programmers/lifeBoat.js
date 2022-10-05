// https://school.programmers.co.kr/learn/courses/30/lessons/42885

// 몸무게가 작은 사람부터 태우는 게 아니라 양 끝에서부터 태워야 최적이다.
// 20 40 60 80 인 경우 작은 순으로 태우면 3대 필요, 양 끝에서 태우면 2대
function solution(people, limit) {
  const sortedPeople = people.sort((a, b) => a - b);
  let boats = 0;

  let start = 0;
  let end = sortedPeople.length - 1;

  while (start < end) {
    if (sortedPeople[start] + sortedPeople[end] <= limit) {
      start++;
    }
    end--;
    boats++;
  }

  if (start === end) boats++;
  return boats;
}

console.log(solution([70, 50, 80, 50], 100)); // return 3
