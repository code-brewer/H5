<template>
	<div class="app-view">
		<div class="content">
			<div class="bw">
				<a   @click="startclick" class="">
					<img :src="$root.basePath+'src/img/startbtn.png'" alt="" />
				</a>
			</div>
			
			
			<a  v-link="{path: '/rule'}" class="link" style="left: 80px;  bottom: 120px;"><img :src="$root.basePath+'src/img/rulebtn.png'"></a>
			<a @click="checkIntegral" class="link" style="right: 80px; bottom: 120px;"><img :src="$root.basePath+'src/img/home-rankbtn.png'"></a>
		</div>
		<img :src="$root.basePath+'src/img/home-bg.jpg'"  class="bg" />
		<img :src="$root.basePath+'src/img/logo.png'" class="logo" />
		<!-- <img @click="showShare()" :src="$root.basePath+'src/img/shareicon.png'" class="share" /> -->
		<!-- <div v-if="sharetip" @click="hideShare()" class="sharebg"></div>
		<img v-if="sharetip" @click="hideShare()" :src="$root.basePath+'src/img/sharetip.png'" class="sharetip" /> -->
		
	</div>
</template>

<style scoped>
	.content > .bw {
		position: absolute;
		bottom: 220px;
		left: 88px;
		right: 88px;
		text-align: center;
		a {
			display: inline-block;
			
		}
	}
	.content > a.link {
		position: absolute;
		bottom: 90px;
		width: 200px;
		text-align: center;
		font-size: 34px;
		color: #fff;
	}
</style>

<script>
   import {router} from './index'
    
	export default {
		ready() {
			// this.$dispatch('loadingclean');
			//this.$dispatch('title', '数钱数到手抽筋!');
            this.getActivityInfo();
		},
		data() {
			return {
				activity:activityinfostr,
				activityInfo:JSON.parse(activityinfostr.extbody),
				loadingCount:0,
				sharetip:false,
				
			}
		},
        methods:{
        	
            getActivityInfo(){
                var that = this;
		        localStorage.setItem('activity', JSON.stringify(that.activity));
					
              
            },
            startclick(){
            	var that = this;
            	router.go({name: 'game'});
            	
            },
            checkIntegral(){
            	// gologin();
            	gointegral();
            }

        }
	}
</script>