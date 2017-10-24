<script>
	import success from '../base/success.vue'
	export default {
		mixins: [success],
		data() {
			return {
				title: '哇，抽中啦！！'
			}
		},
		methods: {
			showModal() {		
				this.$emit('showModal', this.options.isInvented ? 'MembersCRBTIndex' : 'MembersForm', this.options);
			}
		}
	}
</script>