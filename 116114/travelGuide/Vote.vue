 <template>
	<div class="app-view" id="vote-page">
		<div class="main-content"  style="overflow-y: scroll;" v-el:repsscroll :style="{'background': 'url('+bgImg+') no-repeat 0 0 / 100% 100%'}">
			<img class="main_img" :src="main_img" alt="">
			<p class="detail_title">活动规则</p>
			<p class="ruleText">
				<span v-for="text in activityrule" v-show="$index === 1 ? this.showText : true">{{text}}</span>
				<a href="javascript:;" v-show="(activityrule.length > 1) && !this.showText" @click="this.showText = !this.showText" style="font-size:25px;">...全文</a>
                <a href="javascript:;" v-show="(activityrule.length > 1) && this.showText" @click="this.showText = !this.showText" style="font-size:25px;">收起</a>
			</p>
			<p class="detail_title">排行榜</p>
			<div class="vote_item" v-for="item in replies">
				<div class="vote_user">
					<img class="vote_user_img" :src="item.head_url" alt="">
					<p class="vote_user_nick">{{item.username}}</p>
					<p class="vote_user_inf"><span>{{item.number}}</span>号&nbsp;票数<span class="vote_count">{{item.vote_count}}</span>&nbsp;第{{item.rank}}名</p>
				</div>
				<div class="vote_img" :style="h3style" @click="openPhotoSwipe(item)">
					<div :style="item.style" class="img_item" ></div>
				</div>
				<a class="vote_btn" @click="vote(item)">投票</a>
			</div>
		</div>
		<a id="detail_join" @click="join()" v-if="canJoin!='1'">我要参加</a>
	</div>
</template>

<style lang="scss" scoped>
.ruleText span{
font-size:25px; 
  }
</style>

