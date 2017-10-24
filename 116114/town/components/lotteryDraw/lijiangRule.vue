<template>
	<modal :show.sync="show" :bg="false">
		
		<div class="tanchuang">
			<p  class="qqtex">输入手机号码:</p>
			<input type="text"  class="qqinput" v-model="mobilePhone"></input>
		</div>
		<div class="comite" @click="tijiao()"></div>
	</modal>
<!--  <faile-modal :show.sync="faileModal.show"></faile-modal>
 <success-modal :show.sync="successDui.show"></success-modal>
 <success-dui :show.sync="successModal.show"></success-dui> -->
</template>
<script>
	// import api from '../../js/serverapi.js'
	import Modal from '../Modal.vue'
	// import FaileModal from './FaileModal.vue'
	// import SuccessDui from './SuccessDui.vue'
	// import SuccessModal from './SuccessModal.vue'
	export default {

		components: {
			Modal,
			// FaileModal,
			// SuccessDui,
			// SuccessModal
		},
		ready(){
            
            //this.activityOn()
        },
		props:{
			show:{
        		type: Boolean,
        		default: true
      		},
			back2:{
        		type: String,
        		default: ''
      		}
		},
		watch: {
			show(val) {
				console.log("watch")
				this.$dispatch('setOverflow', val);
			}
		},
		data(){
			return{
				mobilePhone:'',
				// back2:'',
				activityId:'',  //活动id
				// faileModal:{
    //                 show: false
    //             },
    //             successDui:{
    //                 show: false
    //             },
    //             successModal:{
    //                 show: false
    //             }

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
                api.receive(this,{acid:this.activityId,phone:this.mobilePhone,back2:this.back2}, (back)=> {
                    if(back.code==0){
                    	that.show =false;
                    	that.successModal.show = true;
                        console.log("已领奖品")
                        console.log(back.data)
                        that.lists = back.data
                    }else if(back.code==11){
                    	that.show =false;
                    	that.faileModal.show = true;
                    	console.log(back.description)
                    }else{
                    	alert(back.description)
                    }
                        
                })
                
            }
			
		}
	}
</script>
<style scoped>
	.tanchuang{
		width: auto;
		height: 502px;
		/*background: url(../../images/tanchuang1.png) no-repeat;*/
		background-size: contain;
	    text-align: center;
    	padding: 140px 30px 0;
    	box-sizing: border-box;
    	background: #000;
	}
	.know{
		width: 286px;
		height: 68px;
		/*background: url(../../images/know.png) no-repeat;*/
		margin: 0 auto;
		/*margin-top: 50px;*/
	}
	.qqtex{
		font-size:30px;
		color:#fff;
		line-height: 75px;
	}
	.qqinput{
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
	.comite{
		width: 290px;
		height: 68px;
		/*background: url(../../images/ti.png) no-repeat;*/
		margin: 0 auto;
		/*margin-top: 50px;*/
	}
</style>