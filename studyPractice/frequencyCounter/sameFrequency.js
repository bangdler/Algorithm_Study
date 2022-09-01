//Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.
// Your solution MUST have the following complexities:
//
// Time: O(N)
//
// Sample Input:
//
// sameFrequency(182,281) // true
// sameFrequency(34,14) // false
// sameFrequency(3589578, 5879385) // true
// sameFrequency(22,222) // false

function sameFrequency(num1, num2) {
    let nums = {}
    if(num1.length !== num2.length) return false;
    for(let num of num1.toString()) {
        if(nums[num]) {
            nums[num] += 1;
            continue;
        }
        nums[num] = 1;
    }

    for(let num of num2.toString()) {
        if(!nums[num]) return false;
        nums[num] -= 1;
    }

    return true;
}

console.log(sameFrequency(182,281))