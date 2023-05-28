// https://school.programmers.co.kr/learn/courses/30/lessons/17678

// 시간대별로 버스 배열을 생성, timetable 을 시간 순으로 정렬 후 버스 배열에 맞게 채운다.
// bus = {time: [9,0], passengers : [[9,0], [9,0]]}
// buses 의 마지막 값인 버스 객체를 확인한다. 정원보다 적은 경우 버스 시간으로, 정원과 같은 경우 마지막 인원 탑승시간 -1분을 한다.

function solution(n, t, m, timetable) {
  const buses = [];
  const sortedTimeTable = timetable.sort((a, b) => {
    const [aHour, aMin] = a.split(':');
    const [bHour, bMin] = b.split(':');
    if (+aHour === +bHour) {
      return +aMin - +bMin;
    }
    return +aHour - +bHour;
  });
  let curTime = [9, 0];
  let passengerIdx = 0;
  for (let i = 0; i < n; i++) {
    if (i !== 0) {
      const curMin = curTime[1] + t;
      curTime[0] = curMin >= 60 ? curTime[0] + 1 : curTime[0];
      curTime[1] = curMin >= 60 ? curMin - 60 : curMin;
    }
    const bus = { time: [...curTime], passengers: [] };
    let count = 0;
    while (passengerIdx < timetable.length && count < m) {
      const curPassenger = sortedTimeTable[passengerIdx];
      const [pHour, pMin] = curPassenger.split(':').map(Number);
      if (pHour < curTime[0] || (pHour === curTime[0] && pMin <= curTime[1])) {
        bus.passengers.push([pHour, pMin]);
        count++;
        passengerIdx++;
      } else {
        break;
      }
    }
    buses.push(bus);
  }
  let conTime;
  const { time, passengers } = buses.pop();
  if (passengers.length < m) {
    conTime = time;
  } else {
    const [lastPassengerHour, lastPassengerMin] = passengers.pop();
    const conMin = lastPassengerMin - 1;
    conTime = conMin < 0 ? [lastPassengerHour - 1, 59] : [lastPassengerHour, conMin];
  }

  const strHour = conTime[0] < 10 ? '0' + String(conTime[0]) : String(conTime[0]);
  const strMin = conTime[1] < 10 ? '0' + String(conTime[1]) : String(conTime[1]);
  return strHour + ':' + strMin;
}

const test = [
  10,
  60,
  45,
  [
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
    '23:59',
  ],
];

const test1 = [2, 10, 2, ['09:10', '09:09', '08:00']];

const test2 = [2, 1, 2, ['09:00', '09:00', '09:00', '09:00']];

const test3 = [10, 1, 5, ['09:00', '09:00', '09:00', '09:00', '09:00']];
console.log(solution(test3[0], test3[1], test3[2], test3[3]));
