
// 문자열 압축하기
/* 문자열에서 같은 값이 연속해서 나타나는 것을 그 문자의 개수와 반복되는 값으로 표현하여 더 짧은 문자열로 줄여서 표현하는 알고리즘을 공부하고 있습니다.
   "abcabcdede"와 같은 경우, 문자를 2개 단위로 잘라서 압축하면 "abcabc2de"가 되지만, 3개 단위로 자른다면 "2abcdede"가 되어 3개 단위가 가장 짧은 압축 방법이 됩니다.
   이때 3개 단위로 자르고 마지막에 남는 문자열은 그대로 붙여주면 됩니다.
   압축할 문자열 s가 매개변수로 주어질 때, 위에 설명한 방법으로 1개 이상 단위로 문자열을 잘라 압축하여 표현한 문자열 중 가장 짧은 것의 길이를 return 하도록 solution 함수를 완성해주세요.
 */

// 반복되는 문자열 찾기... 1개 ~ n개 문자열
// 어렵다. 못품.

function solution(s) {
    let answer = 0;
    let temp = []
    let count = 0
    let changedS = ''
    for(let i = 0; i < s.length; i++) {
        if(temp.length === 0) {
            temp.push(s[i])
            continue;
        }
        if(temp[temp.length] === s[i]) {

        }


    console.log(changedS)
    }
    return answer;
}

const str1 = "aabbaccc"
solution(str1)
