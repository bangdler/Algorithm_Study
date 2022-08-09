// https://school.programmers.co.kr/learn/courses/30/lessons/43162

// 한 컴퓨터(한줄) 씩 검사한다. 해당 컴퓨터에 방문하지 않았으면서 연결된 컴퓨터를 스택에 추가한다. 검사한 컴퓨터는 방문 처리한다.
function solution(n, computers) {
    let answer = 0;

    let visited = Array.from({length: n}).fill(0)
    for(let i = 0; i < n; i++) {
        if(visited[i]) continue;

        visited[i] = 1;
        let stack = []
        stack.push(computers[i])
        while(stack.length) {
            let current = stack.pop()
            for(let j=0; j<n; j++) {
                if(!current[j] || visited[j]) continue;

                visited[j] = 1
                stack.push(computers[j])
            }
        }
        answer ++
    }
    return answer;
}

// dfs 로 위아래좌우 가 연결된 경우를 모두 조사한다. => 잘못된 풀이
function dfs(n, computers) {
    let answer = [];
    let visited = Array.from({length: n}, () => Array.from({length:n}).fill(0))

    let directions = {
        up : [-1, 0],
        right : [0, 1],
        left: [0, -1],
        down: [1, 0]
    }

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(!computers[i][j] || visited[i][j]) continue;

            let stack = [];
            let count = 0;
            visited[i][j] = 1
            stack.push([i, j])

            while(stack.length) {
                let [currentI,currentJ] = stack.pop()
                count ++

                for(let key in directions) {
                    let [y, x] = directions[key]
                    let [newI, newJ] = [currentI+y, currentJ+x]

                    if(newI >= n || newJ >= n) continue;
                    if(newI < 0 || newJ < 0) continue;
                    if(!computers[newI][newJ] || visited[newI][newJ]) continue;

                    visited[newI][newJ] = 1
                    stack.push([newI, newJ])
                }
            }
            answer.push(count)
        }
    }
    return answer
}

const n = 4;
const computers = [[1, 1, 0, 1], [1, 1, 0, 0], [0, 0, 1, 1], [1, 0, 1, 1]]

console.log(solution(n, computers))