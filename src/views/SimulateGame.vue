<template>
  <Navigation />
  <div id="parent">
    <img id="table" src="@/assets/table.png"/>
    <div v-if="sevenCards.length > 0"  class="first">
        <img class="myCards" v-for="card in sevenCards.slice(0,2)" :key="card.id" :src="card.url">
    </div>

    <div v-if="sevenCards.length > 2" class="second">
        <img v-for="card in sevenCards.slice(2,7)" :key="card.name" :src=card.url class="boardCards">
    </div>
  </div>
  <br>

  <div @click="showColor" v-if="!isHidden">
    <img src="@/assets/clubs.png" class="imgColors" @click="choosenColor='clubs', isHidden = true">
    <img src="@/assets/diamonds.png" class="imgColors" @click="choosenColor='diamonds', isHidden = true">
    <img src="@/assets/hearts.png" class="imgColors" @click="choosenColor='hearts', isHidden = true">
    <img src="@/assets/spades.png" class="imgColors" @click="choosenColor='spades', isHidden = true">
  </div>

  <div v-if="showPic">
    <div v-if="choosenColor==='clubs'" @click="choosenColor=''">
      <img class="cards" v-for="card in cards.slice(0, 13)" :key="card.id" :src="card.url" @click="chooseCard(card.name, card.id, card.url)"/>
    </div>
    <div v-if="choosenColor==='diamonds'" @click="choosenColor=''">
      <img class="cards" v-for="card in cards.slice(13, 26)" :key="card.id" :src="card.url" @click="chooseCard(card.name, card.id, card.url)"/>
    </div>
    <div v-if="choosenColor==='hearts'" @click="choosenColor=''">
      <img class="cards" v-for="card in cards.slice(26, 39)" :key="card.id" :src="card.url" @click="chooseCard(card.name, card.id, card.url)"/>
    </div>
    <div v-if="choosenColor==='spades'" @click="choosenColor=''">
      <img class="cards" v-for="card in cards.slice(39, 52)" :key="card.id" :src="card.url" @click="chooseCard(card.name, card.id, card.url)"/>
    </div>
  </div>

  <div class="container" v-if="isThere === 8">
    <div class="cookiesContent" id="cookiesPopup">
      <button class="close" @click="togglePopUp">✖</button>
      <img class="img" src="@/assets/popup.png" />
      <p>You added seven cards, you can not add more card.</p>
      <button class="accept" @click="reloadPage">Play a new round!</button>
    </div>
  </div>

<button @click="findStrongest">Gomb</button>
<button @click="createEnemysPossibleCards">Teszt</button>


</template>

<script>
import Navigation from "../components/Navigation.vue";
import firebase from 'firebase/app';
let G = require('generatorics');

