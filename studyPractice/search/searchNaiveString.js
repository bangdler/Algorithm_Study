
function naiveString(longStr, shortStr) {
    let count = 0;
    for(let i = 0; i < longStr.length; i++) {
        for(let j = 0; j < shortStr.length; j++) {
            if(longStr[i+j] !== shortStr[j]) break;
            if(j === shortStr.length - 1) count ++
        }
    }
    return count
}

console.log(naiveString("lorie loled", "pop"))