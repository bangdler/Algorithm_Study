
// 배열을 순회하면서 가장 작은 값의 index 를 구하고 맨 앞부터 swap 한다.
// 시간복잡도 O(N^2)
// 버블소트보다 효율적이진 않지만 swap 횟수를 적게 하고 싶은 경우 사용할 수 있다.

function selectionSort(array) {

    const swap = (array, idx1, idx2) => {
        return [array[idx1], array[idx2]] = [array[idx2], array[idx1]]
    }

    for(let i = 0; i < array.length - 1; i++) {
        let minIdx = i
        for(let j = i+1; j < array.length; j++) {
            if(array[j] < array[minIdx]) {
                minIdx = j
            }
        }
        if(i !== minIdx) {
            console.log(array, 'swap!', array[i], array[minIdx])
            swap(array, i, minIdx)
        }
    }

    return array
}

selectionSort([1, 10, 4, 8])