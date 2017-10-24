<template>
<div style="padding:15px">
  <div class="suggest">
    <input type="text" v-model="name" placeholder="联系人姓名">
    <input type="text" v-model="phone" placeholder="联系方式">
    <input type="text" v-model="company" placeholder="请填写您的公司名称">
    <textarea v-model="opinion" rows="12" cols="80" placeholder="请填写您的意见"></textarea>
  </div>
  <div class="foot">
    <a @click="addSuggest"  class="bnt sent">提交</a>
    <a @click="initData" class="bnt cancel">取消</a>
  </div>
</div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import api from './../assets/api.js'
export default {
  name: 'getSuggest',
  data () {
    return {
      name : '',
      phone : '',
      company : '',
      opinion : ''
    }
  },
  methods : {
    addSuggest () {
      if (this.name&&this.phone&&this.company&&this.opinion&&this.checkPhone()){
            Indicator.open({
              text: 'Loading...',
              spinnerType: 'fading-circle'
            });
            api.addSuggest(this,{
                "idxUserid":"1",      //课程名称  (必填)
                "suggestDesc":this.opinion,               //意见  (必填)
                "companyName":this.company,                   //描述 (必填)
                "mobile":this.phone ,     
                "userName":this.name      
            },res=>{
                Indicator.close();
                if (res.resCode==="000000"&&res.resMsg==="success"){
                    Toast({
                      message: '提意见成功',
                      iconClass: 'icon icon-success'
                    });
                    this.initData()

                }else {
                    Toast({
                      message: '添加失败',
                    });
                }
                    
            })
        }else {
            Toast({
                      message: '请填写正确信息'
                    });
        }
    },
    checkPhone() {
        if(!(/^1[34578]\d{9}$/.test(this.phone ))){ 
            return false; 
        } else {
            return true ;
        }
    },
    initData () {
      this.name = '';
      this.phone = '';
      this.company = '';
      this.opinion = '';
    }
  }
}
</script>
<style scoped>
.suggest {
  /* width: 90%; */
  /* font-size: 40px; */
  margin: 10px auto;
}
.suggest input {
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
.suggest textarea {
  /* padding-left: 30px; */
  box-sizing: border-box;
  width: 100%;
  line-height: 22px;
  text-indent:15px;
  /* line-height: 105px; */
  /* margin-top: 40px; */
  border: 1px solid;
  /* color: #D3D1D1; */
  border-radius: 10px;
  overflow: hidden;
  resize: none;
}

::-webkit-input-placeholder {
  color: #9B9B9B;
  /* font-size: 40px; */
  /* line-height: 80px; */
  font-weight: 100;
  /* padding: 0px 20px; */
}
/* Mozilla Firefox 4 to 18 */
:-moz-placeholder {
  color: #9B9B9B;
  /* font-size: 40px; */
  /* line-height: 80px; */
  font-weight: 100;
  /* padding: 0px 20px; */
  opacity: 1;
}
/* Mozilla Firefox 19+ */
::-moz-placeholder {
  color: #9B9B9B;
  /* font-size: 40px; */
  /* line-height: 80px; */
  font-weight: 100;
  /* padding: 0px 20px; */
  opacity: 1;
}
/* Internet Explorer 10+ */
:-ms-input-placeholder {
  color: #9B9B9B;
  /* font-size: 40px; */
  /* line-height: 80px; */
  font-weight: 100;
  /* padding: 0px 20px; */
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
