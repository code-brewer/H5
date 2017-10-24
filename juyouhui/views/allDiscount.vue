<template>
	<div class="allDiscount">
		<div v-for="item in discountData">
			<img :src="item.img">
		</div>
	</div>
</template>
<script type="text/javascript">
import api from '../api/index.js'
	export default { 
		created () {
			this.$dispatch('loadingTrue');
			api.discount(this,{
				"title": this.$route.params.id  //必填
			},res=>{
				if (res.resCode==="000000"&&res.resMsg==="success") {
					this.discountData = res.repBody
					this.$dispatch('loadingFalse');
				}
			})
		 },
		data() {
			return {
				discountData : [],
			}
		},
		methods : {
			goWeb (item ) {
                this.$dispatch('loadingTrue');
                // window.location.href=item.img;

            },
		}
	 }
</script>
<style lang="scss">
	.allDiscount {
		padding: 20px;
		background-color: #fff;
		padding-bottom: 100px;
		img {
			width : 100%;
			border: 1px solid #ccc;
		}
		div {
			padding-bottom: 20px;
		}


	}
</style>