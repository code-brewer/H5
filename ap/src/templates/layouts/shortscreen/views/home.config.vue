<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div v-for="item in activityConfig.shortScreen" class="swiper-slide" style="display: block;">
				<img :src="item.imgUrl" alt="" style="width: 100%">
				<div class="player">
					<p class="text">{{item.song}}</p>
					<p class="img"><img src="../images/ling-icon.png"><img src="../images/open-icon.png"></p>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import swiper from 'swiper'
	export default {
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				showForm: false,
				showEdit: false,
				activityConfig,
				swiper:null,
				
			}
		},
		components: {
			
		},
		ready(){
			if(this.activityConfig.switchtype == 'shu'){
				this.swiper = new Swiper('.swiper-container', {
			        direction: 'vertical'
			    });
				
			}else{
				this.swiper = new Swiper('.swiper-container',{
						direction: 'horizontal'
					});
			}
			// this.$on('chageSwitch',()=>{
			// 	alert(this.activityConfig.switchtype);
			// 	if(this.activityConfig.switchtype == 'shu'){
			// 		alert("------"+"shu");
			// 		var swiper = null;
			// 		swiper = new Swiper('.swiper-container', {
			// 	        direction: 'vertical'
			// 	    });
					
			// 	}else{
			// 		alert("------"+"heng");
			// 		var swiper = null;
			// 		swiper = new Swiper('.swiper-container');
			// 	}
			// })
			
		},
		watch: {
			'activityConfig.switchtype'(v){
				if(v == 'shu'){
					console.log('shu');
					this.swiper.destroy(true, true)
					this.swiper = new Swiper('.swiper-container', {
				        direction: 'vertical'
				    });
				}
				if(v == 'heng'){
					console.log('heng');
					this.swiper.destroy(true, true)
					this.swiper = new Swiper('.swiper-container',{
						direction: 'horizontal'
					});
				}
			},
			'activityConfig.shortScreen'(){
				if(this.activityConfig.switchtype == 'shu'){
					console.log('shu');
					this.swiper.destroy(true, true)
					this.swiper = new Swiper('.swiper-container', {
				        direction: 'vertical'
				    });
				}
				if(this.activityConfig.switchtype == 'heng'){
					console.log('heng');
					this.swiper.destroy(true, true)
					this.swiper = new Swiper('.swiper-container',{
						direction: 'horizontal'
					});
				}
			},
		// 	'activityConfig.shortScreen': {
		//     handler(newValue, oldValue) {
			
		//     },
		//     deep: true
		//   }

		},
	}
</script>
<style lang="scss" src="../css/style.scss"></style>
<style src="../../../../../node_modules/swiper/dist/css/swiper.min.css"></style>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	@import '../../../_base_config.scss';

	.app-view{
		background-size: 100% 100%;
	}
	.section{
		width:100%;
		height: 100%;
	}

	.swiper-container {
        width: 100%;
        height: 100%;
    }
	
	.swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
</style>
