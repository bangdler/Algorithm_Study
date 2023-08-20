function solution(users, emoticons) {
  const sales = [10, 20, 30, 40];

  // 완전탐색으로 할인율 모든 조합 구하기
  const salesArr = [];
  const getSalesArr = (n, arr) => {
    if (n === emoticons.length) {
      salesArr.push(arr);
      return;
    }
    for (let sale of sales) {
      const newArr = [...arr, sale];
      getSalesArr(n + 1, newArr);
    }
  };
  getSalesArr(0, []);

  // 할인율 조합에 따른 가입자수, 총금액
  const results = [];

  for (let sales of salesArr) {
    let plusCount = 0;
    let totalMoney = 0;
    for (let [userSale, limit] of users) {
      let curMoney = 0;
      for (let i = 0; i < sales.length; i++) {
        let sale = sales[i];
        if (sale >= userSale) {
          curMoney += (emoticons[i] * (100 - sale)) / 100;
        }
      }
      if (curMoney >= limit) {
        plusCount += 1;
      } else {
        totalMoney += curMoney;
      }
    }
    results.push([plusCount, totalMoney]);
  }

  results.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return b[0] - a[0];
  });

  return results[0];
}

solution(
  [
    [40, 10000],
    [25, 10000],
  ],
  [7000, 9000],
);
