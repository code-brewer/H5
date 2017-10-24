<template>
	<a  @click="getCode()" :class="{graycode:codeing}" >
		{{timeflag}}
	</a>
</template>

<script>
	import sapi from './../utils/serverapi.js'
	export default{
		data(){
			return{
				timeflag:'获取验证码',
				codeing:false,
			}
		},
		props: {
			phone: {
				type: String,
				default: ""
			}
		},
		methods:{
			getCode(){
				var that=this;
				if(that.codeing){
					return;
				}
				var reg = /^1\d{10}$/;
				if(!reg.test(that.phone)) {
					that.$dispatch('loading', {text: "请输入正确的手机号码!" , show: true, duration: 2000}); 
					return;
				}
				that.timeflag = '60s';
				that.codeing=true;
				sapi.msgCode(this, "?phone="+that.phone, (back) => {
					if(back.resCode!='0'){
						that.$dispatch('handle_server_error', back);
					}
					else{
						that.$dispatch('loading', {text: '验证码已发送，请留意手机短信', show: true, duration: 2000});
					}
				});
				var	time = setInterval(function() {
					if(that.timeflag == '0s') {
						that.codeing=false;
						clearInterval(time);
						that.timeflag = '获取验证码';
					} else {
						var newTime =that.timeflag;
						newTime = newTime.substring(0, newTime.length - 1);
						that.timeflag = (parseInt(newTime) - 1) + 's';
					}
				}, 1000);
			}
		}
	}
</script>

<style lang="scss">

	.graycode{
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);
		filter: grayscale(100%);
		filter: gray;
		font-size: 40px!important;
	}
</style>