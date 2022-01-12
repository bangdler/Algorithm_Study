
// 두점으로 부터 겹칠 수 있는 한 점의 수 구하기
//A 좌표 (x1, y1)와 B 좌표 (x2, y2)가 주어지고, A-C 거리 r1과 B-C 거리 r2가 주어졌을 때, 있을 수 있는 C 좌표의 수를 출력

//첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스는 다음과 같이 이루어져 있다.
// 한 줄에 x1, y1, r1, x2, y2, r2가 주어진다. x1, y1, x2, y2는 -10,000보다 크거나 같고, 10,000보다 작거나 같은 정수이고,
// r1, r2는 10,000보다 작거나 같은 자연수이다.
// 개수가 무한대일 경우에는 -1을 출력

/* 두 원이 만나는 해 구하기.
   두 좌표의 거리 d , 와 각 반지름을 이용한다.
   1) d = 0 (동심원) , r1=r2? -1 : 0
   2) d != 0
      외접 d > r1(큰반지름)
      : r1+r2=d ->1
        r1+r2>d ->2
        r1+r2<d ->0
      내접 d < r1(큰반지름)
        r1-r2=d ->1
        r1-r2>d ->0
        r1-r2<d ->2
 */

//test case ./test_1002.txt
function getInput() {
    const fs = require('fs');
    const input=fs.readFileSync('/dev/stdin').toString().trim().split(/\s+/);
    const [n,...arr]=input
    return [n, ...arr];
}

function run() {
    const input = getInput();
    const n = input[0];
    const data = input.slice(1).map((x) => (Number(x)))
    let index = 0;
    for(let i = 0; i < n; i++) {
        const array = data.slice(index, index+6);
        const answer = getNumberOfMeet(array);
        console.log(answer)
        index = index + 6;
    }
}

function getNumberOfMeet(array) {
    const [x1, y1, r1, x2, y2, r2] = array;
    const d = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
    const R = r1 >= r2? r1 : r2;
    let meetNum = 0;
    if(d === 0) {
        meetNum = r1===r2? -1 : 0;
    }
    else{
        if(d > R) {
            if(r1 + r2 === d) {
                meetNum = 1;
            }
            else if(r1 + r2 > d) {
                meetNum = 2;
            }
            else meetNum = 0;
        }
        else {
            let diff = Math.abs(r1 - r2)
            if(diff === d) {
                meetNum = 1;
            }
            else if(diff > d) {
                meetNum = 0;
            }
            else meetNum = 2;
        }
    }
    return meetNum;
}

//run();

// 백준용 readline

function runBaekjoon() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let data = [];
    rl.on('line', function (line){
        let input = line.trim().split(' ').map((el) => el);
        data.push(...input)

    });
    rl.on('close', function() {
        let n = data[0];
        let dataLocation = data.slice(1).map((x) => (Number(x)))
        let index = 0;
        for (let i = 0; i < n; i++) {
            const array = dataLocation.slice(index, index + 6);
            const answer = getNumberOfMeet(array);
            console.log(answer)
            index = index + 6;
        }
        process.exit();
    })
}

runBaekjoon();