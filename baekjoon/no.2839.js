
// 상근이는 요즘 설탕공장에서 설탕을 배달하고 있다. 상근이는 지금 사탕가게에 설탕을 정확하게 N킬로그램을 배달해야 한다.
// 설탕공장에서 만드는 설탕은 봉지에 담겨져 있다. 봉지는 3킬로그램 봉지와 5킬로그램 봉지가 있다.
// 최대한 적은 봉지를 들고 가려고 한다. 예를 들어, 18킬로그램 설탕을 배달해야 할 때, 5킬로그램 3개와 3킬로그램 1개를 배달하면, 더 적은 개수의 봉지를 배달할 수 있다.
// 상근이가 설탕을 정확하게 N킬로그램 배달해야 할 때, 봉지 몇 개를 가져가면 되는지 그 수를 구하는 프로그램을 작성하시오.
// 상근이가 배달하는 봉지의 최소 개수를 출력한다. 만약, 정확하게 N킬로그램을 만들 수 없다면 -1을 출력한다.

function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 2839
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `test_${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim();
    return input;
}


// 1~5 Kg 일 때 최소 가방 수는 정해놓는다.
// 6부터는 아래 순서로 구한다. (메모이제이션)
// 1. 5를 뺀다. 뺀 무게의 최소 가방 수가 -1 이 아니면, 그 때 최소 개수 + 1 을 한다.
// 2. 3을 뺀다. 뺀 무게의 최소 가방 수가 -1 이 아니면, 그 때 최소 개수 + 1 을 한다.
// 5kg 를 먼저 계산해야 최소 가방 수가 구해진다. (15kg 같이 10kg, 12kg 가 다른 경우)



function getMinBags () {
    let inputNum = getInput();
    // 1 ~ 5 kg 은 초기 설정해준다. 0 은 index 를 맞추기 위함.
    let memoArr = [0, -1, -1, 1, -1, 1]

    for(let i = 6; i <= inputNum; i++) {
        let minBag;
        if(memoArr[i - 5] !== -1) {
            minBag = memoArr[i - 5] + 1;
        }
        else if(memoArr[i - 3] !== -1) {
            minBag = memoArr[i - 3] + 1;
        }
        else {
            minBag = -1
        }
        memoArr.push(minBag)
    }
    console.log(memoArr[inputNum])
}

getMinBags()
