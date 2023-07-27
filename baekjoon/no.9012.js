const getInput = require('./utils/util');

function run() {
  const [[N], ...vpsList] = getInput(9012).map(it => it.split(''));

  const check = vps => {
    let total = 0;
    while (vps.length) {
      const cur = vps.pop();
      if (cur === ')') {
        total += 1;
      } else {
        total -= 1;
      }
      if (total < 0) {
        return false;
      }
    }
    if (total === 0) return true;
    return false;
  };

  const results = vpsList.map(vps => {
    if (check(vps)) {
      return 'YES';
    }
    return 'NO';
  });

  console.log(results.join('\n'));
}

run();
