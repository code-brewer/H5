<script>
	import form from '../base/form.vue'
	export default {
		mixins: [form],
		methods: {
			handleClick() {
				this.submitForm('MembersCRBTIndex');
			}
		}
	}
</script>