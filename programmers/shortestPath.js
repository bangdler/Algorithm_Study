// https://school.programmers.co.kr/learn/courses/30/lessons/1844

// 최단거리는 bfs 로 구할 수 있다.
function solution(maps) {
  const mapSize = { y: maps.length, x: maps[0].length };
  const [startY, startX] = [0, 0];
  const [endY, endX] = [mapSize.y - 1, mapSize.x - 1];
  let findEnd = false;
  let directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // 방문 여부 및 현재칸까지 오는 거리를 기록
  const visited = Array.from({ length: mapSize.y }, () => Array(mapSize.x).fill(0));

  const queue = [[startY, startX]];
  visited[startY][startX] = 1;

  while (queue.length) {
    const [curY, curX] = queue.shift();
    const curStep = visited[curY][curX];
    directions.forEach(dir => {
      const [newY, newX] = [curY + dir[0], curX + dir[1]];

      if (newY >= mapSize.y || newX >= mapSize.x || newY < 0 || newX < 0) return;
      if (maps[newY][newX] === 0) return;
      if (visited[newY][newX]) return;

      if (newY === endY && newX === endX) {
        findEnd = true;
      }
      visited[newY][newX] = curStep + 1;
      queue.push([newY, newX]);
    });

    if (findEnd) break;
  }
  if (!findEnd) return -1;
  return visited[endY][endX];
}

const maps = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
];
console.log(solution(maps));
