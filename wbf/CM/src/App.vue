<template>
	<div class="app-views">
		<router-view transition="slide"></router-view>
		<div v-if="isLoading">
			<loading :text="loading.text" :show.sync="loading.show" :icon="loading.icon" :duration="loading.duration" :name="loading.name" v-for="loading in loadingdata.loadings"></loading>
		</div>

		<Modal :show.sync="scoreModal" effect="zoom">
			<div class="modal-box award">
	      		<div class="modal-con">
			        <p>恭喜你获得 <span>{{score}}</span> 个会员积分</p>
			        <div class="btn" @click="gonewactivity"><img :src="$root.basePath+'src/img/new-activity.png'"></div>
			      
				</div>
				<img :src="$root.basePath+'src/img/close.png'" @click="scoreModal = false" class="close">
				<img :src="$root.basePath+'src/img/modal-bg.png'" class="modal-bg">
	      	</div>
		
		</Modal>
	</div>
</template>
<style scoped>
	.modal-box{
		text-align: center;
	}
	.modal-bg{
		position: relative;
	}
	.modal-con{
		position: absolute;
		top: 50px;
	    left: 20%;
	    width: 60%;
	    text-align: center;
	    z-index: 100;
	}
	.modal-con p{
		color: #fff;
	    margin-top: 120px;
    	font-size: 30px;
	}
	.btn{
		margin-top: 80px;
	}
	.close{
	    position: absolute;
	    right: 10px;
	    top: 10px;
	    z-index: 101;
	}
</style>
<script>
	import {router} from './index';
	import Loading from './components/Loading.vue'
	import sapi from './utils/serverapi.js'
	import Modal from './components/Modal.vue'

	export default {
		components: {
			Modal,
			Loading
		},
		data() {
			return {
				barTitle: '数钱壕礼送不停',
				basePath: basePath,
				loadingdata: {loadings:[]},
				isLoading:false,
				activityBasePath:activityBasePath,
				scoreModal: false,
        		score:0
			}
		},
		ready() {
			if(typeof window.requestAnimationFrame == "undefined"){
				window.requestAnimationFrame = function(fun){
					setTimeout(fun,60);
				}
			}
			// sharetext = "河南114数钱壕礼送不停，一号订天下，夏不为例！";
			// shareicon = activityBasePath+'/src/img/share-wc.jpg';
			var that = this;

			if(this.checklogin()) {
				// this.userInfo = eval('('+localStorage.getItem('ams_user_info')+')');
			}

			this.$on('title', (title) => {
				document.title = title;
				this.barTitle = title;
			});

			this.$on('loadingclean', () => {
				that.loadingdata.loadings = [];
				that.isLoading = that.loadingdata.loadings.length>0;
			});
			
			this.$on('loading', (loading) => {
				if(!loading.name){
					loading.name = 'tip';
				}
				if(!loading.icon){
					loading.icon = false;
				}
				for (var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
					var item = that.loadingdata.loadings[i];
					if(!item || !item.show){
						that.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				that.loadingdata.loadings.push(loading);
				that.isLoading = that.loadingdata.loadings.length>0;
			});
			this.$on('cancelloading', (name) => {
				for (var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
					var item = that.loadingdata.loadings[i];
					if(item && item.name && item.name == name){
						item.show = false;
						that.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				that.isLoading = that.loadingdata.loadings.length>0;
			});

			this.$on('login', (parameter) => {
				gologin();
			});

			this.$on('handle_server_error', (parameter) => {
				// if (parameter.resCode=="10003") {
				// 	that.$dispatch('login', window.location.search);
				// }else{
					if(SSD_DEBUG){
						that.$dispatch('loading', {text: parameter.msgInfo, icon: false, show: true, duration: 2000});
					}
				// }
			});

			// router.afterEach(function(transition) {

			    
			// });
		},
		methods:{
            checklogin(){
            	var that = this;
            	var lo = getArgsFromUrl("loginok");
			    var m = getArgsFromUrl("mbl_no");
			    var at = getArgsFromUrl("auth_token");
            	if(!iswowcas){
            		if(typeof(window.uuid) == "undefined"){
	            		var nus = navigator.userAgent.split('_');
	            		window.uuid = nus[nus.length-1];
	            	}
	            	window.auttok = at;
				    if(m == ""){
				      if(lo != "" && typeof(window.mbl_no) == "undefined"){
				        that.$dispatch('loading', {name: "qryUserInfo",text: "请稍候...", icon: true, show: true, duration: 20*1000});
	            		sapi.qryUserInfo(this, function(back){
	            			that.$dispatch('cancelloading',"qryUserInfo"); 
	            			if(back.msgCode == 'MKM00000'){
	            				if(back.data.mblNo.length>0){
	            					window.mbl_no = back.data.mblNo;
	            					that.saveUserScore();
	            				}
	                		}else{
	                			that.$dispatch('handle_server_error', back);
	                		}
	                	})
				      }else if(typeof(window.mbl_no) != "undefined"){
				        // delete window.mbl_no;
				      }
				    }else{
				      window.mbl_no = m;
				    }
            	}else{
            		if(sessionStorage.getItem("wo2cm") != 1){
            			location.href = serverPath + sapi.shareUrl();
            			return;
            		}
            		window.auttok = sessionStorage.getItem("auttok");
				    if(m == ""){
				      if(lo != "" && typeof(window.mbl_no) == "undefined"){
				        that.$dispatch('loading', {name: "qryUserInfo",text: "请稍候...", icon: true, show: true, duration: 20*1000});
	            		sapi.qryUserInfo(this, function(back){
	            			that.$dispatch('cancelloading',"qryUserInfo"); 
	            			if(back.msgCode == 'MKM00000'){
	            				if(back.data.mblNo.length>0){
	            					window.mbl_no = back.data.mblNo;
	            					that.saveUserScore();
	            				}
	                		}else{
	                			that.$dispatch('handle_server_error', back);
	                		}
	                	})
				      }else if(typeof(window.mbl_no) != "undefined"){
				        // delete window.mbl_no;
				      }
				    }else{
				    	if(typeof(window.mbl_no) == "undefined" || window.mbl_no.length==0){
				    		window.mbl_no = m;
				    	}
				      
				    }
            	}
      			
            },
            saveUserScore(){
        		var that =  this;
                sapi.Operscore(this, 'pass', function(back){
            		if(back.msgCode == 'MKM00000'){
            			that.score = back.data.scoreVal;
            			that.scoreModal = true;
            		}

            		else{
            			that.$dispatch('handle_server_error', back);
            		}
            	})
            },
            gonewactivity(){
            	gonewactivity();
            }

        }
	}
</script>