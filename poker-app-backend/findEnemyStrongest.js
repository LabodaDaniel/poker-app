import fs from 'fs';
import G from 'generatorics';

export default function findEnemyStrongest(enemyCards) {
  let eCombination = enemyCards.enemyCards;
  let result = [];
  for(const comb of eCombination){
  result.push(findStrongest(comb));
  }
  let finalResult = [...new Set(result)];
  console.log(finalResult);
}

function createCombinations(enemyC){
  let combine = enemyC;
  let onlyName = [];
  let allCombinations = [];
  for (let card of combine){
    onlyName.push(card);
  }
  for (let comb of G.combination(onlyName, 5)){
    allCombinations.push(comb.slice());
  }
  return allCombinations;
}

function findStrongest(combi){
    let rawdata = fs.readFileSync('data.json');
    let strenghtOrder = JSON.parse(rawdata);
    let combinations = createCombinations(combi);
    let combinationsName = [];
    let ordered = "";
    let result = [];

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
  }

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