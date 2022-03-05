
// 눈사람 만들기 대회를 연다. 앞마당의 길이는 N이고 위치 1부터 위치 N까지만 눈이 쌓여있다.
// 위치 i에 눈이 a_i만큼 쌓여있다. 대회 규칙은 해당 앞마당에서 M초 동안 눈덩이를 굴려 눈사람을 만드는 것이다.
// 눈덩이의 시작 크기는 1이다. 눈덩이의 시작 위치는 0이다.
//
// 눈덩이를 굴리는 방법에는 두 가지가 있다. 눈덩이를 굴리거나 던질 때 1초가 소모된다.
//
// 눈덩이를 현재 위치 +1칸으로 굴린다. 현재 칸의 위치를 i라고 하면 눈덩이의 크기는 a_{i+1} 만큼 늘어난다.
// 눈덩이를 현재 위치 +2칸으로 던진다. 눈덩이가 착지하며 눈덩이의 크기는 원래의 크기의 반으로 줄어들고 현재 칸의 위치를 i라고 하면 눈덩이의 크기는 a_{i+2} 만큼 늘어난다.
// 이 때 소수점은 절사한다. 눈덩이를 던져 크기가 0이 되어도 눈덩이는 사라지지 않는다.
// 눈덩이가 앞마당의 끝에 도달한 경우 남은 시간과 관계없이 눈덩이 굴리기는 끝이 난다. 대회 시간 내에 가장 크게 만들 수 있는 눈덩이의 크기를 구하는 프로그램을 작성해보자.

// 첫째 줄에 공백을 기준으로 앞마당의 길이 N (1 <= N <= 100), 대회의 시간 M (1 <= M <= 10)이 주어진다.
// 둘째 줄에 길이가 N인 수열 a가 주어진다. (1 <= a_i <= 1,000,000)

function getInput() {
    const fs = require('fs');
    const input=fs.readFileSync('./test_21735.txt').toString().trim().split(/\n/).map(x => x.split(' ').map(x => Number(x)));
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
        let input = line.toString().trim().split(' ').map(x => Number(x));
        inputArr.push(input)
    })
    rl.on('close', function() {
        return run2(inputArr)
    })
}

function run(input) {

    const [N, M] = input[0];
    const snowArray = input[1]

    let maxSize = 0;
    // M 은 10 이하이므로 모든 경우의 수 (던지거나, 굴리거나) 는 최대 2^10
    // 2 ^ M - 1까지를 이진수로 바꾼다.
    const caseNum = 2 ** (M) -1;

    for (let i = 0; i <= caseNum; i++) {
        let currentBinArr = i.toString(2).split('').map(x => Number(x))
        let currentCase = fillZero(M, currentBinArr)
        let index = -1;
        let size = 1;

        currentCase.forEach(snowWork => {
            if(snowWork === 0) {
                index += 1;
                if(index < N) {
                    size += snowArray[index]
                }
            }
            else {
                index += 2;
                if(index < N) {
                    size = Math.floor(size / 2) + snowArray[index]
                }
            }
        })

        if(size > maxSize) {
            maxSize = size;
        }
    }
    console.log(maxSize)
}

function fillZero(width, arr){
    if( arr.length < width  ) {
        const fillArray = new Array(width - arr.length).fill(0)
        return [...fillArray, ...arr]
    }
    return arr;
}

// 재귀로 풀어보기
function run2(input) {
    const [N, M] = input[0];
    // 처음 위치는 0
    const snowArray = [0, ...input[1]]

    let snowSizeArr = [];

    function makeSnowMan(time, size, index) {
        if(time >= M || index >= N) {
            // 마지막에 던지는 경우 snowArr 영역 밖의 값을 더하면 NaN 이 되므로 이 경우는 제외해줘야 함.
            if(!isNaN(size)) snowSizeArr.push(size)
            return
        }

        for(let i = 0; i < 2; i++) {
            if(i === 0) {
                makeSnowMan(time+1, size + snowArray[index + 1], index + 1)
            }
            else {
                makeSnowMan(time+1, Math.floor(size / 2) + snowArray[index + 2], index + 2)
            }
        }
    }

    makeSnowMan(0, 1, 0)

    const maxSnow = Math.max(...snowSizeArr)
    console.log(maxSnow)
}


const input = [[3, 5], [1, 3, 4, 5, 6, 7, 8, 10, 12, 14]]

readline();

//run2(input)