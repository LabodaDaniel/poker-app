<template>
  <Navigation />
  <div id="parent">
    <img id="table" src="@/assets/table.png" />
    <div v-if="sevenCards.length > 0" class="first">
      <img
        class="myCards"
        v-for="card in sevenCards.slice(0, 2)"
        :key="card.id"
        :src="card.url"
      />
    </div>

    <div v-if="sevenCards.length > 2" class="second">
      <img
        v-for="card in sevenCards.slice(2, 7)"
        :key="card.name"
        :src="card.url"
        class="boardCards"
      />
    </div>
    <div id="chart">
      <ChanceChart :chartData="chartData" :chartOptions="chartOptions" />
    </div>
  </div>

  <div @click="showColor" v-if="!isHidden">
    <img
      src="@/assets/spades.png"
      class="imgColors"
      @click="(choosenColor = 'spades'), (isHidden = true)"
    />
    <img
      src="@/assets/hearts.png"
      class="imgColors"
      @click="(choosenColor = 'hearts'), (isHidden = true)"
    />
    <img
      src="@/assets/clubs.png"
      class="imgColors"
      @click="(choosenColor = 'clubs'), (isHidden = true)"
    />
    <img
      src="@/assets/diamonds.png"
      class="imgColors"
      @click="(choosenColor = 'diamonds'), (isHidden = true)"
    />
  </div>

  <div v-if="showPic">
    <div v-if="choosenColor === 'clubs'" @click="choosenColor = ''">
      <img
        class="cards"
        v-for="card in cards.slice(0, 13)"
        :key="card.id"
        :src="card.url"
        @click="chooseCard(card.name, card.id, card.url)"
      />
    </div>
    <div v-if="choosenColor === 'diamonds'" @click="choosenColor = ''">
      <img
        class="cards"
        v-for="card in cards.slice(13, 26)"
        :key="card.id"
        :src="card.url"
        @click="chooseCard(card.name, card.id, card.url)"
      />
    </div>
    <div v-if="choosenColor === 'hearts'" @click="choosenColor = ''">
      <img
        class="cards"
        v-for="card in cards.slice(26, 39)"
        :key="card.id"
        :src="card.url"
        @click="chooseCard(card.name, card.id, card.url)"
      />
    </div>
    <div v-if="choosenColor === 'spades'" @click="choosenColor = ''">
      <img
        class="cards"
        v-for="card in cards.slice(39, 52)"
        :key="card.id"
        :src="card.url"
        @click="chooseCard(card.name, card.id, card.url)"
      />
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

  <PageLoader v-if="8 == 9" />

  <button @click="backend2">Backend2</button>
  <button @click="backend">Backend</button>
  <button @click="chartCalc">Test</button>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import ChanceChart from "../components/ChanceChart.vue";
import PageLoader from "../components/PageLoader.vue";

