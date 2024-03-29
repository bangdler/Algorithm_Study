// 오픈채팅방에 입장, 퇴장 시 닉네임 변경 반영하기.
//다음은 record에 담긴 문자열에 대한 설명이다.
// 모든 유저는 [유저 아이디]로 구분한다.
// [유저 아이디] 사용자가 [닉네임]으로 채팅방에 입장 - "Enter [유저 아이디] [닉네임]" (ex. "Enter uid1234 Muzi")
// [유저 아이디] 사용자가 채팅방에서 퇴장 - "Leave [유저 아이디]" (ex. "Leave uid1234")
// [유저 아이디] 사용자가 닉네임을 [닉네임]으로 변경 - "Change [유저 아이디] [닉네임]" (ex. "Change uid1234 Muzi")
// 첫 단어는 Enter, Leave, Change 중 하나이다.
// 각 단어는 공백으로 구분되어 있으며, 알파벳 대문자, 소문자, 숫자로만 이루어져있다.
// 유저 아이디와 닉네임은 알파벳 대문자, 소문자를 구별한다.
// 유저 아이디와 닉네임의 길이는 1 이상 10 이하이다.
// 채팅방에서 나간 유저가 닉네임을 변경하는 등 잘못 된 입력은 주어지지 않는다.

function solution(record) {
  let answer = [];
  let idObject = {};
  // 배열을 순회하면서 id 에 따른 name 을 update 한다
  record.forEach(function (input) {
    let [condition, id, name] = getInformation(input);
    if (condition === 'Enter') {
      idObject[id] = name;
    } else if (condition === 'Change') {
      idObject[id] = name;
    }
  });
  // 각 condition 에 따라 입장 여부를 answer 에 넣는다.
  record.forEach(function (input) {
    let [condition, id, name] = getInformation(input);
    if (condition === 'Enter') {
      answer.push(`${idObject[id]}님이 들어왔습니다.`);
    } else if (condition === 'Leave') {
      answer.push(`${idObject[id]}님이 나갔습니다.`);
    }
  });
  return answer;
}

let input = [
  'Enter uid1234 Muzi',
  'Enter uid4567 Prodo',
  'Leave uid1234',
  'Enter uid1234 Prodo',
  'Change uid4567 Ryan',
];

// 각 input 에서 입장 여부, 아이디, 닉네임을 분리한다.
function getInformation(input) {
  return input.split(' ');
}

console.log(solution(input));