<script>
	import {router} from './index'
	import sapi from './utils/serverapi.js'
	export default {
		components:{
		},
	 	data(){
	 		return{
	 			id:"",
	 			adata:{
	 				id:"",
	 				group_id:"",
	 				name:"",
	 				starttime:"",
	 				endtime:"",
	 				target:"1",
	 				rule:"",
	 				backgroup_url:"1",
	 				isshow:"1"
	 			},
	 			main_img:"",
	 			replies:[],
	 			needmore:true,//所有投票是否全部获取完
				moreing:false,//投票加载中
				cpn:1,//当前获取到的投票页数
				pageNum:1,//获取投票接口传递的页数
				pageSize:10,//每页投票数
				h3width:(window.innerWidth)/2,
				h3style:{width:(window.innerWidth)/2+"px",height:(window.innerWidth)/2+"px"},
				activityrule:[],  //规则
				showText:false,
				canJoin:"0",//0还没获取到权限，1没权限，2有权限
				bgImg:'',
	 		}
	 	},
	 	computed: {
	 	},
	 	ready() {
	 		this.id = this.$route.params.id;
	 		if(!this.$root.islogin){
	 			// this.$root.login = true;
	 			// return;
	 		}else{
	 			this.isCanJoin();
	 		}
	 		this.getVoteDetail();
	 		this.getVoteitems();
	 		var that = this;
	 		that.$els.repsscroll.onscroll = function(){
	 			if(!that.needmore || that.moreing)return;
	 			var t = that.$els.repsscroll.scrollTop;
	 			var sh = that.$els.repsscroll.scrollHeight;
	 			var h = that.$els.repsscroll.offsetHeight;
	 			if(((sh - t) - h) <= 200){
	 				that.getVoteitems();
	 			}
	 		}
		},
	 	methods:{
	 		getVoteDetail(){
	 			var that = this;
	 			that.$dispatch('loading', {name:'getVoteDetail', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.getVoteDetail(this,"?id="+this.id,(back)=>{
	 				that.$dispatch('cancelloading', 'getVoteDetail');
	 				if(back.code!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					that.adata = back.data;
	 					//背景图
	 					if(that.adata.backgroup_url=='1'){
	 						that.bgImg =this.$root.activityBasePath+'/images/b1.jpg'
	 					}else{
	 						that.bgImg =this.$root.activityBasePath+'/images/b2.jpg'
	 					}
	 					for(var i in that.adata){
	 						
	 						if(i == 'rule'){
	 							that.activityrule.push(that.adata[i].substr(0, 20))
	 							that.adata[i].length > 20 ? that.activityrule.push(that.adata[i].substr(20)) : '';
                    			that.showText = false;
	 						}
	 					}
	 					that.getActivityByGroup();
	 				}
	 			});
	 		},
	 		getActivityByGroup(){
	 			var that = this;
	 			that.$dispatch('loading', {name:'getActivityByGroup', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.getActivityByGroup(this,"?id="+this.adata.group_id,(back)=>{
	 				that.$dispatch('cancelloading', 'getActivityByGroup');
	 				if(back.code!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					that.main_img = back.data.main_img;
	 				}
	 			});
	 		},
	 		getVoteitems(){
	 			if(!this.needmore || this.moreing){return;}
	 			var that = this;
	 			if(that.pageNum>1 && that.pageNum<=that.cpn){
	 				console.log("旧");
	 				return;
	 			}
	 			that.moreing = true;
	 			var body="?id="+this.id+"&page="+that.pageNum+"&size="+that.pageSize;
	 			sapi.getVoteitems(this,body,(back)=>{
	 				if(that.pageNum == 1){
	 					that.replies = [];
	 					// if(that.$els.repsscroll.scrollTop>that.$els.repsposts.offsetHeight+50){
	 					// 	that.$els.repsscroll.scrollTop = that.$els.repsposts.offsetHeight+50;
	 					// }
	 				}
	 				if(back.code=="0") {
	 					var list = back.data.list;
	 					for (var i = 0; i < list.length; i++) {
	 						var sitem = list[i];
	 						if(sitem.main_img && sitem.main_img.length>0){
	 							sitem.src = sitem.main_img;
	 							that.imgwh(sitem);
	 						}
	 					}
	 					if(that.pageNum == 1){
	 						that.replies = list;
	 					}else{
	 						that.replies = that.replies.concat(list);
	 					}
	 					if(list.length<that.pageSize || back.data.curpage == back.data.endpage){
	 						that.needmore = false;
	 					}else{
	 						that.cpn = that.pageNum;
	 						that.pageNum++;
	 					}
	 				}
	 				else{
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				that.moreing = false;
	 			});
	 		},
	 		openPhotoSwipe(item) {
	 			var pswpElement = document.querySelectorAll('.pswp')[0];
	 			var items = [];
	 			if(item.width){
	 				items.push({
	 					src: item.src,
	 					w: 640,
	 					h: item.height*640/item.width
	 				});
	 			}
	 			if(items.length<=0)return;
	 			var options = {
	 				index:1,
	 				history: false,
	 				focus: false,
	 				showAnimationDuration: 0,
	 				hideAnimationDuration: 0
	 			};

	 			var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	 			gallery.init();
	 		},
	 		imgwh(ob) {
	 			ob.style = {};
	 			var that = this;
	 			var tImg = new Image;
	 			tImg.onload = function(){
	 				that.imgload(tImg,ob);
	 			};
	 			tImg.src = ob.src;
	 		},
	 		imgload(tImg,ob){
	 			var that = this;
	 			var w = tImg.naturalWidth;
	 			var h = tImg.naturalHeight;
	 			ob.width = w;
	 			ob.height = h;
	 			var backgroundSizex = "100%";
	 			var backgroundSizey = "100%";
	 			var backgroundPos = "";
	 			if(w<=h){
	 				backgroundSizey = "auto";
	 				var endh = h*that.h3width/w;
	 				backgroundPos = "0 "+((that.h3width-endh)/2)+"px";
	 			}else{
	 				backgroundSizex = "auto";
	 				var endw = w*that.h3width/h;
	 				backgroundPos = ((that.h3width-endw)/2)+"px"+" 0";
	 			}
	 			ob.style = {backgroundImage:"url("+ob.src+")",backgroundSize:backgroundSizex+" "+backgroundSizey,backgroundPosition:backgroundPos};
	 		},
	 		vote(item){
	 			if(this.checkLogin()){
	 				var that = this; 
	 				sapi.addBallot(this,'?id='+item.id,(back)=>{ 
	 					if(back.code == 0){ 
	 						that.$dispatch('loading', { icon: false, text: back.data, show: true, duration: 2 * 1000 }); 
	 						// this.getVoteitems();
	 						item.vote_count++;
	 					}else{ 
	 						that.$dispatch('handle_server_error', back); 
	 					} 
	 				});
	 			}
	 		},
	 		isCanJoin(){
	 			var that = this;
	 			sapi.isCanJoin(this,"?id="+this.id,(back)=>{
	 				if(back.code!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					that.main_img = back.data;
	 					if(back.data){
	 						this.canJoin = "2";
	 					}else{
	 						this.canJoin = "1";
	 					}
	 				}
	 			});
	 		},
	 		join(){
	 			if(this.checkLogin() && this.canJoin == "2"){
	 				router.go({name: 'join', params: {id: this.id}});
	 			}
	 		},
	 		checkLogin(){
	 			if(!this.$root.islogin){
	 				this.$root.login = true;
	 				this.$root.loginlisten = this.loginlisten;
	 				return false;
	 			}
	 			return true;
	 		},
	 		loginlisten(){
	 			this.isCanJoin();
	 		}
	 	}
	}
</script>