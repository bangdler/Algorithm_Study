//https://school.programmers.co.kr/learn/courses/30/lessons/92341

function solution(fees, records) {
  let answer = [];
  const [baseTime, baseFee, unitTime, unitFee] = fees;

  const queue = records;

  const parkInfo = {};
  while (queue.length) {
    const [curTime, carNumber, status] = queue.shift().split(' ');
    const [curHour, curMin] = curTime.split(':');
    if (!parkInfo[carNumber]) {
      parkInfo[carNumber] = { accTime: 0 };
    }
    if (status === 'IN') {
      parkInfo[carNumber].status = 'IN';
      parkInfo[carNumber].curTime = [curHour, curMin];
    }
    if (status === 'OUT') {
      parkInfo[carNumber].status = 'OUT';
      const [inHour, inMin] = parkInfo[carNumber].curTime;
      let totalParkingMin = 0;
      if (curMin - inMin < 0) {
        totalParkingMin = (curHour - inHour - 1) * 60 + (curMin - inMin + 60);
      } else {
        totalParkingMin = (curHour - inHour) * 60 + (curMin - inMin);
      }
      parkInfo[carNumber].accTime += totalParkingMin;
    }
  }

  // IN 인 차들은 23:59 에 나간것으로 간주하고 요금 계산
  for (let carNum in parkInfo) {
    if (parkInfo[carNum].status === 'IN') {
      const [inHour, inMin] = parkInfo[carNum].curTime;
      parkInfo[carNum].accTime += (23 - inHour) * 60 + (59 - inMin);
    }
    if (parkInfo[carNum].accTime <= baseTime) {
      parkInfo[carNum].totalFee = baseFee;
    } else {
      parkInfo[carNum].totalFee = baseFee + Math.ceil((parkInfo[carNum].accTime - baseTime) / unitTime) * unitFee;
    }
    answer.push([carNum, parkInfo[carNum].totalFee]);
  }

  answer = answer.sort((a, b) => a[0] - b[0]).map(x => x[1]);
  return answer;
}

const fees = [180, 5000, 10, 600];
const records = [
  '05:34 5961 IN',
  '06:00 0000 IN',
  '06:34 0000 OUT',
  '07:59 5961 OUT',
  '07:59 0148 IN',
  '18:59 0000 IN',
  '19:09 0148 OUT',
  '22:59 5961 IN',
  '23:00 5961 OUT',
];
// results [14600, 34400, 5000]

console.log(solution(fees, records));
