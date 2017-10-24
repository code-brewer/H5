<template>
<div class="container">
  <mt-navbar v-model="active" class="page-part">
    <mt-tab-item class="" @click.native="clickTab('tab-container1')" id="tab-container1">视频</mt-tab-item>
    <mt-tab-item class="" @click.native="clickTab('tab-container2')" id="tab-container2">PPT</mt-tab-item>
  </mt-navbar>
  <div class="swiper-container" id="swiper1">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in bannerList">
        <img style="width:100%;" :src="item.adImage" alt="">
      </div>
    </div>
    <div class="swiper-pagination" id="pagination1"></div>
  </div>
  <div style="padding:0px 5px;">
      <div class="search_home" >
        <input type="text" v-model="tagName" placeholder="请输入您要搜索的税收类型">
        <div style="float: left;height: 32px">
            <span @click = "inputSearch"><i class="mintui mintui-search"></i>搜索</span>
        </div>
      </div>
      <div class="choose">
        <div class="bnt" v-for="item in searchList">
          <a @click="search(item)">{{item}}</a>
        </div>
      </div>
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="tab-container1">
          <div class="PPT"><span class="title">精选课堂</span></div>
          <div class="">
            <div class="" v-for="item in list">
              <video  :src="item.lessonUrl">
                
              </video>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <div class="PPT"><span class="title">精品PPT</span></div>
          <div v-for="item in pptList" style="margin-bottom: 10px;">
            <div class="ppt_des rim" @click="handelCilckPPT(item.lessonUrl)">
              <div class="col-left rim_left">
                <img src="../../static/images/3.png" width="70" >
              </div>
              <div class="col-middle rim_middle">
                <h3>{{item.lessonName}}</h3>
                <p>{{item.lessonDesc}}</p>
              </div>
              <div class="col-right rim_right">
                <!-- <img src="../../static/images/2.png" width="50" > -->
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      </div>
</div>
</template>

<script>
import {
  TabContainer,
  TabContainerItem
} from 'mint-ui';
import api from  './../assets/api.js'
export default {
  name: 'Home',
  components: {
    // TabContainer,
    // TabContainerItem
  },
  data() {
    return {
      active: 'tab-container1',
      tagName : '',
      list : [],
      searchList:[
        '增值税',
        '所得税',
         '科技财税',
        '其他税种',
        '政策法规'
      ],
      bannerList : [
        // {
        //   src : '../../static/images/1.png'
        // },
        // {
        //   src : '../../static/images/2.jpg'
        // }, 
        // {
        //   src : '../../static/images/3.jpg',
        // }
      ],
      pptList : []
      
    }
  },
  watch: {
    tagName (newVal) {
      if (!newVal) {
        this.inputSearch()
      }
    }
  },
  mounted() {
    this.getBanner('1')
    this.$nextTick(function() {
      this.banner();
      this.getList()
      this.getPPTList()
    })
  },
  methods: {
    banner() {
      var mySwiper = new Swiper('#swiper1', {
        autoplay: 5000, //可选选项，自动滑动
        direction: 'horizontal',
        loop: false,
        // 如果需要分页器
        pagination: '#pagination1',
      });
    },
    getList() {
      api.getLessonNetList(this,{
        "lessonType":"1" ,           //课程分类(1视频 2PPT)  (必填)
        "tagName":this.tagName            //模糊搜索条件  (非必填) (如果没有则不传该参数)
        // "pkTagId":"1"             //标签id      (非必填) (如果没有则不传该参数)
      },res=>{
        if (res.resCode==="000000"&&res.resMsg==="success") {
          this.list = res.repBody
        }
      })
    },
    getPPTList () {
      api.getLessonNetList(this,{
        "lessonType":"2" ,           //课程分类(1视频 2PPT)  (必填)
        "tagName":this.tagName            //模糊搜索条件  (非必填) (如果没有则不传该参数)
        // "pkTagId":"1"             //标签id      (非必填) (如果没有则不传该参数)
      },res=>{
        console.log(res)
        if (res.resCode==="000000"&&res.resMsg==="success") {
          this.pptList = res.repBody
        }
      })
    },
    search (val) {
      this.tagName = val;
      this.inputSearch()
    },
    inputSearch() {
      if (this.active ==='tab-container1') {
        this.getList()
      }
      else if (this.active ==='tab-container2') {
        this.getPPTList()
      }
    },
    clickTab (val) {
      if (val ==='tab-container1') {
        this.getBanner('1')
      }
      else if (val ==='tab-container2') {
        this.getBanner('2')
      }
    },
    handelCilckPPT(url) {

      window.location.href=basePath + url
    },
    getBanner (type) {
        api.getAdvertisementList(this,{
          types  : type  //课程分类(1视频 2PPT)  (必填)
        },res=>{
          if (res.resCode==="000000"&&res.resMsg==="success") {
            this.bannerList = res.repBody.map(item => {
                item.adImage = item.adImage||''
               return item
            })
          }
        })
    }
    
   }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #D4D4D4;
  /* font-size: 40px; */
  text-decoration: none;
}

