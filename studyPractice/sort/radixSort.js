// 기수 정렬
// 정수 정렬과 같이 특수한 경우에 사용.
// 다른 정렬과 같이 항목들을 비교하는 방식이 아니라 비교 정렬의 최대 시간 복잡도 nlogn 보다 빠르다는 장점이 있다.
// 0~9 의 자릿수 버킷을 두고 해당 1의 자리부터 순차적으로 해당되는 버킷에 넣어 순서를 만들고 마지막 자리까지 반복하다보면 정렬이 완성된다.

// 헬퍼 함수

// 자릿수에 해당되는 숫자를 구하는 함수, 1의 자리 -> i = 0, 없는 경우 0 반환
function getDigitNum(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}
// console.log(getDigit(123, 1)) // 결과: 2

// 숫자의 자릿수를 구하는 함수
function getDigitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}
//console.log(countDigit(123)) // 결과: 3

// 숫자 배열에서 가장 큰 자릿수를 구하는 함수
function getMaxDigitCount(numArray) {
  return numArray.reduce((acc, cur) => Math.max(acc, getDigitCount(cur)), 0);
}
//console.log(getMostDigitCount([1, 123, 22, 1256, 12312313, 2])) // 결과: 8

// 기수 정렬
// 시간복잡도 : 모두 O(NK), n: 배열 길이, k: 자릿수 길이, 즉 K < logN 이면 다른 정렬보다 효율이 좋다.
// 공간복잡도 : O(N+K)
// 외부 루프 : 최대자릿수만큼 순회, 0~9 까지 자릿수를 담을 빈 버킷 배열을 만들고, 루프마다 내부 루프 순회 후 버킷 배열을 합친 배열로 다시 루프를 돈다.
// 내부 루프 : 각 숫자마다 현재 순회 중인 자릿수의 숫자를 구해 해당 버킷에 담는다.
function radixSort(numArray) {
  let maxDigitCount = getMaxDigitCount(numArray);
  // 0부터 최대자릿수까지 순회
  for (let k = 0; k < maxDigitCount; k++) {
    // 버킷 배열 생성
    let digitBuckets = Array.from({ length: 10 }, () => []);
    // 각 숫자 순회하면서 버킷에 담기
    for (let i = 0; i < numArray.length; i++) {
      const curNum = numArray[i];
      const curDigitNum = getDigitNum(curNum, k);
      digitBuckets[curDigitNum].push(curNum);
    }
    console.log('버켓 담기 완료', digitBuckets);
    // 버켓 합쳐 새 배열 만들기
    numArray = [].concat(...digitBuckets);
    console.log('배열 합치기', numArray);
  }
  console.log('최종 정렬', numArray);
  return numArray;
}
radixSort([12, 2, 1, 24, 222, 32, 2345]);
