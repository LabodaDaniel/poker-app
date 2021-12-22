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
    <div id="chart">
        <ChanceChart :chartData="state.chartData" :chartOptions="state.chartOptions"/>
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

<button @click="backend">Gomb</button>
<button @click="createEnemysPossibleCards">Teszt</button>

</template>

<script>
import Navigation from "../components/Navigation.vue";
import firebase from 'firebase/app';
let G = require('generatorics');
import ChanceChart from '../components/ChanceChart.vue'

export default {
  components: {
    Navigation,
    ChanceChart
  },

  data() {
    return {
      showPic: false,
      isHidden: false,
      choosenColor: "",
      isThere: 0,
      cardsFull: false,
      cards: [
        { id: 1, url: "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_clubs.png", name: '2C'},
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
      state: {
        chartData: {
          datasets: [
            {
              label: "Enemy's Chance",
              borderColor: '#1161ed',
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 41, 190]
            },
            {
              label: 'My Chance',
              borderColor: '#f87979',
              color: '#fff',
              data: [60,60,60,60,60,60,60,60,60,60,60,60, 60]
            }
          ],
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
        },
        chartOptions: {
          responsive: false
        }
      }
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
    backend(e){
      e.preventDefault();
      fetch('http://localhost:5000/strongest', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({cards: this.sevenCards})})
      .then(() => {console.log('Sucessfull Post')})
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
      let help2 = [];
      let eCombination = [];
      let cards = this.cards;
      // let result = [];
      for(let card of cards){
        if(card.name != null){
          help.push(card.name);
        }
      }
      let allCombinations = [];
      for (let comb of G.combination(help, 2)){
        allCombinations.push(comb.slice());
      }
      for(let card of this.sevenCards){
        help2.push(card.name);
      }
      for(let comb of allCombinations){
        eCombination.push(comb.concat(help2.slice(2,7)));
      }
      // console.log(eCombination)
      // for(let comb of eCombination){
      //   result.push(this.findStrongest(comb));
      //   console.log(this.findStrongest(comb));
      // }
      console.log(this.findStrongest(eCombination))
      
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