// 12 hour format 을 24 hour format 으로 변경하기.
// Example
//
//input s = '12:01:00PM'
// Return '12:01:00'
//
//input s = '12:01:00AM'
//Return '00:01:00'

function timeConversion(s) {
  const meridiem = s.substring(8, 9);
  let hour = Number(s.substring(0, 2));
  if (meridiem === 'A' && hour === 12) {
    hour = '00';
    let sReg = new RegExp(/^(\d+)/g);
    s = s.replace(sReg, hour);
    //let myS = sReg.exec(s)  공부용...
    //console.log(myS[0]) => 앞의 2자리 숫자
    //console.log(sReg.exec(s)) => null (왜 대응값이 있는데 null 을 반환할까?)
    //console.log(myS) => 배열 반환
  } else if (meridiem === 'P' && hour < 12) {
    hour = hour + 12;
    hour = hour.toString();
    let sReg = new RegExp(/^(\d+)/g);
    s = s.replace(sReg, hour);
  }
  return s.substring(0, 8);
}

function timeConversion2(s) {
  const meridiem = s.substring(8, 9);
  let sRemoveMeridiem = s.split('').slice(0, 8).join('');
  let convergedS = sRemoveMeridiem.split(':');
  let hour = convergedS[0];
  if (meridiem === 'A' && hour === '12') {
    convergedS[0] = '00';
  } else if (meridiem === 'P' && hour !== '12') {
    convergedS[0] = (Number(hour) + 12).toString();
  }
  return convergedS.join(':');
}

let s = '07:05:45PM';
console.log(timeConversion2(s));
