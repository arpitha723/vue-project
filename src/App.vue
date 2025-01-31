<template>
  <div>
    <router-view /> <!-- This will render the matched component based on the route -->
  </div>
  
</template>

<script>
// import HospitalComponent from './views/HospitalComponent.vue'
// import GroupInfo from './views/GroupInfo.vue'
export default {
  name: 'App',
  components: {
    // HospitalComponent,
    // GroupInfo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
