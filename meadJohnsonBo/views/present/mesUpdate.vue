<template>
	<div class="User-detail">
        <div class="User-detail-top">礼品信息管理</div>
        <div class="configureType">
        	<div>配置类型</div>
        	<div>
        		<select v-model="options.configtype">
        			<option value="1">接口</option>
        			<option value="0">本地库</option>
        		</select>
        	</div>
        </div>
        <div class="User-detail-body">
            <div>
                <div class="formRow">
                    <div class="label">
                        <span>名称</span>
                    </div>
                    <input type="text" v-model="options.name"/>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>图片</span>
                    </div>  
                    <input type="text" placeholder="JPG、PNG格式" v-model="options.picurl"/>
                    <a href="javascript:;" class="uploadBtn">上传<input type="file" @change="upload($event, 'upload')"></a>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>结束时间</span>
                    </div>
                    <datepicker :value.sync="options.endtime" :format="'yyyy-MM-dd'" placeholder="年-月-日" width="320px" top="0" left="0" ></datepicker>
                </div>
                <div class="formRow clearfix">
                	<div class="left">
                		<div class="label">
	                        <span>礼品单价</span>
	                    </div>
	                    <input type="text" class="coinInput" v-model="options.price" style="text-align: center;"/>
	                    <span style="font-size: 12px;">贝壳币</span>
                	</div>
                	<div class="right" style="padding-right:5px;">
                		<div class="label">
	                        <span>打卡天数</span>
	                    </div>
	                    <div class="select">
	                    	<select v-model="options.signday">
	                    		<option value="">无</option>
		                    	<option value="1">7天</option>
		                    	<option value="2">14天</option>
		                    	<option value="3">21天</option>
		                    	<option value="4">30天</option>
		                    </select>
	                    </div>
                	</div>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>市场参考价</span>
                    </div>
                    <input type="text" v-model="options.referenceprice"/>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>礼品类型</span>
                    </div>
                    <div class="select">
                    	<select v-model="options.gifttype">
	                    	<option v-for="value in giftType[options.configtype]" :value="value.num">{{value.name}}</option>
	                    </select>
                    </div>
                </div>
                <div class="formRow" v-show="isShowNum">
                    <div class="label">
                        <span>礼品数量</span>
                    </div>
                    <input type="text" v-model="options.num"/>
                </div>
                <div class="formRow" v-show="isShowPid">
                    <div class="label">
                        <span>产品id</span>
                    </div>
                    <div class="select">
						<select v-model="options.pid">
	                    	<option :value="list.productid" v-for="list in productList">{{list.productid}}</option>
	                    </select>
                    </div>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>上传图片</span>
                    </div>
                    <a href="javascript:;" class="uploadBtn1">上传<input type="file" @change="upload($event, 'upload1')"></a>
                </div>
                <div class="formRow1" style="min-height: 30px;">
                    <div class="label">
                        <span>礼品详情</span>
                    </div>
                    <div id="editor-container" style="width: 100%" v-show="editorShow">
	                    <textarea id="editor-trigger" style="height: 400px;" v-model="options.description"></textarea>
	                </div>
                </div>
                <div style="display:relative; padding-bottom: 20px;">
                    <a class="btnSubmit" @click="updateGift">确定</a>
                </div>
            </div>
            <snackbar :show.sync="show" :text="text"></snackbar>
        </div>
    </div>
