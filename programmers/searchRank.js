// https://school.programmers.co.kr/learn/courses/30/lessons/72412

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);
  while (left <= right) {
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;

    mid = Math.floor((left + right) / 2);
  }
  return mid + 1;
};

// 풀이 참조함.
function solution(info, query) {
  const answer = [];
  // javabackendjuniorpizza와 같은 형태의 key, score[] 를 가지는 객체로 변환
  const infos = {};
  for (let i of info) {
    const arr = i.split(' ');
    const score = Number(arr.pop());
    const key = arr.join('');
    if (infos[key]) infos[key].push(score);
    else infos[key] = [score];
  }
  for (let key in infos) {
    infos[key].sort((a, b) => a - b);
  }
  //' and '와 ' '와 '-' 기준으로 split 후 '' 제거
  // [[ 'java', 'backend', 'junior', 'pizza', '100' ], ...]
  const parsedQueries = query.map(q => {
    return q.split(/ and | |-/i).filter(v => v !== '');
  });

  const infosKey = Object.keys(infos);
  for (let options of parsedQueries) {
    const score = options.pop();
    // 현재 query 모든 옵션을 포함하는 infos 의 key 를 찾는다. 각 key 의 배열마다 score 이상인 것의 개수를 구한다.
    const filteredKey = infosKey.filter(hashKey => options.every(option => hashKey.includes(option)));
    const num = filteredKey.reduce((acc, curKey) => acc + infos[curKey].length - binarySearch(infos[curKey], score), 0);
    answer.push(num);
  }

  return answer;
}

// score 를 제외한 query sentence 를 key 로 캐싱한다.
// 효율성에서 시간초과 -> 마지막 filter 에서 오래걸림.
function solution_fail(info, query) {
  const answer = [];
  const infos = info
    .map(person => person.split(' '))
    .map(x => {
      x[4] = +x[4];
      return x;
    });
  const cache = {};
  for (let order of query) {
    const [sentence, scoreStr] = order.split(/(\d+)$/);
    const score = +scoreStr;
    let num = 0;
    const cachedArray = cache[sentence];
    if (cachedArray) {
      num = cachedArray.filter(x => x >= score).length;
    } else {
      const [langQ, jobQ, expQ, foodQ] = sentence.split('and').map(x => x.replace(/\s/g, ''));
      let array = infos.slice();
      array = array.filter(([lang, job, exp, food]) => {
        if (langQ !== '-' && langQ !== lang) return false;
        if (jobQ !== '-' && jobQ !== job) return false;
        if (expQ !== '-' && expQ !== exp) return false;
        if (foodQ !== '-' && foodQ !== food) return false;
        return true;
      });
      cache[sentence] = array.map(x => x[4]);
      num = cache[sentence].filter(x => x >= score).length;
    }
    answer.push(num);
  }
  return answer;
}

const info = [
  'java backend junior pizza 150',
  'python frontend senior chicken 210',
  'python frontend senior chicken 150',
  'cpp backend senior pizza 260',
  'java backend junior chicken 80',
  'python backend senior chicken 50',
];

const query = [
  'java and backend and junior and pizza 100',
  'python and frontend and senior and chicken 200',
  'cpp and - and senior and pizza 250',
  '- and backend and senior and - 150',
  '- and - and - and chicken 100',
  '- and - and - and - 150',
];

console.log(solution(info, query));
