// https://www.hackerrank.com/challenges/climbing-the-leaderboard/problem?isFullScreen=true

// rank 배열을 뒤에서부터 탐색하여 업데이트하고 맞는 랭크 찾기
function climbingLeaderboard(ranked, player) {
  // Write your code here
  const setRanked = [...new Set(ranked)];
  let rank = setRanked.length - 1;
  const results = [];
  for (let score of player) {
    while (rank > 0 && score > setRanked[rank]) {
      rank--;
    }
    score < setRanked[rank] ? results.push(rank + 2) : results.push(rank + 1);
  }

  return results;
}

// 이분탐색: case 6 7 8 시간초과
function climbingLeaderboard_fail(ranked, player) {
  // Write your code here
  const setRanked = [...new Set(ranked)];

  // 이분탐색으로 들어갈 위치 찾기
  const descendingArrBinarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;
    if (target > arr[left]) {
      return left;
    }
    if (target < arr[right]) {
      return right + 1;
    }
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const cur = arr[mid];
      if (cur === target) {
        return mid;
      }
      if (cur < target) {
        right--;
      } else {
        left++;
      }
    }
    return right;
  };

  const results = [];
  for (let score of player) {
    results.push(descendingArrBinarySearch(setRanked, score) + 1);
  }

  return results;
}

const ranked = [100, 100, 50, 40, 40, 20, 10];
const player = [5, 25, 50, 120];

console.log(climbingLeaderboard(ranked, player));
