function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 19583;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' '));
  return input;
}

function run() {
  const [[S, E, Q], ...records] = getInput();

  const [startHour, startMin] = S.split(':').map(Number);
  const [endHour, endMin] = E.split(':').map(Number);
  const [streamingEndHour, streamingEndMin] = Q.split(':').map(Number);
  const inClass = {};
  const outClass = {};
  for (let i = 0; i < records.length; i++) {
    const [hour, min] = records[i][0].split(':').map(Number);
    const name = records[i][1];

    if (startHour - hour > 0 || (startHour === hour && startMin - min >= 0)) {
      inClass[name] = true;
    } else if (hour - endHour > 0 || (hour === endHour && min - endMin >= 0)) {
      if (streamingEndHour - hour > 0 || (streamingEndHour === hour && streamingEndMin - min >= 0)) {
        if (inClass[name]) {
          outClass[name] = true;
        }
      }
    }
  }
  console.log(Object.keys(outClass).length);
}

run();
