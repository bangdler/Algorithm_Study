// https://school.programmers.co.kr/learn/courses/30/lessons/17686

function solution(files) {
  // head, number, tail 로 나누어 정렬해야 함.
  const splitFiles = files.map(file => {
    const split = file.match(/(^[a-zA-Z\-\s\.]+)([0-9]{1,5})(.*)?/);
    const head = split[1],
      number = split[2],
      tail = split[3];
    return [head, number, tail];
  });
  // head 대소문자 구분 없이 오름차순 정렬, 같은 경우 number 기준으로 오름차순 정렬
  const sortedFiles = splitFiles.sort((a, b) => {
    const upperHeadA = a[0].toUpperCase();
    const upperHeadB = b[0].toUpperCase();
    if (upperHeadA > upperHeadB) return 1;
    else if (upperHeadA < upperHeadB) return -1;
    return Number(a[1]) - Number(b[1]);
  });

  return sortedFiles.map(file => file.join(''));
}

const files = ['img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG'];
const files2 = ['F-5 Freedom Fighter', 'B-50 Superfortress', 'A-10 Thunderbolt II', 'F-14 Tomcat'];
console.log(solution(files2));
