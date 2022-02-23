
/* 게시판 불량 이용자를 신고하고 처리 결과를 메일로 발송하는 시스템

유저 list, 신고한 report(신고한 사람, 신고당한 사람), 게시판 정지 limit(k) 가 주어진다.
k번 이상 신고당하여 정지되는 경우, 정지당하도록 신고한 사람에게는 메일이 간다.
이 때 각 유저들이 메일 받은 횟수 list 를 구한다.

신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.
한 유저를 여러 번 신고할 수도 있지만, 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.

입출력 예시
    id_list = ["muzi", "frodo", "apeach", "neo"]
    report = ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"]
           =>"muzi frodo"의 경우 "muzi"가 "frodo"를 신고했다는 의미입니다.
    k = 2
    result = [2,1,1,0]
 */

function solution(id_list, report, k) {
    let answer;
    let id_obj = {};
    id_list.forEach((id) => id_obj[id] = 0)

    //중복제거
    let reportSet = new Set(report);
    let reportArr = [];
    reportSet.forEach((words) => reportArr.push(words.split(' ')))

    let report_obj = {};
    reportArr.forEach(function(arr) {
        const reporter = arr[0];
        const reported = arr[1];
        if (report_obj[reported] === undefined) {
            report_obj[reported] = {
                count: 1,
                reporterArr: [reporter]
            }
        }
        else {
            report_obj[reported].count += 1;
            report_obj[reported].reporterArr.push(reporter);
        }
    })

    for(let key in report_obj) {
        if(report_obj[key].count >= k) {
            report_obj[key].reporterArr.forEach((name) => id_obj[name] += 1)
        }
    }

    answer = Object.values(id_obj)
    return answer;
}

const id_list = ["muzi", "frodo", "apeach", "neo"]
const report = ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi", "muzi frodo"];
const k = 2
solution(id_list, report, k)