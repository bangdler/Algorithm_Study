
// Write a function called stringifyNumbers which takes in an object and finds all of the values which are numbers and converts them to strings.
// Recursion would be a great way to solve this!

function stringifyNumbers(obj) {
    const newObj = {}
    for(let key in obj) {
        const value = obj[key]
        if(typeof value === 'number') {
            newObj[key] = value.toString()
        }
        else if(typeof value === 'object' && !Array.isArray(value)) {
            newObj[key] = stringifyNumbers(value)
        }
        else {
            newObj[key] = value
        }
    }
    return newObj
}

// 이유는 모르겠으나 기존 object 를 바꾸지 않아야 한다고 해서 새로운 객체 반환하도록 변경

let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}


console.log(typeof obj.num, typeof stringifyNumbers(obj).num)

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/