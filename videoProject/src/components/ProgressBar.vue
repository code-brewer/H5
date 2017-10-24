<template lang="html">
  <div class="content">
  <p class="line_one"></p>
  <p class="line_two" :style="{width:line_num+'%'}"></p>
  <p class="text textLeft">{{startNum}}</p>
  <p class="text textRight">{{endNum}}</p>
  </div>
</template>

<script>
export default {
  props: {
    line_num: {
      type: Number
    },
    startNum: {
      type: String
    },
    endNum: {
      type: String
    }
  },
}
</script>

<style lang="scss" scoped>
  .content{
    // height: 26px;
    width: 95%;
    margin: 0 auto;
    position: relative;
    .line_one{
      width: 100%;
      margin:0 auto;
      color:#fff;
      background: #ddd;
      height: 7px;
    }
    .line_two{
      height: 7px;
      background:orange;
      position: absolute;
      top: 0%;
      left: 0%;
    }
    .text{
      float: left;
      color: #fff;
      width: 50%;
      font-size: 25px;
    }
    .textLeft{
      text-align: left;
    }
    .textRight{
      text-align: right;
    }
  }
</style>
