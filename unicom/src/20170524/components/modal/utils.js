import Modal from './Modal.vue'
export default {
	components: {
		Modal
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		options: {
			type: Object
		}
	},
	methods: {
		close(val) {
			this.$emit('close', val);
		}
	}
}