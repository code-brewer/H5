<template>
    <div class="group_address">
        <div><img v-if="!isAddress" :src="'images/groupShop/home.png'" alt="">
            <img v-else :src="'images/groupShop/home2.png'">
        </div>
        <div class="addAddress" v-show="isAddress">
            <div class="carlistDetail" v-for="list in addresslist" @touchstart="touchstart" @touchmove.prevent="touchmove($event,list)" @touchend="touchend($event,list)" :style="{transform: 'translate('+list.x+'px, 0)'}">
                <div class="addresslist">
                    <input id="radio{{$index+1}}" type="radio" name="cantuan" value="{{$index+1}}" checked="{{list.status === 1}}">
                    <label for="radio{{$index+1}}" @click="updateAddress(list)"><span><span ></span></span>
                    </label>
                    <span style="padding: 20px;font-size: 24px;" v-if="list.status === 1">默认地址</span>
                    <p>{{list.name}} </p>
                    <p>{{list.mobile}}</p>
                    <p>{{list.province}}{{list.city}}{{list.area}}</p>
                    <span @click="getupdateAddress(list)" style="padding: 0px 10px 0 0;"><a>{{list.tab == 1 ? '公司':'家庭'}}</a><img :src="'images/groupShop/bianji.png'" ></span>
                    <p>{{list.address}}</p>
                </div>
                <div class="delete" @click="addressDeleteActivity(list)">删除</div>
            </div>
        </div>
        <a @click="this.$router.replace({path: '/groupAddressDetails'})" class="btn">新增收货地址</a>
    </div>
