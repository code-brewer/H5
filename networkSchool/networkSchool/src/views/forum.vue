<template>
<div class="container">
  <div class="head" :class="{fixed: fixed}">
    <mt-navbar v-model="active" class="page-part">
      <mt-tab-item class="a1" id="tab-container1">首页</mt-tab-item>
      <mt-tab-item class="a1" id="tab-container2">精华</mt-tab-item>
    </mt-navbar>
    <div class="choose" v-if="active==='tab-container1'">
      <div class="bnt" v-for="item in tabBtn">
        <a @click="haddleClickTabBtn(item)">{{item.idxModuleName}}</a>
      </div>
     
    </div>
  </div>
  <mt-tab-container v-model="active">
    <mt-tab-container-item id="tab-container1">
      <div class="forum">
        <div class="forumList" v-for="item in postList" >
          <div class="suggestUse">
            <img src="../../static/images/target.png" alt="">
            <p class="p1">{{item.nick}}</p>
            <p class="p2"><i class="iconfont icon-label"></i>{{new Date(item.postTime).Format("yyyy-MM-dd")}}</p>
          </div>
           <div class="qus" @click="goDetail(item)">
            <h1>{{item.postTheme}}</h1>
            <p><i class="circle"></i><span>{{item.postContent}}</span></p>
          </div>
          <div class="zan">
            <div style="float:left">
              <i class="iconfont icon-browse"></i>
              <p>{{item.cnt||0}}</p>
              <i class="iconfont icon-comment" @click="haddleClickCommon(item)"></i>
              <p>{{item.rspNum||0}}</p>
              <i class="iconfont icon-zan" :class="{isLike : item.isLike}" @click="haddleClickLike(item.pkId,item)"></i>
              <p>{{item.likeNum||0}}</p>
            </div>
            <div style="float:right;height: 25px">
                <p style="line-height:30px;padding-right:0">{{new Date(item.postTime).Format("hh:mm:ss")}}</p>
            </div>
          </div>
          <div class="comment" v-if="item.postRspList.length>0">
            <p v-for="sonItem in item.postRspList">{{sonItem.idxUserid}} : {{sonItem.rspContent}}</p>
            <a @click="goDetail(item)">查看全部回复 ></a>
          </div>
        </div>
      </div>
    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container2">
       <div class="forum">
        <div class="forumList" v-for="item in goodPost">
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
              <i class="iconfont icon-browse"></i>
              <p>{{item.cnt||0}}</p>
              <i class="iconfont icon-comment"  @click="haddleClickCommon"></i>
              <p>{{item.rspNum||0}}</p>
              <i class="iconfont icon-zan" :class="{isLike : item.isLike}" @click="haddleClickLike(item.pkId,item)"></i>
              <p>{{item.likeNum||0}}</p>
            </div>
            <div style="float:right;height: 25px">
                <p style="line-height:30px;">{{new Date(item.postTime).Format("hh:mm:ss")}}</p>
            </div>
          </div>
          <div class="comment" v-if="item.postRspList.length>0">
            <p v-for="sonItem in item.postRspList">{{sonItem.idxUserid}} : {{sonItem.rspContent}}</p>
            <a>查看全部回复 ></a>
          </div>
        </div>
      
      </div>
    </mt-tab-container-item>
  </mt-tab-container>
  <div class="commentInput" v-if="isComment">
             <input type="" id="comment1" @keyup.enter="haddleComment(haddleItem)" v-model="comment"  name="" placeholder="评论" autofocus
             
              >
             <i class="iconfont icon-comment"></i>
        </div>
  <div class="foot" @click="go()" v-else>
    <a class="footbnt">发帖子</a>
  </div>
