<script>
	import form from '../base/form.vue'
	export default {
		mixins: [form],
		mounted() {
			/** 修改登记领奖信息时，显示接口返回的领奖信息 */
			if ( this.options.username ) {
				this.userName = this.options.username || '';
				this.address = this.options.addr || '';
			}
		},
		methods: {
			handleClick() {
				this.submitForm('myPrizeRegisterSuccess');
			}
		}
	}
</script>