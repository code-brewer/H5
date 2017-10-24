<template>
	<a :class="{graycolor: isStop, disabled: isStop,}" class="wap-button" @click="goTo" :style="btnStyle">{{text}}</a>
</template>
<style lang="scss">
	.wap-button.graycolor{
		background: #ccc;
	}
</style>
<script>
	import api from '../../service'

	export default {
		components: {
			'wap-button': require('./button.vue')
		},
		props: {
			autoQuery: {
				require: true,
				type: Boolean,
				default: true
			},
			date:{
				String,
				default:''
			}
		},
		data(){
			return{
				text: "去领奖",
				isStop: true,
				gid:'',
				pname:'',
				intf:{dataCallback:null}
			}
		},
		watch:{
			date(v){
				console.log(v);
				this.isHasPrize(v)
			}
		},
		created() {
			if(this.autoQuery) {
				this.isHasPrize('')
			} 
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
		methods: {
			// 校验用户领奖资格
			isHasPrize(date) {
				api.getUserPrizeInfo(this, {date: date}, function(back) {
					
					if(back.resCode == '0') {
						this.setData(back.repBody[0]);
						if(this.intf.dataCallback){
							this.intf.dataCallback(back.repBody[0]);
						}
					}else{
						this.$dispatch('handleServerBack', back);
					}
				}.bind(this))
			},
			goTo(evt) {
				this.$route.router.go({name: 'receive', params: {g: this.gid,n:this.pname}});
			},
			setData(data){
				this.isStop = true;
				this.text = "去领奖";
				if(data && data.haveprize=='1' && data.gid!='0') {
					this.isStop = false;
					this.gid = data.gid;
					this.pname = data.pname;
					if(data.mobile && data.mobile!=''){
						this.text = "已领奖";
						this.isStop = true;
					}
				}
			},
			updateData(date){
				this.isStop = false;
				var newdate = '';
				if(date){
					newdate = date;
					if(newdate.length>10){
						newdate = newdate.slice(0,10);
					}
				}
				this.isHasPrize(newdate);
			},
			setDataCallback(fun){
				this.intf.dataCallback = fun;
			}
		}
	}
</script>
