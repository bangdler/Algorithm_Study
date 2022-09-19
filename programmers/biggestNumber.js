//https://school.programmers.co.kr/learn/courses/30/lessons/42746

// 정렬을 이용한 풀이, 문자열로 두수를 더한 값을 비교하여 정렬한다. (타풀이 참조함)
function solution(numbers) {
  const sortedNumbers = numbers.map(num => num.toString()).sort((a, b) => b + a - (a + b));
  return sortedNumbers[0] === '0' ? '0' : sortedNumbers.join('');
}

// 런타임 에러...
function solution2(numbers) {
  // 순열 구하기 -> join -> max 값
  const getPermutation = (arr, selectedNum) => {
    const results = [];
    if (selectedNum === 1) return arr.map(num => [num]);
    arr.forEach((fixed, idx, arr) => {
      const rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
      const permutations = getPermutation(rest, selectedNum - 1);
      const attached = permutations.map(permutation => [fixed, ...permutation]);
      results.push(...attached);
    });
    return results;
  };

  const permutations = getPermutation(numbers, numbers.length);
  const joinedPermutations = permutations.map(permutation => permutation.join(''));
  return Math.max(...joinedPermutations).toString();
}

const numbers = [3, 30, 34, 5, 9];

console.log(solution(numbers));
