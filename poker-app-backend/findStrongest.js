import G from 'generatorics';
import fs from 'fs';

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

//Megkap egy tömböt, amiben 7 lap van, legenerálja a 7 alatt az 5-öt(=21).
function createCombinations(sevenCards){
    let allCombinations = [];
      for (let comb of G.combination(sevenCards, 5)){
        allCombinations.push(comb.slice());
      }
      return allCombinations;
  }

  export default function findStrongest(sevenCards){
    let comb = sevenCards.sevenCards;
    let onylNameOfSevenCards = [];
    for (let card of comb){
      onylNameOfSevenCards.push(card.name);
    }
    let rawdata = fs.readFileSync('data.json');
    let strenghtOrder = JSON.parse(rawdata);
    
    let combinationsName = [];
    let ordered = "";
    let result = [];

    if(onylNameOfSevenCards.length == 7){
      let combinations = createCombinations(onylNameOfSevenCards);
      for(let combination of combinations){
        let nameString = "";
        let colors = {'C': 0, 'S': 0, 'H':0, 'D':0};
        for(let card of combination){
          nameString += card[0];
          colors[card[1]]+=1
        }
        ordered = sortCardOrder(nameString, colors);
        combinationsName.push(ordered);
        result.push(strenghtOrder.cardStrenght[ordered]);
      }
      return Math.min(...result);
    }else if(onylNameOfSevenCards.length == 6){
      let inEveryCards = [...everyCards];
      let turnCombination = [];
      for (let card of onylNameOfSevenCards) {
        inEveryCards = removeItemOnce(inEveryCards, card);
      }

      for(let comb of inEveryCards){
        let combinations = createCombinations(onylNameOfSevenCards.concat(comb));
        let turnResult = []
        for(let combination of combinations){
          let nameString = "";
          let colors = {'C': 0, 'S': 0, 'H':0, 'D':0};
          for(let card of combination){
            nameString += card[0];
            colors[card[1]]+=1
          }
          let turnOrdered = sortCardOrder(nameString, colors);
          let turnCombinationsName = [];
          turnCombinationsName.push(ordered);
          turnResult.push(strenghtOrder.cardStrenght[turnOrdered]);
        }
        turnCombination.push(Math.min(...turnResult));
      } 
      return turnCombination;
    }else if(onylNameOfSevenCards.length == 5){
      let everyCardsWithoutBoard = [...everyCards];
      for (let card of onylNameOfSevenCards) {
        everyCardsWithoutBoard = removeItemOnce(everyCardsWithoutBoard, card);
      }
      let flopCombinationsValue = []; 
      for(let i=0; i < everyCardsWithoutBoard.length; i++){
        let sCards = onylNameOfSevenCards.concat(everyCardsWithoutBoard[i]);
        for(let j=i+1; j < everyCardsWithoutBoard.length; j++){
          let flopResult = [];
          let combinations = createCombinations(sCards.concat(everyCardsWithoutBoard[j]));
          for(let combination of combinations){
            let nameString = "";
            let colors = {'C': 0, 'S': 0, 'H':0, 'D':0};
            for(let card of combination){
              nameString += card[0];
              colors[card[1]]+=1
            }
            let flopOrdered = sortCardOrder(nameString, colors);
            let flopCombinationsName = [];
            flopCombinationsName.push(ordered);
            flopResult.push(strenghtOrder.cardStrenght[flopOrdered]);
          }
          flopCombinationsValue.push(Math.min(...flopResult));
        }
      }
      return flopCombinationsValue;
    }
  }

  //Sorba rendezi a lapokat, hogy meg tudjuk keresni az értékét a data.json-ben.
  function sortCardOrder(string, colors){
    let ordered = "";
    let timesArray = [(string.match(/A/g) || []).length,
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
                      (string.match(/2/g) || []).length,]
    for(let i = 0; i<timesArray[0];i++){
      ordered+='A';
    }
    for(let i = 0; i<timesArray[1];i++){
      ordered+='K';
    }
    for(let i = 0; i<timesArray[2];i++){
      ordered+='Q';
    }
    for(let i = 0; i<timesArray[3];i++){
      ordered+='J';
    }
    for(let i = 0; i<timesArray[4];i++){
      ordered+='T';
    }
    for(let i = 0; i<timesArray[5];i++){
      ordered+='9';
    }
    for(let i = 0; i<timesArray[6];i++){
      ordered+='8';
    }
    for(let i = 0; i<timesArray[7];i++){
      ordered+='7';
    }
    for(let i = 0; i<timesArray[8];i++){
      ordered+='6';
    }
    for(let i = 0; i<timesArray[9];i++){
      ordered+='5';
    }
    for(let i = 0; i<timesArray[10];i++){
      ordered+='4';
    }
    for(let i = 0; i<timesArray[11];i++){
      ordered+='3';
    }
    for(let i = 0; i<timesArray[12];i++){
      ordered+='2';
    }

    if(colors['C'] == 5){
      ordered+='F'
    } else if(colors['H'] == 5){
      ordered+='F'
    } else if(colors['S'] == 5){
      ordered+='F'
    } else if(colors['D'] == 5){
      ordered+='F'
    }

    return(ordered)
  }

  //Megkap egy tömböt és egy értéket. Kitörli a tömbből azt az értéket, amit megkap.
  function removeItemOnce(arr, value) {
    let arrCopy = [...arr]
    var index = arrCopy.indexOf(value);
    if (index > -1) {
      arrCopy.splice(index, 1);
    }
    return arrCopy;
  }