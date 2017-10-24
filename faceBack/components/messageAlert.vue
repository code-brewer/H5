<template>
	<div class="alert" v-if="show">
		
		<h3 >更改业务类型</h3>
      <div class="middle">
        <div class="phone">
        <span>手机号码</span> : <span >{{phone}}</span>
      </div>
      <div class="server">
        <span> 原 业 务 </span> :  <select class="form-control " >
                            <option value="" selected>{{server.oldServer}}</option>
                        </select>
      </div>
     <div class="server last">
      <span> 新 业 务 </span> : <select class="form-control " v-model="server.newServer">
                            <option value="" selected>请选择</option>
                            <option value="3" >普通会员</option>
                            <option value="2" >高级会员</option>
                            <option value="1" >特级会员</option>
                        </select>  
     </div>
      </div>
      <!-- <p>共<span>6</span>条 当前第<span>1</span>/<span>2</span>页</p> -->
      <div class="clearfix" style="margin-top: 10px;">
      	<div style="float: right" >
        <button type="button" class="btn btn-success" @click="show = false">取消</button>
     		<button type="button" class="btn btn-primary" @click="changeServer(phone)">确定</button>
     	</div>
      </div>
	</div>
</template>
<style lang="scss">
	.alert {
			position: fixed;
			top: 30%;
			left: 50%;
			background-color: #eee;
			transform: translateX(-50%);
			z-index: 888;
      width: 400px;
      padding: 0;
			h3 {
				    padding: 10px 0 0 0;
				text-align: center;
        margin-bottom: 10px;

			}
			.middle {
        background-color: #fff;
        .phone {
          padding-top: 15px;
        }
        .server {
          margin-top: 5px; 
        }
        .last {
          padding-bottom: 20px;
        }
      }
			p {
				text-align: center;
				margin-bottom: 10px;
			}
      select {
        display: inline-block;
        width: 97px;
        margin-top: 5px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        padding: 0;
      }
    	}

</style>
<script type="text/javascript">
import api from  '../api/index.js'
	export default {
		props : {
			show : {
				type : Boolean,
				default : false,
			},
      phone : String,
		},
    data() {
      return {
        server :{
          oldServer : '',
          newServer : '',
        }
      }
    },
    ready () {

    },
    watch: {
          show (val) {
            if(val) {
              this.checkLevel(this.phone)
            }
          },
        },
    methods : {
        changeServer(phone){
            api.aloneTrans(this,{
                      "pkmobile": phone ,  //必填，手机号码
                      "state":"1",    //必填，操作人员
                      "grade":this.server.newServer,    //1是开户，0是销户
                  },res=>{
                    
                  if (res.resMsg==="success"){
                    this.show = false
                    window.alert('操作成功')
                    this.$dispatch('changeServer1')
                  }else {
                    if (res.resMsg ==='session失效'){
                      window.alert('登录失效,请重新登录')
                      this.$router.go({path : '/'})
                    }
                
                    window.alert('操作失败')

                  }
                   
                    
                  })
        },
       checkLevel(phone) {
                api.level(this,{
                  phone : phone,
                },res=>{
                  if (res.resCode==='000000') {
                    if (res.repBody==1) {
                      this.server.oldServer = '特级会员'
                    }
                    else if (res.repBody==2) {
                      this.server.oldServer = '高级会员'
                    }
                    else if (res.repBody==3) {
                      this.server.oldServer = '普通会员'
                    } else {
                      this.server.oldServer = '未开户'
                    }
                  }
                })
              },

    },

	}
</script>