</template>
<script>
	import Datepicker from '../../components/Datepicker.vue'
	import api from '../../api'
	import snackbar from '../../components/snackbar.vue'
	export default {
		components: {
			Datepicker,
			snackbar
		},
		data() {
			return {
				show: false,
				text: '',
				options: {
					id: this.$route.params.id,
					name: '',
					picurl: '',
					description: '',
					endtime: '',
					price: '',
					grade: 'LV1',
					pid: '',
					configtype: '',
					gifttype: '100',
					num: '',
					referenceprice: '',
					signday: ''
				},
				optionstemp: {}, //临时存放礼品信息
				giftType: [], //接口类型
				isShowNum: false, //控制礼品数量显示与否
				productList: '', //产品id列表
				isShowPid: false,
				editor: '',
            	editorShow: false
			}
		},
		created() {
			this.getGiftType();
			this.loadEditor();
		},
		watch: {
			'options.configtype'(val) {
				if (val === '0') { //选择本地库时隐藏产品id选项
					this.isShowPid = false;
				} else {
					this.isShowPid = true;
				}
				if (this.options.id === '0') { //新增礼品时切换配置类型默认选择第一个接口类型
					this.options.gifttype = this.giftType[val][0].num;
				} else { //编辑礼品时切换配置类型智能选择接口类型
					if (this.options.configtype !== this.optionstemp.configtype) {
						this.options.gifttype = this.giftType[val][0].num;
					} else {
						this.options.gifttype = this.optionstemp.gifttype;
					}
				}
			},
			'options.gifttype'(val) {
				this.getProductidList(val);

				if (this.options.configtype == '1') {
					this.isShowNum = true;
				} else {
					if (val !== '100') { //选择实物奖品须填写产品数量
						this.isShowNum = true;
					} else {
						this.options.num = '';
						this.isShowNum = false;
					}
				}
			}
		},
		methods: {
			/**
			 * 加载文本编辑器
			 */
			loadEditor() {
	            var that = this;
	            require(['../../js/wangEditor.js'], function(wangEditor) {
	            	that.$nextTick(function(){
	            		that.editor = new wangEditor('editor-trigger');
		                that.editor.config.menus = wangEditor.config.menus.map(value => {
		                    if (value.match(/^(location|emotion)/)) {
		                        return '';
		                    }
		                    return value;
		                })
		                wangEditor.plugin(function(){
		                    that.editorShow = true;
		                })
		                that.editor.create();
		                that.editor.onchange = function(){
		                    that.options.description = that.editor.$txt.html();
		                }
		                that.editor.$txt.html(that.options.description);
	            	})
		                
	            })
	        },
			/**
			 * [根据id设置礼品信息]
			 */
			setMes() {
				let data = window.localStorage.getItem('giftMes');
				if (data) {
					data = window.JSON.parse(data);
					if (data.id === this.options.id) {
						for(let i in data){
                        	this.options[i] = data[i];
                        	this.optionstemp[i] = data[i];
                        }
					}
					this.editor.$txt.html(this.options.description);
				}
				if (this.options.id == '0') {
					this.options.configtype = '0';
				}
			},
			/**
			 * [上传图片]
			 * @param  {element} e [element元素]
			 */
			upload(e, type) {
				var self = e.srcElement || e.target,
					files = self.files[0],
					form = new FormData(),
                    xhr = new XMLHttpRequest();
                form.append('Content-Type', files.type || 'application/octet-stream');
                form.append('file', files)
                xhr.open('POST', basePath_3 + 'resource/upload/image', true);
                // xhr.open('POST', basePath + 'upload/upVideoOrFile', true);
                xhr.send(form);

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        var res = JSON.parse(xhr.responseText);
                        console.log(res.url)
                        // if (res.resCode == 0) {
                        	// if ('upload' === type) {
                        	// 	this.options.picurl = 'http://www.soyu.cn/fsd/'+res.repBody.fileUrl;
                        	// } else {//编辑礼品详情的上传图片
                        	// 	this.editor.$txt.html(this.editor.$txt.html() + '<img src="http://www.soyu.cn/fsd/' + res.repBody.fileUrl + '"/>');
                        	// }
                        	if ('upload' === type) {
                        		this.options.picurl = res.url;
                        	} else {//编辑礼品详情的上传图片
                        		this.editor.$txt.html(this.editor.$txt.html() + '<img src="' + res.url + '"/>');
                        	}
                            this.show = true;
                            this.text = '图片上传成功';
                        // } else {
                            // this.$dispatch('errorHandle', '图片上传', back.resCode);
                        // }
                    }
                }
			},
			/**
			 * [更新礼品信息]
			 */
			updateGift() {
				api.updateGift(this, this.options, back => {
					if (back.resCode == '0') {
						this.show = true;
						this.text = '保存成功';
						setTimeout(() => {
							this.$router.replace({path: '/presentMes'});
						},2000)
					} else {
                        this.$dispatch('errorHandle', '更新礼品信息', back.resCode);
                    }
				})
			},
			/**
			 * [获取礼品类型]
			 */
			getGiftType() {
				api.getGiftType(this, {}, back => {
					if (back) {
						if (back.resCode == '0') {
							this.giftType.push(back.repBody.local);
							this.giftType.push(back.repBody.interface);
							this.setMes();
						} else {
	                        this.$dispatch('errorHandle', '获取礼品类型', back.resCode);
	                    }
					}	
				})
			},
			/**
			 * [获取相应接口类型的产品ID]
			 * @param  {string} gifttype [接口类型]
			 *
			 */
			getProductidList(gifttype) {
				if (this.options.configtype === '1') {
					api.getProductidList(this, {gifttype: gifttype}, back => {
						if (back.resCode == '0') {
							this.productList = back.repBody.list;
							this.options.pid = this.productList[0].productid;
						}
					})
				} else {
					this.options.pid = '0';
				}	
			}
		}
	}
</script>
<style lang="scss" scoped>
	.configureType {
		position: absolute;
		top: 15px;
		right: 30px;
		height: 30px;
		line-height: 30px;
		div {
			display: inline-block;
			padding-left: 10px;
		}
		select {
			vertical-align: middle;
		}
	}
	.formRow {
		width: 405px;
		font-size: 0;
		.select {
			display: inline-block;
			line-height: 30px;
			select {
				vertical-align: middle;
			}
		}
		.coinInput {
			width: 50px;
			height: 28px;
			margin-right: 10px;
		}
		.uploadBtn,.uploadBtn1 {
			width: 80px;
			height: 28px;
			line-height: 28px;
			text-align: center;
			border-radius: 0 5px 5px 0;
			border: 1px solid #d6d6d6;
			background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
			background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
			background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
			input {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
				filter: alpha(opacity=0);
				z-index: 10;
				cursor: pointer;
			}
		}
		.uploadBtn {
			position: absolute;
			top: 0;
			right: 5px;
		}
		.uploadBtn1 {
			position: relative;
			display: inline-block;
			border-radius: 5px;
		}
	}
	.formRow1 {
		position: relative;
		padding-left: 80px;
		.label {
			position: absolute;
			top: 0;
			left: 0;
			width: 60px;
		    text-align: right;
		    line-height: 30px;
		    font-size: 12px;
		}
	}
</style>
<style>
	#editor-container {
		display: inline-block;
	}
	#editor-container i {
		font-size: 16px;
	}
</style>