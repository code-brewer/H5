<template>
	<!-- <div class="top">
			<a href="javascript:;" class="top-back" v-link="{path:'/sign'}">&lt 返回首页</a>
			<a href="javascript:;" class="top-right" @click="share"></a>
	</div> -->
	<div class="share-bg">
		<div class="join" @click="play">我也要玩</div>
	</div>
</template>
<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
            	
			}
		},
		ready(){
			
		},
		created() {
			this.$dispatch('ChannelLog',{'type':'signin','usid':'1',source:'share'})
			this.$dispatch('isSharePage');
			
		},
		methods: {
			play(){
				this.$dispatch('ChannelLog',{"type":"button","button_name":"goplay","usid":"1"});
				window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.womusic.wofansclient"
			},
			 share(){
	        	// this.$dispatch('model')
	        	// this.delStatus.showMsg = true;
	        }
			
		}
	}
</script>
<style lang="scss" scoped>
	.top{
			width:100%;
			height:64px;
			background:rgba(0,0,0,.6);
			font-size:14px;
			color:#fff;
			line-height:64px;
			position:relative;
			padding-left:10px;
			box-sizing:border-box;
		    // position: fixed;
    		// top: 0px;
    		a{
    			font-size:30px;
				color:#fff;
    		}
	}
	.top-right{
		width:40px;
		height:44px;
		background:url(../images/share.png) no-repeat;
		display:inline-block;
		// float:right;
		position:absolute;
		right:25px;
		top:8px;
	}
	.share-bg{
		min-height:100%;
		padding-top:786px;
	}
	.join{
		width:300px;
		height:113px;
		line-height:113px;
		text-align:center;
		display:block;
		margin:0 auto;
		font-size:50px;
	    font-style: italic;
		color:#fff;
		background:url(../images/orange-big-btn.png) no-repeat;
	}
</style>