<template>
  <div class="both">
    <div class="progressing-bg">  
      <div class="happy-top">
        <a href="#!/audit"><i class="happy-l"></i></a>
        申请进度
        <!-- <a class="happy-r" href="http://116114.easier.cn/hbmmrw/"></a> -->
      </div>
      <p class="progressing-p color3">审核失败</p>
      <div class="Order-details">
        <!-- <p>
          <a class="order-margin-r">审核编号:&nbsp</a>
          <a  class="color1">{{orderData.order_num}}</a>
        </p>
        <p>
          <a class="order-margin-r">申请时间:</a>
          <a style="color: #000;font-weight: normal;">{{orderData.  ctime.split(" ")[0]}}     {{orderData.ctime.split(" ")[1]}}</a>
        </p> -->
        <!-- / -->
        <table class="User-detail-table">
          <tbody>
            <tr>
              <td class="order-margin-r">审核编号:</td>
              <td  class="color1" style="color:#febe10">{{orderData.order_num}}</td>
            </tr>
            <tr >
              <td  class="order-margin-r">申请时间:</td>
              <td  style="color: #000;">{{orderData.ctime.split(" ")[0]}}     {{orderData.ctime.  split(" ")[1]}}</td>
            </tr>
                      
          </tbody>
        </table>
         
      </div>
      <div class="pass-box">
        <div class="pass-box-li">
          <p style="color:#808080;">{{orderData.refuse_reason}}</p>
        </div>
      </div>
    </div>  
  </div>
</template>

<style scope>
  a{font-size:20px;}
</style>

<script>

import api from '../api'

export default{
  http: {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  },
  data() {
    return {
      order_num: this.$route.params.order_num,
      orderData: {}
    }
  },

  ready() {
    var that = this;
    api.orderDetail(this, {order_num: this.order_num}, (back)=>{
      if(back.resCode == "0"){
        var arr = back.repBody.list;
        if(arr.length == 1){
          that.orderData = arr[0];

        }else if(arr.length == 2){
          for(var i=0;i<arr.length;i++){
            if(arr[i].photo_type == 2){
              that.orderData = arr[i];
            }
          }
        }
      }
    })
  },

  methods: {
  },

}

</script>