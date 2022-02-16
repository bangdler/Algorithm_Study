
// 가장 큰 정사각형 찾기
// 1와 0로 채워진 표(board)가 있습니다. 표 1칸은 1 x 1 의 정사각형으로 이루어져 있습니다.
// 표에서 1로 이루어진 가장 큰 정사각형을 찾아 넓이를 return 하는 solution 함수를 완성해 주세요. (단, 정사각형이란 축에 평행한 정사각형을 말합니다.)

/*
표(board)는 2차원 배열로 주어집니다.
표(board)의 행(row)의 크기 : 1,000 이하의 자연수
표(board)의 열(column)의 크기 : 1,000 이하의 자연수
표(board)의 값은 1또는 0으로만 이루어져 있습니다.
 */

function solution(board) {
    let answer;
    let maxEdge = 0;
    for(let y = 0; y < board.length; y++) {
        let startIndex = false;
        let endIndex = false;
        if (board.length - y <= maxEdge) break;
        for(let x = 0; x < board[y].length; x++) {
            // 각 행의 연속된 1을 찾는다.
            let startDepth = y
            let num = board[y][x]

            if(!startIndex && num === 1) {
                startIndex = x;
                endIndex = x;
            }
            else if(startIndex && num === 0) {
                startIndex = false;
                endIndex = false;
            }
            else if(startIndex && num === 1) {
                endIndex = x;
            }

            const nextNum = board[y][x+1]

            if(startIndex && endIndex && (nextNum === 0 || nextNum === undefined)) {
                const edge = endIndex - startIndex + 1;
                if(edge <= maxEdge) {
                    continue;
                }
                for(let i = edge; i > 0; i--) {
                    if(i > maxEdge) {
                        const check = checkDepth(board, startIndex, edge, startDepth)
                        if(check) {
                            maxEdge = i;
                            break;
                        }
                    }
                    else if (i === 1) maxEdge = 1;
                }

            }

        }
    }
    answer = maxEdge ** 2;
    return answer;
}

// 아래로
function checkDepth(board, startIndex, length, startDepth) {
    for(let i = startDepth+1; i < startDepth + length; i++) {
        for(let j = startIndex; j < startIndex + length; j++) {
            const num = board[i][j];
            if(num === 0) {
                return false;
            }
        }
    }
    return true;
}

const board = [[0,1,1,1],[1,1,1,1],[1,1,1,1],[0,0,1,0]]
const board2 = [[0, 0, 1, 1], [1, 1, 1, 1]]
const board3 = [[0,0,0,1]]
console.log(solution(board3))