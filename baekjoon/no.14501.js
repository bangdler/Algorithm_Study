
function getInput() {
    const fs = require('fs');
    const path = require('path');

    const numOfProblem = 14501
    const filePath =
        process.platform === 'linux'
            ? '/dev/stdin'
            : path.join(__dirname, `test_${numOfProblem}.txt`);

    const input = fs.readFileSync(filePath).toString().trim().split(/\n/).map((x => x.split(' ').map(Number)));
    return input;
}

// n번째날부터 역순으로 계산한다. n번째 날에 소요 상담 일수가 i 일 일때
// 각 날 + 소요일수가 < n 이어야함.
// n번째날 최대 이익 = if i < n , 수익
// n-1번째날 최대 이익 = n-1 번째날 수익 + (n-1 + i1)번째날 최대 이익
// n-2번째날 최대 이익 = n-2 번째날 수익 + (n-2 + i2)번째날 최대 이익
// 각 날부터 상담을 했을 때에 얻을 수 있는 최대 이익 배열의 최대값 구하기.

function getMaxProfit() {
    const [[n], ...counselArray] = getInput();
    // 0 넣어주면서 일수랑 인덱스 맞춰줌.
    let counselDays = [0];
    let counselProfits = [0];
    let dp = new Array(n+1).fill(0)

    counselArray.forEach(counsel => {
        counselDays.push(counsel[0]);
        counselProfits.push(counsel[1])
    })

    for(let i = n; i > 0; i--) {
        let counselDay = counselDays[i]
        let counselProfit = counselProfits[i]
        let afterCounsel = dp.slice(i+counselDay); // i + counselDay 가 n 보다 큰 경우 [] 이다.
        let afterMaxProfit;
        if(afterCounsel.length > 0) {
            afterMaxProfit = Math.max(...afterCounsel)
        }
        else {
            afterMaxProfit = 0;
        }

        let endDay = i + counselDay - 1;
        // 상담 종료 일자가 마지막 날보다 작으면 종료 이후의 최대 이익 값을 더한 게 현재 시점에서 상담을 시작했을 경우 최대 이익이다.
        if (endDay <= n) {
            dp[i] = counselProfit + afterMaxProfit;
        }
    }

    let maxProfit = Math.max(...dp)
    console.log(maxProfit)
}

getMaxProfit()