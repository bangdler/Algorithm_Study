const getInput = require('./utils/util');

// ')', ']' 이면 stack 에 넣는다.
// '(', '[' 면 stack 에서 꺼낸 값과 비교한다.
// 현재값과 꺼낸값이 같으면 닫힌 상태이므로 점수에 맞게 더해주거나 곱해준다.
// 연속으로 열릴 때 numStack 에 현재까지 합을 넣는다.
// 연속으로 닫힐 때 sum * score + numStack.pop() 한다.

function run() {
  const [brackets] = getInput(2504);

  const bracketArr = brackets.split('');

  const mates = {
    '(': ')',
    '[': ']',
  };
  const scores = {
    '(': 2,
    '[': 3,
  };
  const numStack = [];
  const bracketStack = [];
  let sum = 0;
  let isBeforeOpen = false;
  let isBeforeClose = false;

  while (bracketArr.length) {
    const cur = bracketArr.pop();

    if (cur === '(' || cur === '[') {
      const mate = bracketStack.pop();
      if (mates[cur] === mate) {
        // 이전에 닫힌 적이 있으면 닫는 부분은 곱해주고, 스택에서 꺼낸 값(옆 괄호)과 더해준다.
        if (isBeforeClose) {
          sum = sum * scores[cur] + numStack.pop();
        } else {
          sum += scores[cur];
        }
        isBeforeClose = true;
        isBeforeOpen = false;
      } else {
        console.log(0);
        return;
      }
    } else if (cur === ')' || cur === ']') {
      // 열린적이 없으면 그대로 진행, 있으면 sum 을 nums 에 넣어준다. (연속으로 열릴 때 값을 넣어줘야 연속으로 닫힐 때 형제값을 더할 수 있다)
      if (isBeforeOpen) {
        numStack.push(sum);
        sum = 0;
      }
      isBeforeClose = false;
      isBeforeOpen = true;
      bracketStack.push(cur);
    }
  }

  if (!bracketStack.length) {
    console.log(sum);
  } else {
    console.log(0);
  }
}

run();
