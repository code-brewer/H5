<template>
	<modal :show.sync="show" :bg="false">
		
		<div class="tanchuang">
			<p  class="qqtex">输入QQ号码:</p>
			<input type="text"  class="qqinput" v-model="QQ"></input>
			<p  class="phonetex">输入手机号码:</p>
			<input type="text"  class="phoneinput" v-model="mobilePhone"></input>
		</div>
		<div class="comite" @click="tijiao()"></div>
	</modal>
<faile-modal :show.sync="faileModal.show"></faile-modal>
<success-dui :show.sync="successModal.show"></success-dui>
 <success-modal :show.sync="successDui.show"></success-modal>
</template>
<script>
	import api from '../../js/serverapi.js'
	import Modal from '../Modal.vue'
	import FaileModal from './FaileModal.vue'
	import SuccessDui from './SuccessDui.vue'
	import SuccessModal from './SuccessModal.vue'
	export default {

		components: {
			Modal,
			FaileModal,
			SuccessDui,
			SuccessModal
		},
		ready(){
            
            this.activityOn()
        },
		props:{
			show: false,
			back2:'',
			type:''
		},
		watch: {
			show(val) {
				this.$dispatch('setOverflow', val);
			}
		},
		data(){
			return{
				mobilePhone:'',
				QQ:'',
				activityId:'',  //活动id
				faileModal:{
                    show: false
                },
                successDui:{
                    show: false
                },
                successModal:{
                    show: false
                }

			}
		},
		methods:{
			activityOn(){        //获取上线活动id
                var that = this;
                api.activityOn(this,{}, (back)=> {
                    if (back.code == "0") {
                        that.activityId = back.data.id;
                        
                        
                    }else{
                        alert(back.description)
                    }   
                })
            },
			tijiao(){

				if(this.mobilePhone==""){
                    alert("请先输入手机号码");
                    return;
                }

                //判断是否输入11位以1开头的数字号码
                if(!/^1\d{10}$/.test(this.mobilePhone)){
                    alert("请输入正确的手机号");
                    return;
                }
                
				var that = this;
                console.log("查看")
                console.log(this.activityId)
                api.receive(this,{acid:this.activityId,phone:this.mobilePhone,back2:this.back2,qq:this.QQ,type:this.type}, (back)=> {
                    if(back.code==0){
                        // alert("Qb")
                        // console.log(back.data)
                        that.show =false;
                    	that.successModal.show = true;
                    }else if(back.code==11){
                    	that.show =false;
                    	that.faileModal.show = true;
                    	console.log(back.description)
                    }else{
                    	alert(back.description)
                    }
                        
                })
                    // }
            }
			// }
		}
	}
</script>
<style scoped>
	.tanchuang{
		width: auto;
		height: 502px;
		background: url(../../images/tanchuang1.png) no-repeat;
		background-size: contain;
    	box-sizing: border-box;
    	position: relative;
	    padding: 100px 50px 0;
        text-align: center;
	}
	.tanchuang p{
		line-height: 60px;
	}
	.comite{
		width: 290px;
		height: 68px;
		background: url(../../images/ti.png) no-repeat;
		margin: 0 auto;
		/*margin-top: 50px;*/
	}
	.qqtex{
		font-size:30px;
		color:#fff;
	}
	.qqinput{
		height:52px;
		line-height:52px;
		width: 65%;
    	font-size: 30px;
    	padding-left: 15px;
    	box-sizing: border-box;

	}
	.phonetex{
		font-size:30px;
		color:#fff;
	}
	.phoneinput{
		height:52px;
		line-height:52px;
		width: 65%;
    	font-size: 30px;
    	padding-left: 15px;
    	box-sizing: border-box;

	}
	.modal {
		.modal-content {
			overflow: initial;
		}
	}
</style>