<template>
    <div class="view view-user" transition="view">
        <section class="user-section">
            <div class="left">
                <table class="table table-bordered">
                    <tr>
                        <th>id</th>
                        <th>链接</th>
                        <th>图片</th>
                        <th>修改</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in lists">
						<td>{{item.id}}</td> 
						<td><input type="text" class="inputText" v-model="item.link"></td>
						<td>
							<div class="upload upImg">
								<img class="img" v-if="item.logo_url != ''" :src="item.logo_url" >
								<label class="box" :class="{hasImg: !!item.logo_url}">
									<file-upload :name="'links_'+ $index" action="upload/upVideoOrFile" :auto="true" class="upload-btn" ></file-upload>
								</label>
							</div>
						</td>
                        <td><div class="btn btn-primary" @click="save(item)">保存</div></td>
						<td><div class="btn btn-primary" @click="del(item)">删除</div></td>
					</tr>
                </table>
                <div class="form-group" v-if="show">
                    <label>
                        <span>链接</span>
                        <input type="text" class="inputText" placeholder="请输入链接" v-model="link">
                        <div class="btn btn-info" @click="sure">确定</div>
                        <div class="btn btn-warning" @click="cancel">取消</div>
                    </label>
                </div>
                <div class="btn btn-success" @click="show = true">添加</div>
            </div>
            <div class="clear"></div>
        </section>
        <snackbar :show.sync="snackbarShow" :text="snackbarText"></snackbar>
    </div>
</template>
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
            snackbarShow: false,
            snackbarText: '',
            show: false,
            lists: [],
            link: ''
        }
    },
    created() {
        Vue.component('file-upload', function(resolve) {
            require(['../js/vue.file-upload.js', '../js/vue.pretty-bytes.js'], resolve)
        });
    },
    ready() {
        this.getFriendLinkList();
    },
    methods: {
        getFriendLinkList() {
            api.getFriendLinkList(this, {}, back => {
                if (back.resCode == '0') {
                    this.lists = back.repBody;
                }
            })
        },
        save(item, text) {
            api.editFriendLink(this, item, back => {
                if (back.resCode == '0') {
                    this.snackbarShow = true;
                    this.snackbarText = text ? text : '修改成功';
                    this.getFriendLinkList();
                }
            })
        },
        sure() {
            var item = {
                id: '',
                link: this.link
            }
            this.save(item, '添加成功');
            this.show = false;
            this.link = '';
        },
        cancel() {
            this.show = false;
            this.link = '';
        },
        del(item) {
            api.deleteBannerResource(this, {id: item.id}, back => {
                if (back.resCode == '0') {
                    this.snackbarShow = true;
                    this.snackbarText = '删除成功';
                    this.getFriendLinkList();
                }
            })
        }
    },
    events: {
        onFileUpload: function(file, res) {
            if (res.resCode == 0) {
                this.$dispatch('progress', 0)

                if (file._id.indexOf("links_") != -1) {
                    var index = ~~file._id.substring(file._id.indexOf("_") + 1, file._id.length);
                    this.$set('lists[' + index + '].logo_url', uploadPath + res.repBody.fileUrl);
                    this.save(this.lists[index]);
                }
            }
        }
    }
}
</script>
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