// 어려워서 참고 보고 품.
// 참고 https://kyun2da.github.io/2020/07/21/diskController/

function solution(jobs) {
    let answer = 0;
    let jobIdx = 0;
    let curTime = 0;

    // 1차 정렬, 시작 시간 순.
    jobs.sort((a, b) => a[0] - b[0])

    const priorityQue = []

    while(jobIdx < jobs.length || priorityQue.length > 0) {

        // 시작 시간이 현재 시간보다 작은 경우 우선순위 큐에 넣는다.
        if(jobIdx < jobs.length && jobs[jobIdx][0] <= curTime) {
            priorityQue.push(jobs[jobIdx])
            jobIdx++
            continue
        }
        // 우선순위 큐는 작업 시간 순으로 다시 정렬한다.
        priorityQue.sort((a,b) => a[1] - b[1])

        // 우선순위 큐에 작업이 있을 경우, 현재 시간 업데이트, answer 에 요청시간~종료시간 더해준다.
        if(priorityQue.length > 0) {
            const [startTime, workTime ] = priorityQue.shift()
            curTime += workTime
            answer += curTime - startTime
        }
        // 요청 시간이 우선순위 큐 작업 이후일 경우, 시작 시간을 업데이트 해준다.
        else {
            curTime = jobs[jobIdx][0]
        }
    }

    return parseInt(answer / jobs.length);
}

const test_jobs = [[0, 3], [1, 9], [2, 6]]

console.log(solution(test_jobs))