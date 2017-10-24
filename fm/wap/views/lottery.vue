<template>
    <div class="top">
            <a href="javascript:;" class="top-back" v-link="{path:'/sign'}">&lt 返回首页</a>
            <a href="javascript:;" class="top-right" @click="share"></a>
    </div>
    <div class="lottery-wrap">
        <p class="text">今日你有<span class="orange">{{times}}</span>次抽奖机会</p>
        <div class="lottery">
            <ul class="clearfix">
                <li v-for="item in list" :class="item.cls" @click="lottery(item)" 
                :style="{'background-image': 'url('+item.img+')'} "
                >
                <a href="javascript:;" class="mask1" v-show="item.mask === 1"></a>
                 <!-- <a href="javascript:;" class="mask1" v-show="item.mask === 1" :style="{'background': 'url('+item.img+') 0 0 / 100% auto no-repeat'}"></a> -->
                </li>
            </ul>
        </div>
        <div class="lottery-text">
            <ul :style="{top: slide.top + 'px'}" class="userList">
                <li v-for="list in lucklist"><span class="orange">{{list.nickname}}</span>抽中<span class="orange">{{list.pname}}</span></li>
            </ul>
        </div>
        <rule :text="text" :ruledetail="ruledetail"></rule>
        <a href="javascript:;" class="gift"   @click="myprize"><img src="../images/gift-icon.png"></a>
        <!-- 签到成功 -->
        <is-sign-out :show.sync="isSignOut" :isopen="open"></is-sign-out>
        <lottery-modal :show.sync="lotteryModalShow" :type="type" :gift="gift" :ctime="ctime"></lottery-modal>
    </div>
