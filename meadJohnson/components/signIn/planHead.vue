<template>
	<div class="header">
	<!-- 	<img :src="'images/signIn/plan-head.png'" alt=""> -->
		<p class="none" v-if="isNone">暂时无人参与打卡</p>
		<div class="head-list" v-else>
			<p class="plan-sum">已有<span>{{num}}</span>位用户参与打卡计划</p>
			<div>
				<ul class="clearfix">
					<li v-for="item in headUrls">
						<img :src="item.headurl">
				</ul>
				<!-- <a href="/newSignIn/rankingList" v-show="moreHeadUrl">查看排名>></a> -->
					<a v-link="{path: '/newSignIn/rankingList'}">查看排名>></a>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../../api/index1.js'
	export default {
		data() {
			return {
				isNone: false, //无人参与活动
				num: '', //参与打卡人数
				headUrls: [], //打卡总列表
				// moreHeadUrl: false, //显示更多
				moreAllGradeFlag: false //超过8位好友显示更多符号
			}
		},
		created() {
			this.getCardCount();
			this.getHeadurl();
			this.$on('getCount', () => {
				this.getCardCount();
			})
		},
		methods: {
			/**
			 * 获取打卡活动的参与人数
			 */
			getCardCount() {
				api.getCardCount(this, {}, back => {
					if (back.resCode === '0') {
						this.num = +back.repBody.list[0].num;
					}
				})
			},
			/**
			 * 获取打卡总列表
			 */
			getHeadurl() {
				
				api.getHeadurl(this, {}, back => {
					if (back.resCode === '0') {
						this.headUrls = back.repBody.list || [];
						// this.moreHeadUrl = this.headUrls.length >= 11 ? !0 : !1;
						this.isNone = !this.headUrls.length;
					}
				})
			}
		}
	}
</script>
<style lang="scss" >
	.none {
		text-align: center;
		line-height: 60px;
		border-bottom: 1px solid #e1e1e1;
		font-size: 26px;
		background: white;
		top: 120px;
		width: 100%;
    position: absolute;
	}
	.head-list {
		position: relative;
    padding: 3px 20px;
    /* padding-top: 49px; */
    top: 84px;
    margin: 0px 8px;
    border-bottom: 1px solid #e1e1e1;
    background: white;
		div {
			position: relative;
			padding-right: 120px;
		}
		li {
			img {
				float: left;
				width: 40px;
				height: 40px;
				margin-right: 5px;
				border-radius: 50%;
				background: #f2f2f2;
			}	
		}
		a {
			position: absolute;
			top: 50%;
			right: -6px;
			margin-top: -8px;
    		font-size: 20px;
			color: #7B7B7B;
			    z-index: 6;
		}
	}
	.header{
		background: url(../../images/signIn/plan-head.png) ;
		    width: 100%;
    height: 180px;
	}
</style>