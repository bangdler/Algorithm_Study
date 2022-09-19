// ax + by = c
// dx + ey = f

// 정수 a, b, c, d, e, f가 공백으로 구분되어 차례대로 주어진다. (-999 <=  a,b,c,d,e,f <= 999)
// 문제에서 언급한 방정식을 만족하는 (x,y)가 유일하게 존재하고, 이 때 x와 y 각각 -999 이상 999 이하의 정수인 경우만 입력으로 주어짐이 보장된다.
// 문제의 답인 x와 y를 공백으로 구분해 출력한다.

function getInput() {
  const fs = require('fs');
  const input = fs.readFileSync('./test_19532.txt').toString().trim().split(/\s+/);
  return input;
}

function readline() {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let input;
  rl.on('line', function (line) {
    input = line
      .toString()
      .trim()
      .split(' ')
      .map(x => parseInt(x));
  });
  rl.on('close', function () {
    return solve(input);
  });
}

function solve(input) {
  const [a, b, c, d, e, f] = input;
  let x;
  let y;

  for (let i = -999; i < 1000; i++) {
    for (let j = -999; j < 1000; j++) {
      const eq1 = a * i + b * j === c;
      const eq2 = d * i + e * j === f;
      if (eq1 && eq2) {
        x = i;
        y = j;
        console.log(x, y);
        return;
      }
    }
  }
}

// 잘못된 방법...
function solveEquation(input) {
  const [a, b, c, d, e, f] = input;
  let x;
  let y;
  if (a === 0) {
    y = Math.floor(c / b);
    x = Math.floor((f - e * y) / d);
  }
  if (b === 0) {
    x = Math.floor(c / a);
    y = Math.floor((f - d * x) / e);
  }
  if (d === 0) {
    y = Math.floor(f / e);
    x = Math.floor((c - b * y) / a);
  }
  if (e === 0) {
    x = Math.floor(f / d);
    y = Math.floor((c - a * x) / b);
  } else {
    y = Math.floor((Math.floor((d / a) * c) - f) / (Math.floor((d / a) * b) - e));
    x = Math.floor((c - b * y) / a);
  }
  console.log(x, y);
}

readline();
