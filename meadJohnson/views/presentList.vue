<template>
    <div class="giftList">
        <!-- <div id="scroll_div" class="fl">
            <div id="scroll_begin">
                <span class="pad_right">公告：春节放假通告：2017年1月18日-2月4日暂停发货，期间所有订单需延后至2017年2月5日后再分批发货。</span>
            </div>
            <div id="scroll_end"></div>
        </div> -->
        <div class="mes">
            <div>
                <span>我的贝壳币</span>
                <span class="coin" v-link="{path: '/myConchCoin'}">{{score}}个</span>
                <a v-link="{path: '/myOrder'}" class="myrecord">兑换记录</a>
            </div>
        </div>
        <div class="condition clearfix">
            <div v-for="(i, item) in conditions" @click="toggle(i)">
                <span :class="{up: selected[i]}">{{selectedText[i]}}</span>
                <ul v-show="selected[i]" transition="items">
                    <li v-for="value in item" @click="search(i, value)">{{value.name}}</li>
                </ul>
            </div>
        </div>
        <div class="lists">
            <ul class="clearfix">
                <li v-for="item in lists" v-link="{path: '/presentDetails/'+item.id}">
                    <img :src="item.picurl">
                    <p>{{item.name}}</p><span class="dazhe"><a href="">打卡{{item.signday*7}}天特权</a></span>
                    <p>{{item.price}}贝壳币</p>
                    <p>市场参考价：￥{{item.referenceprice}}</p>
                </li>
            </ul>
            <div v-show="!lists.length">暂无数据</div>
        </div>
        <!-- <div class="list">
			<ul class="clearfix">
				<li v-for="item in list1" v-link="{path: '/presentDetails/'+item.id}">
					<img :src="item.picurl">
					<p>{{item.name}}</p>
					<p>{{item.price}}贝壳币</p>
					<p>市场参考价：{{item.referenceprice}}</p>
				</li>
			</ul>
			<ul class="clearfix">
				<li v-for="item in list2" v-link="{path: '/presentDetails/'+item.id}">
					<img :src="item.picurl">
					<p>{{item.name}}</p>
					<p>{{item.price}}贝壳币</p>
					<p>市场参考价：{{item.referenceprice}}</p>
				</li>
			</ul>
		</div> -->
        <div class="mask" v-show="showMask"></div>
    </div>
</template>
<script>
import api from '../api/index1.js'

export default {
    data() {
            return {
                conditions: [
                    ['全部', '3000~4999', '5000~7999', '8000~9999', '10000~14999', '15000~19999', '20000~29999', '30000~100000', '100001~以上']
                ], //筛选条件
                selected: [false, false],
                selectedText: ['贝壳币范围', '全部分类'],
                score: '', //我的贝壳币
                options: {
                    pageNum: 1,
                    pageSize: 60,
                    beginScore: '', //开始贝壳币区间
                    endScore: '', //结束贝壳币区间
                    gifttype: ''
                },
                giftTypeList: '', //礼品类型列表
                list1: '',
                list2: '',
                lists: '', //礼品列表
                day: '' //打折天数特权
            }
        },
        created() {
            this.initData();
            this.getListPage();
            this.getPersonalInfo();
            this.getGiftTypeList();
        },
        ready() {
            //滚动通知
            // function ScrollImgLeft() {
            //     var speed = 20;
            //     var MyMar = null;
            //     var scroll_begin = document.getElementById("scroll_begin");
            //     var scroll_end = document.getElementById("scroll_end");
            //     var scroll_div = document.getElementById("scroll_div");
            //     scroll_end.innerHTML = scroll_begin.innerHTML;

            //     function Marquee() {
            //         if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
            //             scroll_div.scrollLeft -= scroll_begin.offsetWidth;
            //         else
            //             scroll_div.scrollLeft++;
            //     }
            //     MyMar = setInterval(Marquee, speed);
            //     scroll_div.onmouseover = function() {　　　　　　　
            //         clearInterval(MyMar);　　　　　
            //     }　　　　
            //     scroll_div.onmouseout = function() {　　　　　　　
            //         MyMar = setInterval(Marquee, speed);　　　　　　　　　
            //     }
            // }
            // ScrollImgLeft();
            // this.$dispatch('loading');
        },
        computed: {
            showMask() {
                return this.selected[0] || this.selected[1];
            }
        },
        methods: {
            /**
             * 初始化贝壳币范围数据
             */
            initData() {
                let data = [];
                this.conditions[0].forEach(value => {
                    let arr = value.split('~');
                    if (value === '全部') {
                        arr = ['', ''];
                    }
                    if (value.indexOf('以上') > -1) {
                        arr[1] = '';
                    }
                    data.push({
                        name: value,
                        num: arr
                    })
                })
                this.conditions[0] = data;
            },
            /**
             * 获取个人信息
             */
            getPersonalInfo() {
                api.getPersonalInfo(this, {}, (data) => {
                    if (data.resCode == "0") {
                        this.score = data.repBody.list[0].v_score;
                    }
                })
            },
            /**
             * 点击下拉筛选条件
             * @param  {number} index 
             *
             */
            toggle(index) {
                this.selected[1 - index] = false;
                this.selected.$set(index, !this.selected[index])
            },
            /**
             * 搜索
             * @param  {number} index 
             * @param  {string} item 选中的条件集合
             *
             */
            search(index, item) {
                this.selectedText.$set(index, item.name);
                if (!index) { //搜索贝壳币范围
                    this.options.beginScore = item.num[0];
                    this.options.endScore = item.num[1];
                } else { //搜索全部分类
                    this.options.gifttype = item.num;
                }
                this.getListPage();
            },
            /**
             * 获取礼品列表信息
             */
            getListPage() {
                api.listPage(this, this.options, back => {
                    // back.repBody.list.forEach(value => {
                    //                if(value.signday == 4){
                    //                	value.day = 30
                    //                }


                    this.lists = back.repBody.list || [];
                    this.list1 = this.lists.filter((value, index) => {
                        return index % 2 === 0;
                    })
                    this.list2 = this.lists.filter((value, index) => {
                        return index % 2 === 1;
                    })

                })
            },
            /**
             * 获取礼品类型下拉列表
             */
            getGiftTypeList() {
                api.giftTypeList(this, {}, back => {
                    if (back.resCode === '0') {
                        back.repBody.list.unshift({
                            name: '全部',
                            num: ''
                        });
                        this.conditions.$set('1', back.repBody.list);
                    }
                })
            }


        }
}
</script>
<style lang="scss" scoped>
@mixin rotate($rotate: 45deg) {
    -webkit-transform: rotate($rotate);
    -moz-transform: rotate($rotate);
    -o-transform: rotate($rotate);
    -ms-transform: rotate($rotate);
    transform: rotate($rotate);
}

