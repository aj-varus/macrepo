function breakingRecords(scores = []) {
  let min = [scores[0]];
  let max = [scores[0]];

  scores.shift();

  let countMin = 0;
  let countMax = 0;

  scores.forEach((score) => {
    if (score < min[0]) {
      min.push(score);
      min.shift();
      countMin++;
    }

    if (score > max[0]) {
      max.push(score);
      max.shift();
      countMax++;
    }
  });
  return `${countMax} ${countMin}`;
}

// console.log(breakingRecords([10, 5, 20, 20, 4, 5, 2, 25, 1]));
// console.log(breakingRecords([3, 4, 21, 36, 10, 28, 35, 5, 24, 42]));

function birthday(s = [], d, m) {
  const range = Array.from({ length: s.length - m + 1 }, (_, i) => i);
  let sum = 0;
  let count = 0;
  range.forEach((i) => {
    sum = 0;
    for (let j = i; j < i + m; j++) sum += s[j];
    if (sum === d) count++;
  });

  return count;
}
//console.log(birthday([1, 2, 1, 3, 2], 3, 2));

function divisibleSumPairs(n, k, ar) {
  let count = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((ar[i] + ar[j]) % k === 0) count++;
    }
  }
  return count;
}

//console.log(divisibleSumPairs(6, 3, [1, 3, 2, 6, 1, 2]));

function migratoryBirds(birds = []) {
  let arr = [...new Set(birds)];
  const dict = {};
  let maxCount = 0;

  arr.forEach((v) => {
    dict[v.toString()] = 0;
    for (let bird of birds) {
      if (v === bird) dict[v.toString()]++;
    }
    maxCount = Math.max(maxCount, dict[v.toString()]);
  });

  let trueMax = 100;

  for (let [key, value] of Object.entries(dict)) {
    if (value === maxCount) {
      trueMax = Math.min(parseInt(key), trueMax);
    }
  }
  return trueMax;
}

// console.log(migratoryBirds([1, 4, 4, 4, 5, 3]));

function dayOfProgrammer(year) {
  let months = [NaN, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 1918) {
    if (year % 4 === 0) months[2] = 29;
  } else if (year >= 1919) {
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0))
      months[2] = 29;
  } else if (year === 1918) {
    months[2] = 15;
  }

  let countDays = 0;
  let month = 1;

  for (month; month <= months.length && countDays <= 256; month++)
    countDays += months[month];
  countDays -= months[month--];

  const date = 256 - countDays - 1;

  const formattedMonth = month.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const formattedDate = date.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return `${formattedDate}.${formattedMonth}.${year}`;
}

//console.log(dayOfProgrammer(1918));

function bonAppetit(bill = [], k, b) {
  let trueTotal = 0;
  bill.forEach((item, index) => {
    if (k !== index) trueTotal += item;
  });
  return b === trueTotal / 2 ? "Bon Appetit" : Math.abs(b - trueTotal / 2);
}

//console.log(bonAppetit([3, 10, 2, 9], 1, 12));

function sockMerchant(n, socks = []) {
  const uniqueSocks = [...new Set(socks)];
  let countOfSocks = {};

  uniqueSocks.forEach((sock) => {
    countOfSocks[sock] = 0;
    for (let value of socks) {
      if (value === sock) countOfSocks[sock]++;
    }
  });
  let noOfPairs = 0;
  for (let [key, value] of Object.entries(countOfSocks)) {
    noOfPairs += Math.floor(value / 2);
  }
  return noOfPairs;
}

let inputString = "10 20 20 10 10 30 50 10 20".split(" ");
//console.log(sockMerchant(9, inputString));

function pageCount(n, p) {
  let N = n % 2 === 0 ? n + 1 : n;
  return Math.min(Math.floor(p / 2), Math.floor((N - p) / 2));
}
//console.log(pageCount(6, 5));

function countingValleys(_, str) {
  let path = str.split("");
  let currentCheckPoint = 0;
  let previousCheckPoint = 0;
  let valleyCount = 0;

  path.forEach((step) => {
    if (step === "U") currentCheckPoint++;
    if (step === "D") currentCheckPoint--;
    if (currentCheckPoint === -1 && previousCheckPoint === 0) valleyCount++;
    previousCheckPoint = currentCheckPoint;
  });
  return valleyCount;
}

//console.log(countingValleys(NaN, "UDDDUDUU"));

