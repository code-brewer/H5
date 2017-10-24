<template>
	<div class="ad-page-wap-view">
		<a class="ad-panel" :href="adPage1.url" @click="goshop()">
			<div class="ad-icon-d">
				<img :src="adPage1.imgUrl" />
			</div>
			<h1>{{adPage1.name}}</h1>
		</a>
		<a class="ad-panel" @click="gocall()">
			<div class="ad-icon-d">
				<img :src="adPage2.imgUrl" />
			</div>
			<h1>{{adPage2.name}}</h1>
		</a>
		<modal :show.sync="adModal" :box="false" :bg="false">
			<div class="modal-body ad-modal">
				<div style="border-bottom: 1px solid #d6d6d6;font-size: 32px;height: 60px;">
					<span style="width: 80px;display: inline-block;line-height: 52px;color:#157efb;" @click="adModal=false;">取消</span>
					<span style="width: 360px;display: inline-block;line-height: 52px;">选择城市</span>
					<span style="width: 80px;display: inline-block;line-height: 52px;color:#157efb;" @click="gocalls()">确定</span>
				</div>
				<select v-model="province">
					<option value="广东">广东省</option>
				</select>
				<select  v-model="city" class="select-enable">
					<option value="广州">广州市</option>
				</select>
				<select  v-model="area" class="select-enable">
					<option value="">-地区-</option>
					<option value="天河">天河区</option>
					<option value="海珠">海珠区</option>
					<option value="越秀">越秀区</option>
					<option value="荔湾">荔湾区</option>
					<option value="番禺">番禺区</option>
					<option value="黄浦">黄浦区</option>
					<option value="白云">白云区</option>
					<option value="萝岗">萝岗区</option>
				</select>
				<p style="padding: 32px;">广州：天河区、海珠区、越秀区，三区全境适用。荔湾区、番禺区、黄浦区、白云区、萝岗区，五区部分地区适用（下单前请先电话咨询了解）</p>
			</div>
		</modal>
	</div>
</template>
<script>
	import modal from './Modal.vue'
	import sapi from './../utils/serverapi.js'
	export default {
		components: {
			modal
		},
		data() {
			return {
				adPage1:{imgUrl:activityBasePath+"/images/ad-icon-1.png",name:"店面服务",url:serviceadurl1},
				adPage2:{imgUrl:activityBasePath+"/images/ad-icon-2.png",name:"上门服务",url:serviceadurl2},
				adModal:false,
				province:"广东",
				city:"广州",
				area:""
			}
		},
		ready(){
			// window.ssdd = this;
		},
		methods:{
			gocall(){
				sapi.clickAdd(this, "?source=CALL");
				this.adModal = true;
			},
			gocalls(){
				if(this.area.length == 0){
					this.$dispatch('loading', {text: '请选择地区', show: true, duration: 2000});
				}else{
					location.href = this.adPage2.url;
				}
			},
			goshop(){
				sapi.clickAdd(this, "?source=SHOP");
				location.href = this.adPage1.url;
			}
		}
	}
</script>
<style lang="scss">
	@import '../css/design2develop.scss';
	.ad-page-wap-view {
		width: 100%;
		text-align: center;
		.ad-panel {
			display: inline-block;
			color: #000;
			h1{
				font-size: 22px;
				text-align: center;
				line-height: 56px;
			}
			.ad-icon-d {
				width: des2devrem(310px);
				height: des2devrem(140px);
				background-color: #fff;
				border-radius: 10px;
				padding-top: 10px;
				img {
					display: block;
					margin: 0 auto;
					height: des2devrem(117px);
				}
			}
		}
		.ad-panel:last-child{
			margin-left: 18px;
		}
		.ad-modal {
			font-size: des2devrem(28px);
			background-color: #f6f6f6;
			box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
			width: 100%;
			select{
				width: 400px;
				height: 60px;
				font-size: 30px;
				border: 1px solid #d6d6d6;
				margin-top: 20px;
				text-align: center;
			}
		}
	}
</style>