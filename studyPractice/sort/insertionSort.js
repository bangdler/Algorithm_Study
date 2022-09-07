
// 배열을 순회하면서 왼쪽부터 점점 정렬된 배열로 만든다. 각 요소를 정렬된 배열을 순회하면서 적절한 위치에 넣어준다.
// 시간복잡도 O(N^2)
// 효율은 그닥, 정렬된 상태에서 데이터가 추가되는 경우 추가되는 데이터를 정렬시킬 때 쓸 수 있다.

function insertionSort(array) {
    for(let i = 1; i < array.length; i++) {
        let curValue = array[i]
        // 현재값을 기준으로 왼쪽은 정렬된 배열이다.
        // 정렬된 배열의 오른쪽 끝부터 순회. 현재값보다 정렬배열의 값이 크면 정렬배열의 값을 오른쪽으로 바꿔준다.
        let j;
        for(j = i-1; j >= 0 && array[j] > curValue; j--) {
            console.log('위치 이동', array, array[j], "->", array[j+1])
            array[j+1] = array[j] // array[j] 정렬배열 값을 오른쪽으로 이동
            console.log('이동 완료', array)
        }
        // 현재값을 넣어준다. 현재값이 들어갈 위치는 array[j] < curValue 인 위치의 다음.
        console.log('마지막 바꾸기', array, array[j+1], "<-", curValue)
        array[j+1] = curValue
        console.log('one cycle',array)
    }
    return array
}
function insertionSort_my(array) {
    for(let i = 1; i < array.length; i++) {
        for(let j = 0; j < i; j++) {
            console.log('compare', array[i], array[j])
            if(array[i] < array[j]) {
                let temp = array[i]
                array.splice(i,1) // 정렬되지 않은 배열에서 제거
                console.log('삭제', array)
                array.splice(j,0,temp) // 정렬된 배열에 삽입
                console.log('삽입', array)
                break;
            }
        }
        console.log('one cycle!', array)
    }
    return array
}

insertionSort([1,10,3,2,4])