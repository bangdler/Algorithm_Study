function solution(n, lost, reserve) {
    let answer = 0;

    // n 개의 빈 배열을 만든다.
    const students = Array.from({length:n}).fill(1)

    // reserve 를 순회하며 해당 Index 를 가진 students 원소를 +1로 바꾼다.
    reserve.forEach(x => students[x-1] = students[x-1] + 1)

    // lost 를 순회하며 해당 Index 를 가진 students 원소를 -1 해준다.
    lost.forEach(x => students[x-1] = students[x-1] - 1)

    students.forEach((x, idx) => {
        if(x === 0) {
            if(students[idx - 1] === 2) {
                students[idx - 1] = 1
                students[idx] = 1
            }
            else if(students[idx + 1] === 2) {
                students[idx + 1] = 1
                students[idx] = 1
            }
        }
    })

    answer = students.filter(x => x !== 0).length
    return answer
}

const [n, lost, reserve] = [5, [2, 4],[3]]

console.log(solution(n, lost, reserve))