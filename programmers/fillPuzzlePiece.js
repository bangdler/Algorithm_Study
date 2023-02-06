// https://school.programmers.co.kr/learn/courses/30/lessons/84021

// 풀이 참조함...
// game board 와 table 을 둘 다 탐색한다.
// game board 는 빈칸을 찾고, table 에서는 채워진 칸을 찾는다. 각각의 모양을 추출하고 같은 모양으로 회전시킨다.
// 이후 모양끼리 비교한다.
function solution(game_board, table) {
  let answer = 0;
  let spaces = [];
  let puzzles = [];

  for (let y = 0; y < game_board.length; y++) {
    for (let x = 0; x < game_board[0].length; x++) {
      if (game_board[y][x] === 0) {
        let space = [];
        dfs(game_board, x, y, space, 0);
        space = rotate(rearrange(space));
        console.log('space', space);
        spaces.push(space);
      }
      if (table[y][x] === 1) {
        let puzzle = [];
        dfs(table, x, y, puzzle, 1);
        puzzle = rotate(rearrange(puzzle));
        console.log('puzzle', puzzle);
        puzzles.push(puzzle);
      }
    }
  }

  // 같은 모양인 경우 퍼즐에서 제거한다.
  for (let space of spaces) {
    for (let i = 0; i < puzzles.length; i++) {
      if (JSON.stringify(space) === JSON.stringify(puzzles[i])) {
        answer += space.length;
        puzzles.splice(i, 1);
        break;
      }
    }
  }
  return answer;
}

// rearrange 0,0 으로 영점 맞추기. [[y,x]] 배열
function rearrange(list) {
  const minX = Math.min(...list.map(c => c[1]));
  const minY = Math.min(...list.map(c => c[0]));
  return list.map(c => [c[0] - minY, c[1] - minX]).sort();
}

// rotate 행렬 회전 및 영점 맞추고 한 방향으로 통일하기
function rotate(list) {
  if (list.length === 1) return list;
  const result = [];
  let shape = list.map(c => c);
  let width = Math.max(...shape.map(s => s[1])) - Math.min(...shape.map(s => s[1]));
  let height = Math.max(...shape.map(s => s[0])) - Math.min(...shape.map(s => s[0]));
  let temp;
  for (let i = 0; i < 4; i++) {
    const rotated = shape.map(c => [c[1], width - c[0]]);
    shape = rearrange(rotated);
    result.push(shape);
    temp = width;
    width = height;
    height = temp;
  }
  return result.sort()[0];
}

// 0 또는 1 을 주어진 table 에서 찾고 찾은 내용을 list 에 담는다.
function dfs(table, x, y, list, find) {
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  const stack = [[y, x]];
  list.push([y, x]);
  table[y][x] = -1;

  while (stack.length) {
    const [curY, curX] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const [newY, newX] = [curY + dy[i], curX + dx[i]];
      if (newX < 0 || newY < 0 || newX >= table.length || newY >= table.length || table[newY][newX] === -1) continue;
      if (table[newY][newX] === find) {
        stack.push([newY, newX]);
        list.push([newY, newX]);
        table[newY][newX] = -1;
      }
    }
  }
}

// 아래 모양인 경우
// x x o x
// x o o o
const test = [
  [0, 2],
  [1, 1],
  [1, 2],
  [1, 3],
];

console.log('rearrange:', rearrange(test));
console.log('rotate:', rotate(test));

const gameBoard = [
  [1, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 0],
  [0, 1, 1, 0, 0, 1],
  [1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 0],
];
const table = [
  [1, 0, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 0],
  [0, 1, 1, 0, 1, 1],
  [0, 0, 1, 0, 0, 0],
  [1, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0],
];

solution(gameBoard, table);
