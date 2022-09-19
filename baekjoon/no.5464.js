function getInput() {
  const fs = require('fs');
  const path = require('path');

  const numOfProblem = 5464;
  const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, `/test/${numOfProblem}.txt`);

  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\n/)
    .map(x => x.split(' ').map(Number));
  return input;
}

function run() {
  const [[N, M], ...arr] = getInput();
  const flatArr = arr.flatMap(x => x);

  const parkingFee = flatArr.splice(0, N);
  const weights = flatArr.splice(0, M);
  const sequence = flatArr;

  let waitQue = [];
  let parkingLot = Array.from({ length: N }).fill(0);
  let totalFee = 0;

  for (let i = 0; i < sequence.length; i++) {
    let curCar = sequence[i];
    if (curCar > 0) {
      for (let j = 0; j < parkingLot.length; j++) {
        const curParkingLot = parkingLot[j];
        if (!curParkingLot) {
          parkingLot[j] = curCar;
          break;
        }
        if (j === parkingLot.length - 1 && curParkingLot) {
          waitQue.push(curCar);
        }
      }
    }
    if (curCar < 0) {
      curCar = -curCar;
      const curCarParkingLotIndex = parkingLot.indexOf(curCar);
      parkingLot[curCarParkingLotIndex] = 0;
      const curFee = parkingFee[curCarParkingLotIndex] * weights[curCar - 1];
      totalFee += curFee;

      if (waitQue.length > 0) {
        const waitCar = waitQue.shift();
        parkingLot[curCarParkingLotIndex] = waitCar;
      }
    }
  }
  console.log(totalFee);
}

run();
