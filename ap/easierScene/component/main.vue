<template>
	<div class="activity-main">
		<main-header></main-header>
		<div class="container-content">
			<activity-list></activity-list>
		</div>
	</div>
</template>

<script>
	import activityList from './activity-list.vue'
	import mainHeader from './main-header.vue'
	export default {
		components: {
			activityList,
			mainHeader
		},
		data() {
			return {
				btnHeight: '0',
				scroller: {},
			}
		},
		ready() {
			//this.$broadcast('scroll-reset', 'container');
			//this.$root.scroller = this.scroller;
		},
		created() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.activity-main {
		position: relative;
		height: 100%;
		width: 100%;
		.container-content {
			background-color: #e9e9e9;
			height: 100%;
			position: relative;
			padding-top: 65px;
			padding-bottom: 0px;
			box-sizing: border-box;
			ul {
				list-style: none;
				margin: 0;
				padding: 0;
			}
		}
	}
</style>