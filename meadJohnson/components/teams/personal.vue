<template>
	<div class="team-personal">
		<img :src="person.head_img" class="head_img" v-show="showImg">
		<p class="nick">{{person.nick}}</p>
	</div>
</template>
<script>
	import api from '../../api/'

	export default {
		data() {
			return {
				showImg: false,
				person: {
					head_img: '',
					nick: ''
				}
			}
		},
		created() {
			api.getPersonalInfo(this, {}, (data) => {
				if (data.resCode === '0') {
					this.showImg = true;
					this.person = data.repBody.list[0];
				}
			})
		}
	}
</script>
<style lang="scss">
	.team-personal {
		color: #3da5af;
		.head_img {
			display: block;
            width: 30%;
            max-width: 100%;
            margin: 0 auto;
            border: 10px solid #3da5af;
            border-radius: 50%;
            -webkit-box-shadow: 0 0 100px rgba(61, 165, 175, .4);
            box-shadow: 0 0 100px rgba(61, 165, 175, .4);
		}
		.nick {
			padding: 10px 0;
			font-size: 30px;
		}
	}
</style>