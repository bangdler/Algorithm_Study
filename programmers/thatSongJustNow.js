// https://school.programmers.co.kr/learn/courses/30/lessons/17683

function solution(m, musicinfos) {
  const matches = [];
  // 곡 정보를 순회한다.
  // 곡 정보에서 재생 시간을 구하고, 악보를 재생시간에 맞게 잇는다. 이 때 문자열 치환이 필요하다.
  const pitchTable = {
    'A#': 'H',
    'C#': 'I',
    'D#': 'J',
    'F#': 'K',
    'G#': 'L',
  };
  const regex = /A#|C#|D#|F#|G#/g;
  const replacePitch = pitches =>
    pitches.replace(regex, function (matched) {
      return pitchTable[matched];
    });
  const replacedMelody = replacePitch(m);
  for (let musicInfo of musicinfos) {
    const [start, end, name, music] = musicInfo.split(',');
    const [startHour, startMin] = start.split(':');
    const [endHour, endMin] = end.split(':');
    const playTime = (endHour - startHour) * 60 + (endMin - startMin);
    let realMusic = replacePitch(music);

    const n = Math.ceil(playTime / realMusic.length);
    realMusic = realMusic.repeat(n).substring(0, playTime);

    if (realMusic.match(replacedMelody)) {
      matches.push([playTime, name]);
    }
  }
  const sorted = matches.sort((a, b) => b[0] - a[0]);
  return sorted.length ? sorted[0][1] : '(None)';
}

const test1 = ['ABCDEFG', ['12:00,12:14,HELLO,CDEFGAB', '13:00,13:05,WORLD,ABCDEF']];
const test2 = ['CC#BCC#BCC#BCC#B', ['03:00,03:30,FOO,CC#B', '04:00,04:08,BAR,CC#BCC#BCC#B']];
const test3 = ['ABC', ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF']];
console.log(solution(test3[0], test3[1]));
