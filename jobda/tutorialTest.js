function solution(C) {
  let history = [];
  let curIdx;

  const move = (command, param) => {
    if (command === 'BACK') {
      const num = +param;
      return curIdx - num < 0 ? 0 : curIdx - num;
    }
    if (command === 'NEXT') {
      const num = +param;
      return curIdx + num > history.length - 1 ? history.length - 1 : curIdx + num;
    }
    if (command === 'PUSH') {
      history = history.slice(0, curIdx + 1);
      history.push(param);
      return history.length - 1;
    }
  };

  for (let [command, param] of C) {
    curIdx = move(command, param);
  }

  const mapped = new Set(history.reverse());
  return [...mapped].reverse();
}
