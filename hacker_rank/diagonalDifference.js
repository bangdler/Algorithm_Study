
'use strict';

// const fs = require('fs');
//
// process.stdin.resume();
// process.stdin.setEncoding('utf-8');
//
// let inputString = '';
// let currentLine = 0;
//
// process.stdin.on('data', function(inputStdin) {
//     inputString += inputStdin;
// });
//
// process.stdin.on('end', function() {
//     inputString = inputString.split('\n');
//
//     main();
// });
//
// function readLine() {
//     return inputString[currentLine++];
// }

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

// 행렬 대각선의 합의 차이 구하기
function diagonalDifference(arr) {
    // 한 행당 2개씩 뽑는다. i행의 i번째와 (n-1)-i번째
    let diagonal1 = 0;
    let diagonal2 = 0;
    arr.forEach(function(row, idx) {
        diagonal1 += row[idx]
        diagonal2 += row[arr.length-1-idx]
    })
    return Math.abs(diagonal1 - diagonal2)
}

// function main() {
//     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
//
//     const n = parseInt(readLine().trim(), 10);
//
//     let arr = Array(n);
//
//     for (let i = 0; i < n; i++) {
//         arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
//     }
//     console.log(arr)
//     const result = diagonalDifference(arr);
//
//     ws.write(result + '\n');
//
//     ws.end();
// }

let n = 2
let arr = Array(n);
let read = '11 2 4'
for (let i = 0; i < n; i++) {
    arr[i] = read.replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
}

console.log(arr)