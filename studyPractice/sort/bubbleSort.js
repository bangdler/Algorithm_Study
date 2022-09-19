// 한번 순회 마다 제일 큰 수가 오른쪽 끝으로 정렬된다.
// noSwap 변수를 활용해 최적화 - 순회 시 swap 이 없으면 정렬이 완료된 것.
// 시간복잡도 - worst O(N^2), best O(N)

function bubbleSort(array) {
  const swap = (array, idx1, idx2) => {
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  };

  for (let i = array.length; i > 1; i--) {
    let noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      console.log(array, 'will compare', array[j], array[j + 1]);
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        noSwaps = false;
      }
    }
    if (noSwaps) break;
    console.log('one pass complete');
  }
  return array;
}

// ES2015 문법
const swap = (array, idx1, idx2) => {
  return ([array[idx1], array[idx2]] = [array[idx2], array[idx1]]);
};

bubbleSort([13, 12, 15, 2, 4, 34]);
