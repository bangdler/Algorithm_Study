// Write a recursive function called capitalizeFirst.
// Given an array of strings, capitalize the first letter of each string in the array.

function capitalizeFirst(array) {
  const capitalize = string => string[0].toUpperCase() + string.slice(1);
  if (array.length === 1) {
    return [capitalize(array[0])];
  }
  return [capitalize(array[0])].concat(capitalizeFirst(array.slice(1)));
}

console.log(capitalizeFirst(['car', 'taco', 'banana'])); // ['Car','Taco','Banana']
