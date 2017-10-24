<template>
	<div class="top">
			<a href="javascript:;" class="top-back" v-link="{path:'/sign'}">&lt 返回首页</a>
			<a href="javascript:;" class="top-right" @click="share"></a>
	</div>
	<div class="gifts">
		<img class="empty-gift" v-if="isEmpty" src="../images/empty-gift.png"/>
		<div class="list" v-else>
			<ul>
				<li v-for="item in list">
					<div class="img">
						<img :src="item.imgurl">
					</div>
					<p><span :style="{'font-size': item.fontSize}">{{item.pname}}</span></p>
				</li>
			</ul>
		</div>
		<rule :text='text' :ruledetail="ruledetail"></rule>
	</div>
</template>
<script>
	import rule from '../components/rule.vue'
	import api from '../api/index.js'
	import DateUtils  from '../utils/DateUtils.js'
	export default {
		components: {
			rule
		},
		data() {
			return {
				isEmpty: false,
				list: [{
					img: 'images/xiaomi.png',
					text: '小米手环',
					fontSize: '70px'
				},{
					img: 'images/xiaomi.png',
					text: 'Kindle voyage'
				}],
				text:'领奖须知',
				ruledetail:'',
				activityAllData:[]
			}
		},
		created() {
			this.selectActivity()
			this.getMyPrizeInfo()
			this.$dispatch('ChannelLog',{'type':'signin','usid':'1',source:'prizelist'})
		},
		methods: {
			getMyPrizeInfo() {
				api.getMyPrizeInfo(this, {usid: 1}, back => {
					if (back.resCode === '0') {
						if(DateUtils.isEmptyObject(back.repBody)){
							this.isEmpty = true;
						}else{
							this.list = back.repBody
						}
						
					}
				})
			},
			 share(){
	        	this.$dispatch('model')
	        	// this.delStatus.showMsg = true;
	        },
	        selectActivity(){
	            api.selectActivity(this,{},(back)=>{
	                this.activityAllData = back.repBody[0]
	                this.ruledetail = this.activityAllData.receiverule.split('\n')
	                // console.log(this.activityAllData)
	            })
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
	.gifts {
		padding-top: 370px;
		.empty-gift {
			display: block;
			margin: 80px auto 150px;
		}
		.list {
			padding: 10px 80px;
			li {
				position: relative;
				height: 200px;
				margin-bottom: 30px;
				padding-left: 230px;
				background: #ffd800;
				box-shadow: inset 0 8px 5px rgba(255, 255, 255, .6),inset -8px 0 5px rgba(248, 169, 0, .6),inset 0 -8px 5px rgba(248, 169, 0, .6),inset 8px 0 5px rgba(255, 255, 255, .6);
				.img {
					position: absolute;
					top: 10px;
					left: 30px;
					width: 200px;
					height: 180px;
					background: white;
					img {
						position: absolute;
						top: 50%;
						left: 50%;
						width: 100%;
						transform: translate(-50%, -50%);
					}
				}
				p {
					height: 100%;
					padding: 0 30px;
					text-align: center;
					&:before {
						content: "";
						display: inline-block;
						width: 0;
						height: 100%;
						vertical-align: middle;
					}
					span {
						display: inline-block;
						font-size: 28px;
						line-height: 1.5;
						color: #763774;
						vertical-align: middle;
					}
				}
			}
		}
	}
</style>