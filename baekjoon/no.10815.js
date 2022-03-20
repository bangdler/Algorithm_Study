
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 10815;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x => x.split(' ').map(Number));
    return input;
}

function run() {
    const [[N], cardPool, [M], targets] = getInput()

    const sortedCardPool = cardPool.sort((a, b) => a - b)

    let answers = []

    for(let i = 0; i < M; i++) {
        const target = targets[i]
        binarySearch(sortedCardPool, 0, sortedCardPool.length, target) ? answers.push(1) : answers.push(0)
    }

    console.log(answers.join(' '))
}

// splice slice 둘다 써보았지만 메모리 초과

function binarySearch(base, start, end, target) {
    let nextStart;
    let nextEnd;
    const length = end - start
    const binaryIndex = start + Math.floor(length / 2)
    const searchedItem = base[binaryIndex]

    if(searchedItem === target) return true
    if(length === 1) return false
    if(searchedItem < target) {
        nextStart = binaryIndex + 1
        nextEnd = end
        return binarySearch(base, nextStart, nextEnd, target)
    }
    if(searchedItem > target) {
        nextStart = start
        nextEnd = binaryIndex
        return binarySearch(base, nextStart, nextEnd, target)
    }

}

run()
