<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <!-- <li><router-link to="/randomgame">Random Game</router-link></li> -->
        <li><router-link to="/simulategame">Simulate Game</router-link></li>
        <li @click="Logout" class="pos"><router-link to="/login">Logout</router-link></li>
        <p class="nickname">Signed in as {{ this.nickname }}</p>
        <p class="app">Poker-App</p>
      </ul>
    </nav>
    
  </header>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';

export default {

  data: () => ({
    nickname: ""
  }),

  methods: {
    Logout() {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed Out"))
        .catch(err => alert(err.message));
    },

    async Nickname() {
      let snapshot = await db.collection("users").get()
      let currentUser = firebase.auth().currentUser;
      snapshot.docs.forEach(user => {
        if (user.id === currentUser.uid) {
          this.nickname = user.data().nickname;
        }
      });
    },
  },
  mounted() {
    this.Nickname()
  }

}
</script>


<style scoped>

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  border-radius: 30px;
  text-transform: uppercase;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  border-radius: 30px;
}

li a:hover {
  background: #4082f5;
  box-shadow: 0px 4px 35px -5px #4082f5;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

li:focus {
  outline: none;
}

.pos {
  float: right;
}

.nickname {
  color: #4082f5;
  float: right;
  text-transform: uppercase;
  margin: 14px;
  font-weight: bold;
}

.app {
  color: #e35b5a;
  text-transform: uppercase;
  margin: 14px;
  font-weight: bold;
}

</style>
