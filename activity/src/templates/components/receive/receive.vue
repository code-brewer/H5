<template>
	<div class="app-view view-receive"  :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<div class="content padding">
			<div class="prize-title">
				<p  :style="{'color':common.secondColor}">恭喜您，获得了</p>
				<p class="prize-name" :style="{'color':common.mainColor}">{{$route.params.n}}</p>
			</div>
			<div class="phone-wrap">
				<input type="text" class="input-phone" v-model="mobile" autocomplete="off" placeholder="输入手机号" @focus="inputmobiletip()" />
				<div class="code">
					<input type="text" class="input-code" v-model="zcode" autocomplete="off" placeholder="输入验证码" @focus="inputcodetip()" />
					<img :src="zcodeurl" @click="refreshzcode()" class="zcode">
				</div>
				<p class="awardtip">{{tiptext}}</p>
			</div>
			<div class="btn-wrap">
				<a class="wap-button" href="javascript:;" :style="btnStyle" @click="award">领奖</a>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import './receive.scss';
	@import '../../../css/px2rem.scss';
	.app-view {
		height: 100%;
		background-size: px2rem(640px);
	}
</style>
<script>
	import sapi from '../../service'
	export default {
		data(){
			var common = window.store.activityConfig.common;
			return {
				common,
				mobile:'',
				zcode:'',
				text: "领奖",
				zcodeurl:basePath+'randomValidate/obtainValidateCode',
				tiptext:' '
			}
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
		methods:{
			refreshzcode(){
				this.zcodeurl = basePath+'randomValidate/obtainValidateCode?'+Math.random();
			},
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
			},
			award(){
				console.log("ssss");
				if(this.mobile.length != 11 || !(/^\d+$/.test(this.mobile))){
					this.tiptext = "请输入正确的手机号码!";
					return;
				}
				if(this.zcode.length == 0 || this.zcode == '输入验证码'){
					this.tiptext = "请输入验证码!";
					return;
				}
				this.tiptext = "";
				this.bindPrizeMobile(this.$route.params.g,this.mobile,this.zcode);
			},
			bindPrizeMobile(id,mobile,content){
				var that = this;
                var body={id:id,content:content,mobile:mobile};
                that.$dispatch('loading', {name:'award_bindPrizeMobile', text: '加载中...', show: true, duration: 10*1000});
                sapi.bindPrizeMobile(that, body, (back)=> {
                	that.$dispatch('cancelloading', 'award_bindPrizeMobile');
					if(back.resCode=="0") {
						that.$route.router.go({name: 'receive-success', params: {g: this.$route.params.g}});
					}
					else{
						that.$dispatch('handleServerBack', back);
					}
				});
			}
        }
	}
</script>
