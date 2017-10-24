<template>
	<div class="activity-menu-panel">
	<div class="activity-menu-title">	
		活动数据	
	</div>
	<ul class="activity-menu-list" >
		<li :class="{'selected':this.selectItem==1}" @click='this.selectItem=1' v-link="{ name: 'dataStatistics' }"><i></i>数据统计</li>
	<!-- 	<li :class="{'selected':this.selectItem==2}" @click='this.selectItem=2' v-link="{ name: 'visitor' }"><i></i>访客分析</li> -->
		<li :class="{'selected':this.selectItem==3}" @click='this.selectItem=3' v-link="{ name: 'awardList' }"><i></i>领奖榜单</li>
		<li :class="{'selected':this.selectItem==4}" @click='this.selectItem=4' v-link="{ name: 'participate' }"><i></i>参与用户</li>
	</ul>
		</div>
</template>
<script>
	export default{
		data(){
			return {
				selectItem:1
			}	
		} 
	}
</script>
<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
    .activity-menu-panel{
    	box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
    	padding:43px 24px 0px 32px;
    	background-color: white;
    	width: 100%;
    	height: 970px;
    }
	.activity-menu-title{
		font-size: 14px;
	    padding-left: 12px;
	    margin-bottom: 25px;
	}
	.activity-menu-list{
		margin-top:4px ;
		list-style: none;
		padding-left: 0px;
		li{
			font-size: 12px;
			width: 100%;
			margin-bottom: 23px;
			text-align: center;
			position: relative;
			background-color: white;
			-webkit-transition: background-color .4s ease-in-out, color .2s ease-in-out; 
            transition: background-color .4s ease-in-out, color .2s ease-in-out;
            padding: 1px 0px 1px 0px;
			border-radius: 3px;
			i{
				    width: 6px;
				    height: 6px;
				    position: absolute;
				    background-color: white;
				    top: 50%;
				    margin-top: -3px;
				    left: 5%;
				    border-radius: 3px;
				    border: 1px solid #ccc;
			}
			&.selected{
				color: #fff;
				background-color: #419ce9;
				i{
					border:0px;
				}
			}
		}
		
	}
</style>