function getMoneySpent(keyboards = [], usbs = [], b) {
  let keyboardMax = keyboards.reduce((acc, v) => Math.max(acc, v), 0);
  let keyboardMaxIndex = keyboards.findIndex(
    (v) => parseInt(v, 10) === keyboardMax
  );
  let usbMax = usbs.reduce((acc, v) => Math.max(acc, v), 0);
  let usbMaxIndex = usbs.findIndex((v) => parseInt(v, 10) === usbMax);
  let maxTotal = -1;

  while (keyboardMaxIndex !== -1 && usbMaxIndex !== -1) {
    let currentTotal = keyboardMax + usbMax;
    let keyboardCopy = [...keyboards];
    let usbsCopy = [...usbs];

    if (currentTotal <= b) {
      maxTotal = currentTotal;
      break;
    }
    let [kmp, ump] = [keyboardMax, usbMax];
    let [kmi, umi] = [keyboardMaxIndex, usbMaxIndex];

    keyboardCopy.splice(keyboardMaxIndex, 1);
    usbsCopy.splice(usbMaxIndex, 1);

    keyboardMax = keyboardCopy.reduce((acc, v) => Math.max(acc, v), 0);
    usbMax = usbsCopy.reduce((acc, v) => Math.max(acc, v), 0);

    if (keyboardMax + ump <= b) {
      usbMax = ump;
      usbMaxIndex = umi;
      keyboards.splice(keyboardMaxIndex, 1);
      keyboardMaxIndex = keyboards.findIndex(
        (v) => parseInt(v, 10) === keyboardMax
      );
      continue;
    }
    if (usbMax + kmp <= b) {
      keyboardMax = kmp;
      keyboardMaxIndex = kmi;
      usbs.splice(usbMaxIndex, 1);
      usbMaxIndex = usbs.findIndex((v) => parseInt(v, 10) === usbMax);
      continue;
    }

    keyboards.splice(keyboardMaxIndex, 1);
    usbs.splice(usbMaxIndex, 1);
    keyboardMaxIndex = keyboards.findIndex(
      (v) => parseInt(v, 10) === keyboardMax
    );
    usbMaxIndex = usbs.findIndex((v) => parseInt(v, 10) === usbMax);
  }
  return maxTotal;
}

let inputK = "552002 385685 789588 71051 416312 210841 168157 229418 475058 469213 55235 268623 942596 101001 74839 167529 438556 147309 530001 973296 985526 759464 166060 967980 114458 439840 8709 278432 155607 798474 207320 326328 630723 299451 219757 232559 20526 129709 826805 256521 365679 355400 353777 674147 302548 62579 975593 210555 170154 809206 898441 146956 776979 342723 76498 864854 986952 154961 271428 82756 98606 484648 829502 302488 706835 563536 617358 803986 156017 137180 478604 580830 780732 505623 303693 144112 311761 624140 3142 273703 174283 487945 875603 82291 441846 459688 984457 306533 395798 822567 715348 56992 281983 418702 363892 458535 190769 725170 347141 574417 547361 667363 991997 777225 664352 862398 199291 313947 44972 538144 126385 840298 562682 989675 765333 889720 940632 371551 15827 195211 522878 489503 470974 741809 656203 492681 559705 483290 687194 838420 658231 361486 117039 859989 799899 406897 123261 328308 698688 454093 416240 762619 513967 126031 903502 196464 890085 951660 818041 175532 510264 567856 736406 579445 513013 489735 869802 644891 402867 229879 970454 552787 932533 372258 741770 661817 279479 141256 131684 571007 854896 185313 165340 278706 854454 218760 490876 182879 406649 825897 903395 285772 603988 927333 576744 970146 558892 571390 371254 143034 785821 374633 252856 797912 939107 367474 894187 87037 337557 556911 729629 845312 573353 796106 337726 175163 988745 672917 25244 220554 252703 218257 520192 874269 522071 249726 589066 263307 751846 654 623619 870866 600417 792774 53527 627471 376616 750435 232109 152083 265430 458427 554463 351299 199551 93798 294016 486240 237139 920948 948717 40069 944879 291527 610079 207588 924731 238201 785990 908640 590081 468175 6437 466405 772691 760747 702647 154528 615393 487376 760596 430083 513038 597046 704242 999783 935383 769623 375890 397956 708282 827740 475795 170747 674552 30471 763066 204495 45463 340489 646747 510696 226793 615268 670184 910811 468436 509969 773727 501389 123429 50255 626464 34920 278534 551285 853175 438278 928593 839370 996623 160716 796187 24978 753904 449140 215550".split(
  " "
);
let inputU = "237533 336083 49626 465788 724762 773556 111619 915172 608457 189182 281114 922576 173536 695782 379838 610909 801627 199887 392182 55538 750939 568593 125515 651663 772946 210829 236987 556582 677546 856687 565910 835255 929355 927565 387410 365969 66181 318122 19160 749595 827045 431210 524854 87569 775419 282865 234479 418677 345162 292583 30111 332281 961709 293843 668019 41509 933416 637239 265557 597427 611602 653531 678653 192354 317622 295722 848301 619756 947375 599763 885055 506445 739234 350493 277528 913137 281680 339847 963578 455722 10287 678267 716212 543144 706406 346965".split(
  " "
);
// console.log(getMoneySpent([3, 1], [5, 2, 8], 10));

