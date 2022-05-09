
function solution(numbers, target) {
    let answer = 0;
    let sumArray = []
    function recursive(sum, n, k) {
        for(let i =0; i < 2; i++) {
            if(n === k) return sumArray.push(sum)
            if(i === 0) {
                recursive(sum + numbers[n], n+1, k)
            }
            else {
                recursive(sum - numbers[n], n+1, k)
            }
        }
    }
    recursive(0, 0, numbers.length)

    answer = sumArray.filter(x => x === target).length;

    return answer;
}

const test1 = [1, 1, 1, 1, 1]
const target = 3
console.log(solution(test1, target))