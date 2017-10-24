<template>
	<div>
		<div class="label-inline">
			<span class="onse">时间设置：</span>
			<input type="number" style=" text-align:center;border: 1px solid #D6D6D4;width: 70px;height: 33px;"  v-model="activityConfig.gameTime"/>秒
		</div>
		<div class="label-inline">
			<span class="onse">抢座位模板：</span>
			<radio name="seatTmpl" :model.sync="activityConfig.seattype" value="imax">IMAX</radio>
			<radio name="seatTmpl" :model.sync="activityConfig.seattype" value="normal" style="margin-left: 10px;">普通电影院</radio>
			<radio name="seatTmpl" :model.sync="activityConfig.seattype" value="vip" style="margin-left: 10px;">VIP影厅1</radio>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import radio from '../../../components/web-base/radio-seat'
	export default {
		components: {
			radio
		},
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig
			}
		},
		ready() {
			console.log('condition ready')
		},
		methods: {

		},
		events: {

		},
		watch: {
			'activityConfig.gameTime' (v, o) {
				console.log(v)
			}
		}
	}
</script>