@mixin boxsizing {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
}

@-webkit-keyframes bounceInUp {
    0% {
        -webkit-transform: translate3d(0, 25px, 0);
        transform: translate3d(0, 25px, 0)
    }
    100% {
        -webkit-transform: translate3d(0, -3000px, 0);
        transform: translate3d(0, -3000px, 0)
    }
}

@-webkit-keyframes bounceInDown {
    0%,
    100%,
    60%,
    75%,
    90% {
        -webkit-animation-timing-function: cubic-bezier(0.215, .61, .355, 1);
        animation-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -3000px, 0);
        transform: translate3d(0, -3000px, 0)
    }
    60% {
        opacity: 1;
        -webkit-transform: translate3d(0, 25px, 0);
        transform: translate3d(0, 25px, 0)
    }
    75% {
        -webkit-transform: translate3d(0, -10px, 0);
        transform: translate3d(0, -10px, 0)
    }
    90% {
        -webkit-transform: translate3d(0, 5px, 0);
        transform: translate3d(0, 5px, 0)
    }
    100% {
        -webkit-transform: none;
        transform: none
    }
}

@keyframes bounceInDown {
    0%,
    100%,
    60%,
    75%,
    90% {
        -webkit-animation-timing-function: cubic-bezier(0.215, .61, .355, 1);
        animation-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -3000px, 0);
        transform: translate3d(0, -3000px, 0)
    }
    60% {
        opacity: 1;
        -webkit-transform: translate3d(0, 25px, 0);
        transform: translate3d(0, 25px, 0)
    }
    75% {
        -webkit-transform: translate3d(0, -10px, 0);
        transform: translate3d(0, -10px, 0)
    }
    90% {
        -webkit-transform: translate3d(0, 5px, 0);
        transform: translate3d(0, 5px, 0)
    }
    100% {
        -webkit-transform: none;
        transform: none
    }
}

