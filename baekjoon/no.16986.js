// 구현, 브루트포스

function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 16986;
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `/test/${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map(x => x.split(' ').map(Number));
    return input;
}

function run() {
    const [[N,K], ...arr] = getInput()
    const table = arr.splice(0, N)

    if(N < K) return console.log(0)

    // 내가 K번 이기기 위해 낼 수 있는 기술의 순열
    let myData = getPermutations(Array.from({length:N}, (_, idx) => idx+1), K)

    // 내가 낼 수 있는 기술의 경우의 수마다 우승이 가능한 지 확인한다. 하나라도 가능하면 1 출력
    for(let i = 0; i < myData.length; i++) {
        const data = {
            A: arr[0],
            B: arr[1],
            M: myData[i]
        }
        const index = {
            A: 0,
            B: 0,
            M: 0
        }
        let scoreBoard = {
            A: 0,
            B: 0,
            M: 0
        }

        // 처음 시작 순서
        let que = ['M', 'A', 'B']
        // 우승자가 나올 때까지 가위바위보 한다.
        while(Math.max(...Object.values(scoreBoard)) < K && index.M < data.M.length) {
            // que 에서 두명을 뽑아 가위바위보
            let person1 = que.shift()
            let person2 = que.shift()
            let index1 = index[person1]
            let index2 = index[person2]
            let data1 = data[person1][index1] - 1 // 낼 것
            let data2 = data[person2][index2] - 1

            index[person1] ++
            index[person2] ++
            // 1이 이겼을 때
            if(table[data1][data2] === 2) {
                scoreBoard[person1] += 1
                que.push(person1)
                que.push(person2)
            }
            // 2가 이겼을 때
            else if(table[data1][data2] === 0) {
                scoreBoard[person2] += 1
                que.push(person2)
                que.push(person1)
            }
            // 'M' 은 비기면 진거랑 같다.
            else {
                if(person1 === 'M') {
                    scoreBoard[person2] += 1
                    que.push(person2)
                    que.push(person1)
                }
                else if(person2 === 'M') {
                    scoreBoard[person1] += 1
                    que.push(person1)
                    que.push(person2)
                }
                else if(person1 === 'A' && person2 === 'B') {
                    scoreBoard[person2] += 1
                    que.push(person2)
                    que.push(person1)
                }
                else if(person1 === 'B' && person1 === 'A') {
                    scoreBoard[person1] += 1
                    que.push(person1)
                    que.push(person2)
                }
            }
        }
        if(scoreBoard.M === K) {
            console.log(1)
            return
        }
    }
    console.log(0)
}

const getPermutations= function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]);

    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index+1)]
        const permutations = getPermutations(rest, selectNumber - 1);
        const attached = permutations.map((permutation) => [fixed, ...permutation]);
        results.push(...attached);
    });

    return results;
};

run()
