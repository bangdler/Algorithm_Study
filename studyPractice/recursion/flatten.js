// Write a recursive function called flatten which accepts an array of arrays
// and returns a new array with all values flattened.

function flatten(array){
    return array.reduce((acc, cur) => {
        return Array.isArray(cur)? acc.concat(flatten(cur)) : acc.concat(cur)
    }, [])
}

// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3]

console.log(flatten([1, [2, [3, 4], [[5]]]]))