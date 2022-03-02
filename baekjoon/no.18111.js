
// lvalue는 집을 짓기로 하였다. 하지만 고르지 않은 땅에는 집을 지을 수 없기 때문에 땅의 높이를 모두 동일하게 만드는 ‘땅 고르기’ 작업을 해야 한다.
// lvalue는 세로 N, 가로 M 크기의 집터를 골랐다. 집터 맨 왼쪽 위의 좌표는 (0, 0)이다. 우리의 목적은 이 집터 내의 땅의 높이를 일정하게 바꾸는 것이다. 우리는 다음과 같은 두 종류의 작업을 할 수 있다.
// 좌표 (i, j)의 가장 위에 있는 블록을 제거하여 인벤토리에 넣는다.
// 인벤토리에서 블록 하나를 꺼내어 좌표 (i, j)의 가장 위에 있는 블록 위에 놓는다.
// 1번 작업은 2초가 걸리며, 2번 작업은 1초가 걸린다. 밤에는 무서운 몬스터들이 나오기 때문에 최대한 빨리 땅 고르기 작업을 마쳐야 한다. ‘땅 고르기’ 작업에 걸리는 최소 시간과 그 경우 땅의 높이를 출력하시오.
// 단, 집터 아래에 동굴 등 빈 공간은 존재하지 않으며, 집터 바깥에서 블록을 가져올 수 없다. 또한, 작업을 시작할 때 인벤토리에는 B개의 블록이 들어 있다. 땅의 높이는 256블록을 초과할 수 없으며, 음수가 될 수 없다.

// 첫째 줄에 땅을 고르는 데 걸리는 시간과 땅의 높이를 출력하시오. 답이 여러 개 있다면 그중에서 땅의 높이가 가장 높은 것을 출력하시오.

const input = [[3, 4, 99], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1]]]

// 큰 숫자부터 작은 숫자까지 목표 숫자를 정하고 순회하며 맞춰본다.
// 순회 시 목표 숫자보다 작은 경우 인벤토리에서 -1 & 시간 +2, 큰 경우 인벤토리에 +1 & 시간 +1 한다.
// 순회 완료 후 인벤토리가 음수면 넣지 않고, 0 이상이면 정답 객체에 {목표높이 : 걸린 시간} 에 넣는다. 이후부터는 걸린 시간을 비교하여 교체한다.

function flatBlock(inputArr) {
    const [N, M, inventory, ...arr] = inputArr
    let map = [...arr].sort(function(a, b) {
        return b - a;
    });
    //let flatMap = map.flatMap((x) => x)
    let answer = {}
    let maxNum = Math.max(...map);
    let minNum = Math.min(...map);

    // 높이가 같은 경우.
    if (maxNum === minNum) {
        answer['time'] = 0;
        answer['height'] = maxNum;
        console.log(answer['time'], answer['height']);
        return;
    }

    for(let i = maxNum; i >= minNum; i--){
        let targetNum = i;
        let tempTime = 0;
        let invenNum = inventory;
        for(let j = 0; j < map.length; j++) {
            let num = map[j];
            if(num > targetNum) {
                tempTime += 2 * (num - targetNum)
                invenNum += num - targetNum
            }
            else if(num < targetNum) {
                tempTime += 1 * (targetNum - num)
                invenNum -= targetNum - num
                if(invenNum < 0) {
                    break;
                }
            }
        }
        if(invenNum<0) continue;
        if(answer['time'] === undefined) {
            answer['time'] = tempTime;
            answer['height'] = targetNum;
        }
        else {
            if(tempTime < answer['time']) {
                answer['time'] = tempTime;
                answer['height'] = targetNum;
            }
        }
    }
    console.log(answer['time'], answer['height'])
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
        inputArr.push(...input)
    })
    rl.on('close', function() {
        return flatBlock(inputArr)
    })
}

function getInput() {
    const fs = require('fs');
    const input=fs.readFileSync('/dev/stdin').toString().trim().split(/\n/).map((x) => x.split(' ').map((x)=>Number(x)));
    const [n,...arr]=input
    return [n, [...arr]];
}


readline()