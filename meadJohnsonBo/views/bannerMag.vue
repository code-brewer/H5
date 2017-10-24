<template>
	<div class="User-detail">
        <div class="User-detail-top">Banner管理</div>
        <div class="User-detail-body">
            <div class="listOne" v-for="value in lists">
                <div class="num">{{$index+1}}</div>
                <div class="listTxt">
                    <div class="div1">
                        <span>轮播图</span>
                        <input class="uploadbox" placeholder="（可传jpg、png、gif格式文件）" v-model="value.url"></input>
                        <button class="btn-linear">上传<input type="file" @change="uploadImg($event, value)"></button>
                    </div>
                    <div class="div2">
                        <span>链接</span>
                        <input class="uploadUrl" placeholder="可填写url" v-model="value.pageurl"></input> 
                    </div>
                    <div class="previewImgSmall" @mouseenter="enter(value)" @mouseleave="value.preview = false"><img :src="value.url" class="img1"><div class="img2" v-show="value.preview"><img :src="value.url"></div></div>
                    <a class="listTxtup" @click="move('up', $index)"></a>
                    <a class="listTxtdwm" @click="move('down', $index)"></a>
                    <a class="delbtn btn-linear" @click="del(value)">删除</a>
                    <a class="submit" :class="{'btn-linear': value.isEdit}" @click="submit(value)">确认</a>
                </div>
            </div>
            <a class="btnSubmit addBanner" @click="add">增加Banner</a>  
        </div>
        <snackbar :show.sync="show" :text="text"></snackbar>
        <load :show.sync="isLoad"></load>
    </div>

</template>
<script>
    import api from '../api'
    import snackbar from '../components/snackbar.vue'
    import load from '../components/load.vue'

	export default {
        components: {
            snackbar,
            load
        },
		data() {
			return {
				lists:[],
                show: false,
                text: '',
                isLoad: false
			}
		},
        created() {
            this.isLoad = true;
        },
		ready() {
            this.getBanner();
		},

        methods: {
            getBanner() {
                api.getBanner(this, {}, (back) => {
                    this.isLoad = false;
                    if (back.resCode === '0') {
                        this.lists = back.repBody.list.map(value => {
                            value['preview'] = false;
                            value['files'] = value.url ? '1' : '';
                            value['isEdit'] = true;
                            return value;
                        })
                    }
                })
            },
            uploadImg(e, value) {
                var self = e.srcElement || e.target;

                value.files = self.files[0];

                var r = new FileReader();

                r.readAsDataURL(self.files[0]);

                r.onload = function() {
                    value.url = this.result;
                }
                    
            },
            submit(value) {
                if (!value.isEdit) {
                    return false;
                }
                if (value.pageurl == '') {
                    this.show = true;
                    this.text = '链接不能为空';
                    return false;
                } else if (!value.files) {
                    this.show = true;
                    this.text = '请上传图片';
                    return false;
                }
                this.isLoad = true;
                value.isEdit = false;
                if (value.files == '1') {
                    this.update(value);
                } else {
                    var form = new FormData(),
                        xhr = new XMLHttpRequest();
                    form.append('Content-Type', value.files.type || 'application/octet-stream');
                    form.append('file', value.files)
                    xhr.open('POST', basePath + 'upload/upVideoOrFile', true);
                    xhr.send(form);

                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            
                            var res = JSON.parse(xhr.responseText);
                            if (res.resCode == 0) {
                                value.url = 'http://www.huabeimama.cn/fsd/'+res.repBody.fileUrl;
                                this.update(value);
                            } else {
                                this.show = true;
                                this.text = '图片上传失败';
                            }
                        }
                    }
                }
            },
            update(value) {
                api.addBanner(this, {id: value.id, url: value.url, pageurl: value.pageurl}, (back) => {
                    this.isLoad = false;
                    value.isEdit = true;
                    if (back.resCode === '0') {
                        this.getBanner();
                        this.show = true;
                        this.text = value.id === '0' ? '添加成功' : '更新成功';
                    }
                    
                })
            },
            add() {
                this.lists.push({
                    id: '0',
                    rn: '',
                    seq: '',
                    pageUrl: '',
                    url: '',
                    preview: false,
                    files: '',
                    isEdit: true
                });
            },
            del(value) {
                api.delBanner(this, {id: value.id}, (back) => {
                    if (back.resCode === '0') {
                        this.show = true;
                        this.text = '删除成功';
                        this.getBanner();
                    }
                })
            },
            move(type, index) {
                var current = this.lists[index],
                    target = '';
                if (type === 'up') {
                    if (index === 0) {
                        this.show = true;
                        this.text = '已是第一条了';
                        return false;
                    }
                    target = this.lists[index-1];
                } else {
                    if (index === this.lists.length - 1) {
                        this.show = true;
                        this.text = '已是最后一条了';
                        return false;
                    }
                    target = this.lists[index+1];
                }
                api.moveBanner(this, {upid: target.id, upseq: target.seq, downid: current.id, downseq: current.seq}, (back) => {
                    if (back.resCode === '0') {
                        this.show = true;
                        this.text = type === 'up' ? '上移成功' : '下移成功';
                        this.getBanner();
                    }
                })
            },
            enter(value) {
                if (value.url) {
                    value.preview = true;
                }
            }
        }
	}
