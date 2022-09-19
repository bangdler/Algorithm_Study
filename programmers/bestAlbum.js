// https://school.programmers.co.kr/learn/courses/30/lessons/42579

function solution(genres, plays) {
  // 각 장르별 총 재생횟수 객체를 만든다.
  // 각 장르별 고유번호, 재생횟수를 가지는 배열을 만든다. => 나중에 정렬
  // 각 장르별로 앞에 2개씩 뽑는다.

  let hash = {};

  genres.forEach((genre, idx) => {
    hash[genre] = hash[genre] ? hash[genre] + plays[idx] : plays[idx];
  });

  const genresMap = genres.map((genre, idx) => ({ genre, idx, play: plays[idx] }));

  genresMap.sort((a, b) => {
    if (a.genre !== b.genre) return hash[b.genre] - hash[a.genre];
    if (a.play !== b.play) return b.play - a.play;
    return a.idx - b.idx;
  });

  let numberGenre = {};
  const bestAlbum = genresMap
    .filter(info => {
      if (numberGenre[info.genre] >= 2) return false;
      numberGenre[info.genre] = numberGenre[info.genre] ? numberGenre[info.genre] + 1 : 1;
      return true;
    })
    .map(info => info.idx);

  return bestAlbum;
}

const genres = ['classic', 'pop', 'classic', 'classic', 'pop'];
const plays = [500, 600, 150, 800, 2500];
console.log(solution(genres, plays));
