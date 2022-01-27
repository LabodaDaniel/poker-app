import fs from "fs";
import G from "generatorics";

const everyCards = [
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "TC",
  "JC",
  "QC",
  "KC",
  "AC",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "TD",
  "JD",
  "QD",
  "KD",
  "AD",
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "TH",
  "JH",
  "QH",
  "KH",
  "AH",
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "TS",
  "JS",
  "QS",
  "KS",
  "AS",
];

export default function findEnemyStrongest(sevenCards) {
  let inSevenCards = sevenCards.sevenCards;
  let inEveryCards = [...everyCards];
  let inSevenCardsName = [];
  for (let card of inSevenCards) {
    inSevenCardsName.push(card.name);
  }
  for (let card of inSevenCardsName) {
    inEveryCards = removeItemOnce(inEveryCards, card);
  }
  let inEveryCardsWithoutBoard = [...inEveryCards];
  let inSevenCardsTurn = [...inSevenCardsName]
  let result = [];
  if (inSevenCards.length == 7) {
    let eCombination = createEnemysPossibleHands(inEveryCardsWithoutBoard, inSevenCardsName);
    for (const comb of eCombination) {
      result.push(findStrongest(comb));
    }
    console.log(result.length)
    return result;
  } else if (inSevenCards.length == 6) {
    let i = 0;
    console.log(inEveryCards)
    for(let comb of inEveryCards){
      inEveryCardsWithoutBoard = removeItemOnce(inEveryCardsWithoutBoard, comb);
      inSevenCardsTurn = inSevenCardsName.concat(comb.toString())
      console.log(comb.toString())
      let turnCombination = createEnemysPossibleHands(inEveryCardsWithoutBoard, inSevenCardsTurn);
      for(let combi of turnCombination){
        if(findStrongest(combi) == 1){i++}
        result.push(findStrongest(combi));
      }
      inEveryCardsWithoutBoard = [...inEveryCards];
      inSevenCardsTurn = [...inSevenCardsName];
    }
    console.log(result.length)
    console.log(i)
    return result;
  }
}

function createEnemysPossibleHands(allCards, inSevenCardsName) {
  
  let eCombination = [];
  let everyCardsRiver = [...allCards];
  let allCombinations = [];
  let enemyCards = [];
  for (let comb of G.combination(everyCardsRiver, 2)) {
    allCombinations.push(comb.slice());
  }
  for (let comb of allCombinations) {
    eCombination.push(comb.concat(inSevenCardsName.slice(2, 7)));
  }
  for (let comb of eCombination) {
    enemyCards.push(comb);
  }
  return enemyCards;
}

function removeItemOnce(arr, value) {
  let arrCopy = arr;
  var index = arrCopy.indexOf(value);
  if (index > -1) {
    arrCopy.splice(index, 1);
  }
  return arrCopy;
}

function createCombinations(enemyC) {
  let combine = enemyC;
  let onlyName = [];
  let allCombinations = [];
  for (let card of combine) {
    onlyName.push(card);
  }
  for (let comb of G.combination(onlyName, 5)) {
    allCombinations.push(comb.slice());
  }
  return allCombinations;
}

function findStrongest(combi) {
  let rawdata = fs.readFileSync("data.json");
  let strenghtOrder = JSON.parse(rawdata);
  let combinations = createCombinations(combi);
  let combinationsName = [];
  let ordered = "";
  let result = [];

  for (let combination of combinations) {
    let nameString = "";
    let colors = { C: 0, S: 0, H: 0, D: 0 };
    for (let card of combination) {
      nameString += card[0];
      colors[card[1]] += 1;
    }
    ordered = sortCardOrder(nameString, colors);
    combinationsName.push(ordered);
    result.push(strenghtOrder.cardStrenght[ordered]);
  }
  return Math.min(...result);
}

function sortCardOrder(string, colors) {
  let ordered = "";
  let timesArray = [
    (string.match(/A/g) || []).length,
    (string.match(/K/g) || []).length,
    (string.match(/Q/g) || []).length,
    (string.match(/J/g) || []).length,
    (string.match(/T/g) || []).length,
    (string.match(/9/g) || []).length,
    (string.match(/8/g) || []).length,
    (string.match(/7/g) || []).length,
    (string.match(/6/g) || []).length,
    (string.match(/5/g) || []).length,
    (string.match(/4/g) || []).length,
    (string.match(/3/g) || []).length,
    (string.match(/2/g) || []).length,
  ];
  for (let i = 0; i < timesArray[0]; i++) {
    ordered += "A";
  }
  for (let i = 0; i < timesArray[1]; i++) {
    ordered += "K";
  }
  for (let i = 0; i < timesArray[2]; i++) {
    ordered += "Q";
  }
  for (let i = 0; i < timesArray[3]; i++) {
    ordered += "J";
  }
  for (let i = 0; i < timesArray[4]; i++) {
    ordered += "T";
  }
  for (let i = 0; i < timesArray[5]; i++) {
    ordered += "9";
  }
  for (let i = 0; i < timesArray[6]; i++) {
    ordered += "8";
  }
  for (let i = 0; i < timesArray[7]; i++) {
    ordered += "7";
  }
  for (let i = 0; i < timesArray[8]; i++) {
    ordered += "6";
  }
  for (let i = 0; i < timesArray[9]; i++) {
    ordered += "5";
  }
  for (let i = 0; i < timesArray[10]; i++) {
    ordered += "4";
  }
  for (let i = 0; i < timesArray[11]; i++) {
    ordered += "3";
  }
  for (let i = 0; i < timesArray[12]; i++) {
    ordered += "2";
  }

  if (colors["C"] == 5) {
    ordered += "F";
  } else if (colors["H"] == 5) {
    ordered += "F";
  } else if (colors["S"] == 5) {
    ordered += "F";
  } else if (colors["D"] == 5) {
    ordered += "F";
  }

  return ordered;
}
