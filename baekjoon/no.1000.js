// A, B 를 입력 받고 합을 출력
// fs 방식으로 풀었을 때, ctrl + D 눌러야 결과를 볼 수 있음.
function addAB() {
  const fs = require('fs');
  const input = fs.readFileSync('/dev/stdin').toString().split(' ');
  const a = parseInt(input[0]);
  const b = parseInt(input[1]);
  console.log(a + b);
}

addAB();

// readline 방식으로 풀었을 때.
// line 이벤트는 엔터마다 발생. close 이벤트는 스트림이 end, finished 이벤트를 받을 때, 또는 ^C를 받았을때 호출 (rl.close() 가 없다면 ctrl+C)
function addAB2() {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let data = [];

  rl.on('line', function (line) {
    data = line.split(' ').map(el => el);
    rl.close(); // 종료이벤트 발생
  });
  rl.on('close', function () {
    console.log(Number(data[0]) + Number(data[1]));
    process.exit();
  });
}

//addAB2()