export default {
  components: {
    Navigation,
    ChanceChart,
    PageLoader,
  },

  computed: {
    chartOptions() {
      return {
          scales: {
            y: {
              title: {
                display: true,
                text: 'Value'
              },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10,
            }
            },
          },
          elements: {
          point: {
            radius: 0
          },
          line: {
            borderWidth: 2
          }
        },
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                fontColor: "#fff",
                color: "#fff"
              },
            },
          },
        },
        
      }
    },
    chartData() {
      return {
        labels: this.column.map((x, index) => index + 1),
        datasets: [
          {
            type: 'bar',
            label: "Enemy's Chance",
            borderColor: "#1161ed",
            borderWidth: 2,
            data: this.enemyCardsFilled,
          },
          {
            type: 'bar',
            label: "My Chance",
            borderColor: "#f87979",
            borderWidth: 2,
            data: this.myCardsFilled,
          },
          {
            type: 'line',
            label: "Enemy's Avarage",
            borderColor: "rgb(238, 255, 0)",
            borderWidth: 2,
            data: [50],
          },
          // {
          //   label: "Enemy's Median",
          //   borderColor: "rgb(255, 0, 191)",
          //   borderWidth: 2,
          //   pointRadius: 0,
          //   data: this.medianArray,
          // },
          // {
          //   label: "Standard Deviation",
          //   borderColor: "#fff",
          //   borderWidth: 2,
          //   pointRadius: 0,
          //   data: this.upDev,
          // },
          // {
          //   label: "Standard Deviation",
          //   borderColor: "#fff",
          //   borderWidth: 2,
          //   pointRadius: 0,
          //   data: this.downDev,
          // },
        ],
      }
    },
    
  },

  data() {
    return {
      showPic: false,
      showChart: false,
      isHidden: false,
      choosenColor: "",
      isThere: 0,
      cardsFull: false,
      cards: [
        {
          id: 1,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_clubs.png",
          name: "2C",
        },
        {
          id: 2,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/3_of_clubs.png",
          name: "3C",
        },
        {
          id: 3,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/4_of_clubs.png",
          name: "4C",
        },
        {
          id: 4,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/5_of_clubs.png",
          name: "5C",
        },
        {
          id: 5,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/6_of_clubs.png",
          name: "6C",
        },
        {
          id: 6,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/7_of_clubs.png",
          name: "7C",
        },
        {
          id: 7,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/8_of_clubs.png",
          name: "8C",
        },
        {
          id: 8,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/9_of_clubs.png",
          name: "9C",
        },
        {
          id: 9,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/10_of_clubs.png",
          name: "TC",
        },
        {
          id: 10,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/jack_of_clubs.png",
          name: "JC",
        },
        {
          id: 11,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/queen_of_clubs.png",
          name: "QC",
        },
        {
          id: 12,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/king_of_clubs.png",
          name: "KC",
        },
        {
          id: 13,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/ace_of_clubs.png",
          name: "AC",
        },
        {
          id: 14,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_diamonds.png",
          name: "2D",
        },
        {
          id: 15,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/3_of_diamonds.png",
          name: "3D",
        },
        {
          id: 16,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/4_of_diamonds.png",
          name: "4D",
        },
        {
          id: 17,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/5_of_diamonds.png",
          name: "5D",
        },
        {
          id: 18,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/6_of_diamonds.png",
          name: "6D",
        },
        {
          id: 19,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/7_of_diamonds.png",
          name: "7D",
        },
        {
          id: 20,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/8_of_diamonds.png",
          name: "8D",
        },
        {
          id: 21,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/9_of_diamonds.png",
          name: "9D",
        },
        {
          id: 22,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/10_of_diamonds.png",
          name: "TD",
        },
        {
          id: 23,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/jack_of_diamonds.png",
          name: "JD",
        },
        {
          id: 24,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/queen_of_diamonds.png",
          name: "QD",
        },
        {
          id: 25,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/king_of_diamonds.png",
          name: "KD",
        },
        {
          id: 26,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/ace_of_diamonds.png",
          name: "AD",
        },
        {
          id: 27,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_hearts.png",
          name: "2H",
        },
        {
          id: 28,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/3_of_hearts.png",
          name: "3H",
        },
        {
          id: 29,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/4_of_hearts.png",
          name: "4H",
        },
        {
          id: 30,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/5_of_hearts.png",
          name: "5H",
        },
        {
          id: 31,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/6_of_hearts.png",
          name: "6H",
        },
        {
          id: 32,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/7_of_hearts.png",
          name: "7H",
        },
        {
          id: 33,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/8_of_hearts.png",
          name: "8H",
        },
        {
          id: 34,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/9_of_hearts.png",
          name: "9H",
        },
        {
          id: 35,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/10_of_hearts.png",
          name: "TH",
        },
        {
          id: 36,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/jack_of_hearts.png",
          name: "JH",
        },
        {
          id: 37,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/queen_of_hearts.png",
          name: "QH",
        },
        {
          id: 38,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/king_of_hearts.png",
          name: "KH",
        },
        {
          id: 39,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/ace_of_hearts.png",
          name: "AH",
        },
        {
          id: 40,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_spades.png",
          name: "2S",
        },
        {
          id: 41,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/3_of_spades.png",
          name: "3S",
        },
        {
          id: 42,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/4_of_spades.png",
          name: "4S",
        },
        {
          id: 43,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/5_of_spades.png",
          name: "5S",
        },
        {
          id: 44,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/6_of_spades.png",
          name: "6S",
        },
        {
          id: 45,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/7_of_spades.png",
          name: "7S",
        },
        {
          id: 46,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/8_of_spades.png",
          name: "8S",
        },
        {
          id: 47,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/9_of_spades.png",
          name: "9S",
        },
        {
          id: 48,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/10_of_spades.png",
          name: "TS",
        },
        {
          id: 49,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/jack_of_spades.png",
          name: "JS",
        },
        {
          id: 50,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/queen_of_spades.png",
          name: "QS",
        },
        {
          id: 51,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/king_of_spades.png",
          name: "KS",
        },
        {
          id: 52,
          url:
            "https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/ace_of_spades2.png",
          name: "AS",
        },
      ],
      colors: ["clubs", "diamonds", "hearts", "spades"],
      sevenCards: [],
      enemysCards: [],
      enemyCardsFilled: 0,
      myCards: [],
      myCardsFilled: 0,
      avgArray: [],
      medianArray: [],
      downDev: [],
      upDev: [],
      column: [],
    };
  },

  methods: {
    chartCalc(){
      let enemyCards = this.enemysCards;
      let myCards = this.myCards;
      if(enemyCards.length == 45540){
        this.column = myCards;
        let start = 0;
      let end = 990;
      let chance = 0;
      let myChance = [];
      let eChance = [];
      
      for(let i=0; i < myCards.length; i++){
        for(let j=start; j < end; j++){
          if(enemyCards[j] > myCards[i]){
            chance = chance+1;
          }
        }
        myChance.push((chance/990)*100);
        eChance.push(((990-chance)/990)*100);
        chance = 0;
        start+=990;
        end+=990;
      }
      console.log("Enyém: " + myChance);
      console.log("Enemy: " + eChance);
      this.enemyCardsFilled = [...eChance];
      this.myCardsFilled = [...myChance];
      }else if(enemyCards.length == 990){
        this.column = ["123"];
        let myChance = 0;
      for(let card of enemyCards){
        if(card > myCards){
          myChance = myChance+1;
        }
      }
      let myColumn = (myChance/enemyCards.length)*100;
      let enemyColumn = (100 - myColumn);
      console.log("Én esélyem: " + myColumn);
      console.log("Enyemy esélye: " + enemyColumn);
      this.emnemyCardsFilled = [enemyColumn];
      this.myCardsFilled = [myColumn];
      }
    },
    chartCalcRiver() {
      let enemyCards = this.enemysCards;
      let myCards = this.myCards;
      let myChance = 0;
      for(let card of enemyCards){
        if(card > myCards){
          myChance = myChance+1;
        }
      }
      let myColumn = (myChance/enemyCards.length)*100;
      let enemyColumn = (100 - myColumn);
      console.log("Én esélyem: " + myColumn);
      console.log("Enyemy esélye: " + enemyColumn);
      this.emnemyCardsFilled = [enemyColumn];
      this.myCardsFilled = [myColumn];
    },
    findMedian(values) {
      if (values.length === 0) throw new Error("No inputs");

      values.sort(function(a, b) {
        return a - b;
      });

      var half = Math.floor(values.length / 2);

      if (values.length % 2) return values[half];

      return (values[half - 1] + values[half]) / 2.0;
    },
    calculateDeviation(arr) {
      let mean =
        arr.reduce((acc, curr) => {
          return acc + curr;
        }, 0) / arr.length;
      arr = arr.map((k) => {
        return (k - mean) ** 2;
      });
      let sum = arr.reduce((acc, curr) => acc + curr, 0);
      return Math.sqrt(sum / arr.length);
    },
    showColor() {
      this.showPic = true;
    },
    chooseCard(name, id, url) {
      if (this.isThere === 8) {
        this.cardsFull = true;
        return;
      }
      this.sevenCards.push({ name, url });
      this.isThere = this.isThere + 1;
      this.showPic = false;
      this.isHidden = false;
      this.cards[id - 1] = false;
    },
    reloadPage() {
      window.location.reload();
    },
    togglePopUp() {
      this.isThere = 9;
      this.isHidden = !this.isHidden;
    },
    backend(e) {
      e.preventDefault();
      fetch("http://localhost:5000/mystrongest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sevenCards: this.sevenCards }),
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log(json), (this.myCards = json);
        });
    },
    backend2(e) {
      e.preventDefault();
      fetch("http://localhost:5000/enemystrongest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sevenCards: this.sevenCards }),
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log(json), (this.enemysCards = json);
        });
    },
  },
};
</script>
<style>
@import "../sg.css";
</style>
