<template>
    <div class="app-view">
    <div style="padding-bottom: 78px;height:100%;">
        <div class="detail-top">
            <a class="detail-back" href="javascript:history.back()"></a><a href="javascript:;" class=" color2 ">发帖</a>
        </div>
        <div class="background1">
            <div class="tie-title">
                <input type="text" placeholder="标题(可选)" class="juzhong" v-model="publishData.title">
            </div>
            <textarea placeholder="分享感受..." class="tie-area" @focus="this.biaoqingmodel=false" v-model="publishData.share"></textarea>
            <p style="padding-left:30px;box-sizing:border-box;font-size: 22px;
    color: #15caae;">{{publishData.location}}</p>
            <div style="height:76px;box-sizing: border-box;position: relative;">
                <a class="dingwei" style="position:absolute;top:18px;left: 20px;" @click="dingwei">
                </a>
                <a class="biaoqing" style="position:absolute;top:10px;right: 89px;" @click="this.biaoqingmodel=true">
                </a>
                <a class="pic" style="position:absolute;top:14px;right:20px;">
                    <input @change="inputc()" class="inputbutton" type="file" accept="image/jpeg,image/png,image/jpg,image/gif" multiple="true" v-el:inputimg/>
                </a>
            </div>
            <div class="showImgs" style="margin-bottom:78px;">
                <div class="img-top" v-if="ImgData.length" @click="openPhotoSwipe(showimage)">
                    <div :style="imag.style" class="" style="background-size: contain;background-repeat: no-repeat;position:relative;display:inline-block;margin-right:8px;margin-bottom:5px;" v-for="imag in ImgData">
                        <i @click="delimg(imag,$index)" class="ca" v-if="nopublish">X</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="tie-send" @click="join">{{publishing}}</div>
    <div class="biaoqing-model" v-if="biaoqingmodel">
        <div class="biaoqingbao">
            <!-- <span :style="{'background-position':val.dingwei} " v-for="val in emoji.data" @click="enter(val.name)"></span> -->
            <span :style="{'background-image':'url('+val.img+')'} " v-for="val in emoji.data" @click="enter(val.name)"></span>
        </div>
        <div class="biaoqing-bottom">
            <span class="smile-fix"></span>
            <a class="cancel" style="position:absolute;top:7px;right:20px;margin:0;" @click="this.biaoqingmodel=false">完成</a>
        </div>
    </div>
    </div>