.swiper-slide img {
  width: 100%
}

.search_home {
  margin: 10px auto;
    width: 98%;
  border: 1px solid #4385F5;
  border-right: none;
  border-radius: 8px;
  /* background: #4385F5; */
  overflow: hidden;
  box-sizing: border-box;
  line-height: 30px;
  height: 30px;
  display: flex;
}

.search_home input {
  width: 80%;
  box-sizing: border-box;
  padding-left: 10px;
  /* float: left; */
  font-size: 14px;
  line-height: 30px;
  height: 30px;
  outline: medium;
  border: 0px;
  flex :  8;
}
.search_home > div {
  flex :  2 ;
  background: #4385F5;
      border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.search_home span {
      display: block;
    height: 30px;
    line-height: 28px;
    font-size: 14px;
  color: #fff;
}

.mintui {
  /* font-size: 35px; */
}

.choose {
  width: 100%;
  /* height: 40px; */
  overflow: auto;
  text-align: left;
  /* display: flex; */
}

.bnt {
  /* flex :  1; */
  display: inline-block;
  padding: 0 3px;
}

.bnt a {
  border: 1px solid #000;
  color: #000;
  /* font-size: 35px; */
  padding: 5px 10px;
  border-radius: 5px;
  background: #fff;
  line-height: 40px;
}

.bnt a:hover {
  border: none;
 background-color: #BAE1FF;
 color: #000;
}

::-webkit-input-placeholder {
  color: #9B9B9B;
  font-weight: 100;
}



/* Mozilla Firefox 4 to 18 */

:-moz-placeholder {
  color: #9B9B9B;
  font-weight: 100;
  opacity: 1;
}



/* Mozilla Firefox 19+ */

::-moz-placeholder {
  color: #9B9B9B;
  font-weight: 100;
  opacity: 1;
}



/* Internet Explorer 10+ */

:-ms-input-placeholder {
  color: #9B9B9B;
  font-weight: 100;
}

.PPT {
  overflow: auto;
  margin: 10px auto;
  padding: 0px 10px;
}
.ppt_des img {
  border-radius: 10px;
}
.title {
  float: left;
  font-weight: 700;
  border-left: 3px solid #4385F5;
  padding-left: 10px;
  line-height: 23px;
}

.ppt_des {
  display: flex;
  display: -webkit-flex;
}

.col-left {
  width: 200px;
  background-size: 100px 100px;
  background-position: center center;
}

.col-middle {
  -ms-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  text-align: -webkit-auto;
}

.col-right {
  width: 100px;
  position: relative;
  &:after {
    position: absolute;
    content: "";
    display: inline-block;
    width: 50px;
    height: 50px;
    border-right: 2px solid #0f0;
    border-bottom: 2px solid #0f0;
    transform: rotate(-45deg);
    top: 40px;
    right: 40px;
  }
}

.rim {
  border: 1px solid #D3D1D1;
  border-radius: 10px;
  display: flex;
}
div.mint-tab-item-label {
  /* font-size: 45px; */
  font-size: 14px;
} 
.mint-navbar .mint-tab-item.is-selected {
      border-bottom: 2px solid #26a2ff;
          margin-bottom: 0px;
}
a:hover {
  text-decoration: none;
}
.mint-navbar .mint-tab-item {
      padding: 15px 0;

}
.rim_left {
  flex: 2;
  line-height: 90px;
}
.rim_left img {
  vertical-align: middle;
}
.rim_middle {
  flex: 6;
}
.rim_middle h3 {
  font-size: 16px;
  padding-top: 15px;
}
.rim_middle p {
  line-height: 18px;
    padding-top: 5px;
}

.rim_right {
  flex: 2;
}
</style>
