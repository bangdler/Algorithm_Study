
// 분할 가능 배낭 문제
// [아이템 번호, 가치, 무게] 로 된 배열로 최대 가치를 가지도록 w 무게만큼 담을 수 있는 배낭 담기.
const test = [[1,60,10], [2,100,20], [3,120,30]];
function fractionalKnapsack(item, w) {
    const sorted = item.sort(function (prev, cur) {
        return cur[1] / cur[2] - prev[1] / prev[2]; // 무게 대비 가치 순으로 정렬
    })
    let capacityWeight = w;
    let result = 0;
    for(let i = 0; i < sorted.length; i++) {
        const cur = sorted[i];
        if (capacityWeight > 0) {          // 가방 여유가 0 이상이어야 넣는다.
            if (capacityWeight < cur[2]) { // 여유가 현재 아이템 무게보다 작다면 넣을 수 있을 만큼만 쪼개서 넣는다.
                result += cur[1] / cur[2] * capacityWeight
                capacityWeight = 0;
            }
            else {                          // 아이템 전부를 넣을 여유가 되면 다 넣는다.
                result += cur[1]
                capacityWeight -= cur[2]
            }
        }
        else {
            break;
        }
    }
    return result
}

console.log(fractionalKnapsack(test, 50))