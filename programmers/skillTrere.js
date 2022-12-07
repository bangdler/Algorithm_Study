// https://school.programmers.co.kr/learn/courses/30/lessons/49993#fnref1

function solution(skill, skill_trees) {
  let answer = 0;

  const check = (skill, tree) => {
    const queue = skill.split('');
    for (let i = 0; i < tree.length; i++) {
      const cur = tree[i];
      if (!queue.includes(cur)) continue;
      if (cur === queue.shift()) continue;
      return 0;
    }
    return 1;
  };

  for (let tree of skill_trees) {
    answer += check(skill, tree);
  }
  return answer;
}

// 정규식 활용한 풀이법
// 정규식으로 skill 이 아닌 글자는 다 지운다.
// indexOf 로 replace 된 tree 단어가 skill 에 존재하고 발견된 index 가 첫번째 인덱스 0 인 것만 찾는다.

function solution2(skill, skill_trees) {
  var answer = 0;
  var regex = new RegExp(`[^${skill}]`, 'g');

  return skill_trees
    .map(x => x.replace(regex, ''))
    .filter(x => {
      return skill.indexOf(x) === 0 || x === '';
    }).length;
}

const skill = 'CBD';
const tree = ['BACDE', 'CBADF', 'AECB', 'BDA', 'CDAB'];

solution2(skill, tree);