</div>
</template>
<script>
import {
  TabContainer,
  TabContainerItem
} from 'mint-ui';
import { Toast } from 'mint-ui';
import api from './../assets/api.js'
export default {
  components: {},
  data() {
    return {
      active: 'tab-container1',
      fixed: false, //计划和规则tab置顶
      tabBtn : [],//模块
      postList : [],//帖子
      goodPost :[],
      paging1 :{//首页分页
        page_size :4,
        cur_page : 1,
        all_page : 0,
      },
      paging2 :{//精华分页
        page_size :4,
        cur_page : 1,
        all_page : 0,
      },
      comment : '',//评论
      haddleItem : {},
      selectModule: '',//选择的模块
      likeList : [],//评论过的帖子
      isPost: false,//是否在请求首页
      isGoodPost : false , //是否在请求精华
      isComment :  false //是不是正在评论
    }
  },
  watch: {},
  mounted() {
    window.onscroll = this.haddleScroll;
    // this.getModule(this.tabBtn)
    this.$bus.emit('getModule',this.tabBtn)//获取模块
    this.likeList = this.getLikeList()
    this.getEssencePost()
    this.haddleList('1')
 
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        name : 'forumDetail',
        params: {forumId: item.pkId }
      })
    },
    getList(val) {
      var _this = this 
      var promise = new Promise (function (resolve, reject) {
            api.list(_this,{
                data:{
                          "pageName":"postService",
                          "paginator":
                          {
                              "limit":val=='2' ?_this.paging2.page_size : _this.paging1.page_size,    //每页几条  (必填)
                              "page":val=='2' ?_this.paging2.cur_page++ :_this.paging1.cur_page++,      //第几页       (必填)
                             

                             
                             
                          },
                              "params":{
                                  "type" : val,
                                  "moduleId" : _this.selectModule
                              }
                      }

            },res=>{
              if (res.resCode==="000000"&&res.resMsg==="success") {
                
                
                 resolve(res)
                //   res.repBody.list.forEach(item=>{
                //     _this.postList.push(item)
                // })
                // _this.all_page = res.repBody.paginator.totalPages
              }else {
                reject()
              }
            })
      });
      return promise
    },
    
    go() {
      this.$router.push({
        name: 'forumpost'
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

     if(this.getScrollTop() + this.getWindowHeight()+120 > this.getScrollHeight()){
        console.log(this.paging1.cur_page)
　　　　 if (this.paging1.cur_page <= this.paging1.all_page&&this.active==='tab-container1') {
          this.haddleList('1')
        }
        if (this.paging2.cur_page <= this.paging2.all_page&&this.active==='tab-container2') {
          this.haddleList('2')
        }
        
        
      }
    },
    haddleClickLike(id,item) {

      this.$bus.emit('getLike',id,()=>{
        item.likeNum++
        item.isLike = true;
      })
    },
    haddleComment(item){
      this.isComment = false
      
      this.rspPost(item)

    },
    haddleClickCommon(item) {
      
      this.isComment  = true;
      this.haddleItem = item
      this.$nextTick(()=>{
        this.$el.querySelector('#comment1').focus()
      }) 
      
    },
    getLikeList() {
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
    getEssencePost() {
        this.haddleList("2")//获取精华帖
        // api.getGoodPostList(this,{
          
        // },res=>{
        //   if (res.resCode==="000000"&&res.resMsg==="success") {
        //     this.goodPost = res.repBody
        //   }
        // })
    },
    rspPost(item) {//回帖
        this.$bus.emit('rspPost',item,this.comment)
        // api.rspPost(this,{
        //     "idxUserid":"2",      //用户id      (必填)
        //     // "idxUseridTarget":"3",    //被回复的用户id  (非必填,如果不传,则表示回复的是帖子)
        //     "postId":item.pkId,       //帖子id      (必填)
        //     "rspContent":this.comment    //回复的内容   (必填)
        // },res=>{
        //   if (res.resCode==="000000"&&res.resMsg==="success") {
        //       Toast({
        //               message: '评论成功',
        //             });
        //       item.postRspList.push({
        //         rspContent : this.comment,
        //         idxUserid : "123"
        //       })
        //       this.comment = ''


        //   }else {
        //       Toast({
        //               message: '评论失败',
        //             });
        //   }
        // })
    },
    haddleClickTabBtn(item) {
      this.selectModule = item.pkId;
       this.postList = [];
       this.paging1  = {//首页分页
          page_size :4,
          cur_page : 1,
          all_page : 0,
        }
      this.active === 'tab-container1' ? this.haddleList('1') :this.haddleList('2')
    },
    haddleList(val,cb) {
      //val为1时是首页，为2时是精华
        if (val=='2') { //截流
            if(this.isGoodPost) return
            this.isGoodPost = true ;
        }
        else if (val=='1')  {
          if(this.isPost) return
          this.isPost = true ;
        }


        var _this = this;
           Promise.all([_this.getList(val),_this.likeList]).then(function(res) { //判断用户是否有点赞
            var postList = res[0].repBody.list||[]
            var likeList = res[1].repBody||[]
             if (val=='2') {
                  _this.paging2.all_page = res[0].repBody.paginator.totalPages
                }
              else if (val=='1') {
                _this.paging1.all_page = res[0].repBody.paginator.totalPages
              }
            postList.forEach((item)=>{
                _this.$set(item,'isLike',false)
                likeList.forEach((likeItem)=>{
                  if (likeItem.pkPostId == item.pkId) {
                    _this.$set(item,'isLike',true)
                  }
                })
                if (val=='2') {
                  _this.goodPost.push(item)
                }
                else if (val=='1')
                 {
                  _this.postList.push(item)
                }
            })
            if (cb) cb()


            if(val=='2'){
               _this.isGoodPost = false
            }else if (val=='1') {
              _this.isPost = false ;
            }


          });
    }

  }
}
</script>
<style scoped>
.container {
  background: #F5F5F5;
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
    padding: 0px 4px 0px 4px;
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
}

.p2 {
  float: right;
}

.forumUse p {
}

.forumList p {
  color: #9b9b9b;
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
  margin-top: 10px;
}

.suggestUse img {
  float: left;
  width: 30px;
}
.suggestUse > p {
  margin-top: 10px;
  position: relative;
  color: #e7e7e7;
}
.suggestUse > p > i {
  position: absolute;
  top: -6px;
  font-size: 25px;
  left: -25px;
  color: #e7e7e7;

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

.footbnt {
  color: #fff;
  text-decoration-line: inherit;
}

.mint-tab-item-label {
}

.zan {
  text-align: left;
  overflow: hidden;
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
  border: 1px solid #D4D4D4;
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

.container {

  padding-bottom: 40px;
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
