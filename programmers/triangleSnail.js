// https://school.programmers.co.kr/learn/courses/30/lessons/68645

// 위, 아래, 옆 세가지 방향 중 하나로 간다.
// 변의 길이 L 이 0 이 되면 종료, L 만큼 가면 방향을 바꿔주고 L-1 을 한다.
function solution(n) {
  const Directions = {
    Down: [0, 1],
    Right: [1, 0],
    Up: [-1, -1],
  };
  const changeDirections = currentDirection => {
    const nextDir = {
      Down: 'Right',
      Right: 'Up',
      Up: 'Down',
    };
    return nextDir[currentDirection];
  };
  // 배열의 길이가 1 ~ n 까지인 빈 배열을 만들어준다.
  const pyramid = Array.from({ length: n }, (_, idx) => Array.from({ length: idx + 1 }, () => 0));
  let curDirection = 'Down';
  let L = n;
  let [curX, curY] = [0, 0];
  let curNum = 1;
  let count = 0;

  while (L > 0) {
    // 현재 칸 채우기
    count++;
    pyramid[curY][curX] = curNum;
    curNum++;
    // count 확인, 방향 바꾸기, 변의 길이 감소
    if (count === L) {
      count = 0;
      curDirection = changeDirections(curDirection);
      L -= 1;
    }
    // 현재 방향대로 좌표 업데이트
    curX += Directions[curDirection][0];
    curY += Directions[curDirection][1];
  }
  return pyramid.flat();
}

console.log(solution(4));
