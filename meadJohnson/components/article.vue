<template>
    <div class="pageOne">
        <p>最新「{{options.title.join('')}}」内容目录</p>   
        <div class="caidanTop">
            <span>{{time}}</span> 
            <span>花贝妈妈</span>
        </div>
        <div style="text-align:center;margin-top:40px;">
            <h4 class="babaTex" v-for="title in options.title" track-by="$index">{{title}}</h4>
        </div>
        <div>
            <div style="padding: 0 40px 0 30px;">
                <p class="dian">下面的内容请随意点开:</p>
                <div class="listtex">
                   <p v-for="value in options.list" @click="jumpTo(value)">{{value.text}}</p>  
                </div>
            </div>
            <div>
                <img src="../images/lv.gif" style="margin:20px auto;width:39px;height:13px;">
            </div>

            <div class="pageCenter">
                <p>往期每篇文章都是花妈精心创作、整合的。</p>
                <p>欢迎伙伴们的转载。</p>
                <p>▼ 记得附上花妈的二维码就行！</p>
            </div>
            <div style="padding:0 30px;">
                <img src="../images/passageTwo.png" style="margin-top:25px;"/>
            </div>
        </div>
    </div> 
</template>
<script>
    import utils from '../utils/DateUtils'
    import api from '../api'
    export default {
        http: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        },
        props: {
            options: {
                type: Object
            }
        },
        data() {
            return {
                addData: {
                    org: '图文互动',
                    articleId: '',
                    des: '阅读'
                }
            }
        },
        methods: {
            jumpTo(value) {
                window.location.href = value.url;
                // this.addData.articleId = value.id;
                // api.add(this, this.addData, (back) => {
                //     if (back.resCode === "0") {
                //         window.location.href = value.url;
                //     }
                // })
            }
        },
        computed: {
            time() {
                return utils.formatDate(new Date(), 'yyyy-MM-dd')
            }
        }
    }
</script>
<style lang="scss" scoped>
.pageOne { padding-bottom:70px;padding:40px 30px;font-family:'新宋体'; }
.pageOne > p { font-size: 38px;line-height:60px;font-weight:bold; }
.babaTex {
    width: 80px;
    height: 80px;
    border-radius: 200px;
    background-color:#3eb3bd;
    line-height: 80px;
    text-align: center;
    display: inline-block;
    font-size: 34px;
    color: #fff;
}

.dian {
    font-size: 26px;
    color: #6f6767;
    line-height: 100px;
}

.listtex {
    margin-top: 30px;
}

.listtex p {
    padding-bottom: 20px;
    color: #5d7da4;
    font-size: 27px;
    display: block;
    line-height: 35px;
}

.listtex p:first-child:before {
    float: left;
    width: 70px;
    height: 47px;
    margin-top: -12px;
    background: url(../images/new.gif) no-repeat;
    color: #5d7da4;
    font-size: 27px;
    content: "";
    background-size: 100% 100%;
    margin-right:15px;
}

.new {
    width: 41px;
    height: 27px;
    background: url(../images/new.gif) no-repeat;
    display: inline-block;
    margin-right: 5px;
}

.pageCenter {
    margin-top: 30px;
}

.pageCenter p {
    font-size: 23px;
    color: #5e5656;
    line-height: 50px;
}

.caidanTop {
    font-size: 27px;
    line-height: 60px;
    font-family: '新宋体';
}

.caidanTop {
    > span {
        font-size: 27px;
        line-height: 60px;
        display: inline-block;
        &:first-child {
            color:#8d8d8d;margin-right:30px;
        }
        &:last-child {
            color:#6482a8;
        }
    }
}
</style>