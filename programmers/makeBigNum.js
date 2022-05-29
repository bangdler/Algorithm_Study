function solution(number, k) {
    let answer = '';

    const numberArray =  number.split('').map(Number)
    let deleteNum = 0;
    let stack = [];

    // number 배열을 돌면서 stack 에 하나씩 넣는다. 넣기 전에 기존 stack 값들과 비교한다.
    for(let i = 0; i < numberArray.length; i++) {
        let cur = numberArray[i]
        while(deleteNum < k && stack[stack.length - 1] < cur ) {
            stack.pop();
            deleteNum ++
        }
        stack.push(cur)
    }
    // 11111 와 같은 경우 지워지지 않는다.
    if(deleteNum < k) {
        while(deleteNum < k) {
            stack.pop()
            deleteNum ++
        }
    }
    answer = stack.join('')
    return answer;
}

    // test case 10 시간 초과
    // 처음 숫자와 다음 숫자를 비교한다.
    // 처음 숫자가 다음 숫자보다 작으면 제거한다. 아니면 다음으로 넘어간다.
    // while(deleteNum < k) {
    //     하나 삭제할 때마다 다시 돈다.
    //     for(let i = 0; i < numberArray.length; i++) {
    //         인덱스가 마지막까지 온 경우, 더이상 비교할 게 없음(나머지랑 다 같은 경우) 본인을 지운다.
    //         if(i === numberArray.length - 1) {
    //             const requiredNum = k - deleteNum
    //             numberArray.splice(i-requiredNum+1, requiredNum)
    //             deleteNum += requiredNum
    //         }
    //         뒤에 숫자가 큰 경우
    //         if(numberArray[i] < numberArray[i+1]) {
    //             numberArray.splice(i, 1)
    //             deleteNum ++
    //             break;
    //         }
    //     }
    // }

const number = "4177252841"
const k = 4

console.log(solution(number, k))