</template>
<script>
import api from '../../api/index1.js'
import modal from '../../components/Modal.vue'
export default {
    components: {
        modal
    },
    data() {
        return {
            fixed: false, //计划和规则tab置顶
            isAddress: false, //是否有地址
            addresslist: {}, //收货地址
            optionlist: '',
            list: '',
            id: '',
            startX: '',
            endX: '',
            width: 100,
            lists: [],
            okShow: false, //确认删除弹窗
            groupOrderId: '',
        }
    },
    created() {
        // this.$dispatch('loading');
        document.title = '收货地址';
        this.getaddressFindActivity();
        this.groupOrderId = window.sessionStorage.getItem('groupOrderId');

    },
    ready() {
        window.onscroll = this.scroll;
    },
    beforeDestroy() {
        window.onscroll = null;
    },
    watch: {},
    methods: {
        /*
        滑动置顶
        */
        scroll() {
            var top = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            if (top >= 120) {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
        },
        /*
            获取地址
        */
        getaddressFindActivity() {
            var that = this;
            api.addressFindActivity(this, {}, back => {
                if (back.object == '') {
                    this.isAddress = false;
                } else {
                    this.isAddress = true;
                }
                if (back.success == 1) {
                    // this.addresslist = back.object;
                    that.addresslist = back.object.map((value) => {
                        value['x'] = value['transform'] = '';
                        return value;
                    })
                }
            })
        },
        /*
        修改地址
        */
        getupdateAddress(list) {
            this.$router.replace({
                path: '/groupAddressDetails/' + list.id
            });
            window.localStorage.setItem('addresslist', window.JSON.stringify(list));
        },
        /*
        删除地址
        */
        addressDeleteActivity(list) {
            api.addressDeleteActivity(this, {
                addressId: list.id
            }, back => {
                this.getaddressFindActivity();
            });
        },


        /*
        侧滑
        */
        touchstart(e) {
            this.startX = e.changedTouches[0].clientX;
        },
        touchmove(e, list) {
            this.endX = e.changedTouches[0].clientX - this.startX;
            var move = list.transform + this.endX;

            // list.x = this.endX < 0 ? this.endX <= -this.width ? -this.width : this.endX : move < 0 ? move : 0;
            // list.x = (this.endX < 0) ? (this.endX <= -this.width) ? (-this.width) : this.endX : (move < 0) ? move : 0;
            //修改为

            if (this.endX < 0) {
                if (this.endX <= (-this.width)) {
                    list.x = (-this.width)
                } else {
                    list.x = this.endX
                }
            } else {
                if (move < 0) {
                    list.x = move
                } else {
                    list.x = 0
                }
            }
        },
        touchend(e, list) {
            // list.transform = list.x = this.endX < 0 ? list.x = this.endX > -(this.width / 2) ? 0 : -this.width : this.endX < (this.width / 2) ? -this.width : 0;
            //修改为
            if (Math.abs(this.endX) > 50) {
                if (this.endX < 0) {
                    list.transform = list.x = this.endX > -(this.width / 2) ? 0 : -this.width
                } else {
                    list.transform = list.x = this.endX < (this.width / 2) ? -this.width : 0
                }
            }
        },
        /*
        设置默认地址
        */
        updateAddress(list) {
            this.optionlist = list;
            this.optionlist.status = 1;
            api.addressUpdateActivity(this, this.optionlist, back => {
                if (back.success == 1) {
                    this.getaddressFindActivity()
                }
            });
            if (this.groupOrderId) {
                this.$router.go({
                    path: '/groupMain/groupOrder/' + this.groupOrderId
                });
                window.sessionStorage.removeItem("groupOrderId");
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.group_address {
    background: #E2E2E2;
    min-height: 1070px;
}

.btn {
    bottom: 0px;
    width: 100%;
    position: fixed;
    display: block;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: white;
    font-size: 30px;
    background: #FD292A;
}

.delete {
    position: absolute;
    width: 100px;
    height: 100%;
    top: 0;
    left: 100%;
    background: #f70505;
    font-size: 36px;
    line-height: 160px;
    padding: 0px 0px 0px 14px;
    color: #000;
}

.carlistDetail {
    width: 100%;
    height: 160px;
    color: #969696;
    background-color: #fff;
    border-radius: 15px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 10px;
}

.addresslist {
    width: 100%;
    height: 100%;
    p {
        // width: 450px;
        font-size: 20px;
        padding: 10px 0px 0;
        line-height: 26px;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0px 0px 0px 60px;
        width: 300px;
    }
    span {
        float: right;
    }
    a {
        border: 1px solid;
        border-radius: 25px;
        line-height: 48px;
        padding: 5px 5px 5px 14px;
        text-align: center;
        margin-right: 5px;
        background: #FFFC00;
        box-shadow: -1px 3px 2px #999 inset;
    }
    input[type=radio]:not(old) {
        opacity: 0;
        float: left;
    }
    input[type=radio]:not(old) + label {
        display: inline-block;
        margin: 10px 16px 0px 20px;
        line-height: 1.5em;
        float: left;
        position: relative;
    }
    input[type=radio]:not(old) + label > span {
        display: inline-block;
        width: 26px;
        height: 26px;
        border: 1px solid rgb(192, 192, 192);
        background: url(../../images/groupShop/2.png);
        vertical-align: bottom;
    }
    input[type=radio]:not(old):checked + label > span > span {
        display: block;
        width: 28px;
        height: 28px;
        margin: 3px;
        border-radius: 5px;
        background: url(../../images/groupShop/1.png);
    }
}

.addAddress {
    padding: 20px 0px 56px;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 20px;
    background: #E2E2E2;
    z-index: 4;
    min-height: 795px;
}

.deleteShow {
    background: #fff;
    height: 200px;
    border-radius: 10px;
    p {
        font-size: 36px;
        color: red;
        text-align: center;
        line-height: 80px;
    }
}

.deleteOk {
    position: relative;
    display: inline-table;
    margin: 16px 80px;
    text-align: center;
    color: white;
    font-size: 36px;
    border-radius: 10px;
    box-shadow: 0px 2px 5px #888888;
    background: #2E6CAF;
    width: 120px;
    height: 72px;
    line-height: 72px;
}
</style>
