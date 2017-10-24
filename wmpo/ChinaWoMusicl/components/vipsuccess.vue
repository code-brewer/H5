<template>
	<modal :show.sync="vipsuccessShow" :bg="false">
		<div class="components-vipsuccess">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
			<div class="box" style="background: #fff; border-radius: 20px;">
				<p class="title">提示</p>
				<div class="">
					<!-- <img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;"> -->
					<p class="success-panel">开通会员成功，你已享有流量全免及下载特权， 还有<span>{{this.rom != 1?tip:tip1}}</span>元话费赠送，次月15日前未取消会员，次月17日前话费即可到账！</p>
				</div>
				<a style="background: url('./l/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="saveMsg()">确<span style="font-family: none;">&nbsp;</span>认</a>
				<img class="close-img" :src="'l/images/sp-close.png'" @click="vipsuccessShow = false">
			</div>
		</div>
	</modal>
</template>

<script>
    import modal from './../modal/Modal.vue'
    import api from './../utils/serverapi.js'
    export default{
        components: {
            modal
        },
        data(){
            return {
                tip: "1",
                tip1: "5",
                rom:'',
            }
        },
        props: {
            vipsuccessShow: {
                type: Boolean,
                default: false
            },
            tipdef: {
                type: Boolean,
                default: true
            }
        },
        ready(){
            this.rom = Math.round(Math.random());
            console.log('随机数：', this.rom)
        },
        methods: {
            saveMsg(){
                if(this.tip==1){
                    var body={
                        money:this.tip,
                        mobile:sessionStorage.getItem('LoginMobile'),
                    };
                }
                else {
                    var body={
                        money:this.tip1,
                        mobile:sessionStorage.getItem('LoginMobile'),
                    };
                }
                api.insertBill(this, body, (back) => {
                    if (back.resCode == 0 || back.resCode == '0') {
                    }
                });
                this.vipsuccessShow = false;
            },
        }
    }
</script>

<style lang="sass">
	.components-vipsuccess{
		width: 100%;
	.right{
		position: absolute;
		right: -20px;
		top: 310px;
		z-index: 100;
	}
	.left{
		position: absolute;
		left: -20px;
		top: 395px;
		z-index: 100;
	}
	.box{
		position:relative;
		padding: 20px;
		margin: 0 auto;
	// text-align: center;
		box-sizing: border-box;
		border: 8px solid #f7af49;
	.title{
		font-size: 52px;
		line-height: 60px;
		color: #f7af49;
		text-align: center;
		font-weight: 600;

	}
	.success-panel{
		line-height: 40px;
		font-size: 30px;
		color: #f7af49;
		display: inline-block;
		width: 100%;
		padding: 30px 0;
		vertical-align: middle;
		span{
			color: #a72531;
		}
	}
	.confirm-btn{
		display: block;
		width: 254px;
		height: 89px;
		margin: 35px auto;
		line-height: 83px;
		font-size: 30px;
		text-align: center;
		color: #fff;
		background-color: #98ce2e;
		border-radius: 25px;
		font-weight: 600;

	}
	.close-img{
		position: absolute;
		right: -20px;
		top: -20px;
		max-width: 56px;
		max-height: 50px;
	}

	}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px 30px;
	}
</style>