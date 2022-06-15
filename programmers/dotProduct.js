function solution(a, b) {
    const answer = a.reduce((acc, cur, idx) => {
        const sumValue = cur * b[idx]
        return acc + sumValue
    }, 0);
    return answer;
}

const a = [1,2,3,4]
const b = [-3,-1,0,2]

solution(a, b)