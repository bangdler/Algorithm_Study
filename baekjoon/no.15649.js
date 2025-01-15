const getInput = require('./utils/util');

// run, run2 는 차이 안남. 228ms
const run = () => {
  const input = getInput(15649);
  const [n, m] = input[0].split(' ').map(Number);

  const results = [];
  const tracking = (n, arr, result, map) => {
    if (result.length === n) return results.push([...result]);

    for (let i = 0; i < arr.length; i++) {
      if (map.includes(i)) continue;

      map.push(i);
      result.push(arr[i]);
      tracking(n, arr, result, map);
      map.pop();
      result.pop();
    }
  };

  tracking(
    m,
    Array.from({ length: n }, (_, idx) => idx + 1),
    [],
    [],
  );

  console.log(results.map(it => it.join(' ')).join('\n'));
};

// 상단 배열에 덮어쓰는 방식 -> 약간 빠름 188ms
const run_e = () => {
  const input = getInput(15649);
  const [n, m] = input[0].split(' ').map(Number);
  const number = Array(m);
  const visited = Array(n + 1).fill(false);

  const results = [];
  const tracking = (d = 0) => {
    if (d === m) {
      return results.push(number.join(' '));
    }
    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      number[d] = i + 1;
      tracking(d + 1);
      visited[i] = false;
    }
  };

  tracking();

  console.log(results.join('\n'));
};

const run2 = () => {
  const input = getInput(15649);
  const [n, m] = input[0].split(' ').map(Number);

  const results = [];
  const nums = Array.from({ length: n }, (_, idx) => idx + 1);
  const tracking = (first = 0, arr = []) => {
    if (arr.length === m) {
      results.push([...arr]);
      return;
    }

    for (let i = first; i < n; i++) {
      let temp = nums[i];
      nums[i] = nums[first];
      nums[first] = temp;

      arr.push(temp);
      tracking(first + 1, arr);
      arr.pop();

      nums[first] = nums[i];
      nums[i] = temp;
    }
  };

  tracking();

  console.log(
    results
      .map(it => it.join(' '))
      .sort()
      .join('\n'),
  );
};

run_e();
