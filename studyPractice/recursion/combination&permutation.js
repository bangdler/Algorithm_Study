var combine = function (n, k) {
  const output = [];

  const backtrack = (first = 1, cur = []) => {
    if (cur.length === k) {
      const comb = cur.map(i => i);
      output.push(comb);
      return;
    }

    for (let i = first; i < n + 1; i++) {
      cur.push(i);

      backtrack(i + 1, cur);

      cur.pop();
    }
  };

  backtrack();

  return output;
};

console.log(combine(4, 2));

var permute = function (nums) {
  const output = [];

  const n = nums.length;

  const backtrack = (first = 0) => {
    if (first === n) {
      const permutation = nums.map(x => x);
      output.push(permutation);
      return;
    }

    for (let i = first; i < n; i++) {
      // swap
      let temp = nums[i];
      nums[i] = nums[first];
      nums[first] = temp;

      backtrack(first + 1);

      // 원상태로 swap
      nums[first] = nums[i];
      nums[i] = temp;
    }
  };

  backtrack();
  return output;
};

console.log(permute([1, 2, 3, 4]));
