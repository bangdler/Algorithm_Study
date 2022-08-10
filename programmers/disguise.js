// https://school.programmers.co.kr/learn/courses/30/lessons/42578

function solution(clothes) {

    let table = {}

    clothes.forEach(clothe => {
        let [name, type] = clothe
        table[type] = table[type]? table[type] + 1 : 1;
    })

    const allCases = Object.values(table).reduce((acc, cur) => {
        return acc * (cur + 1)
    }, 1)

    return allCases - 1;
}

const clothes =  [["yellow_hat", "headgear"], ["blue_sunglasses", "eyewear"], ["green_turban", "headgear"]]

console.log(solution(clothes))