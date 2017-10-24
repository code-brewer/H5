<template>
<div class="">
  <div class="suggest">
    <input type="text" v-model="title" placeholder="请输入标题">
    <textarea v-model="content"  name="name" rows="12" cols="80" placeholder="请输入文本"></textarea>
  </div>
  <div class="choose">
    <p>板块:</p>
    <div class="choosebnt" v-for="item in tabBtn">
      <a :class="{isActive : mymoduleId===item.pkId}" @click="mymoduleId = item.pkId">{{item.idxModuleName}}</a>
    </div>
  </div>
  <div class="foot">
    <a @click="addPost1" class="bnt sent">发表</a>
    <a href="javascript:void(0)" class="bnt cancel">取消</a>
  </div>
</div>
</template>
<script>
import api from './../assets/api.js'
import { Toast } from 'mint-ui';
export default {
  name: 'getSuggest',
  data () {
    return {
      title : '',
      content : '',
      mymoduleId : '',
      tabBtn : [],//模块
    }
  },
  mounted() {
    // window.onscroll = this.scroll;
    this.getModule()
  },
  methods : {
    addPost1 () {
      if (!this.mymoduleId) {
          Toast({
                message: '请选择一个模块',
              });
          return
      }
      if (this.title && this.content) {
         api.addPost(this,{
          "moduleId":this.mymoduleId,         //模块id    (必填)
          "idxUserid":"2",        //用户id    (必填)
          "postTheme":this.title,     //帖子主题  (必填)
          "postContent":this.content      //帖子内容  (必填)
        },res=>{
            if (res.resCode==="000000"&&res.resMsg==="success"){
              this.initData()
              Toast({
                message: '操作成功',
                iconClass: 'icon icon-success'
              });
            }
        })
      }else {
        Toast({
                message: '请把信息填完整',
              });
      }
    },
    initData () {
      this.title = '';
      this.content = '';
    },
    getModule() {
      api.getModuleList(this,{

      },res=>{
        if (res.resCode==="000000"&&res.resMsg==="success") {
          res.repBody.forEach(item=>{
            this.tabBtn.push(item)
          })
        }
      })
    },
  }
}
</script>
<style scoped>
.suggest {
  padding: 0 10px;
  margin: 10px auto;
}

.suggest input {
  width: 100%;
  display: block;
  margin-top: 10px;
  border-radius: 5px;
  line-height: 35px;
  height: 35px;
  font-size: 14px;
  padding-left: 10px;
  box-sizing: border-box;
  outline: medium;
  border: 1px solid;
  /* color: #D3D1D1; */
}

.suggest textarea {
  width: 100%;
  margin-top: 20px;
  border: 1px solid;
  line-height: 20px;
  text-indent:15px;
  /* color: #D3D1D1; */
  border-radius: 5px;
  overflow: hidden;
  resize: none;
  box-sizing: border-box;
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
  padding: 0px 20px;
  opacity: 1;
}



/* Internet Explorer 10+ */

:-ms-input-placeholder {
  color: #9B9B9B;
  font-weight: 100;
}

.foot {

  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
    padding-bottom: 55px;
}

.bnt {
  /* margin: 40px; */
  padding: 13px 45px;
  border: 1px solid;
  border-radius: 10px;
  text-decoration-line: inherit;
}

.sent {
  color: #fff;
  background: #007aff;
  margin-right: 10px;
}

.cancel {
  color: #888;
  background: #D3D1D1;
}

.choose {
  width: 90%;
  overflow: auto;
  margin: 10px auto;
  text-align: left;
}

.choose p {
  text-align: left;
  margin: 10px 0px;
}

.choosebnt {
  /* width: 25%; */
  /* float: left; */
  margin-bottom: 10px;
  display: inline-block;
  padding: 0px 3px 0px 3px
}

.choosebnt a {
  border: 1px solid #000;
  color: #000;
  padding: 5px 8px;
  border-radius: 5px;
  background: #fff;
  line-height: 30px;
  text-decoration: none;
}

.choosebnt a:hover,a.isActive {
  border: 1px solid #BAE1FF;
  background: #BAE1FF;
}
</style>
