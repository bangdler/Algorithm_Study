//https://school.programmers.co.kr/learn/courses/30/lessons/42842

function solution(brown, yellow) {
    const answer = [];

    // yellow 약수쌍 찾기
    const yellowDivisors = []
    for(let i = 1; i <= Math.sqrt(yellow); i++) {
        if(yellow % i === 0) {
            yellowDivisors.push([i, yellow / i])
        }
    }

    yellowDivisors.forEach((divisor) => {
        const requiredBrown = ((divisor[0] + 2) * (divisor[1] + 2)) - yellow
        if(requiredBrown === brown) {
            answer.push(divisor[1]+2, divisor[0]+2)
        }
    })

    return answer;
}

const brown = 10
const yellow = 2

console.log(solution(brown,yellow))
