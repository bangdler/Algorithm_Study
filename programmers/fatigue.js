// https://school.programmers.co.kr/learn/courses/30/lessons/87946

// 백트래킹을 이용한 완전탐색
function solution(k, dungeons) {
  let answer = 0;

  const n = dungeons.length;
  const search = (first = 0, curFatigue = k) => {
    if (first === n || curFatigue <= 0) {
      answer = Math.max(answer, first);
      return;
    }

    for (let i = first; i < n; i++) {
      let temp = dungeons[i]; // [필요피로도, 소모피로도]
      // 필요 피로도가 현재 피로도보다 크면 다음으로 넘어간다.
      if (curFatigue < temp[0]) {
        answer = Math.max(answer, first);
        continue;
      }

      dungeons[i] = dungeons[first];
      dungeons[first] = temp;

      search(first + 1, curFatigue - temp[1]);

      dungeons[first] = dungeons[i];
      dungeons[i] = temp;
    }
  };

  search();
  return answer;
}

// visited 를 사용한 완전탐색 풀이
function solution2(k, d) {
  const N = d.length;
  const visited = new Array(N).fill(0);
  let ans = 0;

  function dfs(k, cnt) {
    ans = Math.max(cnt, ans);

    for (let j = 0; j < N; j++) {
      if (k >= d[j][0] && !visited[j]) {
        visited[j] = 1;
        dfs(k - d[j][1], cnt + 1);
        visited[j] = 0;
      }
    }
  }

  dfs(k, 0);
  return ans;
}

const k = 80;
const dungeons = [
  [80, 20],
  [50, 40],
  [30, 10],
];

console.log(solution(k, dungeons));
