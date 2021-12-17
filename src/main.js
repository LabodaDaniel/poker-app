import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyANClDMGn18RLgjFvPRf22XZ8H4mHeNoUU",
    authDomain: "vue-auth-6de17.firebaseapp.com",
    projectId: "vue-auth-6de17",
    storageBucket: "vue-auth-6de17.appspot.com",
    messagingSenderId: "207202760374",
    appId: "1:207202760374:web:9479a5450810e3b066d817"
  };

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();

createApp(App).use(router).mount('#app')