<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>

<script>
import './css/reset.css'
import './css/swiper.min.css'
export default {
  name: 'app',

  mounted() {
    
  },
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background-color: #fff;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
}
image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
image[lazy=error] {
    width: 40px;
    height: 300px;
    margin: auto;
}
</style>
