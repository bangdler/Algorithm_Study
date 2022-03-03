
// N명에게 각각 다섯 장의 카드가 주어졌을 때, 세 장의 카드를 골라 합을 구한 후 일의 자리 수가 가장 큰 사람을 찾는 프로그램을 작성하시오.
// 가장 큰 수를 갖는 사람이 두 명 이상일 경우에는 번호가 가장 큰 사람의 번호를 출력한다.
// 게임에서 이긴 사람의 번호를 첫 번째 줄에 출력한다.

// './test_2303.txt'
function getInput() {
    const fs = require('fs');
    const input=fs.readFileSync('./test_2303.txt').toString().trim().split(/\n/).map((x) => x.split(' ').map((x)=>Number(x)));
    return input;
}

function readline() {
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let inputArr = [];
    rl.on('line', function(line) {
        const input = line.toString().trim().split(' ').map((x)=>Number(x));
        inputArr.push(input)
    })
    rl.on('close', function() {
        return run(inputArr)
    })
}

// n 명의 사람, 한명씩 순회하면서 가진 카드 5장으로 3장 조합을 만든다.
// 각 조합 합/10 중 가장 큰 수를 board 에 번호와 점수를 기록하고 보드를 순회하면서 가장 큰 점수를 기록한 사람의 번호를 찾는다.

function run(input) {
    const number = input[0];
    let scoreBoard = {};
    for(let i = 1; i <= number; i++) {
        const nstPerson = input[i];
        const cardCombinations = getCombination(nstPerson, 3);
        cardCombinations.forEach((combination) => {
            const sum = combination.reduce((acc, cur) => {
                return acc + cur;
            })
            const score = sum % 10;
            if(scoreBoard[i] === undefined) {
                scoreBoard[i] = score
            }
            else if(score > scoreBoard[i]) {
                scoreBoard[i] = score;
            }
        })
    }
    let winner = [0,0];
    for(let key in scoreBoard) {
        if(scoreBoard[key] >= winner[1]) {   // 등호 붙여야함!
            winner[0] = key;
            winner[1] = scoreBoard[key];
        }
    }
    console.log(winner[0])
}

function getCombination(arr, selectNum) {
    let results = [];

    if(selectNum === 1) return arr.map((value) => [value]);

    arr.forEach(function(fixed, idx, origin){
        const rest = origin.slice(idx + 1);
        const combinations = getCombination(rest, selectNum - 1);
        const attached = combinations.map((combination) => ([fixed, ...combination]));
        results.push(...attached)
    })

    return results;
}

readline();