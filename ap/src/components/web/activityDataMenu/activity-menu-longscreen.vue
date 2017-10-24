<template>
	<div class="activity-menu-panel">
		<div class="activity-menu-title">
			活动数据
		</div>
		<ul class="activity-menu-list">
			<li :class="{'selected':this.selectItem==1}"
			    @click='this.selectItem=1'
			    v-link="{ name: 'dataStatistics', params:{type: type}}"><i></i>炫铃订购名单</li>
			<li :class="{'selected':this.selectItem==2}"
			    @click='this.selectItem=2'
			    v-link="{ name: 'buyToneFail', params:{type: type}}"><i></i>炫铃订购失败名单</li>
			<li :class="{'selected':this.selectItem==3}"
			    @click='this.selectItem=3'
			    v-link="{ name: 'awardList', params:{type: type}}"><i></i>用户登录名单</li>
			<li :class="{'selected':this.selectItem==4}"
			    @click='this.selectItem=4'
			    v-link="{ name: 'openBellFail', params:{type: type}}"><i></i>炫铃能力开通失败名单</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			selectItem: 1,
			type: ''
		}
	},
	ready() {
		this.type = this.$route.params.type
	}
}
</script>
<style lang="scss" src="./main.scss"></style>