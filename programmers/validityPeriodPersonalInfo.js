// https://school.programmers.co.kr/learn/courses/30/lessons/150370

function solution(today, terms, privacies) {
  const answer = [];
  const term_dic = {};
  for (let term of terms) {
    const [str, num] = term.split(' ');
    term_dic[str] = +num;
  }
  const validate = (today, register, validityPeriod) => {
    const [curY, curM, curD] = today;
    const [registerY, registerM, registerD] = register;
    const diffM = (curY - registerY) * 12 + (curM - registerM);
    const diffD = curD - registerD;
    if (diffM > validityPeriod) return false;
    if (diffM === validityPeriod && diffD >= 0) return false;
    return true;
  };

  const todaySplit = today.split('.').map(Number);
  for (let i = 0; i < privacies.length; i++) {
    const privacy = privacies[i];
    const [register, term] = privacy.split(' ');
    if (validate(todaySplit, register.split('.').map(Number), term_dic[term])) continue;
    answer.push(i + 1);
  }
  return answer;
}

const test = ['2022.05.19', ['A 6', 'B 12', 'C 3'], ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C']]; // [1, 3]
console.log(solution(test[0], test[1], test[2]));
