<template>
	<div class="wrap" :class="{'share-wrap': isSharePage}" :style="{'background': 'url('+Img+') 0 0 / 100% auto no-repeat , -webkit-linear-gradient(left, #923c9a, #e3738c, #923c9a)'}">

		<router-view></router-view>
		<snackbar :text="text" :show-snack-bar.sync="show"></snackbar>
	</div>
	<model :show.sync="delStatus.showMsg">
	        <div class="del-msg">
	        	<div style="height:190px;background:#f3f3f3;">
	        		<ul>
	        			<li>
	        				<a href="javascript:;" class="weixin" @click="weixin"></a>
	        				<span style="font-sizing:20px;">微信好友</span>
	        			</li>
	        			<li>
	        				<a href="javascript:;" class="pengyou" @click="friend"></a>
	        				<span style="font-sizing:20px;">朋友圈</span>
	        			</li>
	        			<!-- <li>
	        				<a href="javascript:;" class="weibo" @click="weibo"></a>
	        				<span style="font-sizing:20px;">微博</span>
	        			</li> -->
	        			<li>
	        				<a href="javascript:;" class="qq" @click="qq"></a>
	        				<span style="font-sizing:20px;">QQ好友</span>
	        			</li>
	        		</ul>
	        	</div>
	            <p @click="delStatus.showMsg = false" style="line-height:70px;">取消</p>
	        </div>
	    </model>
</template>
<script>
	import snackbar from '../components/snackbar.vue'
	import api from '../api/index.js'
	import Model from '../components/Model.vue'
	export default {
		components: {
			snackbar,
			Model
		},
		data() {
			return {
				basePath:basePath,
				show: false,
				text: '',
				isSharePage: false,
				channelLogdata:[],
				shareDate:{
            		title:'坚持，就会有礼！',
            		desc:'坚持的孩子能拿大奖，比比看谁签得多',
            		image:'http://huodong.10155.com/fm/build/static/img/shareicon.png',
            		url:'http://huodong.10155.com/fm/#!/share'

            	},
            	delStatus: {
	                msg: "",
	                showMsg: false,
	                errorShow: true
	            },
	            activityAllData:[],  //活动信息	
	            Img:'',
	            path: '',
	            // sharebg:basePath+'build/static/img/share3.jpg',
	            sharebg:'http://huodong.10155.com/fm/build/static/img/share3.jpg',
	            prizeAllData:[],
	            ad:[]
	           
			}
		},
		ready() {
			
			var self = this;
			this.selectActivity();
			this.selectPrize();
			this.$router.afterEach(function(transition) {
				if (transition.to.path.indexOf('/share') > -1) {
					self.isSharePage = true;
				} else {
					self.isSharePage = false;
				}

			})

			this.$router.afterEach(function(transition) {
				self.path = transition.to.path;
				if (transition.to.path.indexOf('/sign') > -1) {
					self.Img = self.activityAllData.homebgimgurl
				}else if(transition.to.path.indexOf('/lottery') > -1){
					self.Img = self.activityAllData.prizeimgurl
				}else if(transition.to.path.indexOf('/list') > -1){
					self.Img = self.activityAllData.homeimgurl
				}else if(transition.to.path.indexOf('/share') > -1){
					
					self.Img = self.sharebg
				} else {
					self.Img = self.activityAllData.homebgimgurl
				}

			})
			this.$on('showTip', (text) => {
				this.text = text;
				this.show = true;
			})
			this.$on('ChannelLog',(channelLogdata)=>{
				api.addChannelLog(this,channelLogdata,(back)=>{

				})
			})

			this.$on('model',()=>{
				this.delStatus.showMsg = true;
			})
			
		},
		methods:{
			weixin(){
				this.$dispatch('ChannelLog',{"type":"button","button_name":"share","usid":"1"})
				window.wofans.wechatShare(this.shareDate.title, this.shareDate.desc, this.shareDate.image, this.shareDate.url, 0) //好友

			},
			friend(){
				this.$dispatch('ChannelLog',{"type":"button","button_name":"share","usid":"1"})
				window.wofans.wechatShare(this.shareDate.title, this.shareDate.desc, this.shareDate.image, this.shareDate.url, 1)  //朋友圈
			},
			weibo(){
			},
			qq(){
				this.$dispatch('ChannelLog',{"type":"button","button_name":"share","usid":"1"})
				window.wofans.qqShare(this.shareDate.title, this.shareDate.desc, this.shareDate.image, this.shareDate.url)
			},
			selectActivity(){
				var self = this;
				api.selectActivity(this,{},(back)=>{
					this.activityAllData = back.repBody[0]
					this.shareDate.title =this.activityAllData.sharetitle
					this.shareDate.desc =this.activityAllData.sharedes
					this.shareDate.image =this.activityAllData.shareimgurl
					if (self.path.indexOf('/sign') > -1) {
						self.Img = self.activityAllData.homebgimgurl
					}else if(self.path.indexOf('/lottery') > -1){
						self.Img = self.activityAllData.prizeimgurl
					}else if(self.path.indexOf('/list') > -1){
						self.Img = self.activityAllData.homeimgurl
					}else if(self.path.indexOf('/share') > -1){
						self.Img = self.sharebg
					}  else {
						self.Img = self.activityAllData.homebgimgurl
					}

				})
			},
			selectPrize(){
	            api.selectPrize(this,{},(back)=>{

	            	this.prizeAllData = back.repBody
	            	this.prizeAllData.filter(value => {
	            		this.ad.push(value.unlock_day)
	            		this.ad.sort(function(a,b){
            				return a-b;
            			});
	            		localStorage.setItem('prize_day',this.ad)
        			})
	               
	            })
        	}
		}
	}
</script>
<style lang="scss">
	* {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	html,body {
		height: 100%;
	}
	p {
		max-height: 99999px;
	}
	.wrap {
		min-height: 100%;
		background: url(../images/bg.jpg) no-repeat, linear-gradient(left, #923c9a, #e3738c, #923c9a);
		background-size:100%;
		.text {
			width: 80%;
			margin: 0 auto;
			line-height: 60px;
			text-align: center;
			color: white;
			font-size: 28px;
			background: rgba(0, 0, 0, .6);
		}
		.orange {
			color: #f4e600 !important;
		}
	}
	.share-wrap {
		background:url(../images/share2.jpg) no-repeat;
		background-size: 100% 100%;
	}

	.del-msg {
	    width: 100%;
	    position: absolute;
	    bottom: 0px;
	    left: 0;
	    background-color: #fff;
	    p {
		    // height: 90px;
		    // line-height: 90px;
		    text-align: center;
		    color: #000;
		    border-bottom: 1px solid #eee;
		    font-size:20px;
		}
	    ul li{
	    	width:33.33%;
	    	float:left;
	    	text-align:center;
	    	padding:30px 0 40px;
	    	box-sizing:border-box;
	    	a{
	    		width:100px;
	    		height:100px;
	    		display:inline-block;
			    background-size: contain;
	    	}
	    	.weixin{
	    		background:url(../images/1.png) no-repeat;
	    		background-size: contain;
	    	}
	    	.pengyou{
	    		background:url(../images/2.png) no-repeat;
	    		background-size: contain;
	    	}
	    	.weibo{
	    		background:url(../images/3.png) no-repeat;
	    		background-size: contain;
	    	}
	    	.qq{
	    		background:url(../images/4.png) no-repeat;
	    		background-size: contain;
	    	}
	    	span{
	    		display:block;
	    		height:40px;
	    		line-height:40px;
				font-sizing:20px;
	    	}
	    }
	}
</style>