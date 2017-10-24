import snackbar from './snackbar.vue'
export default {
	components: {
		snackbar
	},
	data() {
		return {
			snackbarOptions: {
				show: false,
				text: ''
			}
		}
	}
}