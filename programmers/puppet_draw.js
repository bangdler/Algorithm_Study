
// board 는 5x5 ~ 30x30 2차원 배열로 이중 배열로 나타냄.
// 인형은 1~100의 숫자로 다른 모양을 의미.
// 인형은 위에서부터 뽑히며, 같은 모양의 인형이 2개가 연속으로 있으면 사라지면서 results 에 사라진 갯수가 추가가 된다.
const board = [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]];
const moves= [1,5,3,5,1,2,1,4];

let results = 0;
const columns = {};
const drawSequence = [];

function solution(board, moves) {
    inputColumns(board);
    makeDrawSequence(moves);
    return results;
}

// 기계가 뽑을 수 있는 세로로 된 배열로 재구성
// 열 index : 열 인형 배열

function inputColumns(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j ++) {
            if(!columns[j+1]) {
                columns[j+1] = [array[i][j]]
                continue;
            }
            columns[j+1].push(array[i][j])
        }
    }
    return;
}

// 각 move 마다 해당 열에서 draw 후 check
function makeDrawSequence(moves) {
    moves.forEach(function(move) {
        let targetColumn = columns[move]
        // 0 이 아닌 인형을 만나면 Draw 후 break;
        for (let i = 0; i < targetColumn.length; i++) {
            if (targetColumn[i] !== 0) {
                checkDrawSequence(targetColumn[i])
                targetColumn[i] = 0;
                break;
            }
        }
    })
    return;
}

// drawSequence 배열의 마지막 값과 puppet 이 같으면 마지막 값을 제거하고 results +2 해준다. 같지 않으면 배열에 추가한다.
function checkDrawSequence(puppet) {
    let lastIndex = drawSequence.length - 1;
    if (drawSequence[lastIndex] === puppet) {
        drawSequence.pop();
        results += 2;
        return;
    }
    else {
        drawSequence.push(puppet)
        return;
    }
}


console.log(solution(board, moves))