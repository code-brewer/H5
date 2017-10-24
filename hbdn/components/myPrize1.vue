<template>
		<section class="model"  style="background: rgba(0,0,0,0.5)" v-if = "showMyPrize">
   			<div class="panel">
   				<div class="msg">
   					<div class="messagebg">
   						<h2>我的奖品</h2>
   						<ul v-if="myPrize">
   							<li><span class="rank">1</span><img :src="myPrize"></li>
   						</ul>

   						<p v-if="myPrize">我们将会在两个工作日内</p>
   						<p v-if="!myPrize" style="margin-top: 30px;margin-bottom: 20px;">{{mes}}</p>
   						<p style="padding-bottom: 45px;" v-if="myPrize">为您充值，请注意查收！</p>
		   				<img :src="'images/xx.png'" @click="showMyPrize = false" class="close">
		   				<!-- 'images/liuliang30.png' -->
   					</div>
   				</div>
   				
   			</div>
   			
   		</section>
</template>
<style lang="scss">
	
</style>
<script>
import api from './../utils/serverapi.js'
	export default {
		props: {
			showMyPrize: {
				type: Boolean,
				default: false
			},
		},
		data () {
			return {
				// myPrize : 'images/liuliang30.png';
				myPrize : '',
				mes : '搜索中...',
			}
		},
		ready () {
			   var that = this;
                api.queMyPrizeDrawResult(this,{},(back)=>{
                	if (back.repBody.length==0) return that.mes = '空';
                	if (back.resCode==='0'&&back.resMsg==="success") {
                		switch (back.repBody[0].gid){
                			case '1':
                			that. myPrize = 'images/wuyuan.png';
                			break;
                			case '2' :
                			that. myPrize = 'images/liuliang30.png';
                			case '3' :
                			that. myPrize = 'images/shiyuan.png';
                			case '4' :
                			that. myPrize = 'images/liuliang50.png';
                		}
                	}
                	else {
                		that.mes = '空'
                	}
                    // if(back.resCode=="0") {
                    //     if(back.repBody.length>0 && back.repBody[0].types == "1"){
                    //         that.ismark = true;
                    //     }
                    // }
                    // else{
                    //     that.$dispatch('handle_server_error', back);
                    // }
                });
		} 
	}
</script>