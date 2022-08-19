
// 정수 배열에서 정해진 숫자만큼 연속된 값을 더했을 때 최대값 구하기.
// sliding window 방식으로 O(N) 시간복잡도로 구한다.

function maxSubArraySum(array, n) {
    let maxSum = 0;
    let temp = 0;
    if(array.length < n) return null;
    for(let i=0; i < n; i++) {
        maxSum += array[i]
    }
    temp = maxSum;
    for(let i=n; i<array.length; i++) {
        temp = temp - array[i-n] + array[i];
        maxSum = Math.max(maxSum, temp);
    }
    return maxSum
}

const numArray = [2,6,9,2,1,8,5,6,3]

console.log(maxSubArraySum(numArray, 3))  // 8,5,6 일때 19 가 최대값.