.giftList {
    position: relative;
    font-size: 28px;
    color: #666;
    .mes {
        position: fixed;
        // top: 80px;
        left: 0px;
        width: 100%;
        padding-bottom: 20px;
        text-align: center;
        line-height: 50px;
        background: #f2f2f2;
        z-index: 9;
        div {
            position: relative;
            padding: 15px 20px;
            background: white;
        }
        span {
            &:first-child {
                position: absolute;
                top: 50%;
                left: 20px;
                margin-top: -25px;
            }
        }
        .coin {
            position: relative;
            display: inline-block;
            height: 50px;
            padding: 0 50px 0 60px;
            color: #43a4ae;
            border-right: 1px solid #cdcdcd;
            background: url(../images/giftList-img1.png) left center no-repeat;
            &:after {
                content: '';
                position: absolute;
                top: 50%;
                right: 20px;
                width: 15px;
                height: 15px;
                border: solid #5f5f60;
                margin-top: -8px;
                border-width: 3px 3px 0 0;
                // @include transition(translate(0, -50%));
                @include rotate;
            }
        }
        .myrecord {
            position: absolute;
            top: 50%;
            right: 20px;
            margin-top: -25px;
            padding-left: 60px;
            font-size: 28px;
            color: #333;
            background: url(../images/giftList-img2.png) left center no-repeat;
        }
    }
    .condition {
        position: relative;
        padding: 10px 0;
        line-height: 50px;
        border-bottom: 1px solid #cbcbcb;
        text-align: center;
        background: white;
        z-index: 4;
        // top: 180px;
        top: 100px;
        > div {
            float: left;
            width: 50%;
            @include boxsizing;
            &:first-child {
                border-right: 1px solid #cbcbcb;
            }
            span {
                position: relative;
                padding-right: 40px;
                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    width: 15px;
                    height: 15px;
                    border: solid #5f5f60;
                    margin-top: -14px;
                    border-width: 0 3px 3px 0;
                    @include rotate;
                }
                &.up:after {
                    margin-top: -4px;
                    border-width: 3px 0 0 3px;
                }
            }
        }
        ul {
            position: absolute;
            top: 71px;
            left: 0;
            width: 90%;
            padding: 0 5%;
            background: white;
            z-index: 3;
            li {
                line-height: 70px;
                text-align: left;
                border-bottom: 1px solid #cbcbcb;
                &:last-child {
                    border: 0;
                }
            }
        }
        .items-transition {
            -webkit-animation: none;
            animation: none;
        }
        .items-enter {
            -webkit-animation: bounceInDown .5s;
            animation: bounceInDown .5s;
        }
        .items-leave {
            // -webkit-animation: none;
            // animation: none;
            -webkit-animation: bounceInUp .5s ease-in;
            animation: bounceInUp .5s ease-in;
        }
    }
    .lists {
        padding: 40px;
        background: white;
        position: relative;
        top: 100px;
        > div {
            padding: 30px 0;
            font-size: 28px;
            text-align: center;
        }
        li {
            float: left;
            width: 48%;
            margin-bottom: 4%;
            padding: 20px;
            border-radius: 8px;
            @include boxsizing;
            -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
            -moz-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
            -o-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
            -ms-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
            box-shadow: 0 0 20px rgba(0, 0, 0, .5);
            &:nth-child(odd) {
                margin-right: 4%;
            }
            img {
                display: block;
                max-width: 172px;
                height: 147px;
                margin: 0 auto 15px;
            }
            p {
                font-size: 20px;
                padding: 2px 0;
                line-height: 26px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin: 5px auto;
                &:nth-child(3) {
                    color: #ffa158;
                }
                &:nth-child(4) {
                    color: #959595;
                }
            }
        }
    }
    // .list {
    //     padding: 40px;
    //     background: white;
    //     ul {
    //         float: left;
    //         width: 48%;
    //         &:first-child {
    //             margin-right: 4%;
    //         }
    //         li {
    //             width: 100%;
    //             margin-bottom: 8%;
    //             padding: 20px;
    //             border-radius: 8px;
    //             @include boxsizing;
    //             -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
    //             -moz-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
    //             -o-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
    //             -ms-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
    //             box-shadow: 0 0 20px rgba(0, 0, 0, .5);
    //         }
    //         img {
    //             display: block;
    //             margin: 0 auto 15px;
    //         }
    //         p {
    //             font-size: 20px;
    //             padding: 2px 0;
    //             line-height: 26px;
    //             text-overflow: ellipsis;
    //             overflow: hidden;
    //             white-space: nowrap;
    //             &:nth-child(3) {
    //                 color: #ffa158;
    //             }
    //             &:nth-child(4) {
    //                 color: #959595;
    //             }
    //         }
    //     }
    // }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }
}

.gonggao {
    height: 80px;
    line-height: 80px;
    background: #43A4AE;
    font-size: 22px;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 999;
}

.dazhe {
        float: right;
    height: 33px;
    line-height: 21px;
    width: 116px;
    margin: 0px -15px;
    background: url(../images/dzbq.png) no-repeat left 50%;
    a {
        font-size: 15px;
    margin: 0px 22px;
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#F7CB8F), to(#FEDE0D));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}

// .pad_right {
//     padding-right: 2em;
// }

// #scroll_div {
//     height: 80px;
//     overflow: hidden;
//     white-space: nowrap;
//     width: 100%;
//     font-size: 26px;
//     line-height: 80px;
//     background: #43A4AE;
//  color: #fff;
//  position: fixed;
//     top: 0;
//     z-index: 9;
// }

// #scroll_begin,
// #scroll_end {
//     display: inline;
// }
</style>
</style>
