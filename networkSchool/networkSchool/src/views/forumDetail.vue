<template>
<div class="container">
  <div class="head" >
  </div>
  <div class="forum">
        <div class="forumList">
          <div class="suggestUse">
            <img src="../../static/images/target.png" alt="">
            <p class="p1">{{item.nick}}</p>
            <p class="p2"><i class="iconfont icon-label"></i>{{new Date(item.postTime).Format("yyyy-MM-dd")}}</p>
          </div>
           <div class="qus">
            <h1>{{item.postTheme}}</h1>
            <p><i class="circle"></i><span>{{item.postContent}}</span></p>
          </div>
          <div class="zan">
            <div style="float:left">
              <i  class="iconfont icon-browse"></i>
              <p>{{item.cnt||0}}</p>
              <i @click="handleComment" class="iconfont icon-comment"></i>
              <p>{{item.rspNum||0}}</p>
              <i class="iconfont icon-zan" :class="{isLike : isLike}" @click="haddleClickLike(item.pkId,item)"></i>
              <p>{{item.likeNum||0}}</p>
            </div>
            <div style="float:right;height: 25px">
                <p style="line-height:30px;padding-right:0">{{new Date(item.postTime).Format("hh:mm:ss")}}</p>
            </div>
          </div>
          <div class="comment" v-if="item.postRspList.length>0">
            <p v-for="sonItem in item.postRspList" @click="clickComment(sonItem.idxUserid)">
              <span v-if="!sonItem.idxUseridTarget">{{sonItem.idxUserid}}</span>
              <span v-else>{{sonItem.idxUserid}} 回复 {{sonItem.idxUseridTarget
}}</span> : {{sonItem.rspContent}}
            </p>
          </div>
        </div>
        <div class="commentInput">
             <input type="" name="" v-model="comment" @keyup.enter="haddleComment(item)" placeholder="评论">
             <i class="iconfont icon-comment"></i>
        </div>
      </div>
 
</div>
</template>
<script>
import {
  TabContainer,
  TabContainerItem
} from 'mint-ui';
import api from './../assets/api.js'
export default {
  components: {},
  data() {
    return {
      comment : '',//评论
      reply: '',//回复谁
      isLike: false,//有没有点赞
      item : {
        cnt: '',
        idxUserid:'',
        likeNum:'',
        nick:'',
        pkId:'',
        postContent:'',
        postStatus:'',
        postTheme:'',
        postTime:'',
        rspNum:'',
        postRspList :[]
      }
    }
  },
  watch: {},
  mounted() {
   this.recordBrowse()
   this.getLikeList().then(res=>{
      console.log(res)
      console.log(this.item.pkId)
    res.repBody.forEach(item=>{
      item.pkPostId == this.item.pkId ? this.isLike = true : ''
    })
    console.log(this.isLike)
   })

  },
  beforeDestroy() {
  },
  methods: {
    handleComment() {
      this.$el.querySelector('input').focus()
    },
    haddleComment(item) {
       this.$bus.emit('rspPost',item,this.comment,this.reply,()=>{
            this.recordBrowse()
       })
       this.comment = ''
       this.reply = ''
    },
    getLikeList() {//获取用户点赞列表
      var _this = this 
      var promise = new Promise (function (resolve, reject) {
           api.likeList(_this,{
            "userId":"1"        //用户id (登录功能做好之后不用传该参数)
          },res=>{
            if (res.resCode==="000000"&&res.resMsg==="success") {
              resolve(res)

            }else {
              reject()
            }
          })
      })
      return promise
    },
    recordBrowse () {//记录浏览量
      api.addPostLog(this,{
          "idxPostId" : this.$route.params.forumId
      },res=>{
        if (res.resCode==="000000"&&res.resMsg==="success") {
          
          this.item = res.repBody 
            this.getLikeList().then(res=>{
              console.log(res)
              console.log(this.item.pkId)
            res.repBody.forEach(item=>{
              item.pkPostId == this.item.pkId ? this.isLike = true : ''
            })
            console.log(this.isLike)
           })



        }
      })
    },
    clickComment(id) {
      this.$el.querySelector('input').focus()
      this.reply = id
    }

  }
}
</script>
<style scoped>
.container {
  /* background: #F5F5F5; */
  padding-top: 10px;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  z-index: 100;
}

.a1 {
  text-decoration: none;
  color: #D4D4D4;
}

.mintui {
  font-size: 35px;
}

.choose {
  /* width: 90%; */
  box-sizing: border-box;
  padding-top: 5px;
  overflow: auto;
  /* margin: 10px auto; */
  text-align: -webkit-auto;
  background: #fff;
}

.bnt {
    display: inline-block;
    padding: 0px 5px 0px 5px;
    box-sizing: border-box;
}

.bnt a {
  border: 1px solid #000;
  color: #000;
  text-decoration: none;
  /* font-size: 35px; */
  padding: 5px 10px;
  border-radius: 5px;
  background: #fff;
  text-align: none;
  line-height: 40px;
}

.bnt a:hover {
  border: none;
 background-color: #98d8f5;
 color: #000;
}

.forum {
  width: 100%;
  margin: 8px auto;
  padding-bottom: 10px;
}

.forumUse {
  border-bottom: 1px solid #D4D4D4;
  overflow: auto;
}

.forumUse img {
  float: left;
  width: 30px;
}

.p1 {
  float: left;
  font-size: 16px;
  color: #000;
}

.p2 {
  float: right;
   color: #e7e7e7;
}

.forumUse p {
}

.forumList p {
  /* color: #9b9b9b; */
  display: inline;
}

.forumList {
  margin: 0;
  background: #fff;
  padding: 0px  15px 15px;
}

.forumList span {
  color: #9b9b9b;
}

h1 {
  margin-bottom: 20px;
}

.qus {
  text-align: -webkit-auto;
  margin: 20px 0px;
}
.qus > p {
  display: block;
  line-height: 20px;
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
.suggestUse > p {
  margin-top: 10px;
  position: relative;
  /* color: #e7e7e7; */
}
.suggestUse > p > i {
  position: absolute;
  top: -6px;
  font-size: 25px;
  left: -25px;
  color: #e7e7e7;

}


.mint-tab-item-label {
}

.zan {
  text-align: left;
  overflow: hidden;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.zan .iconfont {
  font-size: 25px;
  margin-right: 0px;
  vertical-align: sub;
}
.zan  p {
  padding-right: 15px;
  color :  #7e7e7e !important;
}
.comment {
  margin-top: 10px;
  padding: 5px;
  /* border: 1px solid #D4D4D4; */
  overflow: auto;
}

.comment p {
  display: block;
  text-align: left;
  line-height: 20px;
}

.comment a {
  float: right;
  color: #9b9b9b;
  margin-top: 20px;
  padding-bottom: 5px;
}
.commentInput {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #e8e8e8;
}
.commentInput input {
  width: 90%;
  height: 25px;
  border: 1px solid #ccc;
  margin: 8px auto;
  box-sizing: border-box;
  padding-right: 35px;
  padding-left: 10px;
}
.commentInput i  {
    position: absolute;
    font-size: 1.3rem;
    right: 4%;
    bottom: 19%;
 }
  .isLike {
    color: #FFC107;
 }
</style>
