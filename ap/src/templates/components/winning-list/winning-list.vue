<template>
	<div class="wap-winning-box">
		<div class="title-icon"></div>
		<div class="wap-winning-list">
			<div class="winning-item" v-for="item in list">{{item.usernick}}于{{item.rectime}}抽到{{item.ptitle}}</div>
		</div>
	</div>
</template>

<script>
	import api from '../../service'
	export default {
		
		data(){
			return {
				list: []
			}
		},
		created() {
			api.prizeDrawResult(this, {}, function(back) {
				if(back.resCode=='0') {
					this.list = back.repBody.list
				}
			}.bind(this))
		},
	}
</script>
