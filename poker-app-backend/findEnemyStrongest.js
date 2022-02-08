import fs from "fs";
import G from "generatorics";
import { sortCardOrder, removeItemOnce, getOnlyName, getJustDeck } from './helperFunctions.js';

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
  let inSevenCardsName = getOnlyName(inSevenCards);
  let inEveryCards = getJustDeck(everyCards, inSevenCardsName)
  let result = [];
  if (inSevenCards.length == 7) {
    let eCombination = createEnemysPossibleHands(inEveryCards, inSevenCardsName);
    for (const comb of eCombination) {
      result.push(findStrongestOfEnemysCards(comb));
    }
    return result;
  } else if (inSevenCards.length == 6) {
    let inEveryCardsWithoutBoard = [...inEveryCards];
    for(let comb of inEveryCards){
      let turnCombination = createEnemysPossibleHands(removeItemOnce(inEveryCardsWithoutBoard, comb), inSevenCardsName.concat(comb.toString()));
      for(let combi of turnCombination){
        result.push(findStrongestOfEnemysCards(combi));
      }
      inEveryCardsWithoutBoard = [...inEveryCards];
    }
    return result;
  }else if (inSevenCards.length == 5){
    let inEveryCardsWithoutBoard = [...inEveryCards];
    for(let i=0;i<inEveryCards.length;i++){
      for(let j=i+1;j<inEveryCards.length;j++){
        let remove = removeItemOnce(inEveryCardsWithoutBoard, inEveryCards[i])
        remove = removeItemOnce(inEveryCardsWithoutBoard, inEveryCards[j])
        let turnCombination = createEnemysPossibleHands(remove, inSevenCardsName.concat(inEveryCards[i], inEveryCards[j]));
        for(let combi of turnCombination){
          result.push(findStrongestOfEnemysCards(combi));
        }
        inEveryCardsWithoutBoard = [...inEveryCards];
      }
    }
    return result;
  }else if(inSevenCards.length == 2){
    return calcPreflopChance(inSevenCardsName)
  }
}

//Megkapja az összes kártyát és a lent lévő kártyákat. Visszaadja az ellenfél lehetséges kombinációit (maradék lap alatt a 2).
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

//Megkap egy tömböt, amiben 7 lap van, legenerálja a 7 alatt az 5-öt(=21).
function createEnemysCombinations(enemyC) {
  let onlyName = [];
  let allCombinations = [];
  for (let card of enemyC) {
    onlyName.push(card);
  }
  for (let comb of G.combination(onlyName, 5)) {
    allCombinations.push(comb.slice());
  }
  return allCombinations;
}

//A createEnemysCombinations-tól kapott 21 5-ös kombinációból kiválasztja a legerősebbet.
function findStrongestOfEnemysCards(combi) {
  let rawdata = fs.readFileSync("data.json");
  let strenghtOrder = JSON.parse(rawdata);
  let combinations = createEnemysCombinations(combi);
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

function calcPreflopChance(cards){
  let rawdata = fs.readFileSync("PreflopData.json");
  let chances = JSON.parse(rawdata);
  let cardCheck;
  let reversed;

  if(cards[0][1] == cards[1][1]){
    cardCheck = cards[0][0] + cards[1][0] + 'f';
    reversed = cards[1][0] + cards[0][0] + 'f'
  } else {
    cardCheck = cards[0][0] + cards[1][0]
    reversed = cards[1][0] + cards[0][0] 
  }

  if(chances['preflopStrenght'][cardCheck]){
    return chances['preflopStrenght'][cardCheck]
  } else {
    return chances['preflopStrenght'][reversed]
  }
}