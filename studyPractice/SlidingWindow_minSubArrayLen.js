// Write a function called minSubArrayLen which accepts two parameters - an array of positive integers and a positive integer.
//
// This function should return the minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function.
// If there isn't one, return 0 instead.
// Examples:
//
// minSubArrayLen([2,3,1,2,4,3], 7) // 2 -> because [4,3] is the smallest subarray
// minSubArrayLen([2,1,6,5,4], 9) // 2 -> because [5,4] is the smallest subarray
// minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) // 1 -> because [62] is greater than 52
// minSubArrayLen([1,4,16,22,5,7,8,9,10],39) // 3
// minSubArrayLen([1,4,16,22,5,7,8,9,10],55) // 5
// minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11) // 2
// minSubArrayLen([1,4,16,22,5,7,8,9,10],95) // 0
// Time Complexity - O(n)
// Space Complexity - O(1)

// N2 해결법인듯?
function minSubArrayLen(array, targetNum) {
    if(!array.length) return 0
    if(Math.max(...array) >= targetNum) return 1
    for(let n = 2; n < array.length; n++) {
        let maxSum = 0;
        let temp = 0;
        for(let j = 0; j < n; j++) {
            maxSum += array[j]
        }
        temp = maxSum
        for(let i = n; i < array.length; i++) {
            temp = temp - array[i-n] + array[i]
            maxSum = Math.max(temp, maxSum)
            if(maxSum >= targetNum) return n
        }
    }
    return 0
}

// 해설 보고 구현 O(N) 맞나..?
function minSubArrayLen2(array, target) {
    let start = 0;
    let end = 0;
    let sum = 0;
    let minLen = Infinity;

    while(start < array.length) {
        // if current window doesn't add up to the given sum then move the window to right
        if(sum < target && end < array.length) {
            sum += array[end]
            end ++
        }
        // if current window adds up to at least the sum given then we can shrink the window
        // 이부분에서 window 가 슬라이딩 된다.
        else if(sum >= target) {
            minLen = Math.min(end-start, minLen)
            sum -= array[start]
            start ++
        }
        // current total less than required total but we reach the end, need this or else we'll be in an infinite loop
        else {
            break;
        }
    }
    return minLen === Infinity ? 0 : minLen
}

console.log(minSubArrayLen([2,3,1,2,4,3], 7))
console.log(minSubArrayLen([2,1,6,5,4], 9)) // 2 -> because [5,4] is the smallest subarray
console.log(minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52)) // 1 -> because [62] is greater than 52
console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10],39))// 3
console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10],55)) // 5
console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)) // 2
console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10],95)) // 0