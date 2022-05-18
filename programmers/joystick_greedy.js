function solution(name) {
    const answers = []

    const asciiNumOfA = 65;
    const asciiNumOfZ = 90;

    // 시작 지점에 따라 달라질 수 있다.
    // ABBBAAAAABA 같은 경우 뒤의 B에서 시작해야 최소이다.
    for(let i = 0; i < name.length; i++) {
        let count = 0;
        //시작 지점까지 움직인 만큼 더해준다.
        if(i < name.length/2) {
            count += i
        }
        else {
            count += name.length - i
        }
        count += getCount(i)
        answers.push(count)
    }

    function getCount(startPoint) {
        let count = 0;
        let pointer = startPoint;
        // 상하 이동 A 가 아닌 경우, A 아스키코드와 차이, Z 아스키코드와 차이 중 작은 값만큼 count를 올려준다.
        // 좌우 이동 pointer 와 현재 index 를 비교
        // pointer 부터 정방향으로 갔을 때 방문하지 않은 글자가 나올 때, 해당 인덱스로 카운트 계산
        // pointer 부터 역방향으로 갔을 때 방문하지 않은 글자가 나올 때, 해당 인덱스로 카운트 계산
        // 두개 비교.

        const visited = new Array(name.length).fill(false)
        // A 는 모두 방문한것으로 가정.
        visited.forEach((bool, idx) => {
            if (name[idx] === 'A') {
                visited[idx] = true
            }
        })
        // 모두 방문할 때까지.
        while (visited.includes(false)) {
            const currentStr = name[pointer]
            //  A 가 아니면 상하 이동 계산
            if(currentStr !== 'A') {
                visited[pointer] = true;
                const curAsciiNum = currentStr.charCodeAt(0)
                const moveUpDown = Math.min((curAsciiNum - asciiNumOfA), (asciiNumOfZ - curAsciiNum + 1))
                count += moveUpDown
            }
            // 오른쪽으로 갔을 때 A 가 아닌 문자의 index
            let nextRightIdx;
            for (let i = 1; i < name.length; i++) {
                let index;
                index = pointer + i
                // 길이 넘어갈 경우 순회
                if(index > name.length - 1) {
                    index -= name.length
                }
                if (visited[index]) {
                    continue;
                }
                // A 아닌 문자 찾았을 때 index 지정
                if (name[index] !== 'A') {
                    nextRightIdx = index;
                    break;
                }
            }

            // 왼쪽도 반복.
            let nextLeftIdx;
            for (let i = 1; i < name.length; i++) {
                let index;
                index = pointer - i
                if(index < 0) {
                    index += name.length
                }
                if (visited[index]) {
                    continue;
                }
                if (name[index] !== 'A') {
                    nextLeftIdx = index;
                    break;
                }
            }

            // 순회해도 A 아닌 문자가 없으면
            if(nextLeftIdx === undefined && nextRightIdx === undefined) {
                break;
            }

            // 좌우 이동 계산
            const rightMove = nextRightIdx - pointer > 0 ? nextRightIdx - pointer : name.length - (pointer - nextRightIdx)
            const leftMove = pointer - nextLeftIdx > 0 ? pointer -nextLeftIdx : name.length - nextLeftIdx + pointer

            if (rightMove <= leftMove) {
                pointer = nextRightIdx
                count += rightMove
            } else {
                pointer = nextLeftIdx
                count += leftMove
            }
        }

        return count;
    }
    return Math.min(...answers)
}

const name = "JAN"
console.log(solution(name))