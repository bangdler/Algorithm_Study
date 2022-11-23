//An array A consisting of N integers is given.
// An inversion is a pair of indexes (P, Q) such that P < Q and A[Q] < A[P].
//computes the number of inversions in A, or returns −1 if it exceeds 1,000,000,000.

// 시간복잡도 O(N^2) 로 performance 점수가 낮다. 빅넘버에서 타임아웃
function solution_fail(A) {
  // write your code in JavaScript (Node.js 14)
  const inversions = [];
  for (let i = 0; i < A.length; i++) {
    const cur = A[i];
    for (let j = i; j < A.length; j++) {
      const compare = A[j];
      if (cur > compare) {
        inversions.push([i, j]);
      }
    }
  }
  return inversions.length > 1000000000 ? -1 : inversions.length;
}

// merge sort 를 이용하면 분할 정복 과정에서 inversion 수를 알 수 있다.
// https://frhyme.github.io/algorithms/python_count_inversion_in_lst/
// 시간복잡도 O(NlogN)
function solution(A) {
  let inversion = 0;

  const merge = (arrA, arrB) => {
    let result = [];
    let indexA = 0;
    let indexB = 0;
    while (indexA < arrA.length && indexB < arrB.length) {
      if (arrA[indexA] <= arrB[indexB]) {
        result.push(arrA[indexA]);
        indexA++;
      } else {
        result.push(arrB[indexB]);
        indexB++;
        // 만약 leftSubArray의 i번째 원소가 rightSubArray의 j번째 원소보다 크다면, i번째 원소 뒤에 있는 모든 원소들을 당연히 j번째 원소보다 큰 것이다.
        // 따라서, leftSubArray의 i번째 원소 뒤 쪽으로는 모두 inversion이 발생한 것이다.
        inversion += arrA.length - indexA;
      }
    }
    while (indexA < arrA.length) {
      result.push(arrA[indexA]);
      indexA++;
    }
    while (indexB < arrB.length) {
      result.push(arrB[indexB]);
      indexB++;
    }
    return result;
  };

  const mergeSort = array => {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const leftArr = mergeSort(array.slice(0, mid));
    const rightArr = mergeSort(array.slice(mid));
    return merge(leftArr, rightArr);
  };

  mergeSort(A);
  return inversion > 1000000000 ? -1 : inversion;
}

const arr = [-1, 6, 3, 4, 7, 4];
const arr2 = [5, 4, 3, 2, 1];
console.log(solution(arr2));
