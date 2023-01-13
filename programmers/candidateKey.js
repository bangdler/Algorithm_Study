// https://school.programmers.co.kr/learn/courses/30/lessons/42890

function solution(relation) {
  let answer = 0;

  // relation 속성값으로 묶은 객체 형태로 변환
  const dic = {};
  relation.forEach(arr => {
    arr.forEach((value, idx) => {
      if (dic[idx]) {
        dic[idx].push(value);
      } else {
        dic[idx] = [value];
      }
    });
  });

  // 속성 인덱스 배열
  const indexes = Object.keys(dic);

  const success = [];
  // 1개부터 relation 길이까지 indexes 의 순열을 구하고, 그 순열마다 dic 값이 중복되지 않는 경우를 찾고 success 에 넣는다.
  for (let i = 1; i <= relation.length; i++) {
    // 순열 구하기
    const comb = combine(indexes.length, i, indexes);

    // 순열 중 후보키 찾기
    for (let j = 0; j < comb.length; j++) {
      const cur = comb[j];
      // 현재 순열이 success 의 순열을 포함하는지 확인
      let check = false;
      for (let suc of success) {
        if (suc.every(key => cur.includes(key))) {
          check = true;
          break;
        }
      }
      if (check) continue;

      // 튜플 조합 만들기. 아래 형식으로 각 속성값을 붙여서 Set 으로 변경하여 비교
      /*
      (['100music','200math', '300computer','400computer', '500music','600music' ])
      */
      const tuple = Array.from({ length: relation.length }, () => '');
      cur.forEach(key => {
        tuple.forEach((_, idx) => {
          tuple[idx] += dic[key][idx];
        });
      });

      // Set 으로 만들어 길이가 줄어든다면 중복되는 값이 있으므로 튜플로 사용 불가능
      if (tuple.length === new Set(tuple).size) {
        answer++;
        success.push(cur);
      }
    }
  }
  return answer;
}

function combine(n, k, arr) {
  const output = [];

  const backtrack = (first = 0, cur = []) => {
    if (cur.length === k) {
      const comb = cur.map(i => i);
      output.push(comb);
      return;
    }

    for (let i = first; i < n; i++) {
      cur.push(arr[i]);

      backtrack(i + 1, cur);

      cur.pop();
    }
  };

  backtrack();

  return output;
}

const relations = [
  ['100', 'ryan', 'music', '2'],
  ['200', 'apeach', 'math', '2'],
  ['300', 'tube', 'computer', '3'],
  ['400', 'con', 'computer', '4'],
  ['500', 'muzi', 'music', '3'],
  ['600', 'apeach', 'music', '2'],
];
const test2 = [
  ['a', '1', 'aaa', 'c', 'ng'],
  ['a', '1', 'bbb', 'e', 'g'],
  ['c', '1', 'aaa', 'd', 'ng'],
  ['d', '2', 'bbb', 'd', 'ng'],
];

const test3 = [
  ['a', 1, 'aaa', 'c', 'ng'],
  ['b', 1, 'bbb', 'c', 'g'],
  ['c', 1, 'aaa', 'd', 'ng'],
  ['d', 2, 'bbb', 'd', 'ng'],
];
console.log(solution(test3));