export default {
  components: {
    Navigation,
  },

  data() {
    return {
      showPic: false,
      isHidden: false,
      choosenColor: "",
      isThere: 0,
      cardsFull: false,
      cards: [
        { id: 1, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_clubs.png', name: '2C'},
        { id: 2, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/3_of_clubs.png', name: '3C'},
        { id: 3, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/4_of_clubs.png', name: '4C'},
        { id: 4, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/5_of_clubs.png', name: '5C'},
        { id: 5, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/6_of_clubs.png', name: '6C'},
        { id: 6, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/7_of_clubs.png', name: '7C'},
        { id: 7, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/8_of_clubs.png', name: '8C'},
        { id: 8, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/9_of_clubs.png', name: '9C'},
        { id: 9, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/10_of_clubs.png', name: 'TC'},
        { id: 10, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/jack_of_clubs.png', name: 'JC'},
        { id: 11, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/queen_of_clubs.png', name: 'QC'},
        { id: 12, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/king_of_clubs.png', name: 'KC'},
        { id: 13, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/ace_of_clubs.png', name: 'AC'},
        { id: 14, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_diamonds.png', name: '2D'},
        { id: 15, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/3_of_diamonds.png', name: '3D'},
        { id: 16, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/4_of_diamonds.png', name: '4D'},
        { id: 17, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/5_of_diamonds.png', name: '5D'},
        { id: 18, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/6_of_diamonds.png', name: '6D'},
        { id: 19, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/7_of_diamonds.png', name: '7D'},
        { id: 20, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/8_of_diamonds.png', name: '8D'},
        { id: 21, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/9_of_diamonds.png', name: '9D'},
        { id: 22, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/10_of_diamonds.png', name: 'TD'},
        { id: 23, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/jack_of_diamonds.png', name: 'JD'},
        { id: 24, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/queen_of_diamonds.png', name: 'QD'},
        { id: 25, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/king_of_diamonds.png', name: 'KD'},
        { id: 26, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/ace_of_diamonds.png', name: 'AD'},
        { id: 27, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_hearts.png', name: '2H'},
        { id: 28, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/3_of_hearts.png', name: '3H'},
        { id: 29, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/4_of_hearts.png', name: '4H'},
        { id: 30, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/5_of_hearts.png', name: '5H'},
        { id: 31, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/6_of_hearts.png', name: '6H'},
        { id: 32, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/7_of_hearts.png', name: '7H'},
        { id: 33, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/8_of_hearts.png', name: '8H'},
        { id: 34, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/9_of_hearts.png', name: '9H'},
        { id: 35, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/10_of_hearts.png', name: 'TH'},
        { id: 36, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/jack_of_hearts.png', name: 'JH'},
        { id: 37, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/queen_of_hearts.png', name: 'QH'},
        { id: 38, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/king_of_hearts.png', name: 'KH'},
        { id: 39, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/ace_of_hearts.png', name: 'AH'},
        { id: 40, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_spades.png', name: '2S'},
        { id: 41, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/3_of_spades.png', name: '3S'},
        { id: 42, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/4_of_spades.png', name: '4S'},
        { id: 43, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/5_of_spades.png', name: '5S'},
        { id: 44, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/6_of_spades.png', name: '6S'},
        { id: 45, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/7_of_spades.png', name: '7S'},
        { id: 46, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/8_of_spades.png', name: '8S'},
        { id: 47, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/9_of_spades.png', name: '9S'},
        { id: 48, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/10_of_spades.png', name: 'TS'},
        { id: 49, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/jack_of_spades.png', name: 'JS'},
        { id: 50, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/queen_of_spades.png', name: 'QS'},
        { id: 51, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/king_of_spades.png', name: 'KS'},
        { id: 52, url: 'https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/ace_of_spades2.png', name: 'AS'},
      ],
      colors: ['clubs', 'diamonds', 'hearts', 'spades'],
      sevenCards: [],
      strenghtOrder : [],
      enemysCards : [],
      notInTheDeck : [],
    }
  },

  methods:{
    showColor(){
      this.showPic = true;
    },
    chooseCard(name, id, url){
      if (this.isThere === 8){
        this.cardsFull = true;
        return;
      }
      this.sevenCards.push({name, url});
      this.isThere = this.isThere + 1;
      this.showPic = false;
      this.isHidden = false;
      this.cards[id-1] = false;
      this.notInTheDeck.push(id-1);
    },
    reloadPage() {
      window.location.reload();
    },
    togglePopUp(){
      this.isThere = 9;
      this.isHidden = !this.isHidden;
    },
    createCombinations(){
      let onlyName = []
      let allCombinations = []
      for (let card of this.sevenCards){
        onlyName.push(card.name)
      }
      for (let comb of G.combination(onlyName, 5)){
        allCombinations.push(comb.slice());
      }
      return allCombinations;
    },
    findStrongest(){
      let combinations = this.createCombinations();
      let combinationsName = []
      let ordered = "";
      let result = [];
      for(let combination of combinations){
        let nameString = "";
        let colors = {'C': 0, 'S': 0, 'H':0, 'D':0};
        for(let card of combination){
          nameString += card[0];
          colors[card[1]]+=1
        }
        ordered = this.sortCardOrder(nameString, colors);
        combinationsName.push(ordered);
        result.push(this.strenghtOrder[ordered]);
      }
      console.log(Math.min(...result));
    },
    sortCardOrder(string, colors){
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
    },
    getAllCombinationsData(){
      firebase
      .app()
      .database('https://vue-auth-6de17-default-rtdb.europe-west1.firebasedatabase.app/')
      .ref('/cardStrenght/')
      .once('value')
      .then(snapshot => {
        this.strenghtOrder = snapshot.val()
      })
      .then(res => {
        if(res){
          console.alert(res);
          return;
        }
      })
    },
    createEnemysPossibleCards() {
      let help = [];
      let cards = this.cards;
      for(let card of cards){
        if(card.name != null){
          help.push(card.name)
        }
      }
      console.log(help)
      let allCombinations = []
      for (let comb of G.combination(help, 2)){
        allCombinations.push(comb.slice());
      }
      console.log(allCombinations)
    }
    },
    mounted(){
      this.getAllCombinationsData();
    }
}
</script>
<style>
 @import '../sg.css';
</style>