//The above code doesn't work for all test cases

function getMoneySpentUpdated(k = [], u = [], b) {
  k.sort().reverse();
  u.sort().reverse();
  let [kMax, uMax] = [k[0], u[0]];
  let total = -1;
  let flag = true;
  let kDiff = 0;
  let uDiff = 0;

  while (flag) {
    [kMax, uMax] = [k[0], u[0]];
    //console.log(kMax, uMax);
    if (kMax + uMax <= b) {
      total = kMax + uMax;
      break;
    }

    if (k.length > 1 && u.length > 1)
      [kDiff, uDiff] = [k[0] - k[1], u[0] - u[1]];
    else break;

    if (kDiff > uDiff) {
      u.shift();
    } else if (kDiff < uDiff) {
      k.shift();
    } else if (kDiff === uDiff) {
      k.shift();
      u.shift();
    }
  }
  return total;
}

// console.log(getMoneySpentUpdated([3, 1], [5, 2, 8], 10));
// console.log(getMoneySpentUpdated(inputK, inputU, 938177));

function catAndMouse(x, y, z) {
  if (Math.abs(x - z) < Math.abs(y - z)) return "Cat A";
  if (Math.abs(x - z) > Math.abs(y - z)) return "Cat B";
  else return "Mouse C";
}

//console.log(catAndMouse([1, 1], [2, 3], [3, 2]));

function pickingNumbers(arr = []) {
  arr.sort();
  let [i, j] = [0, 1];
  let subArr = [];

  while (i < arr.length - 1) {
    if (arr[j] - arr[i] === 1) {
      subArr.push(arr[i]);
      subArr.push(arr[j]);
      break;
    }
    i++;
    j++;
  }

  if (subArr.length === 0) {
    [i, j] = [0, 1];
    while (i < arr.length - 1) {
      if (arr[j] - arr[i] < 1) {
        subArr.push(arr[i]);
        break;
      }
      i++;
      j++;
    }
  }

  let filteredArr = [...new Set(subArr)];
  let count = 0;

  for (i = 0; i < filteredArr.length; i++) {
    for (j = 0; j < arr.length; j++) {
      if (arr[j] === filteredArr[i]) count++;
    }
  }
  return count;
}

// console.log(pickingNumbers([1, 2, 2, 3, 1, 2]));
// console.log(pickingNumbers([4, 6, 5, 3, 3, 1]));

let inputStr = "4 97 5 97 97 4 97 4 97 97 97 97 4 4 5 5 97 5 97 99 4 97 5 97 97 97 5 5 97 4 5 97 97 5 97 4 97 5 4 4 97 5 5 5 4 97 97 4 97 5 4 4 97 97 97 5 5 97 4 97 97 5 4 97 97 4 97 97 97 5 4 4 97 4 4 97 5 97 97 97 97 4 97 5 97 5 4 97 4 5 97 97 5 97 5 97 5 97 97 97".split(
  " "
);

let input2 =
  "4 2 3 4 4 9 98 98 3 3 3 4 2 98 1 98 98 1 1 4 98 2 98 3 9 9 3 1 4 1 98 9 9 2 9 4 2 2 9 98 4 98 1 3 4 9 1 98 98 4 2 3 98 98 1 99 9 98 98 3 98 98 4 98 2 98 4 2 1 1 9 2 4";

//console.log(pickingNumbers(input2.split(" ")));

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
// console.log(findIndex(85));s
// console.log(determineRank(0, 101));
// adjustRanks(0, 101, 0);
// console.log(ranks);

let ranks = [];

function main() {
  setRanks([100, 90, 90, 80, 75, 60]);
  let inputArr = [50, 65, 77, 90, 102];

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

//main();

function hurdleRace(k, height = []) {
  let max = height.sort()[height.length - 1];
  console.log(height);
  console.log(max);
  let potions = max - k;
  if (potions <= 0) return 0;
  return potions;
}

let heightStr =
  "52 99 93 84 50 64 61 87 89 97 64 69 61 90 82 53 50 63 82 87 76 78 75 55 80 68 75 83 69 81 95 89 60 59 90 100 90 64 53 60 88 93 62 50 75 77 60 93 55 79 52 47 65 74 62 60 96 49 73 92 79 54 100 81 63 58 75 80 89 94 52 85 57 72 97 81 97 66 84 77 83 94 85 68 99 54 64 83 67 84 81 65 59 89 68 91 60 79 74 57";
let heights = heightStr.split(" ");

console.log(hurdleRace(47, heights));
