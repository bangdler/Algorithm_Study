

function solution(array, commands) {
    let answer = [];
    // array 에 대해 command 로 구한 값을 추가한다.
    commands.forEach((command) => answer.push(doCommand(array, command)))
    return answer;
}

// i번째 부터 ~ j까지 자르고, 그 중 k번째를 구한다. => index : i-1, k-1
function doCommand(array, command) {
    const [i, j, k] = command
    const splicedArr = array.slice(i-1, j)
    const sortedArr = splicedArr.sort((a,b) => a - b)
    console.log(sortedArr)
    return sortedArr[k - 1]
}

const array = [1, 5, 2, 6, 3, 7, 4]
const commands = [[2, 5, 3], [4, 4, 1], [1, 7, 3]]
// return [5, 6, 3]

console.log(solution(array, commands))