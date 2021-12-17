<template>
    <Navigation />
    
  <div class="parent">
    <img class="table" src="@/assets/table.png">
    <img class="card" src="https://raw.githubusercontent.com/LabodaDaniel/Szakdolgozat/main/Cards/2_of_clubs.png">
  </div>

</template>

<script>
import Navigation from "../components/Navigation.vue";
export default {
  components: {
    Navigation,
  },
}
</script>

<style>
.parent {
  position: relative;
  max-width: 60%;
}

.table {
  width: 100%;
}

.card {
  position: absolute;
  width: 10%;
  bottom: 20%;
  left: 50%;
}
</style>
