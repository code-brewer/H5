<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import api from './assets/api.js'
import { Toast } from 'mint-ui';
export default {
  name: 'app',
  created() {
      this.$bus.on('getLike',(id,cb)=>{
        this.getLike(id,cb)

      })
      this.$bus.on('getModule',arr=>{
        this.getModule(arr)
      })
      this.$bus.on('rspPost',(item,comment,val,cb)=>{
        this.rspPost(item,comment,val,cb)
      })

  },
  methods : {
    getLike (id,cb) {//点赞
      api.likePost(this,{
        "pkPostId":id,       //帖子id    (必填)
        "type":"1",         //判断是点赞还是取消点赞(0取消点赞 1点赞)  (必填)
        "pkUserId":"1"         //用户id (登录功能做好之后不用传该参数)
      },res=>{
          console.log(res)
           if (res.resCode==="000000"&&res.resMsg==="success") {
             Toast({
                      message: '点赞成功',
                    });
             if (cb) cb()
          }
          else if (res.resCode==="10001") {
            Toast({
                      message: '已经点赞',
                    });
          }
          else {
              Toast({
                      message: '点赞异常',
                    });
          }
      })
    },
    getModule(arr) {
      api.getModuleList(this,{

      },res=>{
        if (res.resCode==="000000"&&res.resMsg==="success") {
           arr.push({
            idxModuleName : '全部'
           })
          res.repBody.forEach(item=>{
            arr.push(item)
          })
        }
      })
    },
    rspPost(item,comment,val,cb) {//回帖
      console.log(val)
        api.rspPost(this,{
            "idxUserid":"3",      //用户id      (必填)
            "idxUseridTarget":val,    //被回复的用户id  (非必填,如果不传,则表示回复的是帖子)
            "postId":item.pkId,       //帖子id      (必填)
            "rspContent":comment    //回复的内容   (必填)
        },res=>{
          if (res.resCode==="000000"&&res.resMsg==="success") {
              Toast({
                      message: '评论成功',
                    });
              if (val) {
                if(cb) cb()
              }else {
                item.postRspList.unshift({
                  rspContent : comment,
                  idxUserid : "123"
                })
              }
              item.rspNum ++
              comment = ''


          }else {
              Toast({
                      message: '评论失败',
                    });
          }
        })
    },
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.mint-toast{
    font-size: 50px;
}
::-webkit-scrollbar { width: 1px;}
</style>
