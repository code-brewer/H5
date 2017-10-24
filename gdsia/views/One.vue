<template>
    <div class="view view-user" transition="view">
        <!-- <h3 class="title">菜单编辑</h3> -->
        <section class="user-section">
            <div class="left">
                <h2>Banner编辑(图片尺寸: 1920 X 470)</h2>
                <table class="table  table-bordered">
                    <tr>
                        <th>id</th>
                        <th>链接</th>
                        <th>图片</th>
                        <th>修改</th>
                        <th>操作</th>
                        <th>排序</th>
                        <!-- <th>子菜单</th> -->
                    </tr>
                    <tr v-for="item in bannerList">
						<td>{{item.id}}</td> 
						<td><input type="text" class="inputText" v-model="item.link"></td>
						<td>
							<div class="upload upImg">
								<img class="img" v-if="item.logo_url != ''" :src="item.logo_url" >
								<label class="box" :class="{hasImg: !!item.logo_url}">
									<file-upload :name="'banner_'+ $index" action="upload/upVideoOrFile" :auto="true" class="upload-btn" ></file-upload>
								</label>
							</div>
						</td>
						<td><div class="btn btn-primary" @click="saveBanner(item)">保存</div></td>
						<td><div class="btn btn-primary" @click="deleteBaner(item)">删除</div></td>
						<!-- <td>
							<select v-model="item.rank" @change="saveBanner(item)">
								<option :value="val" v-for="val in ranks">{{val}}</option>
							</select>
						</td> -->
						<td>{{item.rank}}</td>
					</tr>
                </table>
                <div class="form-group" v-if="show">
                    <label>
                        <span>链接</span>
                        <input type="text" class="inputText" placeholder="请输入链接" v-model="addUrl">
                        <div class="btn btn-info" @click="sure">确定</div>
                        <div class="btn btn-warning" @click="cancel">取消</div>
                    </label>
                    <div style="padding-top: 10px; line-height: 30px;">
                    	<span>位置</span>
                    	<div style="display: inline-block;">
                    		<select v-model="rank">
		                    	<option :value="$index+1" v-for="val in 6">{{$index+1}}</option>
		                    </select>
                    	</div>
                    </div>
                </div>
                <div class="btn btn-success" @click="show = true">添加</div>
            </div>
            <div class="clear"></div>
        </section>
        <section class="user-section">
            <div class="left">
                <h2>快捷服务编辑(图片尺寸: 350 X 196)</h2>
                <table class="table  table-bordered">
                    <tr>
                        <th>id</th>
                        <th>名称</th>
                        <th>图片</th>
                        <th>操作</th>
                        <!-- <th>子菜单</th> -->
                    </tr>
                    <tr v-for="item in lists">
                        <td>{{item.id}}</td>
                        <td>
                            <input type="text" class="inputText" v-model="item.title">
                        </td>
                        <td>
                            <div class="upload upImg">
                                <img class="img" v-if="item.logo_url != ''" :src="item.logo_url">
                                <label class="box" :class="{hasImg: !!item.logo_url}">
                                    <file-upload :name="'img_'+ $index" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
                                </label>
                            </div>
                        </td>
                        <td>
                            <div class="btn btn-primary" @click="save(item)">保存</div>
                        </td>
                        <!-- <td><a class="btn btn-info" v-link="{name: 'two-menu', params: {id: item.id}}">子菜单</a></td> -->
                    </tr>
                </table>
            </div>
            <div class="clear"></div>
        </section>
        <section class="user-section">
            <div class="left">
                <h2>浮动菜单编辑</h2>
                <table class="table  table-bordered">
                    <tr>
                        <th>id</th>
                        <th>名称</th>
                        <th>链接</th>
                        <th>操作</th>
                        <!-- <th>子菜单</th> -->
                    </tr>
                    <tr v-for="item in floatList">
                        <td>{{item.id}}</td>
                        <td>
                            <input type="text" class="inputText" v-model="item.title">
                        </td>
                        <td>
                            <input type="text" class="inputText" v-model="item.link">
                        </td>
                        <td>
                            <div class="btn btn-primary" @click="editFloatBanner(item)">保存</div>
                        </td>
                        <!-- <td><a class="btn btn-info" v-link="{name: 'two-menu', params: {id: item.id}}">子菜单</a></td> -->
                    </tr>
                </table>
            </div>
            <div class="clear"></div>
        </section>
        <snackbar :show.sync="snackbarShow" :text="snackbarText"></snackbar>
        <!--  <section class="btn-section">
		 	<div class="col-md-6"><span class="btns btn-save" @click="updateUserInfo">保存<span></div>
		 	<div class="col-md-6"><span class="btns btn-ret">取消</span></div>
		 </section> -->
    </div>
</template>
<style type="text/css" scoped>
.view-user .user-section {
    margin-bottom: 20px;
}

.clear {
    clear: both;
}

