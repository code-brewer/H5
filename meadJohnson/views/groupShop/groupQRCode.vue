<template>
    <div class="group_QRCode">
        <div class="head">
            <p>发现TA</p>
            <p class="p1">一起团购吧</p>
        </div>
        <div class="con">
            <img :src="imgSrc"></div>
        <div class="foot">
            <p class="p2">长按二维码，关注花贝妈妈公众号！</p>
        </div>
    </div>
</template>
<script>
import api from '../../api/index1.js'

export default {
    components: {},
    created() {
        document.title = '推荐好友';
        // if (this.$route.params.openid) {
        //     this.getActCardQrcode();
        // };
        this.detailGroupActivity();
        // this.getSign()
    },
    data() {
        return {
            isShare: false,
            isRule: false,
            imgSrc: 'images/recommend-img5.png',
            grouplist:{},
        }
    },
    methods: {
        // /**
        //  * 获取个人信息
        //  */
        getActCardQrcode() {
            var self = this;
            api.actCardQrcode(this, {
                openid: this.grouplist.openid
            }, back => {
                if (back.resCode === '0') {
                    this.imgSrc = back.repBody.qrcodePath;
                }
            })
        },
        /*
        拼团详情
        */
        detailGroupActivity() {
            api.detailGroupActivity(this, {
                groupId: this.$route.params.id
            }, back => {
                this.grouplist = back.object.groupInfo;
                if (!this.grouplist.number) {
                        this.grouplist.number = 0;
                    }
                this.getSign();
                this.getActCardQrcode()
            })
        },
          /**
         * 分享 
         * @return {[type]} [description]
         */
        getSign() {
            this.$dispatch('updateShare', {
                title : '【还差'+(this.grouplist.totalNumber - this.grouplist.number)+'人】 我参加了花呗妈妈' + this.grouplist.totalNumber + '人团————' +this.grouplist.orName,
                sharehref: 'groupDetails/' + this.$route.params.id,
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.group_QRCode {
    background: #E2E2E2;
    height: 1137px;
     background: url(../../images/groupShop/qrc_bg.png) no-repeat !important;
}

.head {
    padding: 100px 150px 100px 200px;
    font-size: 30px;
    color: red;
    .p1 {
        padding: 50px 0 0 100px;
    }
}
.con{
	    text-align: center;
}
.foot{
	    text-align: center;
    /* padding: 19px 0 0 0; */
    margin-top: 100px;
    font-size: 26px;
}
.btnGroup{
    display: none
}
</style>
