function solution1(line) {
  let answer = '';
  if (line.length < 2) return line;
  const splitLine = line.split('');
  let i = 0;
  let j = 1;
  for (let k = 0; k < splitLine.length; k++) {
    if (splitLine[i] !== splitLine[j]) {
      if (j === i + 1) {
        answer += splitLine[i];
        i++;
        j++;
      } else {
        answer += splitLine[i] + '*';
        i = j;
        j++;
      }
    }
    if (splitLine[i] === splitLine[j]) {
      j++;
    }
  }
  return answer;
}
// console.log(solution('aabbbc'));

function solution(n, student, point) {
  var answer = 0;

  // 포인트 : 학생번호 - 점수
  const points = {};

  let ranking = Array.from({ length: n }, (_, i) => i + 1);

  for (let i = 0; i < n; i++) {
    points[i + 1] = 0;
  }

  for (let i = 0; i < student.length; i++) {
    const curStudent = student[i];
    const curPoint = point[i];

    points[curStudent] += curPoint;

    let curRanking = ranking
      .map(x => x)
      .sort((a, b) => {
        if (points[b] - points[a]) {
          return points[b] - points[a];
        } else if (points[b] === points[a]) {
          return a - b;
        }
      });
    console.log(curRanking);
    let prev = false;
    let cur = false;
    for (let j = 0; j < n / 2; j++) {
      if (ranking[j] === curStudent) {
        prev = true;
      }
      if (curRanking[j] === curStudent) {
        cur = true;
      }
    }
    if ((prev && !cur) || (!prev && cur)) {
      answer++;
    }
    ranking = curRanking;
  }
  return answer;
}

const n = 6;
const student = [6, 1, 4, 2, 5, 1, 3, 3, 1, 6, 5];
const point = [3, 2, 5, 3, 4, 2, 4, 2, 3, 2, 2];

console.log(solution(n, student, point));