.upImg {
    position: relative;
    width: 80px;
    height: 50px;
    margin: 0 auto;
}

.upImg img,
.upImg .box {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.upImg .box.hasImg {
    opacity: 0;
    filter: alpha(opacity=0);
}

.upImg img {
    max-width: 100%;
    max-height: 100%;
}
</style>
<script>
import api from '../api'
import Vue from 'vue'
import snackbar from '../components/snackbar.vue'

export default {
    components: {
        snackbar
    },
    data() {
        return {
            lists: '',
            imgurl: '',
            snackbarShow: false,
            snackbarText: '',
            show: false,
            addUrl: '',
            bannerList: '',
            floatList: '',
            rank: '1',
            ranks: []
        }
    },
    ready() {
        this.getNavigationListByRank();
        this.getBannerListByRank();
        this.getFloatBannerList();
    },
    created() {
        Vue.component('file-upload', function(resolve) {
            require(['../js/vue.file-upload.js', '../js/vue.pretty-bytes.js'], resolve)
        });
    },
    methods: {
        getNavigationListByRank() {
            api.getNavigationListByRank(this, {}, (back) => {
                if (back.resCode == '0') {
                    this.lists = back.repBody;
                }
            })
        },
        save(item) {
            var that = this;
            var body = {
                navigation_id: item.id,
                title: item.title,
                logo_url: item.logo_url,
                screening_conditions: item.screening_conditions
            }
            api.editNavigation(that, body, (back) => {
                if (back.resCode == '0') {
                    this.snackbarShow = true;
                    this.snackbarText = '修改成功';
                }
            })
        },
        saveBanner(item) {
        	api.editBanner(this, {id: item.id,link: item.link, logo_url: item.logo_url, rank: item.rank}, back => {
        		if (back.resCode == '0') {
        			this.getBannerListByRank();
        			this.snackbarShow = true;
                    this.snackbarText = '修改成功';
        		}
        	})
        },
        cancel() {
            this.show = false;
            this.addUrl = '';
        },
        sure() {
    		this.saveBanner({
        		id: '',
        		link: this.addUrl,
        		logo_url: '',
        		rank: this.rank
        	})
        	this.show = false;
		    this.addUrl = '';
        },
        getBannerListByRank() {
        	api.getBannerListByRank(this, {}, back => {
        		if (back.resCode == '0') {
        			this.ranks = [];
        			this.bannerList = back.repBody;
        			back.repBody.forEach(value => {
        				this.ranks.push(value.rank);
        			})
        		}
        	})
        },
        deleteBaner(item) {
            api.deleteBannerResource(this, {id: item.id}, back => {
                if (back.resCode == '0') {
                    this.getBannerListByRank();
                    this.snackbarShow = true;
                    this.snackbarText = '删除成功';
                }
            })
        },
        getFloatBannerList() {
            api.getFloatBannerList(this, {}, back => {
                if (back.resCode == '0') {
                    this.floatList = back.repBody;
                }
            })
        },
        editFloatBanner(item) {
            api.editFloatBanner(this, item, back => {
                if (back.resCode == '0') {
                    this.snackbarShow = true;
                    this.snackbarText = '修改成功';
                }
            })
        }
    },
    events: {
        onFileClick: function(file) {
            // console.log('onFileClick', file);
        },
        onFileChange: function(file) {
            // console.log('onFileChange', file);
            // here is where we update our view
            this.fileProgress = 0;
            this.allFilesUploaded = false;
        },
        beforeFileUpload: function(file) {
            // called when the upload handler is called
            // console.log('beforeFileUpload', file);
            this.$dispatch('progress', 1)
        },
        afterFileUpload: function(file) {
            // called after the xhr.send() at the end of the upload handler
            // console.log('afterFileUpload', file);
        },
        onFileProgress: function(progress) {
            // update our progress bar
            this.fileProgress = progress.percent;
        },
        onFileUpload: function(file, res) {
            if (res.resCode == 0) {
                this.$dispatch('progress', 0)

                if (file._id.indexOf("img_") != -1) {
                    var index = ~~file._id.substring(file._id.indexOf("_") + 1, file._id.length);
                    this.$set('lists[' + index + '].logo_url', uploadPath + res.repBody.fileUrl);
                    this.save(this.lists[index]);
                }
                if (file._id.indexOf("banner_") != -1) {
                    var index = ~~file._id.substring(file._id.indexOf("_") + 1, file._id.length);
                    this.$set('bannerList[' + index + '].logo_url', uploadPath + res.repBody.fileUrl);
                    this.saveBanner(this.bannerList[index]);
                }
            }
        },
        onFileError: function(file, res) {
            console.error('onFileError', file, res);
        },
        onAllFilesUploaded: function(files) {
            console.log('onAllFilesUploaded', files);
            // everything is done!
            this.allFilesUploaded = true;
        }
    }
}
</script>
