
// 정렬된 중복 숫자 배열에서 고유한 숫자의 개수 세기 - 다중 포인터 방법

function countUniqueValues(sortedNumbers){
    let i = 0;
    let j = 1;

    if(!sortedNumbers.length) return 0
    while(j < sortedNumbers.length) {
        if(sortedNumbers[i] === sortedNumbers[j]) {
            j++;
            continue;
        }
        else {
            i++;
            sortedNumbers[i] = sortedNumbers[j]
            j++;
        }
    }
    return i+1
}

countUniqueValues([1,1,1,1,1,2]) // 2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
countUniqueValues([]) // 0
countUniqueValues([-2,-1,-1,0,1]) // 4