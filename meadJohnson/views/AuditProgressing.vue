<template>
  <div class="progressing-bg">
    <div class="happy-top">
      <a href="#!/audit"><i class="happy-l"></i></a>
      申请进度

      <!-- <a class="happy-r" href="http://116114.easier.cn/hbmmrw/"></a> -->
    </div>
    <p class="progressing-p">审核中...</p>
    <div class="Order-details">
      <!-- <p>
        <a class="order-margin-r">审核编号:&nbsp</a>
        <a  class="color1">{{orderData.order_num}}</a>
      </p>
      <p>
        <a class="order-margin-r">申请时间:</a>
        <a style="color: #000;font-weight: normal;">{{orderData.ctime.split(" ")[0]}}     {{orderData.ctime.  split(" ")[1]}}</a>
      </p>
      <div class="credentials-w">
        <a class="order-margin-r">订单凭证:</a>
        <div class="credentials">
      
        <img :src="item" v-for="item in orderData.photo_url">
      </div> -->

      <table class="User-detail-table">
          <tbody>
              <tr>
                  <td class="order-margin-r">审核编号:</td>
                  <td  class="color1" >{{orderData.order_num}}</td>   
              </tr>
              <tr>
                <td  class="order-margin-r">申请时间:</td>
                <td  style="color: #000;">
                  {{orderData.ctime.split(" ")[0]}}     {{orderData.ctime.  split(" ")[1]}}
                </td>
              </tr>
              <tr >
                <td  class="order-margin-r" style="vertical-align: top;">订单凭证:</td>
                <td style="position:relative;">
                  <img :src="item" v-for="item in orderData.photo_url" style="margin-right:20px;width: 190px;height: auto;display: inline-block;">
                </td>
              </tr>             
          </tbody>
      </table>

    </div>
  </div>
</template>

<style scope>
  a{font-size:25px;}
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
          //
          that.orderData.photo_url =that.orderData.photo_url.split(",");
          console.log(that.orderData)
        }else if(arr.length == 2){
          for(var i=0;i<arr.length;i++){
            if(arr[i].photo_type == 2){
              that.orderData = arr[i];
              //
              that.orderData.photo_url =that.orderData.photo_url.split(",");
              console.log(that.orderData)
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