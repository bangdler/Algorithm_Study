// https://visualgo.net/en/sorting
// 이상적으로 pivot 은 중간값으로 설정되는 것이 좋다.
// 이번 구현에서는 편의상 첫번째 요소를 pivot

// pivot helper 함수
// 배열을 넣으면 첫번째 요소(pivot) 을 기점으로 작은 값은 왼쪽, 큰 값은 오른쪽으로 보내고 현재 pivot index를 반환한다.
// pivot 이후부터 순회하면서 pivot 보다 작은 수일 경우 pivot index + 1 의 값과 swap 을 해준다. (pivot index ++)
// 순회를 마치면 pivot 과 pivot index 사이에는 pivot 보다 작은 수로만 이루어지게 된다.
// 이후 pivot 과 pivot index만 바꿔주면 pivot 을 기준으로 왼쪽은 작은 수 오른쪽은 큰 수가 된다.

function pivot(array, start = 0, end = array.length - 1) {
  const swap = (array, idx1, idx2) => {
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  };
  let pivot = array[start];
  let pivotIdx = start;
  console.log('===pivot 시작===');
  // left 배열 pivotIndex - 1 로 매개변수 지정하므로 <= end 로 한다.
  for (let i = start + 1; i <= end; i++) {
    if (pivot > array[i]) {
      pivotIdx++;
      console.log('현재 array', array);
      swap(array, pivotIdx, i);
      console.log('pivot 이동', array[pivotIdx], '<->', array[i], array);
    }
  }
  swap(array, start, pivotIdx);
  console.log('최종 pivot 이동', array[start], '<->', array[pivotIdx], array);
  return pivotIdx;
}

// pivot([7,8,5,3,19,4])

// Quick sort
// pivot 정렬할 배열이 1개가 될 때까지 재귀적으로 pivot 을 계속 한다.
// 새로운 배열을 만들지 않고 기존 배열을 정렬한다.

// 시간복잡도
// best : O(NlogN)
// worst : O(N^2) - 오름차순 정렬된 배열일 경우 첫번째 값을 pivot 으로 하기 때문에 pivotIndex 가 1 씩 증가하고, n번의 분할해야함.
// pivot 을 어떤 기준으로 하냐에 따라 다르다.
// 공간복잡도 - O(logN)
function quickSort(array, left = 0, right = array.length - 1) {
  // left = right 이면 정렬한 배열의 길이가 1이라는 의미
  if (left < right) {
    // 정렬한 pivotIndex 를 기점으로 반 씩 다시 정렬
    let pivotIndex = pivot(array, left, right);
    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right);
  }
  console.log('최종', array);
  return array;
}

quickSort([7, 8, 5, 3, 19, 4]);
