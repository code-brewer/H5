<template>
    <div class="header">
        <p>贴吧管理 >上下线管理 >查看详情</p>
    </div>
    <div class="view-body" style="overflow-y: scroll;height:460px;">
        <div class="headnew">
            <img :src="postdetail.openNameUrl" class="head-left">
            <div class="head-right">
                <p>{{postdetail.openName}}</p>
                <p class="date">{{postdetail.createTime}} <span> 浏览{{postdetail.browse}}</span></p>
            </div>
        </div>
        <div>
            <p style="font-size:18px;">
            <span v-if="postdetail.operationStatus =='2'" style="color:#ff7e00">【精华】</span>
            <span v-if="postdetail.operationStatus =='3'" style="color:#f81617">【置顶】</span>
            <span v-if="postdetail.title" style="font-weight: bold;">{{postdetail.title}}</span></p>
            <p style="line-height:50px;">{{{postdetail.share}}}</p>
            <div style="width:100%;">
                <!-- <div class="showImgs" style="width:100%;">
                    <div class="img-top" v-if="postdetail.showimages" style="width:100%;">
                        <div v-for="imag in postdetail.showimages" :style="imag.style" >
                        </div>
                    </div>
                </div> -->
                <!-- <img :src="img" v-for="img in postdetail.imgUrl" style="width:200px;height:200px;"> -->
                <div :style="{'background': 'url('+img+') 0 0 / 100% auto no-repeat'}" style="width:200px;height:200px;display:inline-block;margin-right:10px;" v-for="img in postdetail.imgUrl" v-if="postdetail.imgUrl.length!==0"></div>

            </div>
            <div  class="address">
                {{postdetail.location}}
            </div>
            <div style="text-align:center;">
                <a  class="btn color1" v-link="{path:'/postdetail'}" style="color:#fff;">返回</a>
            </div>
        </div>
    </div>
    <loading :show="isLoad"></loading>
