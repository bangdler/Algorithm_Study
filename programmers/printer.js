function solution(priorities, location) {
    let sequence = 0;
    let index = 0

    while(Math.max(...priorities)) {
        let maxPriority = Math.max(...priorities);

        if(index >= priorities.length) {
            index = 0;
        }
        if(!priorities[index]) {
            index ++
            continue;
        }
        if(priorities[index] === maxPriority) {
            priorities[index] = 0
            sequence ++
            if(location === index) {
                return sequence
            }
            index ++
        }
        else {
            index ++
            continue;
        }
    }
}

const test_priorities = [1, 1, 9, 1, 1, 1]
const test_location = 0

console.log(solution(test_priorities, test_location))