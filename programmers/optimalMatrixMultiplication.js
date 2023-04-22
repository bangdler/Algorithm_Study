// https://school.programmers.co.kr/learn/courses/30/lessons/12942

// 못풀어서 풀이 참조함... dp 문제로 점화식을 구하는 것이 관건.
// https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.4-%EC%B5%9C%EC%A0%81%EC%9D%98-%ED%96%89%EB%A0%AC-%EA%B3%B1%EC%85%88-JS
// 행렬의 곱셈은 행렬을 어떤 형태로 결합하여 곱하냐에 따라 최소연산값이 변경된다.
// i번째 행렬부터 j번째 행렬까지 곱셈의 최소값을 dp[i][j] 로 나타낸다.
// dp[i][j] 는 i~j 사이의 행렬 k 를 기준으로 묶어서 곱한 값들로 나타낼 수 있고, 그 값들 중에 최소값이다.
// k 를 기준으로 묶어서 곱한 값은 "i~k 까지의 최소값 + k+1~j 까지의 최소값 + 묶은 두 행렬을 곱한 값"으로 나타낼 수 있다.
// => dp[i][k] + dp[k+1][j] + i행렬[0] * k+1행렬[0](또는 k행렬[1]) * j행렬[1]
// 즉, dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + ( matrix[i][0] * matrix[k+1][0] * matrix[j][1] ))
// 위의 점화식을 사용하여 dp 행렬을 채운다. 그리고 dp[0][n-1] 을 반환하면 끝.
// 모든 경우의 수를 채우기 위해서는 모든 시작점 ~ 모든 끝점의 경우에 모든 중간점을 확인해야 한다.

function solution(matrix_sizes) {
  const N = matrix_sizes.length;
  // 초기 dp 배열, i=j 같은 경우만 0, 나머지는 Infinity
  const dp = Array.from({ length: N }, (_, i) => {
    return Array.from({ length: N }, (_, j) => {
      return i === j ? 0 : Infinity;
    });
  });

  // 특정 시작점에서 +1부터 n-1까지 끝점을 정한다.
  for (let i = 1; i < N; i++) {
    for (let start = 0; start < N; start++) {
      const end = start + i;
      if (end >= N) break;
      // 시작점, 끝점이 정해진 상태에서 모든 중간점에 대해 연산횟수를 구하고, 최소값을 할당한다.
      for (let mid = start; mid < end; mid++) {
        dp[start][end] = Math.min(
          dp[start][end],
          dp[start][mid] + dp[mid + 1][end] + matrix_sizes[start][0] * matrix_sizes[mid + 1][0] * matrix_sizes[end][1],
        );
      }
    }
  }

  return dp[0][N - 1];
}

console.log(
  solution([
    [5, 3],
    [3, 10],
    [10, 6],
  ]),
);
