<template>
	<div class="app-view view-receive"  :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<div class="content padding">
			<div class="prize-title">
				<p :style="{'color':common.secondColor}">恭喜您，获得了 </p>
				<p class="prize-name" :style="{'color':common.mainColor}">XXX</p>
			</div>
			<div class="phone-wrap">
				<input type="text" class="input-phone" autocomplete="off" value="输入手机号" @focus="inputmobiletip()" onblur="if(this.value == '') {this.value = '输入手机号';}"  />
				<div class="code">
					<input type="text" class="input-code" autocomplete="off" value="输入验证码" @focus="inputcodetip()" onblur="if(this.value == '') {this.value = '输入验证码';}" />
					<img src="../../../images/code.jpg" alt="" class="zcode">
				</div>
			</div>
			<div class="btn-wrap">
				<a href="#" class="wap-button" :style="btnStyle">领奖</a>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	@import './receive.scss';
	.app-view {
		height: 100%;
		background-size: px2rem(640px);
	}
</style>
<script>
	export default {
		components: {
		},
		data(){
			var common = window.store.activityConfig.common;
			return {
				zcodeurl:basePath+'randomValidate/obtainValidateCode',
				tiptext:' ',
				common
			}
		},
		watch:{
			'common.btnStyle'(v){
				console.log(v)
			}
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
		methods:{
			inputmobiletip(){
				if(this.mobile == '输入手机号'){
					this.mobile = '';
				}
				this.tiptext = "";
			},
			inputcodetip(){
				if(this.zcode == '输入验证码'){
					this.zcode = '';
				}
				this.tiptext = "";
			}
        }
	}
</script>
