<template>
<div style="padding:15px">
  <div class="enroll">
    <input type="text" name="" v-model="userName" placeholder="联系人姓名">
    <input type="text" name="" v-model="idxMobile" placeholder="联系方式">
    <input type="text" name="" v-model="companyName" placeholder="请填写您的单位名称">
    <span>课程名称：企业纳税注意事项</span>
  </div>
  <div class="foot">
    <a @click="addLesson" class="bnt sent">提交</a>
    <a @click="initData" class="bnt cancel">取消</a>
  </div>
</div>
</template>
<script>
import { Toast } from 'mint-ui';
import api from './../assets/api.js'
import { Indicator } from 'mint-ui';
export default {
  name: 'Enroll',
  data () {
    return {
        "pkLessonName":"税务基础知识课堂",      //课程名称  (必填)
        "companyName":"",               //公司名称  (必填)
        "userName":"",                   //联系人姓名 (必填)
        "idxMobile":""           //联系方式  (必填)
    }
  },
  components : {
  },
  methods : {
    addLesson () {
        if (this.companyName&&this.userName&&this.checkPhone()){
           Indicator.open({
              text: 'Loading...',
              spinnerType: 'fading-circle'
            });
            api.addLessonEnroll(this,{
                "pkLessonName":"税务基础知识课堂",      //课程名称  (必填)
                "companyName":this.companyName,               //公司名称  (必填)
                "userName":this.userName,                   //联系人姓名 (必填)
                "idxMobile":this.idxMobile      
            },res=>{
                Indicator.close();
                if (res.resCode==="000000"&&res.resMsg==="success"){
                    Toast({
                      message: '报名成功',
                      iconClass: 'icon icon-success'
                    });
                    this.initData()

                }
                    
            })
        }else {
            Toast({
                      message: '请填写正确信息'
                    });
        }
        
    },
    checkPhone() {
        if(!(/^1[34578]\d{9}$/.test(this.idxMobile ))){ 
            return false; 
        } else {
            return true ;
        }
    },
    initData () {
      this.companyName = '';
      this.userName = '';
      this.idxMobile = '';
    }
  }
}
</script>
<style scoped>
textarea,input{
    border: 0; /* 方法1 */
    -webkit-appearance: none; /* 方法2 */
}
.enroll {
  /* line-height: 100px; */
  margin: 10px auto;
}

.enroll input {
      width: 100%;
    display: block;
    box-sizing: border-box;
    border-radius: 7px;
    outline: medium;
    border: 1px solid;
    vertical-align: middle;
    height: 35px;
    margin-bottom: 15px;
    padding-left: 15px;
}

.enroll span {
  float: left;
  margin: 15px 0px;
}

::-webkit-input-placeholder {
  color: #9B9B9B;
  font-weight: 100;
   line-height: 18px;
}



/* Mozilla Firefox 4 to 18 */

::-moz-placeholder {
  color: #9B9B9B;
   line-height: 18px;
  font-weight: 100;
  opacity: 1;
}



/* Mozilla Firefox 19+ */

::-moz-placeholder {
  color: #9B9B9B;
    line-height: 18px;
  font-weight: 100;
  opacity: 1;
}



/* Internet Explorer 10+ */

:-ms-input-placeholder {
  color: #9B9B9B;
   line-height: 18px;
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
.mint-toast-text {
    /* padding: 20px !important; */
    /* vertical-align: middle; */

}
</style>
