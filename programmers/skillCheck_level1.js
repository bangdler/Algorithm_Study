function solution(seoul) {
  const idx = seoul.findIndex(el => el === 'Kim');
  return `김서방은 ${idx}에 있다`;
}

solution(['Jane', 'Kim']);

function solution(participant, completion) {
  const sortedParticipant = participant.sort();
  const sortedCompletion = completion.sort();
  for (let i = 0; i < sortedParticipant.length; i++) {
    if (sortedParticipant[i] !== sortedCompletion[i]) {
      return sortedParticipant[i];
    }
  }
  return '';
}
