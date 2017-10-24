<script>
	import success from '../base/success.vue'
	import Vue from 'vue'
	import api from '../../../api/'
	import { ajaxHandler } from '../../../utils/'
	export default {
		mixins: [success],
		data() {
			return {
				title: '我的奖品'
			}
		},
		methods: {
			/**
			 * [登记领奖信息/确定按钮的点击]
			 */
			showModal() {
				/** 虚拟奖品 **/
				if (this.options.isInvented) {
					this.close(false);
				}
				/** 实物奖品 **/
				else {
					this.getMyAddr();
				}
			},
			/**
			 * 获取收货地址
			 */
			getMyAddr() {
				this.$parent.$emit('showLoading');
				api.getMyAddr(this, {}, back => {
					this.$parent.$emit('hideLoading');
					ajaxHandler.call(this, back, () => {
						/** 已登记过信息 */
						if ( back.repBody.length && back.repBody[0].username ) {
							let data = back.repBody[0];
							for (let i in data) {
								this.options[i] = data[i];
							};
							this.$emit('showModal', 'myPrizeIsRegister', this.options);
						} else {
							this.$emit('showModal', 'myPrizeForm', this.options);
						}
					})
				})
			}
		}
	}
</script>