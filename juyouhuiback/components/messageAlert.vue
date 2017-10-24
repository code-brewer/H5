<template>
	<div class="alert" v-if="show">
		<button type="button" class="close" @click="show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<h3 >历史下行短信</h3>
		<table class="table table-bordered table-hover">
        <thead>
          <tr>
            <!-- <th>序号</th> -->
            <th>手机号码</th>
            <th>内容</th>
            <th>下行时间</th> 
            <th>请求类型</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- <th scope="row">1</th> -->
            <td>{{formData.phone}}</td>
            <td>{{formData.content}}</td>
            <td>{{new Date(formData.time).format()}}</td>
            <td>{{formData.type}}</td>
            
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
         type : Object,
         default : {
            phone : '',
            content : '',
            time : '',
            type : '',
         }
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