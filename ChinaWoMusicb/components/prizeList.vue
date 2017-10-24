<template>
	<section class="prize-panel-list">
		<div class="prize-title">
			<a class="btn" style="background: url(b/images/join-btn.png);">
				中奖榜单
			</a>
			<a class="myjp" @click='show=true'>
				我的奖品
			</a>
		</div>
		<div class="data-panel" style="background: url(b/images/bg-zjbd.png);">
			<ul class="data-ul">
				<li v-for="list in prizeList" style="background: url(b/images/libg-zjbd.png);">
					 <p class="phone">{{list.mobile}}</p>
					 <p class="prize-name">{{list.pname}}</p>
					 <img class="prize-img" :src="$root.activityBasePath+list.imgurl">
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
		    line-height: 50px;
		    font-size: 24px;
   		    text-shadow: 0px 0px 5px #00365f,0px 0px 5px #00365f,0px 0px 5px #00365f,0px 0px 5px #00365f,0px 0px 5px #00365f,0px 0px 5px #00365f,0px 0px 5px #00365f,0px 0px 5px #00365f,0px 0px 5px #00365f;
   			display: block;
   			background-size: 300px 60px!important;
		    width: 300px;
		    height: 60px;
		    margin: 0 auto;
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
			 &::after{
			 	    content: ' ';
				    width: 100%;
				    height: 100%;
				    display: block;
				    border-bottom: 2px solid #fff;
				    box-shadow: 0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326;
			 }
   		}
	}
	.data-panel{
		    width: 570px;
		    height: 704px;
		    margin: 14px auto 0px auto;
		    padding-top: 42px;
	    .data-ul{
	    	width: 100%;
	    	list-style: none;
	        height: 647px;
   			overflow-y: auto;
			li{
				height: 118px;
			    background-repeat: no-repeat;
			    width: 510px;
			    margin: 8px auto 0px;
			    position: relative;
			    line-height: 1;
   				text-indent: 30px;
   				.phone{
   					font-size: 46px;
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
//				{
//			"imgurl": "http://www.soyu.cn/",  //奖品缩略图
//			"mobile": "186****5905",   //中奖手机号码
//			"pname": "小米平衡车"   //奖品名称
//		}, {
//			"imgurl": "http://www.soyu.cn/",
//			"mobile": "186****5905",
//			"pname": "大疆无人机"
//		}, {
//			"imgurl": "http://www.soyu.cn/",
//			"mobile": "186****5905",
//			"pname": "华为荣耀zero运动手环"
//		}
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
				    	if(!that.prizeList){
				    		that.prizeList = [];
				    	}
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_8.png",
				    		"mobile": "186****2649",
				    		"pname": "话费5元"
				    	});
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_7.png",
				    		"mobile": "156****3473",
				    		"pname": "京东50元"
				    	});
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_8.png",
				    		"mobile": "132****3423",
				    		"pname": "话费5元"
				    	});
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_8.png",
				    		"mobile": "130****4234",
				    		"pname": "话费5元"
				    	});
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_11.png",
				    		"mobile": "155****3434",
				    		"pname": "京东100元"
				    	});
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_8.png",
				    		"mobile": "185****3457",
				    		"pname": "话费5元"
				    	});
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_8.png",
				    		"mobile": "131****7754",
				    		"pname": "话费5元"
				    	});
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_4.png",
				    		"mobile": "186****4578",
				    		"pname": "话费10元"
				    	});
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_4.png",
				    		"mobile": "145****6567",
				    		"pname": "话费10元"
				    	});
				    	that.prizeList.push({
				    		"imgurl": "/images/marquee_8.png",
				    		"mobile": "176****5468",
				    		"pname": "话费5元"
				    	});
				    }
				});
			}
		}
	}
</script>