<template>
	<div class="app-view ranking-page">
		<div class="content padding">
			<div class="rankingdbg">
				<div class="sorthead" >
					<p class="pfirst mypfirst">恭喜您领奖成功！</p>
				</div>
				<p class="prizecode">您的兑奖码为:</p>
				<p class="prizecode">{{querysidinfo.sid}}</p>

				<img @click="isIosWx" class="zcode" :src="$root.basePath+'activity/SliderMoney/src/img/wechat.jpg'" alt="">
				
				<p class="mytip">请关注河南114微信公众号了解更多精彩活动！</p>
				<p class="mytip">安卓请长按，IOS请点击</p>
				<a v-link="{path: '/home'}" class="mybtn buttonbg" >返回首页</a>
				<a v-link="{path: '/prizerule'}" class="mybtn buttonbg" >奖品使用方法</a>
				
			</div>
			<div class="ranking-title">领奖成功</div>
			
		</div>
		<img :src="activityInfo.backgrounds.other"  class="bg">
	</div>
</template>

<style scoped>
	.mybtn{
		/*background: url('./img/btn.png');*/
	    background-size: 100% 100%;
	    width: 250px;
	    height: 115px;
	    display: inline-block;
	    line-height: 115px;
	    font-size: 34px;
	    color: #ff560b;
	    font-weight: bold;
	    text-decoration: none;
	}
	.mypfirst{
		margin-top: 80px;
		font-size: 50px;
	}
	.prizecode {
		color: #ff0000;
		font-size: 34px;
		margin: 0;
	}
	.zcode{
		display: inline-block;
		padding:15px;

	}
	.mytip{
		font-size: 28px;
		color: #ff0000;
	    font-weight: bold;
	    margin: 0;
	    padding: 0 120px 0 120px;
	}
	.inputphone{
		width: 378px;
	    height: 100px;
	    border: none;
	}
	.inputcheckcode{
		width: 125px;
	    height: 56px;
	    border: none;
	    vertical-align: top;
	}
</style>

<script>

import sapi from './utils/serverapi.js'

	export default {
		ready() {
			this.$dispatch('title', '领奖');
			this.activity = JSON.parse(localStorage.getItem('activity'));
			this.activityInfo = JSON.parse(this.activity.extbody);
			this.PrizeInfo = JSON.parse(localStorage.getItem('prizeinfo'));
			this.querySidByGid(this.PrizeInfo.gid);
		},
		data() {
			return {
				activity:{},
				activityInfo:{backgrounds:{other:''}},
				loadingCount:0,
				rank:0,
				scores:0,
				PrizeInfo:'',
				querysidinfo:'',
			}
		},
		methods:{
			isIosWx(){

			},
			querySidByGid(gid){
				var that = this;
				var body={gid:gid};
				sapi.querySidByGid(this, body, (back)=>{
					
					if(back.resCode == "0"){
						that.querysidinfo = back.repBody;
					}
					else if(back.resCode == "10030"){
						that.$dispatch('loading', {name:'home_tip', text:'没有领奖信息', icon: false, show: true, duration: 2000});
					}
				})
			}
        }
	}
</script>