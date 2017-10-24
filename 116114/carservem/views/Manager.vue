
<template>

<router-view></router-view>

</template>

<script type="text/javascript">
// import load from '../components/newComponts/load.vue'
	export default{
		components:{
			// load
		},
		data(){
			return{
			isLoad: false,

			}
		},
		ready(){
			console.log("2333")
			let user_type = localStorage.getItem('user_type')
			
		}
	}
</script>

