<template>
    <div class="wap-turntable">
        <div class="pointer" @click="start"></div>
        <div class="circle-table" :style="{transform: 'rotate('+(+currRotate)+'deg)'}">
            <div class="prize-place-item" v-for="item in list">{{item.title}}</div>
        </div>
    </div>
</template>
<style src="./style.scss" lang="scss"></style>
<script>
import dom from '../../utils/dom.js'

export default {
    props: {
        state: {
            type: String,
            default: ''
        },

        // 奖品列表
        prizes: {
            type: Array,
            require: true,
            default: [{
                title: '一等奖'
            }, {
                title: '二等奖'
            }, {
                title: '三等奖'
            }]
        },
        
        // 奖项id
        pid: {
            require: true,
            type: String,
            default: null
        }
    },
    data() {
        return {
            animateId: '',
            // 是否开始
            isStarted: false,
            // 当前角度
            currRotate: 0,
            // 速度
            speed: 1,
            // 圈数
            turns: 5,
            // 当前圈数
            currTurns: 0,

            
        }
    },
    computed: {
        // 奖项列表
        list() {

            var newList = [{
                title: '谢谢参与'
            },{
                title: '一等奖'
            }, {
                title: '谢谢参与'
            },{
                title: '二等奖'
            }, {
                title: '谢谢参与'
            }, {
                title: '三等奖'
            }];

            if(this.prizes.length) {
                newList[1] = this.prizes[0]
                newList[3] = this.prizes[1]
                newList[5] = this.prizes[2]
            }
            return newList;
        },
        // 奖品指针
        prizeIndex() {
            var index = 0;
            if(this.pid) {
                // 如果中奖通过pid找到奖项所在的指针位置
                for (var i = 0; i < this.list.length; i++) {
                    if(this.pid == this.list[i].pid) {
                        index = i;
                        break;
                    }
                };
                
            }
            else {
                index = 0;
            }
            return index;
        }
    },
    methods: {
        start() {
            if (this.isStarted) {
                return;
            }

            // 阻止抽奖
            if(this.state=='disabled') {
                this.$dispatch('loading', {text: '你今天没有抽奖机会啦', icon: false, duration: 1500, name: 'nochance'});
                return;
            }

            this.isStarted = true;

            this.state = 'started'

            this.rolling()
        },

        rolling() {
            this.currRotate += this.speed;
            if (this.currRotate >= 360) {
                this.currRotate = 0;

                this.currTurns++;
            }

      
        	this.speed += 0.03;
        	if(this.speed>10) {
        		this.speed = 10;
        	}
            
            console.log(this.prizeIndex)
            // 圈数结束
            if (this.currTurns > this.turns) {
                this.end();
                return;
            }

            // 开始判断是否有奖品 并指向
            else if(this.currTurns > (this.turns-1)) {
            	var endDeg = 360 - (this.prizeIndex * 60) + 30;
                if(this.prizeIndex==0) {
                    endDeg = 30;
                }
            	if(this.currRotate>=endDeg) {
                    this.isStarted = false;
                    this.end();
            		return;
            	}
            	
            }


            if(this.currTurns > (this.turns-2)) {
            	this.speed -= 0.1;
            	if(this.speed<.5) {
            		this.speed = .5;
            	}
            }

            this.animateId = dom.requestAnimationFrame(this.rolling)
        },

        end() {
        	dom.cancelAnimationFrame(this.animateId);

            this.isStarted = false;

            this.currTurns = 0;

            this.state = 'end'
        }
    }
}
</script>
