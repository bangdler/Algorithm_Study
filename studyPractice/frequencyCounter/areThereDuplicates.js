//Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in.
// You can solve this using the frequency counter pattern OR the multiple pointers pattern.
//
// Examples:
//
// areThereDuplicates(1, 2, 3) // false
// areThereDuplicates(1, 2, 2) // true
// areThereDuplicates('a', 'b', 'c', 'a') // true
// Restrictions:
//
// Time - O(n)
//
// Space - O(n)
//
// Bonus:
//
// Time - O(n log n)
//
// Space - O(1)

function areThereDuplicates(...args) {
  // good luck. (supply any arguments you deem necessary.)
  let dic = {};
  for (let a of args) {
    if (!dic[a]) {
      dic[a] = 1;
      continue;
    } else {
      return true;
    }
  }
  return false;
}

// 다중포인터 해결법
function areThereDuplicates2(...args) {
  let sortedArgs = args.sort();
  console.log(sortedArgs);
  let i = 0;
  let j = 1;
  while (i < args.length - 1) {
    if (sortedArgs[i] === sortedArgs[j]) return true;
    i++;
    j++;
  }
  return false;
}

// 한줄 해결법
function areThereDuplicates3() {
  return new Set(arguments).size !== arguments.length;
}

console.log(areThereDuplicates2(1, 2, 3, 2));