</template>
<script>
import rule from '../components/rule.vue'
import isSignOut from '../components/noLogin.vue'
import lotteryModal from '../components/lottery/lotteryModal.vue'
import api from '../api/index.js'
import jQuery from 'jquery'
export default {
    components: {
        rule,
        isSignOut,
        lotteryModal
    },
    data() {
        return {
            weekdays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            signTipShow: false,
            isSignOut: false,
            type: 'success1',
            // gift: '奖品',
            lotteryModalShow: false,
            currDate: new Date().getTime(),
            list: [{
                cls: ['miss', 'miss1'],
                isClick:false,
                img:'http://huodong.10155.com/fm/'+ 'build/static/img/lottery-icon1.png'
            }, {
                cls: ['mi','prize1'],
                cnt: '3',
                isClick:false,
                mask: 1,
                img:''
            }, {
                cls: ['miss', 'miss2'],
                isMask: false,
                isClick:false,
                img:'http://huodong.10155.com/fm/' + 'build/static/img/lottery-icon2.png'
            }, {
                cls: ['mi','prize4'],
                cnt: '21',
                isClick:false,
                mask: 1,
                img:''
            }, {
                cls: ['lottery-btn'],
                isMask: false,
                isClick:true,
                img:'http://huodong.10155.com/fm/'+ 'build/static/img/lottery-btn.png'
            }, {
                cls: ['mi','prize2'],
                cnt: '7',
                isClick:false,
                mask: 1,
                img:''
            }, {
                cls: ['miss', 'miss3'],
                isMask: false,
                isClick:false,
                img:'http://huodong.10155.com/fm/' + 'build/static/img/lottery-icon3.png'
            }, {
                cls: ['mi','prize3'],
                cnt: '14',
                isClick:false,
                mask: 1,
                img:''
            }, {
                cls: ['miss', 'miss4'],
                isMask: false,
                isClick:false,
                img:'http://huodong.10155.com/fm/' + 'build/static/img/lottery-icon4.png'
            }],
            isLottery: false,
            text: '抽奖规则',
            times: '',
            lucklist: [],
            slide: {
                top: 0,
                time: '0',
                len: 1
            },
            gifts: {
            	"一等奖": {
            		name: '',
            		type: '1', //实物
            		id: 8
            	},
            	"二等奖": {
            		name: '',
            		type: '2', //虚物
            		id: 6
            	},
            	"三等奖": {
            		name: '',
            		type: '2', //虚物
            		id: 4
            	},
            	"四等奖": {
            		name: '',
            		type: '2', //虚物
            		id: 2
            	},
            	"谢谢参与!": {
            		name: '',
            		type: '', 
            		id: [1, 3, 7, 5][Math.floor(Math.random() * 4)]
            	}
            },
            gift:{},
            val:'',
            open:true,
            ruledetail:'',
            activityAllData:[],
            prizeData:[],
            lottertday:[],
            ctime:''
            // abc:[]
        }
    },
    ready() {
        var abc = [];
        abc = localStorage.getItem('prize_day')
        abc = abc.split(',')
        // console.log(abc)
        this.lottertday = abc;
        // console.log(this.lottertday)
        this.list[1].cnt = abc[0];
        this.list[5].cnt = abc[1];
        this.list[7].cnt = abc[2];
        this.list[3].cnt = abc[3];


        this.selectActivity();
        this.selectPrize();
        this.scroll();
        //解锁
        let cnt_arr = (window.localStorage.getItem('cnt_arr') || '').split(',');
        if (cnt_arr.length) {
        	cnt_arr.forEach(item => {
        		this.list.forEach(val => {
        			if (val.cnt === item) {
        				val.mask = 0;
        			}
        		})
        	})
        }
    },
    created() {
    	this.$dispatch('ChannelLog',{'type':'signin','usid':'1',source:'choujiang'})

        if(window.wofans){
        	this.lotterytimes();
        	this.getLucyList();
        }else {
        	this.times = 0;
        }
        
    },
    methods: {
        getLucyList() {
            api.getLucyList(this, {usid: 1}, back => {
                if (back.resCode === '0') {
                    this.lucklist = back.repBody
                }
            })
        },
        lotterytimes() {
            api.getMyLuckyCnt(this, {usid: 1}, back => {
                if (back.resCode === '0') {
                    if (back.repBody.code === '0') {
                        this.times = back.repBody.msg
                    }
                }
            })
        },
        lottery(item) {
        	if(item.isClick){
        		
        		if (!window.wofans) {
        			this.isSignOut = true;
        			return;
        		}
        		

        		if (this.times == '0') {
	                this.lotteryModalShow = true;
	                this.type = "empty"
	                return;
            	}

                this.$dispatch('ChannelLog',{"type":"button","button_name":"choujiang","usid":"1"})
            	
	            api.lottery(this, {usid: 1}, back => {
	                console.log(back)
	                if (back.resCode === '20001') {
	                    var id, pname = back.resMsg;
                        this.gift = this.gifts[pname];
                        this.animate(item)
                        this.lotterytimes();
	                } else if (back.resCode === '0') {
	                    
                        if (back.repBody.code == '20002') {
                            if(window.wofans){
                                this.isSignOut = true;
                                this.open = true;
                            }else{
                                this.isSignOut = true;
                                this.open = false;
                            }
                        }
                        
                        var id, pname = back.repBody[0].pname;
                        this.ctime  = back.repBody[0].ctime;
                        this.gift = this.gifts[pname];
                        this.animate(item)
                        this.lotterytimes();
	                }
	            })

        	}
            
        },
        animate(item) {
            if (item.cls.indexOf('lottery-btn') === -1 || this.isLottery) {
                return;
            }
            this.isLottery = true;
            let self = this,
                arr = [0, 1, 2, 5, 8, 7, 6, 3],
                before = 0,
                after = 0,
                num = 1,
                index = 1,
                timer = null,
                time = null,
                id = this.gift.id;

            function run() {
                timer = setTimeout(() => {
                    if (num === 5 && after === id) {
                        if (id % 2) {
                            self.lotteryModalShow = true;
                            self.type = 'error'
                        } else {
                            self.lotteryModalShow = true;
                            self.type = 'success' + self.gift.types;
                        }
                        clearTimeout(timer);
                        self.isLottery = false;
                        return false;
                    }
                    var before_arr = self.list[arr[before]].cls,
                        after_arr = self.list[arr[after]].cls;
                    if (before_arr.indexOf('active') > -1) {
                        before_arr.pop();
                    }
                    after_arr.push('active');
                    before = after;
                    after++;
                    if (after === 8) {
                        after = 0;
                        num++;
                    }
                    run();
                }, 500 / (num % 5 + 1));
            }
            run();
        },
        scroll() {
            var $slide = jQuery('.userList');

            $slide.animate({
                'margin-top': '-50px'
            }, 'slow', () => {
                $slide.children('li:first').appendTo($slide);
                $slide.css('margin-top', '0px');
                setTimeout(() => {
                    this.scroll();
                }, 2000);
            })
        },
        myprize(){
        	this.$dispatch('ChannelLog',{'type':'button','button_name':'myprize',"usid":"1"})
        	this.$router.go({path: '/list'})
	    },
        share(){
                this.$dispatch('model')
                // this.delStatus.showMsg = true;
        },
        selectActivity(){
            api.selectActivity(this,{},(back)=>{
                this.activityAllData = back.repBody[0]
                this.ruledetail = this.activityAllData.prizerule.split('\n');
                // this.ruledetail = this.activityAllData.signrule.split('\n');
            })
        },
        selectPrize(){
            var self = this;
            api.selectPrize(this,{},(back)=>{
                this.prizeData = back.repBody
                // this.gifts = back.repBody
                this.gifts = {}
                // console.log(self.lottertday)
                var json = {};
                self.lottertday.forEach((item, index) => {
                    json[item] = (index + 1) * 2
                })
                if(this.prizeData.length){
                    this.prizeData.forEach(item=>{
                        // console.log(item)
                            this.list.forEach(val=>{
                                if(val.cnt == item.unlock_day){
                                    // console.log(val)
                                    val.img = item.imgurl
                                }
                            })
                            //
                            this.gifts[item.pname] = {
                                name:item.pname,
                                unlock_day: item.unlock_day,
                                types:item.types,
                                // id: ({'3': 2, '7': 4, '14': 6, '21': 8})[item.unlock_day]
                                id: json[item.unlock_day]
                            }
                            this.gifts['谢谢参与!']= {
                                types: '', 
                                id: [1, 3, 7, 5][Math.floor(Math.random() * 4)]
                                
                            }

                            // console.log(this.gifts)

                        }
                    )
                }

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.top{
            width:100%;
            height:64px;
            background:rgba(0,0,0,.6);
            font-size:14px;
            color:#fff;
            line-height:64px;
            position:relative;
            padding-left:10px;
            box-sizing:border-box;
            a{
                font-size:30px;
                color:#fff;
            }
    }
    .top-right{
        width:40px;
        height:44px;
        background:url(../images/share.png) no-repeat;
        display:inline-block;
        // float:right;
        position:absolute;
        right:25px;
        top:8px;
    }
.lottery-wrap {
    padding-top: 370px;
    .lottery {
        width: 90%;
        min-height: 300px;
        margin: 20px auto;
        border: 20px solid #f4e600;
        border-radius: 10px;
        background: #8a2fa0;
        box-sizing: border-box;
        box-shadow: inset 0 0 5px #451750;
        ul {
            padding: 5px;
        }
        li {
            float: left;
            width: 31.332%;
            height: 175px;
            margin: 1%;
            // border: 10px solid transparent;
            border-radius: 5px;
            box-sizing: border-box;
            background: white;
            &.miss {
                background-color: #ffd3e5;
                background-repeat: no-repeat;
                background-position: center center;
            }
            &.miss1 {
                // background-image: url(../images/lottery-icon1.png);
            }
            &.miss2 {
                // background-image: url(../images/lottery-icon2.png);
            }
            &.miss3 {
                // background-image: url(../images/lottery-icon3.png);
            }
            &.miss4 {
                // background-image: url(../images/lottery-icon4.png);
            }
            &.active {
                border: 10px solid #68c7e6;
            }
            &.lottery-btn {
                background: url(../images/lottery-btn.png) center center / auto 100% no-repeat, repeating-linear-gradient(-45deg, transparent, transparent 5px, white 0, white 6px, white 0, transparent 11px);
                background-origin: border-box;
            }
            &.mi {
                background-color: #fff;
                background-repeat: no-repeat;
                background-position: center center;
                // background-size: 100% 100%;
            }
            &.prize1 {
                // background-image: url(../images/fourPrize.png) ;
            }
            &.prize2 {
                // background-image: url(../images/sevenPrize.png) ;
            }
            &.prize3 {
                // background-image: url(../images/fourteenPrize.png) ;
            }
            &.prize4 {
                // background-image: url(../images/twentyPrize.png) ;
            }

            .mask1 {
				width:100%;
				height:100%;
				display:block;
				z-index:1000;
				background:url(../images/key.png) no-repeat center center;
				background-color:rgba(0,0,0,.4);
            }

        }
         
    }
    .lottery-text {
        width: 60%;
        height: 50px;
        margin: 0 auto;
        border-radius: 30px;
        text-align: center;
        background: rgba(0, 0, 0, .6);
        position: relative;
        overflow: hidden;
        li {
            // position: absolute;
            // top: 0;
            // left: 25px;
            transition: top .4s;
            line-height: 50px;
            color: white;
            font-size: 26px;
            span:first-child {
                padding-right: 30px;
            }
        }
    }
    .gift {
        position: absolute;
        top: 75px;
        right: 20px;
        width: 88px;
        height: 88px;
    }
    .mask1 {
            	width:100%;
            	height:100%;
            	display:block;
				z-index:1000;
				background-color:rgba(255,255,255,.5);
				background-image:url(../images/key.png) no-repeat center center;
            }
}
</style>
