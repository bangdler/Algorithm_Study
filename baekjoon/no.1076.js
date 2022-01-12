
// 저항은 색 3개를 이용해서 그 저항이 몇 옴인지 나타낸다. 처음 색 2개는 저항의 값이고, 마지막 색은 곱해야 하는 값이다.
// 처음 두 색의 값을 문자열로 더한 후 마지막 색 값을 곱한다.


function getInput() {
    const fs = require('fs');
    const input=fs.readFileSync('/dev/stdin').toString().trim().split(/\n/);
    return input
}

//console.log(getInput())

function getOhm() {
    const input = getInput();
    const ohmName = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']
    const ohmTable = {};
    ohmName.forEach((name, idx) => ohmTable[name] = [String(idx), 10 ** idx])
    let ohmInitialValue = '';
    let answer;
    input.forEach((name, idx) => {
        if(idx === input.length -1) {
            answer = Number(ohmInitialValue) * ohmTable[name][1]
        }
        else {
            ohmInitialValue += ohmTable[name][0];
        }})
    console.log(answer)
}

getOhm()