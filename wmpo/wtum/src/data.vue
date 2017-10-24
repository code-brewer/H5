<template>
	<div class="app-view home-page"style="background: #fff; width: 250%; left: -75%;">
		<div class="title">订购成功列表</div>
		<div class="search">
			<label>时间:</label>
			<input type="date" v-model="time">
			<label>产品id:</label>
			<input type="number" v-model="id">
			<button @click="success">搜索</button>
		</div>
		<table class="table" style="width: 90%; margin: 0 auto; text-align: center;">
		  <tr>
		    <th>手机号码</th>
		    <th>产品ID</th>
		     <th>订购时间</th>
		    <th>订购结果</th>
		     <th>失败原因</th>
		  </tr>
		  <tr v-for="item in successData">
		    <td>{{item.mobile}}</td>
		    <td>{{item.product_id}}</td>
		    <td>{{item.ctime}}</td>
		    <td>{{item.result}}</td>
		    <td>{{item.reson}}</td>
		  </tr>
		</table>

		<div class="title" style="margin-top: 50px;">订购失败列表</div>
		<div class="search">
			<label>时间:</label>
			<input type="date" v-model="time1">
			<label>产品id:</label>
			<input type="number" v-model="id1">
			<button @click="fail">搜索</button>
		</div>
		<table class="table" style="width: 90%; margin: 0 auto; text-align: center;">
		  <tr>
		    <th>手机号码</th>
		    <th>产品ID</th>
		     <th>订购时间</th>
		    <th>订购结果</th>
		     <th>失败原因</th>
		  </tr>
		  <tr v-for="item in failData">
		    <td>{{item.mobile}}</td>
		    <td>{{item.product_id}}</td>
		    <td>{{item.ctime}}</td>
		    <td>{{item.result}}</td>
		    <td>{{item.reson}}</td>
		  </tr>
		</table>
   </div>

</template>

<style lang="sass">
	.title{
	    text-align: center;
	    line-height: 100px;
	    font-weight: 600;
	    font-size: 30px;
	}
	.search{
		width: 40%;
		margin: 0 auto;
	}
	.table{
		border: 5px solid #eee;
		padding-bottom: 50px;
		tr{
			border: 2px solid #eee;
		}
		td{
			border: 2px solid #eee;
		}
		th{
			border: 2px solid #eee;
			width: 20%;
		}
	}
</style>
<script>
	import {router} from './index'
	import api from './utils/serverapi.js'
	export default {
		data(){
			return{
			    id:'',
			    id1:'',
				time:'',
				time1:'',
				successData:'',
				failData:'',
			}
		},
		ready(){
			this.init();
			this.datafail();
		},
		methods:{
            success(){
                if(this.id == ''&& this.id == null){
                    var body={
                        'ctime':this.time,
                    };
				}
				else if(this.time == ''&& this.time ==null){
                    var body={
                        'product_id':this.id,
                    };
				}
				else {
                    var body = {
                        'product_id': this.id,
                        'ctime': this.time,
                    };
                }
                api.getFakeInfoByCondition(this,body,(back)=>{
                    if(back.resCode == '0'){
                        this.successData = back.repBody;
					}
				})
			},
			fail(){
                if(this.id1 == ''&& this.id1 == null){
                    var body={
                        'ctime':this.time1,
                    };
                }
                else if(this.time1 == ''&& this.time1 ==null){
                    var body={
                        'product_id':this.id1,
                    };
                }
                else {
                    var body = {
                        'product_id': this.id1,
                        'ctime': this.time1,
                    };
                }
                api.getFakeInfoByCondition(this,body,(back)=>{
                    if(back.resCode == '0'){
                        this.failData = back.repBody;
                    }
                })
			},
			init(){
				api.getFakeInfo(this,{status: 'success'}, (back)=>{
					if(back.resCode == '0'){
						this.successData = back.repBody;
					}
					
				})
			},
			datafail(){
				api.getFakeInfo(this,{status: 'fail'}, (back)=>{
					if(back.resCode == '0'){
						this.failData = back.repBody;
					}
				})
			}

			
		}
	}
</script>