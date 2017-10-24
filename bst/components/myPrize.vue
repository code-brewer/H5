<template>
	<modal :show.sync="show" :bg="false">
		 <section class="prize-panel">
		 		<div class="title">
		 				我的奖品：
		 		</div>
		 		<ul class="data-ul">
		 			<li v-for="list in prizeList">
						 <!-- <p class="phone">{{!!list.mobile?list.mobile:''}}</p> -->
						 <p class="prize-name">{{list.pname}}</p>
						 <p class="prize-type" :style="!list.mobile?'color: red':'color:green'">{{!list.mobile?'未领奖':'已领奖'}}</p>
						 <a class="btn" @click="goPrize(list.gid,list.mobile)" :style="!list.mobile?'background:url(images/btn-cfm-2.png)':'background:url(images/btn-cfm-3.png)'" >
						 	
						 </a>
						 <img class="prize-img" :src="$root.activityBasePath+list.imgurl">
					</li> 
		 		</ul>
		 		<img class="close" :src="'images/t-close.png'" @click="show=false"/>
		 </section>
	</modal>
</template>
<style lang="sass">
	.prize-panel{
		height: 600px;
		padding-bottom: 10px;
		background-color: rgba(0,0,0,0.7);
		border: 10px solid #fff;
		border-radius: 10px; 
		color: #fff;
		.close{
			    position: absolute;
			    top: -20px;
			    right: -20px;
			    
		}
		.title{
			margin: 0 auto;
			font-size: 45px;
			line-height: 3;
			color: #fff;
			text-align: left;
			padding-left: 30px;
			
		}
		.data-ul{
			width: 100%;
	    	list-style: none;
	    	height: 650px;
	    	overflow-y: auto;
			li{
				height: 118px;
			    background-repeat: no-repeat!important;
			    width: 510px;
			    margin: 40px auto 0px;
			    position: relative;
			    line-height: 1;
   				text-indent: 30px;
	   			padding-left: 110px;
   				.phone{
   					font-size: 46px;
  				   height: 46px;
   				}.prize-name{
   				    font-size: 37px;
				      height: 38px;
				    display: -webkit-box;
				    width: 230px;
				    -webkit-line-clamp: 1;
				    overflow: hidden;
				    -webkit-box-orient: vertical;
   				}.prize-img{
   					    position: absolute;
					    top: 0px;
					    width: 110px;
					    left: 0%;
					    margin-left: 15px;
   				}.btn{
   					display: block;
				    width: 140px;
				    position: absolute;
				    height: 60px;
				    top: 8px;
				    left: 50%;
				    margin-left: 100px;
				    background-repeat: no-repeat !important ;
				    background-size:140px 60px!important ;
				    font-size: 26px;
				    line-height: 50px; 	
				    color: white;
				    text-shadow:0px 0px 5px #b44000,0px 0px 5px #b44000,0px 0px 5px #b44000,0px 0px 5px #b44000,0px 0px 5px #b44000,0px 0px 5px #b44000,0px 0px 5px #b44000;
				    margin-top: 0;
   				}.prize-type{
   					height: 38px;
   					line-height: 38px;
   				}
			}
	    }
	}
</style>
<script>
 	import modal from './../../src/components/Modal.vue'
 	import api from './../utils/serverapi.js'
	export default{
		components:{
			modal
		},
		props:{
			show:{
				Boolean,
				default:false,
			},
			showAdd:{
				Boolean,
				default:false,
			},
			 gid:{
				String,
				default:"",
			}
		},
		watch:{
			show(value){
				if(value)this.init();
			},
		},
		data(){
			return{
				prizeList:[
				// {
				// 	"gid":1,  //奖品id
				// 	"imgurl": "http://www.soyu.cn/",  //奖品缩略图
				// 	"mobile": "186****5905",   //榜单奖品手机号码，没有表示未领取
				// 	"pname": "小米平衡车"   //奖品名称
				// }, {
				// 	"gid":1,  //奖品id
				// 	"imgurl": "http://www.soyu.cn/",
				// 	"pname": "大疆无人机"
				// }
				]
			}
        },
        methods:{
			init(){
				var that=this;
				 api.queMyPrizeDrawResult(this, {}, (back) => {
				 	if(back.resCode!='0'){
						that.$dispatch('handle_server_error', back);
				    }else{
				    	that.prizeList=back.repBody;
				    }
				});
			},
			goPrize(gid,flag){
				 if(!flag){
				 	this.show=false;
				 	this.showAdd=true;
				 	this.gid=gid;
				 }
			}
		}
	}
</script>