function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 2841;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x=>x.split(' ').map(Number));
    return input;
}

function run() {
    const [[N, P], ...melody] = getInput()

    let count = 0;
    let maxP = {}

    melody.forEach(note => {
        const noteN = note[0]
        const noteP = note[1]
        const maxPofN = maxP[noteN]
        if(!maxPofN) {
            maxP[noteN] = [noteP]
            count ++
        }
        else {
            let lastIndex = maxPofN.length - 1
            while(maxPofN[lastIndex] > noteP) {
                maxPofN.pop()
                count ++
                lastIndex = maxPofN.length - 1
            }
            if(!maxPofN[lastIndex] || maxPofN[lastIndex] < noteP) {
                maxPofN.push(noteP)
                count ++
            }
        }
    })
    console.log(count)
}

run()