</script>
<style lang="scss">
    .listOne{
        margin:10px 0;
        position: relative;
        height:96px;
        .num{
            width:50px;
            height:50px;
            border-radius:50px;
            color:#fff;
            line-height:50px;
            text-align:center;
            font-size:24px;
            background:#fe7eaf;
            display:inline-block;
            margin:0 10px;
               position:absolute;
            top:23px;
            
        }
        .listTxt{
            width:688px;
            height:96px;
            border:1px solid #ccc;
            display:inline-block;
            position: absolute;
            margin-left:20px;
            box-sizing:border-box;
            position:relative;
            left:60px;
            padding: 15px;
            input {
                border-radius: 0;
            }
            .div1,.div2 {
                width:330px;height:26px;display:inline-block;
            }
            .div1 {
                margin-bottom: 12px;
            }
            .previewImgSmall {
                position: absolute;
                top: 15px;
                right: 275px;
                width: 64px;
                height: 64px;
                border: 1px solid #d6d6d6;
                img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    max-width: 100%;
                    max-height: 100%;
                    -webkit-transform: translate(-50%, -50%);
                    -moz-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                }
                .img2 {
                    position: absolute; 
                    top: 64px;
                    left: 0;
                    width: 300px;
                    height: 300px;
                    z-index: 100;
                    border-radius: 5px;
                    background: white;
                    -webkit-box-shadow: 0 0 5px rgba(0,0,0,.4);
                    -moz-box-shadow: 0 0 5px rgba(0,0,0,.4);
                    box-shadow: 0 0 5px rgba(0,0,0,.4);
                }
            }
            .uploadbox {
                width:190px;height:100%;padding: 0 5px;
            }
            .uploadUrl {
                width:267px;height:100%;margin-left:12px;padding-left: 5px;
            }
            a {
                cursor: pointer;
            }
            .listTxtup,.listTxtdwm {
                position:absolute;
                top:33px;
                width:30px;
                height:30px;
            }
            .listTxtup{
                background:url(../images/top.png) no-repeat;
                right:230px;
            }
            .listTxtdwm{
                background:url(../images/bottom.png) no-repeat;
                right:180px;
            }
            .delbtn,.submit {
                position:absolute;
                top:35px;
                width:53px;
                height:24px;
                line-height:24px;
                border:1px solid #ccc;
                text-align:center;
                color:#000;
                border-radius:5px;
            }
            .delbtn{
                right:94px;
            }
            .submit {
                right:24px;
                background: #ccc;
            }
            .btn-linear {
                background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
                background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
                background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
                background: -ms-linear-gradient(top, #fcfcfc, #d9d7d7);
                //background: linear-gradient(top, #fcfcfc, #d9d7d7);
            }
            .btn-linear:hover {
                background: -webkit-linear-gradient(top, #d9d7d7, #d9d9d9);
                background: -moz-linear-gradient(top, #d9d7d7, #d9d9d9);
                background: -o-linear-gradient(top, #d9d7d7, #d9d9d9);
                background: -ms-linear-gradient(top, #d9d7d7, #d9d9d9);
                //background: linear-gradient(top, #d9d7d7, #d9d9d9);
            }
            button {
                position: relative;
                width: 76px;height: 28px;margin-left:-7px;
                border: 1px solid #d6d6d6;
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
        }
    }
    .btnSubmit{
        width:80px;
        height:30px;
        line-height:30px;
        color:#fff;
        text-align:center;
        background-color:#fe7eaf;
        display:block;
        margin: 20px auto 0;
        border-radius:8px;
        cursor: pointer;
    }
   
</style>