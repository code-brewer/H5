<template>
	<div class="alert" v-if="show">
		<button type="button" class="close" @click="show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<h3 >操作结果</h3>
		<table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>序号</th>
            <th>手机号码</th>
            <th>操作类型</th>
            <th>操作日期</th> 
            <th>操作结果</th>
            <th>操作人</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for = "item in formData">
            <th scope="row">{{$index}}</th>
            <td>{{item.phone}}</td>
            <td>{{item.type}}</td>
            <td>{{item.dateTime}}</td>
            <td>{{item.res}}</td>
            <td>{{item.user}}</td>
            
          </tr>
          <!-- <tr>
            <th scope="row">2</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
           
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
           
          </tr> -->
        </tbody>
      </table>
      <!-- <p>共<span>6</span>条 当前第<span>1</span>/<span>2</span>页</p> -->
      <div class="clearfix">
      	<div style="float: right" >
     		<button type="button" class="btn btn-primary" @click="show = false">确定</button>
     		<!-- <button type="button" class="btn btn-success">下一页</button> -->
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
			h3 {
				padding: 10px 0 ;
				text-align: center;

			}
			table {
				margin-bottom: 10px;
			}
			p {
				text-align: center;
				margin-bottom: 10px;
			}
      th,td {
        text-align: center;
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
      // phone : String,
       formData : {
         type : Array,
         default : [{
            phone : '',
            res : '',
            type : '',
            dateTime : '',
            user : '',
         }]
        }
		},
    data() {
      return {
        
      }
    },
    // ready () {
    //        api.findnumber(this,{
    //                 "phone": this.phone  //必填，手机号码
    //             },res=>{
    //                 console.log(res)
    //                 if(res.resMsg==="success") {
    //                   this.formData.content = res.repBody[0].head_url
    //                   this.formData.time = res.repBody[0].createtime
    //                 }
    //             })
    // }
	}
</script>