</template>
<script>
import emoji from '../js/emoji/data.js'
import api from '../api/serverapi.js'
import wxUtil from '../js/wx.js'
import getArgs from '../utils/url.js'
export default {
    components: {

    },
    data() {
        return {
            person: {
                name: '昵称'
            },
            personNav: {
                type: '1'
            },
            comment: [{
                headImg: basePath + 'src/m/static/img/head-icon.png',
                name: '',
                date: '',
                times: '',
                detail: ''
            }],
            show: '1',
            myInfo: true,
            other: false,
            //上传图片
            h3width: (window.innerWidth) / 3,
            h3style: {
                width: (window.innerWidth) / 3 + "px",
                height: (window.innerWidth) / 3 + "px"
            },
            file: "",
            showadd: true,
            showimage: {
                has: false
            },
            biaoqingmodel: false, //表情弹窗
            emoji: emoji,
            ImgData: [],
            Info: {}, //个人信息
            type: 'wgs84',
            publishData: {
                title: '', //标题
                share: '', //分享感受
                img_url: '', //分享照片
                location: '',
                openid: '', //发帖人openid
                tourist_id: '' //主题id
            },
            imgFile: [],
            imgFilename: [],
            sharepicLimit: 8,
            isClick: false,
            publishing:'发表',
            nopublish:true




        }
    },
    ready() {
        this.publishData.tourist_id = getArgs.getArgsFromUrl('tid'); //主题id
        var persondata = window.localStorage.getItem('personInfo')
        this.Info = JSON.parse(persondata)
    },
    methods: {
        // getLocation(point){
        //         var geoc = new BMap.Geocoder();
        //         var that = this;
        //         geoc.getLocation(point, function(rs){
        //             var addComp = rs.addressComponents;
        //             // var addr = document.getElementById('addr');
        //             that.publishData.location = ''+addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
                
        //         }); 
        //     },
        //     map(){
        //         var that = this;
                
        //     },
        dingwei() {
            var that = this;
            // var map = new BMap.Map("allmap");  // 创建Map实例
            //     var point = new BMap.Point(116.331398,39.897445); // 初始化地图,设置中心点坐标和地图级别
            //     map.centerAndZoom(point,12);
                
                 
            //     var geolocation = new BMap.Geolocation();
            //     geolocation.getCurrentPosition(function(r){
            //         if(this.getStatus() == BMAP_STATUS_SUCCESS){
            //             // 百度地图API功能
            //             map.centerAndZoom(r.point,12);
            //             var mk = new BMap.Marker(r.point);
            //             map.addOverlay(mk);
            //             map.panTo(r.point);
            //             //初始化显示地址
            //             that.getLocation(r.point);

            //         }else{
            //             alert('failed'+this.getStatus());
            //         }
            //     },{enableHighAccuracy: true})    

                //监听点击地图 重新显示地址
                // map.addEventListener("click", function(e){        
                //     var pt = e.point;
                //     that.getLocation(pt);      
                // });
            wxUtil.getAddress('wgs84', (res) => {
                console.log(res)
                //百度地图
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(res.longitude, res.latitude);

                var geoc = new BMap.Geocoder();
                geoc.getLocation(point, function(rs) {
                    var addComp = rs.addressComponents;
                    that.publishData.location = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street
                });
            //     //高德地图
            //     // var geocoder = {};
            //     // AMap.service('AMap.Geocoder',function(){
            //     //     console.log(1)
            //     //     geocoder = new AMap.Geocoder({});
            //     // })
            //     // console.log(2)
            //     // var lnglatXY=[res.longitude, res.latitude];//地图上所标点的坐标
            //     // geocoder.getAddress(lnglatXY, function(status, result) {
            //     //     if (status === 'complete' && result.info === 'OK') {
            //     //         console.log(result.regeocode.formattedAddress)
            //     //         that.publishData.location = result.regeocode.formattedAddress
            //     //     }else{
                        
            //     //     }
            //     // });
            })
        },
        delimg(img, index) {
            var that = this;
            var ab = index
            that.ImgData.splice(ab, 1)
            this.showadd = true;
        },
        enter(val) {
            var newicon = val
            this.publishData.share += newicon
        },
        inputc() {

            this.biaoqingmodel = false;

            if (this.ImgData.length > this.sharepicLimit) {
                // alert('最多选择9张图')
                this.$dispatch('loading', {text: '最多选择9张图', show: true, duration: 2000});
                return;
            }

            var files = this.$els.inputimg.files;
            if (files && files.length > 0) {
                this.$dispatch('loading', {
                    name: 'loading_img',
                    icon: true,
                    text: '加载中...',
                    show: true,
                    duration: 20 * 1000
                });
                this.loadFiles(files);
            }
        },
        loadFiles(files) {
            var that = this;
            var i = 1;
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
                            that.ImgData.push({
                                src: s,
                                file: f,
                                name: output_format,
                                style: {
                                    backgroundImage: "url(" + s + ")",
                                    backgroundSize: backgroundSizex + " " + backgroundSizey,
                                    backgroundPosition: backgroundPos,
                                    width: (window.innerWidth) / 3.2 + "px",
                                    height: (window.innerWidth) / 3.2 + "px",
                                },
                                width: w,
                                height: h,
                                has: true
                            });
                            console.log(that.ImgData)
                                //限制最多上传9张
                            if (that.ImgData.length > that.sharepicLimit) {
                                that.showadd = false;
                            }



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
            return new Blob([new Uint8Array(content)], {
                type: mimestring
            });
        },
        openPhotoSwipe(item) {
            var pswpElement = document.querySelectorAll('.pswp')[0];
            var items = [];
            if (item.width) {
                items.push({
                    src: item.src,
                    w: 640,
                    h: item.height * 640 / item.width
                });
            }
            if (items.length <= 0) return;
            var options = {
                index: 1,
                history: false,
                focus: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };

            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        },
        imgwh(ob) {
            ob.style = {};
            var that = this;
            var tImg = new Image;
            tImg.onload = function() {
                that.imgload(tImg, ob);
            };
            tImg.src = ob.src;
        },
        imgload(tImg, ob) {
            var that = this;
            var w = tImg.naturalWidth;
            var h = tImg.naturalHeight;
            ob.width = w;
            ob.height = h;
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
            ob.style = {
                backgroundImage: "url(" + ob.src + ")",
                backgroundSize: backgroundSizex + " " + backgroundSizey,
                backgroundPosition: backgroundPos
            };
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
                xhr.open("post", "upload", true);
                xhr.onload = function() {};
                xhr.send(form);
            } catch (e) {
                console.log(e);
            }
        },

        public(urls) {
            var that = this;
            this.publishData.img_url = urls || ''
            this.publishData.openid = this.Info.openid;
            that.$dispatch('loading', {name:'fabiao',text: '发表中', show: true, duration: 20*1000});
            api.addissue(this, this.publishData, (back) => {
                if (back.resCode == "000000") {
                    that.$dispatch('cancelloading', 'fabiao');
                    that.publishing = '发表';
                    that.nopublish = true;
                    //发帖成功
                    this.$route.router.go({
                        path: "/index"
                    });
                } else {
                    that.publishing = '发表';
                    that.nopublish = true;
                    this.isClick = false;
                    this.$dispatch('handle_server_error', back);
                }
            })
        },
        join() {
            if(this.publishData.share ==''){
                this.$dispatch('loading', {text: '请填写帖子内容', show: true, duration: 2000});
                return;
            }
            if (this.isClick) {
                return;
            }
            var that = this;
            that.nopublish = false;
            that.publishing = '发表中'
            
            that.isClick = true;
            var loadingob = {
                name: 'upload_img',
                icon: true,
                text: '正在上传文件...',
                show: true,
                duration: 360 * 1000
            };

            

            if (this.ImgData.length == '0') {
                that.$dispatch('loading', {name:'fabiao',text: '发表中', show: true, duration: 20*1000});
                this.publishData.openid = this.Info.openid;
                api.addissue(this, this.publishData, (back) => {
                    
                    if (back.resCode == "000000") {
                        that.$dispatch('cancelloading', 'fabiao');
                        that.publishing = '发表'
                        that.nopublish = true;
                        //发帖成功
                        this.$route.router.go({
                            path: "/index"
                        });

                    } else {
                        that.publishing = '发表'
                        that.nopublish = true;
                        that.isClick = false;
                        this.$dispatch('handle_server_error', back);
                    }
                })

            } else {
                this.$dispatch('loading', loadingob);
                var form = new FormData();
                // form.append('file', that.imgFile,that.imgFilename);
                for (var i = 0; i < this.ImgData.length; i++) {
                    form.append('file', this.ImgData[i].file, this.ImgData[i].name);
                }
                this.uploadimage(form, function(back) {
                    // that.publishing = '发表中';
                    if (back.code != '0') {
                        that.$dispatch('loading', {text: '上传失败', show: true, duration: 2000});
                    } else {
                        that.$dispatch('cancelloading', 'upload_img');
                        var urls = back.data;
                        that.public(urls);
                    }
                }, function(e) {
                    loadingob.text = "正在上传文件" + parseInt(e.loaded / e.total * 100, 10) + "%...";
                });
            }

        },


    }
}
</script>
<style scoped>
/* 必需 */

.expand-transition {
    transition: all .3s ease;
    /*height: 30px;*/
    /*padding: 10px;*/
    background-color: #fff;
    overflow: hidden;
}


/* .expand-enter 定义进入的开始状态 */


/* .expand-leave 定义离开的结束状态 */

.expand-enter,
.expand-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
}

.expand-leave {}
</style>
<style scoped>
</style>
