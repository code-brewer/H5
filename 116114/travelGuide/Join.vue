 <template>
	<div class="app-view" id="join-page">
		<div class="main-content" >
			<!-- <div class="vote_user">
				<img class="vote_user_img" :src="item.head_url" alt="">
				<p class="vote_user_nick">{{item.username}}</p>
			</div> -->
			<div class="add" v-if="showadd">
				<div>+</div>
				<p>添加图片参与投票</p>
				<input @change="inputc()" class="inputbutton" type="file" accept="image/jpeg,image/png,image/jpg,image/gif" multiple="true"  v-el:inputimg/>
			</div>
			<div class="showImgs">
			<div class="itemDiv" v-if="showimage.has" :style="h3style" @click="openPhotoSwipe(showimage)">
					<div :style="showimage.style" class="img-item" ></div>
					<i @click="delimg()">X</i>
				</div>

			</div>
			<a class="join_btn" @click="join()">提交</a>
		</div>
	</div>
</template>

<style lang="scss">
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
				h3width:(window.innerWidth)/2,
				h3style:{width:(window.innerWidth)/2+"px",height:(window.innerWidth)/2+"px"},
				file:"",
				showadd:true,
				showimage:{has:false}
	 		}
	 	},
	 	computed: {
	 	},
	 	ready() {
	 		this.id = this.$route.params.id;
	 		if(!this.$root.islogin){
	 			this.$root.login = true;
	 			return;
	 		}
		},
	 	methods:{
	 		delimg(){
	 			this.showimage = {has:false};
	 			this.showadd = true;
	 		},
	 		inputc(){
	 			var files = this.$els.inputimg.files;
	 			if (files && files.length > 0) {
	 				this.$dispatch('loading', {name:'loading_img', icon: true, text: '加载中...', show: true, duration: 20*1000});
	 				this.loadFiles(files);
	 			}
	 		},
	 		loadFiles(files) {
	 			var that = this;
	 			setTimeout(function() {
	 				var addlength = files.length;
	 				for (var i = 0; i < addlength; i++) {
	 					var file = files[i];
	 					var output_format = file.name;
	 					var FILESIZE = 10;
	 					var scale = 0.5;
	 					if (file.size > (FILESIZE * 1024 * 1024)) {
	 						scale = 0.2;
	 					}
	 					var reader = new FileReader();
	 					reader.onload = function(f) {
	 						var mime_type = "image/jpeg";
	 						if (output_format != undefined && output_format.indexOf('.png') >= 0 && output_format.indexOf('.png') == output_format.length - 4) {
	 							mime_type = "image/png";
	 						}
	 						that.imgScale(this.result, scale, mime_type, function(s, f, w, h) {
	 							var backgroundSizex = "100%";
	 							var backgroundSizey = "100%";
	 							var backgroundPos = "";
	 							if (w <= h) {
	 								backgroundSizey = "auto";
	 								var endh = h * that.h3width / w;
	 								backgroundPos = "0 " + ((that.h3width - endh) / 2) + "px";
	 							} else {
	 								backgroundSizex = "auto";
	 								var endw = w * that.h3width / h;
	 								backgroundPos = ((that.h3width - endw) / 2) + "px" + " 0";
	 							}
	 							that.showimage= {
	 								src: s,
	 								file: f,
	 								name: output_format,
	 								style: { backgroundImage: "url(" + s + ")", backgroundSize: backgroundSizex + " " + backgroundSizey, backgroundPosition: backgroundPos },
	 								width: w,
	 								height: h,
	 								has:true
	 							};
	 							that.showadd = false;  //不能继续上传
	 							that.$dispatch('cancelloading', 'loading_img');
	 						});
						};
						reader.readAsDataURL(file);
					}
				}, 500);
			},
			imgScale(src, scale, type, cbk) {
				var that = this;
				if (!src) {
					return cbk(false);
				}
				var _canvas = document.createElement('canvas');
				var tImg = new Image;
				tImg.onload = function() {
					var iwidth = tImg.naturalWidth;
					var iheight = tImg.naturalHeight;
					_canvas.width = iwidth;
					_canvas.height = iheight;
					var _context = _canvas.getContext('2d');
					_context.drawImage(tImg, 0, 0);
					src = _canvas.toDataURL(type, scale);
					var blob = that.dataURItoBlob(src);
					cbk(src, blob, iwidth, iheight);
				};
				tImg.src = src;
			},
			dataURItoBlob(dataURI) {
				var byteString, mimestring;
				if (dataURI.split(',')[0].indexOf('base64') !== -1) {
					byteString = atob(dataURI.split(',')[1]);
				} else {
					byteString = decodeURI(dataURI.split(',')[1]);
				}
				mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];
				var content = new Array();
				for (var i = 0; i < byteString.length; i++) {
					content[i] = byteString.charCodeAt(i);
				}
				return new Blob([new Uint8Array(content)], { type: mimestring });
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
	 		uploadimage(form, bf, pr) {
	 			try {
	 				var xhr = new XMLHttpRequest();
	 				xhr.onreadystatechange = function() {
	 					if (xhr.readyState < 4) {
	 						return;
	 					}
	 					if (xhr.status < 400) {
	 						var ret = JSON.parse(xhr.responseText);
	 						ret.status = xhr.status;
	 						ret.statusText = xhr.statusText;
	 						if (bf) {
	 							bf(ret);
	 						}
	 					} else {
	 						var err = JSON.parse(xhr.responseText);
	 						err.status = xhr.status;
	 						err.statusText = xhr.statusText;
	 						if (bf) {
	 							bf(err);
	 						}
	 					}
	 				};
	 				xhr.upload.addEventListener('progress', function(e) {
	 					if (pr) {
	 						pr(e);
	 					}
	 				}, false);
	 				xhr.open("post", "image/upload", true);
	 				xhr.onload = function() {};
	 				xhr.send(form);
	 			} catch (e) {
	 				console.log(e);
	 			}
	 		},
	 		save(urls){
	 			var that = this;
	 			that.$dispatch('loading', {name:'createVoteitem', icon: true, text: '正在创建投票,请稍候...', show: true, duration: 20*1000});
	 			sapi.createVoteitem(this,{vote_id:that.id,main_img:urls},(back)=>{
	 				that.$dispatch('cancelloading', 'createVoteitem');
	 				if(back.code!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					router.go({name: 'vote', params: {id: this.id}});
	 				}
	 			});
	 		},
	 		join() {
	 			if (!this.showimage.has) {
	 				this.$dispatch('loading', {icon: false, text: '请添加一张图片', show: true, duration: 2*1000});
	 				return;
	 			}
	 			var that = this;
	 			var loadingob = {name:'upload_img', icon: true, text: '正在上传文件...', show: true, duration: 3600*1000};
	 			this.$dispatch('loading', loadingob);
	 			var form = new FormData();
	 			form.append('file', this.showimage.file, this.showimage.name);
	 			this.uploadimage(form, function(back) {
	 				that.$dispatch('cancelloading', 'upload_img');
	 				if(back.code!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					var urls = back.data;
	 					that.save(urls);
	 				}
	 			}, function(e) {
	 				loadingob.text = "正在上传文件" + parseInt(e.loaded / e.total * 100, 10) + "%...";
	 			});
	 		}
	 	}
	}
</script>