
function solution(answers) {
    let answer = [];

    const one = [1, 2, 3, 4, 5]
    const two = [2, 1, 2, 3, 2, 4, 2, 5]
    const three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]

    const score = {
        1 : 0,
        2 : 0,
        3 : 0
    }

    for(let i = 0; i < answers.length; i++) {
        const curAnswer = answers[i]
        const oneAnswer = one[i % one.length]
        const twoAnswer = two[i % two.length]
        const threeAnswer = three[i % three.length]

        if(curAnswer === oneAnswer) {
            score[1] ++
        }
        if(curAnswer === twoAnswer) {
            score[2] ++
        }
        if(curAnswer === threeAnswer) {
            score[3] ++
        }
    }

    let max = 0
    for (let key in score) {
        if(score[key] > max) {
            answer = [Number(key)]
            max = score[key]
        }
        else if(score[key] === max) {
            answer.push(Number(key))
        }
    }
    return answer;
}

const test1 = [1,2,3,4,5]
const test2 = [1,3,2,4,2]
console.log(solution(test2))