
// 큰 수 더하기
// 32비트 정수 = 2^31 - 1 (2,147,483,647)
// 한자리는 음수/양수 표기를 위함. 31개 자리로 숫자 표현.

// 비트 더하듯이 한자리씩 더해서 carry 를 구하고 같이 더해준다.

// fs 로 하니 런타임에러가 나서 readline 으로 수정.
// /dev/stdin
function bigAdd() {
    // const fs = require('fs');
    // const input = fs.readFileSync("./test.txt").toString().split(' ');
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let data = [];
    rl.on('line', function (line){
        data = line.split(' ').map((el) => el);
        rl.close(); // 종료이벤트 발생
    });
    rl.on('close', function(){
        const A = data[0].split('').reverse();
        const B = data[1].split('').reverse();
        let answer;
        let result = [];
        let carry = 0;
        const lengthA = A.length;
        const lengthB = B.length;
        let long;
        lengthA >= lengthB? long = lengthA : long = lengthB;
        for(let i = 0; i < long; i++) {
            if(A[i]===undefined) A[i] = 0; // 길이가 안 맞는 경우를 대비해 없는 숫자에는 0을 넣는다.
            if(B[i]===undefined) B[i] = 0;
            const sum = Number(A[i]) + Number(B[i]) + carry;
            const remainder = sum % 10;
            result.push(remainder)
            sum >= 10? carry = 1 : carry = 0;
        }
        if(carry === 1) {
            result.push(1)
        }
        answer = result.reverse().join('')
        console.log(answer)
        process.exit();
    });
}

bigAdd()