<template lang="html">
  <div class="">
    <ul id="app" style="overflow:hidden;width: 90%;margin-left: 8%;">
      <li class="li_view" @click="star(1,black1)"  :style="{backgroundImage:'url('+BGimg_url1+')'}"></li>
      <li class="li_view" @click="star(2,black2)"  :style="{backgroundImage:'url('+BGimg_url2+')'}"></li>
      <li class="li_view" @click="star(3,black3)"  :style="{backgroundImage:'url('+BGimg_url3+')'}"></li>
      <li class="li_view" @click="star(4,black4)"  :style="{backgroundImage:'url('+BGimg_url4+')'}"></li>
      <li class="li_view" @click="star(5,black5)"  :style="{backgroundImage:'url('+BGimg_url5+')'}"></li>
      <!-- <li class="li_view" v-for="(n,index) in length" @click="star(index,black[index])" :style="{backgroundImage:'url('+BGimg_url[n-1]+')'}"></li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    keyVal: {
      type: Number
    },
  },
  data() {
    return {
      BGimg_url1: require('../../static/img/black.png'),
      BGimg_url2: require('../../static/img/black.png'),
      BGimg_url3: require('../../static/img/black.png'),
      BGimg_url4: require('../../static/img/black.png'),
      BGimg_url5: require('../../static/img/black.png'),
      //  BGimg_url: ['./black.png','./black.png','./black.png','./black.png','./black.png'],
      light_img: require('../../static/img/light.png'),
      black_img: require('../../static/img/black.png'),
      //  black: [false,false,false,false,false]
      black1: false,
      black2: false,
      black3: false,
      black4: false,
      black5: false
    }
  },
  mounted(){
    if(this.keyVal == 1){
      this.BGimg_url1 = this.light_img;
    }else if (this.keyVal == 2) {
      this.BGimg_url1 = this.light_img;
      this.BGimg_url2 = this.light_img;
    }else if (this.keyVal == 3) {
      this.BGimg_url1 = this.light_img;
      this.BGimg_url2 = this.light_img;
      this.BGimg_url3 = this.light_img;
    }else if (this.keyVal == 4) {
      this.BGimg_url1 = this.light_img;
      this.BGimg_url2 = this.light_img;
      this.BGimg_url3 = this.light_img;
      this.BGimg_url4 = this.light_img;
    }else if (this.keyVal == 5) {
      this.BGimg_url1 = this.light_img;
      this.BGimg_url2 = this.light_img;
      this.BGimg_url3 = this.light_img;
      this.BGimg_url4 = this.light_img;
      this.BGimg_url5 = this.light_img;
    }

  },
  methods: {
    star: function(key, back) {
      //  alert(back);
      this.starNum = key;
      this.$emit('getStarNum', this.starNum);
      //  alert(key);
      if (!back) {
        if (key == 1) {
          this.BGimg_url1 = this.light_img;
          this.black1 = true;
          //  this.BGimg_url[0] = this.light_img;
          //  alert(this.BGimg_url[0])
          //  this.black[0] = true;
        } else if (key == 2) {
          this.BGimg_url1 = this.light_img;
          this.BGimg_url2 = this.light_img;
          this.black1 = true;
          this.black2 = true
          //  this.BGimg_url[0] = this.light_img;
          //  this.BGimg_url[1] = this.light_img;
          //  this.black[0] = true;
          //  this.black[1] = true
        } else if (key == 3) {
          this.BGimg_url1 = this.light_img;
          this.BGimg_url2 = this.light_img;
          this.BGimg_url3 = this.light_img;
          this.black1 = true;
          this.black2 = true;
          this.black3 = true
          //  this.BGimg_url[0] = this.light_img;
          //  this.BGimg_url[1] = this.light_img;
          //  this.BGimg_url[2] = this.light_img;
          //  this.black[0] = true;
          //  this.black[1] = true;
          //  this.black[2] = true
        } else if (key == 4) {
          this.BGimg_url1 = this.light_img;
          this.BGimg_url2 = this.light_img;
          this.BGimg_url3 = this.light_img;
          this.BGimg_url4 = this.light_img;
          this.black1 = true;
          this.black2 = true;
          this.black3 = true;
          this.black4 = true
          //  this.BGimg_url[0] = this.light_img;
          //  this.BGimg_url[1] = this.light_img;
          //  this.BGimg_url[2] = this.light_img;
          //  this.BGimg_url[3] = this.light_img;
          //  this.black[0] = true;
          //  this.black[1] = true;
          //  this.black[2] = true;
          //  this.black[3] = true
        } else if (key == 5) {
          this.BGimg_url1 = this.light_img;
          this.BGimg_url2 = this.light_img;
          this.BGimg_url3 = this.light_img;
          this.BGimg_url4 = this.light_img;
          this.BGimg_url5 = this.light_img;
          this.black1 = true;
          this.black2 = true;
          this.black3 = true;
          this.black4 = true;
          this.black5 = true
          //  this.BGimg_url[0] = this.light_img;
          //  this.BGimg_url[1] = this.light_img;
          //  this.BGimg_url[2] = this.light_img;
          //  this.BGimg_url[3] = this.light_img;
          //  this.BGimg_url[4] = this.light_img;
          //  this.black[0] = true;
          //  this.black[1] = true;
          //  this.black[2] = true;
          //  this.black[3] = true;
          //  this.black[4] = true
        }
      } else {
        if (key == 1) {
          this.BGimg_url2 = this.black_img;
          this.BGimg_url3 = this.black_img;
          this.BGimg_url4 = this.black_img;
          this.BGimg_url5 = this.black_img;
          this.black2 = false
          this.black3 = false
          this.black4 = false
          this.black5 = false
        } else if (key == 2) {
          this.BGimg_url3 = this.black_img;
          this.BGimg_url4 = this.black_img;
          this.BGimg_url5 = this.black_img;
          this.black3 = false;
          this.black4 = false
          this.black5 = false
        } else if (key == 3) {
          this.BGimg_url4 = this.black_img;
          this.BGimg_url5 = this.black_img;
          this.black4 = false;
          this.black5 = false;
        } else if (key == 4) {
          this.BGimg_url5 = this.black_img;
          this.black5 = false;
        } else if (key == 5) {

        }
      }

    }
  },
}
</script>

<style lang="css">
  .li_view{
    float:left;
    padding:50px;
    list-style: none;
    background-size: 100%;
    background-repeat: no-repeat;
  }
</style>
