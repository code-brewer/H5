<template>
	<section class="prize-panel-list">
		<div class="prize-title">
			<a class="btn" style="background: url(images/t-award-list.png);">
				
			</a>
			<a class="myjp" @click='show=true'>
				<img :src="$root.activityBasePath+'images/t-my-prize.png'">
			</a>
		</div>
		<div class="data-panel">
			<ul class="data-ul">
				<li v-for="list in prizeList">
					 <p class="phone">{{list.nick}}获得了{{list.pname}}<span style="float: right;">{{list.utime}}</span></p>

					 <!-- <p class="prize-name"></p> -->
					 <!-- <img class="prize-img" :src="$root.activityBasePath+list.imgurl"> -->
				</li> 
			</ul>
		</div>
	</section>
	<my-prize :show.sync="show" :show-add.sync="showAdd" :gid.sync="gid">
 	    	
 	</my-prize>
</template>
<style lang="sass">
	.prize-panel-list{
		width: 100%;
		.prize-title{
		text-align: center;
   		position: relative;
   		.btn{
   			color: white;
		   
		    font-size: 24px;
   		   
   			display: block;
   			background-size: 260px 82px!important;
		    width: 260px;
		    height: 82px;
		    margin: 15px auto;
		    background-repeat: no-repeat!important;
   		}.myjp{
   			 position: absolute;
			 display: block;
			 top: 0;
			 left: 50%;
			 margin-left: 170px;
			 color: white;
			 font-size: 24px;
			 text-shadow: 0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326;
			 padding-bottom: 0px;
			 // &::after{
			 // 	    content: ' ';
				//     width: 100%;
				//     height: 100%;
				//     display: block;
				//     border-bottom: 2px solid #fff;
				//     box-shadow: 0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326;
			 // }
   		}
	}
	.data-panel{
	        max-height: 200px;
    		overflow: scroll;
	    .data-ul{
	    	width: 100%;
	    	list-style: none;
	       overflow-y: auto;
			li{
				
			    background-repeat: no-repeat;
			    width: 580px;
			    margin: 8px auto 0px;
			    position: relative;
			    line-height: 1;
   				text-indent: 10px;
   				.phone{
   					font-size: 24px;
  				   height: 46px;
   				}.prize-name{
   					font-size: 37px;
			   		height: 38px;
				    display: -webkit-box;
				    width: 350px;
				    -webkit-line-clamp: 1;
				    overflow: hidden;
				    -webkit-box-orient: vertical;
   				}.prize-img{
   					    position: absolute;
					    top: 15px;
					    width: 110px;
					    left: 50%;
					    margin-left: 120px;
   				}
			}
	    }
	}
		
	}
</style>
<script type="text/javascript">
	import myPrize from './myPrize.vue'
	import api from './../utils/serverapi.js'
	export default{
		components:{
			myPrize
		},props:{
			changePrize:{
				Boolean,
				default:false,
			},
			showAdd:{
				Boolean,
				default:false,
			},
			 gid:{
				String,
			}
		},
		watch:{
			changePrize(){
				 this.init();
			}
		},
		data(){
			return{
				show:false,
				prizeList:[
		// 		{
		// 	"imgurl": "http://www.soyu.cn/",  //奖品缩略图
		// 	"mobile": "186****5905",   //中奖手机号码
		// 	"pname": "小米平衡车"   //奖品名称
		// }, {
		// 	"imgurl": "http://www.soyu.cn/",
		// 	"mobile": "186****5905",
		// 	"pname": "大疆无人机"
		// }, {
		// 	"imgurl": "http://www.soyu.cn/",
		// 	"mobile": "186****5905",
		// 	"pname": "华为荣耀zero运动手环"
		// }
		]
				
			}
		},
		ready() {
            this.init();
		},
		methods:{
			init(){
				var that=this;
				 api.quePrizeDrawResult(this, {}, (back) => {
				 	if(back.resCode!='0'){
						that.$dispatch('handle_server_error', back);
				    }else{
				    	that.prizeList=back.repBody;
				    }
				});
			}
		}
	}
</script>