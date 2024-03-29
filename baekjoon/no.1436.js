// 종말의 숫자란 어떤 수에 6이 적어도 3개이상 연속으로 들어가는 수를 말한다. 제일 작은 종말의 숫자는 666이고, 그 다음으로 큰 수는 1666, 2666, 3666, .... 과 같다.
// 따라서, 숌은 첫 번째 영화의 제목은 세상의 종말 666, 두 번째 영화의 제목은 세상의 종말 1666 이렇게 이름을 지을 것이다.
// 일반화해서 생각하면, N번째 영화의 제목은 세상의 종말 (N번째로 작은 종말의 숫자) 와 같다.
// 숌이 만든 N번째 영화의 제목에 들어간 숫자를 출력하는 프로그램을 작성하시오. 숌은 이 시리즈를 항상 차례대로 만들고, 다른 영화는 만들지 않는다.

function getInput() {
  const fs = require('fs');
  const input = fs.readFileSync('./test_1436.txt').toString().trim();
  return input;
}

// 가산기 개념으로 풀어보기 => 실패
// 문자열로 666 찾기...허무하다.

function readline() {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let input;
  rl.on('line', function (line) {
    input = line.trim();
  });
  rl.on('close', function () {
    return run(input);
  });
}

function run(num) {
  //let num = getInput()
  let series = [];
  let n = 666;
  while (series.length < num) {
    let strN = n.toString();
    if (strN.includes('666')) {
      series.push(n);
    }
    n++;
  }
  console.log(series[num - 1]);
}

readline();
