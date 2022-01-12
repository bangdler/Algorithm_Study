
// 지민이는 N개의 물병을 가지고 있다. 각 물병에는 물을 무한대로 부을 수 있다. 처음에 모든 물병에는 물이 1리터씩 들어있다.
// 지민이는 이 물병을 또 다른 장소로 옮기려고 한다. 지민이는 한 번에 K개의 물병을 옮길 수 있다.
// 하지만, 지민이는 물을 낭비하기는 싫고, 이동을 한 번보다 많이 하기는 싫다.
// 따라서, 지민이는 물병의 물을 적절히 재분배해서, K개를 넘지 않는 비어있지 않은 물병을 만들려고 한다.
// 먼저 같은 양의 물이 들어있는 물병 두 개를 고른다. 그 다음에 한 개의 물병에 다른 한 쪽에 있는 물을 모두 붓는다. 이 방법을 필요한 만큼 계속 한다.

/* 설계
 1. N 개의 물병에서 물병을 추가하지 않고 최대로 옮길 수 있는 개수는 이진수로 바꿨을 때의 1의 개수와 같다.
 2. N 이진수 1의 개수 > K 이면 물병을 추가해야한다.
 3. 추가했을 경우 Nbin 에서 1의 개수가 하나 줄어든 만큼 커져야 한다.
 4. 앞에서부터 (Nbin 1수 - K) + 1 만큼 1의 개수를 세고 그 때의 index를 기억한다.
 5. 그 index 이후 부터 0 을 1로 바꾼다. 그 전의 값들은 모두 0 이다. 1로 바뀐 값이 없다면 마지막 값으로 1을 더해줘 자리올림한다.
 6. 이진수 배열을 십진수로 바꾼 후 N 을 뺀다.
 */
function getInput() {
    const fs = require('fs');
    const input = fs.readFileSync('/dev/stdin').toString().split(' ');
    return input;
}

function getAddedCup(N, K) {
    const binN = dec2bin(N);
    let minCup = 0;
    binN.forEach((bool) => {
        if(bool) {
            minCup += 1
        }
    })
    if(minCup <= K) return 0;
    let binAddCup = [];
    let diff = minCup - K;
    let numTrue = 0;
    let addIndex = 0;
    // 순차적으로 돌면서 새로운 배열을 만든다.
    // 최소 cup 수와의 차이만큼 1을 줄여야하므로 1의 개수가 diff 보다 클 때까지 0을 넣다가 그 이후의 1을 한번만 1로 바꿔준다.
    // 값을 바꿔준다면 addIndex에 바뀐 위치가 기록되고 그 이후부터는 원래 값을 넣어준다.
    for(let i = 0; i < binN.length; i++) {
        if(numTrue > diff) {
            if(!binN[i] && addIndex === 0) {
                binAddCup.push(true);
                addIndex = i;
            }
            else if(addIndex !== 0) {
                binAddCup.push(binN[i])
            }
            else {
                binAddCup.push(false)
            }
        }
        else {
            binAddCup.push(false)
        }
        if(binN[i]) numTrue += 1;
    }
    // 중간값 중 건드린게 없을 경우 맨 앞에 1을 추가한다. 그리고 그 사이의 값을 모두 0으로 바꿔준다.
    if(addIndex === 0) {
        binAddCup.push(true)
    }
    const totalCup = bin2dec(binAddCup)
    const addedCup = totalCup - N;
    return addedCup;
}

function run() {
    const input = getInput();
    console.log(getAddedCup(input[0], input[1]))
}

//console.log(getAddedCup(10000000 ,3))
run()

function dec2bin(dec) {
    let answer = [];
    let target = dec;
    if(target === 0) answer.push(false);
    while(target !== 0) {
        let remainder = target % 2;
        let quotient = (target - remainder) / 2;
        let bool = (remainder)? true : false;
        target = quotient;
        answer.push(bool)
    }
    return answer;
}

function bin2dec(bin) {
    let answer = 0;
    bin.forEach(function(bool, index) {
        if(bool) {
            answer += 2**index
        }
    })
    return answer;
}

// 위의 방식은 이진법의 아랫자리에서부터 1 을 세어가면서 개수를 맞춰주는 방식인데, 코드 리뷰를 하다보니 윗자리부터 세는게 나은 것 같다.
// 1011 을 1100 으로 바꿔 k=2 를 만족시켜야 할 때, 앞에서부터 1을 세고 두번째 1이 나왔을 때 그 위치의 한단계 앞자리를 올려줘야하므로, 즉 100을 더해주고, 기존의 11을 뺀 값이 더해야할 물병의 수다.
// 1101 (13, 2) 의 경우 두번째 1의 앞자리인 1000(8)을 더하고 101(5) 을 뺀다.

// 백준 속도 1등인 도니 코드 참고용...
// 담긴 리터를 포함하는 물병 개수 배열 bottleArr 를 만들고,
// 배열 길이를 원하는 숫자까지 줄여가면서 다음 물병과의 리터 차이를 답에 더하고 그 더한 리터만큼 기존 물병을 늘려준다. (난 왜 이렇게 간결하게 못 짰는가)
// const fs = require('fs');
// const input = '10000000 3'.split(' ');
// let [bottleLen, moveLen] = [parseInt(input[0]), parseInt(input[1])];
// const bottleArr = [];
// let answer = 0;
//
// for(let liter = 1; bottleLen >= 1; liter *= 2) {
//     if(bottleLen % 2 === 1) {
//         bottleArr.push(liter);
//         bottleLen--;
//     }
//     bottleLen /= 2;
// }
//
// for(let i = 0; bottleArr.length - i > moveLen; i++) {
//     answer += bottleArr[i+1] - bottleArr[i];
//     bottleArr[i+1] *= 2;
//     console.log(bottleArr);
// }