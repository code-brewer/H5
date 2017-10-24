<template>
<div id="app">
  <router-view></router-view>
  <!-- <audio :src="audio" id="appAudio" ref="appAudio"></audio> -->
  <video style="display: none;" name="media" id="appAudio"  x-webkit-airplay="true" x5-video-player-type='h5' x5-video-player-fullscreen="true" webkit-playsinline="isiPhoneShowPlaysinline" playsinline="isiPhoneShowPlaysinline">
    <source src="http://hackandhuygo.applinzi.com/shake.wav" type="audio/x-wav">
  </video>
</div>
</template>

<script>
import Router from './router/index'
export default {
  data(){
    return{
      //audio: 'http://hackandhuygo.applinzi.com/shake.wav'
      audio: 'http://gioc.easier.cn/vsu/static/shake.wav'
      // audio: './static/shake.wav'
    }
  },
  mounted(){
      Router.afterEach(Router => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      })
  }
}
</script>

<style>
#app {
  font-family: '微软雅黑', Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
