// https://school.programmers.co.kr/learn/courses/30/lessons/12985

// 숫자를 2로 나눠간다. 2로 나눴을 때 a, b 가 반대편인 경우를 찾는다. 그 때의 대진수를 구한다.
// 대진수는 2^n 개의 팀이 반대편에서 시작하는 경우 2^n -1 번 경기하고, n 라운드에서 만난다.
function solution(n, a, b) {
  let answer = 0;
  let teams;

  while (n >= 2) {
    const half = n / 2;
    if ((a <= half && b > half) || (b <= half && a > half)) {
      teams = n;
      break;
    } else if (a > half && b > half) {
      a = a - half;
      b = b - half;
    }
    n = half;
  }

  while (teams >= 2) {
    teams = teams / 2;
    answer++;
  }

  return answer;
}

// 깔끔 솔루션

// function solution(n,a,b)
// {
//   let answer = 0;
//   while(a !== b) {
//     a = Math.ceil(a/2);
//     b = Math.ceil(b/2);
//     answer++;
//   }
//
//   return answer;
// }
