
// merge sort 구현을 위한 두 배열 merge 함수
// 정렬된 두 배열을 정렬해서 합친 배열을 반환
// merge sort 에서는 배열 길이가 1개 이하일 때까지 나누기 때문에 정렬된 배열이라고 할 수 있다.
function merge(arr1, arr2) {
    let result = [];
    let idx1 = 0;
    let idx2 = 0;
    while(idx1 < arr1.length && idx2 < arr2.length) {
        if(arr1[idx1] < arr2[idx2]) {
            result.push(arr1[idx1]);
            idx1++;
        }
        else {
            result.push(arr2[idx2]);
            idx2++;
        }
    }
    // 한 쪽 배열 길이가 길어서 아직 남았을 경우 남은 인자를 모두 합친다.
    while(idx1 < arr1.length) {
        result.push(arr1[idx1]);
        idx1++;
    }
    while(idx2 < arr2.length) {
        result.push(arr2[idx2]);
        idx2++;
    }
    return result;
}

console.log(merge([1,2,10],[2,5,7,40,50]))

// 시간복잡도 - worst, average, best 모두 O(NlogN)
// 분할 시 시간복잡도 logN, merge 시 배열 순회하면서 비교하므로 시간복잡도 N
// 공간복잡도 - O(N)
// 재귀 사용하여 분할 및 합병
function mergeSort(array) {
    if(array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const leftArr = mergeSort(array.slice(0, mid));
    const rightArr = mergeSort(array.slice(mid));
    return merge(leftArr, rightArr)
}

console.log(mergeSort([2,1,10,5,24,11,7]))