</template>
<script>
import Datepicker from '../components/bootstrap/Datepicker.vue';
import api from '../api'
import Pager from '../components/Pager.vue'
import loading from '../components/Loading.vue'
import fileUpload from '../js/file-upload.vue'
import {
    router
} from '../index'
export default {
    components: {
        Datepicker,
        loading,
        'file-upload': fileUpload
    },
    data() {
        return {
            UploadStatus: { //双重确认
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
            format: ['yyyy-MM-dd'],
            lists: [], //信息列表,
            details: '',
            pageData: {
                page: '1',
                pagesize: '3'
            },
            pageConfig: {
                total: 0,
                curpage: 1,
                totalpage: 1
            },
            starttime: '', //开始时间
            endtime: '', //结束时间
            isLoad: false,
            //
            activityData: {
                smallimgurl: '',
                bigimgurl: ''

            },
            postdetail: {},
            //
            id: ''
        }
    },

    watch: {

    },

    ready() {
        this.id = this.$route.params.id
            // this.id = window.localStorage.getItem('first')
        this.getback()
    },

    methods: {
        show(message) {
            this.UploadStatus.msg = message;
            this.UploadStatus.showMsg = true;
        },
        getback() {
            api.getback(this, {
                id: this.id
            }, (back) => {

                this.postdetail = back.repBody
                this.postdetail.createTime = new Date(this.postdetail.createTime).format('yyyy-MM-dd HH:mm:ss');
                this.postdetail.imgUrl = this.postdetail.imgUrl && this.postdetail.imgUrl.split(';') || '';

                //  this.postdetail.showimages = [];
                // if (this.postdetail.imgUrl && this.postdetail.imgUrl.length > 0) {
                //     var len = this.postdetail.imgUrl.length;
                //     for (var j = 0; j < len; j++) {
                //         this.postdetail.showimages[j] = {
                //             src: this.postdetail.imgUrl[j],
                //             style: ''
                //         };
                //         this.imgwh(this.postdetail.showimages[j]);
                //     }
                // }
                console.log(this.postdetail)

            })
        },
        imgwh(ob) {
            var tImg = new Image(),
                that = this;
            tImg.onload = function() {
                var w = tImg.naturalWidth;
                var h = tImg.naturalHeight;
                ob.width = w;
                ob.height = h;
                var backgroundSizex = "100%";
                var backgroundSizey = "100%";
                var backgroundPos = "";
                if (w <= h) {
                    backgroundSizey = "auto";
                    var endh = h * this.h3width / w;
                    backgroundPos = "0 " + ((this.h3width - endh) / 2) + "px";
                } else {
                    backgroundSizex = "auto";
                    var endw = w * this.h3width / h;
                    backgroundPos = ((this.h3width - endw) / 2) + "px" + " 0";
                }
                ob.style = {
                    backgroundImage: "url(" + ob.src + ")",
                    backgroundSize: backgroundSizex + " " + backgroundSizey,
                    backgroundPosition: backgroundPos
                };

            };
            tImg.src = ob.src;
        }

    }
}
</script>
<style scoped>
.header {
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #B9B7B7;
    line-height: 60px;
    padding-left: 30px;
    box-sizing: border-box;
}

.header h1 {
    color: #ED6D03;
    line-height: 60px;
    margin-top: 0px;
    font-family: 'Microsoft YaHei';
    font-size: 20px;
    margin-left: 45px;
}

.head {
    font-family: 'Microsoft YaHei';
    font-size: 12px;
    width: 900px;
    height: 40px;
    line-height: 40px;
    margin: 56px 74px;
}

.head input {
    height: 25px;
    width: 200px;
}

.head select {
    width: 130px;
    height: 30px;
}

.data {
    margin: 56px 74px;
    height: 200px;
}

.footer {
    font-family: Microsoft YaHei;
    margin-left: 13px;
    margin-top: 182px;
    height: 177px;
    position: relative;
    font-size: 15px;
    font-weight: normal;
}

.check {
    margin-top: 5px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    border: 1px solid #F57303;
    position: absolute;
    background-color: #F57303;
    width: 90px;
    height: 30px;
    color: #fff;
    border-radius: 3px;
    margin-left: 10px;
    cursor: pointer;
}

.daochu {
    margin-top: 5px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    border: 1px solid #F57303;
    position: absolute;
    background-color: #F57303;
    width: 90px;
    height: 30px;
    color: #fff;
    border-radius: 3px;
    margin-left: 400px;
    cursor: pointer;
}

//
table {
    border-collapse: collapse;
    border-spacing: 0
}

td.first-child {
    color: #fff;
}

.User-detail-table {
    width: 900px;
    color: #000;
    font-size: 12px;
    font-family: '宋体';
}

tr {
    width: 140px;
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
    text-align: left;
}

td {
    width: 140px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    font-size: 12px;
    text-align: center;
}

a {
    color: #000;
}

.tabs {
    position: relative;
}

.tabs li {
    /*float: left;
    display: block;
    margin-top: -12px;*/
    float: left;
    display: block;
    margin-top: -27px;
    width: 224px;
    height: 54px;
    line-height: 54px;
    background-color: #f1c79f;
    border-left-top-radius: 5px;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;
    position: relative;
}

.tabs li.active {
    background-color: #f5b57e;
}

.tabs input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    left: 0;
}


/*.tabs label {
    padding: 20px 80px;
    border-radius: 8px 8px 0 0;
    font-size: 14px;
    font-family: '宋体';
    font-weight: normal;
    text-transform: uppercase;
    background: #F0C69E;
    cursor: pointer;
    position: relative;
    top: 4px;
    width: 220px;
    text-align: center;
    color: #000;
}*/


/*.tabs label:hover {
  background: #703688;
}*/

.tabs .tab-content {
    z-index: 2;
    display: none;
    overflow: hidden;
    width: 100%;
    font-size: 17px;
    line-height: 25px;
    position: absolute;
    top: 53px;
    left: 0;
}

.tabs [id^="tab"]:checked + label {
    background: #F5B57F;
    width: 220px;
    font-size: 14px;
    font-family: '宋体';
    text-align: center;
    color: #fff;
}

.tabs [id^="tab"]:checked ~ [id^="tab-content"] {
    width: 900px;
    margin-top: 1px;
    display: block;
}

.close {
    height: 30px;
    line-height: 30px;
    background-color: #faa354;
    position: relative;
}

.actiontong,
.nothx,
.juzhong {
    width: 73px;
    height: 28px;
    background-color: #f57303;
    border: 1px solid #e55c00;
    color: #fff;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    margin: 0 auto;
    border-radius: 3px;
    cursor: pointer;
    /*background: url(./images/btnBg.png);*/
}
</style>
