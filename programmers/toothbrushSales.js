// https://school.programmers.co.kr/learn/courses/30/lessons/77486

function solution(enroll, referral, seller, amount) {
  // 판매원 - [추천인, 돈] 객체 만들기
  const tree = { '-': [null, 0] };
  for (let i = 0; i < enroll.length; i++) {
    tree[enroll[i]] = [referral[i], 0];
  }

  // 판매원 순회하면서 금액 넣기
  for (let i = 0; i < seller.length; i++) {
    let money = amount[i] * 100;
    let person = seller[i];

    while (person !== '-') {
      const parent = Math.floor(money * 0.1);
      const mine = money - parent;
      if (parent < 1) {
        tree[person][1] += money;
        break;
      } else {
        tree[person][1] += mine;
        money = parent;
        person = tree[person][0];
      }
    }
  }

  const earns = Object.values(tree).map(it => it[1]);
  return earns.splice(1);
}

const test1 = [
  ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
  ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
  ['young', 'john', 'tod', 'emily', 'mary'],
  [12, 4, 2, 5, 10],
  // [360, 958, 108, 0, 450, 18, 180, 1080],
];

console.log(solution(test1[0], test1[1], test1[2], test1[3]));
