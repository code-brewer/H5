<template>
	<div class="activity-menu-panel">
		<div class="activity-menu-title">
			活动数据
		</div>
		<ul class="activity-menu-list">
			<li :class="{'selected':this.selectItem==1}"
			    @click='this.selectItem=1'
			    v-link="{ name: 'dataStatistics' }"><i></i>数据统计</li>
			<!-- 	<li :class="{'selected':this.selectItem==2}" @click='this.selectItem=2' v-link="{ name: 'visitor' }"><i></i>访客分析</li> -->
			<li :class="{'selected':this.selectItem==3}"
			    @click='this.selectItem=3'
			    v-link="{ name: 'awardList' }"><i></i>领奖榜单</li>
			<li :class="{'selected':this.selectItem==4}"
			    @click='this.selectItem=4'
			    v-link="{ name: 'participate' }"><i></i>参与用户</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			selectItem: 1
		}
	}
}
</script>
<style lang="scss" src="./main.scss"></style>