function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 11725;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x=>x.split(' ').map(Number));
    return input;
}

function run() {
    const [[N], ...links] = getInput()

    const linkArray = Array.from({length:N + 1}, () => [])
    const visited = Array.from({length: N + 1}).fill(0)
    const parentArray = Array.from({length: N + 1}).fill(0)

    links.forEach(link => {
        const [nodeA, nodeB] = link;
        linkArray[nodeA].push(nodeB)
        linkArray[nodeB].push(nodeA)
    })

    function dfs() {
        const stack = [1]

        while(stack.length) {
            const parentNode = stack.pop()
            visited[parentNode] = true;

            for(let i = 0; i < linkArray[parentNode].length; i++) {
                const childNode = linkArray[parentNode][i]
                if(visited[childNode]) {
                    continue;
                }
                parentArray[childNode] = parentNode
                stack.push(childNode)
            }
        }
    }

    dfs()

    let answer = parentArray.splice(2)
    console.log(answer.join('\n'))
}

run()