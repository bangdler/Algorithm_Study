/*
Write a function called coinChange which accepts two parameters: an array of denominations and a value.
The function should return the number of ways you can obtain the value from the given collection of denominations.
You can think of this as figuring out the number of ways to make change for a given value from a supply of coins.
 */

function coinChange(denominations, money) {
  // https://withhamit.tistory.com/333
  // 도미네이션 = 코인 종류
  // 작은 코인부터 경우의 수를 누적한다.
  // 3원을 1, 2원 코인으로 만드는 경우 => 이전까지 누적된(1원으로) 3원을 만드는 경우의 수 + 누적된 1원(3-2)을 만드는 경우의 수
  // 0원을 만드는 경우의 수 memo[0] = 1 로 둔다.
  const memo = new Array(money + 1).fill(0);
  memo[0] = 1;
  // 코인 배열은 오름차순이라고 가정, 적은 코인부터 경우의 수를 누적한다.
  denominations.forEach(coin => {
    for (let i = 1; i <= money; i++) {
      if (coin > i) continue;
      memo[i] = memo[i] + memo[i - coin];
    }
  });
  return memo[money];
}

const denominations = [1, 5, 10, 25];

coinChange(denominations, 1); // 1
coinChange(denominations, 2); // 1
coinChange(denominations, 5); // 2
coinChange(denominations, 10); // 4
coinChange(denominations, 25); // 13
coinChange(denominations, 45); // 39
coinChange(denominations, 100); // 242
coinChange(denominations, 145); // 622
coinChange(denominations, 1451); // 425663
coinChange(denominations, 14511); // 409222339
