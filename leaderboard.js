function setRanks(arr = []) {
  let max = arr[0];
  let currentRank = 1;
  arr.forEach((v) => {
    if (v === max) ranks.push([v, currentRank]);
    else {
      ranks.push([v, ++currentRank]);
      max = v;
    }
  });
  return ranks;
}

function findIndex(score) {
  let currentIndex = ranks.length - 1;
  if (currentIndex === 0) return 0;
  while (true) {
    let currentRank = ranks[currentIndex][0];
    let nextRank = ranks[currentIndex - 1][0];
    if (
      (currentRank <= score || currentIndex === ranks.length - 1) &&
      nextRank > score
    ) {
      return currentIndex === ranks.length - 1 && score < currentRank
        ? currentIndex + 1
        : currentIndex;
    }

    if (currentIndex === 1) return 0;

    if (nextRank === undefined) break;
    currentIndex--;
  }
}

function determineRank(index, score) {
  if (index === ranks.length) --index;
  const value = ranks[index][0];
  const rank = ranks[index][1];
  if (index === ranks.length - 1 && score < value) return rank + 1;
  else if (index === 0 && score > value) return rank - 1;
  else if (score >= value) return rank;
}

function adjustRanks(index, score, rank) {
  if (index === ranks.length) {
    ranks.push([score, rank]);
    return;
  }

  if (rank === 0) rank++;

  ranks.splice(index, 0, [score, rank]);

  if (ranks[index + 1][0] < score) {
    for (let i = index + 1; i < ranks.length; i++) {
      ranks[i][1] += 1;
    }
  }
}

//Initialization code
// console.log(setRanks([100, 90, 90, 80]));
// console.log(findIndex(85));
// console.log(determineRank(0, 101));
// adjustRanks(0, 101, 0);
// console.log(ranks);

let ranks = [];

function main() {
  setRanks([1]);
  let inputArr = [1, 1];

  let answer = [];

  for (let score of inputArr) {
    let index = findIndex(score);
    let rank = determineRank(index, score);
    if (rank === 0) rank++;
    answer.push(rank);
    adjustRanks(index, score, rank);
  }
  console.log(answer);
  console.log(ranks);
}

main();
