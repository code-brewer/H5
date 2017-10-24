<template>
<div class="sug">
  <div class="suggest">
    <div class="suggestList" v-for="item in postList">
      <div class="suggestUse">
        <img src="../../static/images/target.png" alt="">
        <p class="p1">{{item.userName}}</p>
        <p class="p2">{{new Date(item.ctime).Format("yyyy-MM-dd")}}</p>
      </div>
      <div class="qus">
        <h1>{{item.suggestDesc}}</h1>
        <p><i class="circle"></i><span>{{item.suggestRspContent}}</span></p>
      </div>
    </div>
  </div>
  <div class="foot" @click="go()">
    提意见
  </div>
</div>
</template>
<script>
import api from './../assets/api.js'
export default {
  name: 'suggest',
  data() {
    return {
      active: 'tab-container1',
      postList : [],//意见列表
      page_size :4,
      cur_page : 1,
      all_page : 0 ,
      isPost : true //截流
    }
  },
   mounted() {
    window.onscroll = this.haddleScroll;
    this.getList()
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  methods: {
    go() {
      this.$router.push({
        name: 'getSuggest'
      })
    },
    getList() {
      this.isPost = false;
      api.list(this,{
          data:{
                    "pageName":"suggestService",
                    "paginator":
                    {
                        "limit":this.page_size,    //每页几条  (必填)
                        "page":this.cur_page      //第几页       (必填)
                    },
                        "params":{}
                }

      },res=>{
        this.isPost = true;
        if (res.resCode==="000000"&&res.resMsg==="success") {
           res.repBody.list.forEach(item=>{
              this.postList.push(item)
          })
          this.all_page = res.repBody.paginator.totalPages
        }
      })
    },
    getScrollTop() {
      var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    　　if(document.body){
    　　　　bodyScrollTop = document.body.scrollTop;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollTop = document.documentElement.scrollTop;
    　　}
    　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    　　return scrollTop;
    },
    getScrollHeight(){
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    　　if(document.body){
    　　　　bodyScrollHeight = document.body.scrollHeight;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollHeight = document.documentElement.scrollHeight;
    　　}
    　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    　　return scrollHeight;
    },
    getWindowHeight(){
        var windowHeight = 0;
    　　if(document.compatMode == "CSS1Compat"){
    　　　　windowHeight = document.documentElement.clientHeight;
    　　}else{
    　　　　windowHeight = document.body.clientHeight;
    　　}
    　　return windowHeight;
    },
    haddleScroll() {
     if(this.getScrollTop() + this.getWindowHeight()+120 > this.getScrollHeight() && this.isPost){
　　　　 if (++this.cur_page <= this.all_page) {
          this.getList()
        }
        
        
      }
    },
  }
}
</script>
<style scoped>
.sug {
  background: #F5F5F5;
  padding-bottom: 40px;
}


.foot {
  position: fixed;
  bottom: 0px;
  left: 0px;
  font-size: 16px;
  width: 100%;
  height: 55px;
  line-height: 55px;
  color: #fff;
  background: #007aff;
}

.bnt {
  color: #fff;
  text-decoration-line: inherit;
}

.suggest {
  width: 100%;
  margin: 10px auto;
}

.suggestUse {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 5px;
  overflow: auto;
}

.suggestUse img {
  float: left;
  width: 30px;
}
.suggestUse p {
  margin-top: 10px;
}

.p1 {
  float: left;
  padding-left: 10px;
  font-size: 14px;
}

.p2 {
  float: right;
}

.suggestList p {
  color: #9b9b9b;
  display: inline;
}

.suggestList {
  /* margin: 20px 0px; */
  background: #fff;
  padding: 10px 20px;
}

.suggestList span {
  color: #9b9b9b;
}

h1 {
  margin-bottom: 10px;
  word-wrap: break-word;
}

.qus {
  text-align: -webkit-auto;
  margin: 20px 0px;
}
.qus > p {
  display: block;
  line-height: 20px;
}
.circle {
  display: inline-block;
  height: 5px;
  width: 5px;
  border-radius: 3px;
  background-color: #52e59c;
  vertical-align: middle;
  margin-bottom: 4px;
  margin-right: 8px;
}
</style>
