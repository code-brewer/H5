<template>
    <div class="view view-home" v-el:List>
        <section class=" select" :style="{'height':height+'px'}" v-el:eeee>
        <div class="sec-intro" style="height:100%;width:100%; overflow: hidden;">
        	<img class="text" :src="'images/1.png'">
            <img class="text" :src="'images/2.png'">
            <img class="text" :src="'images/3.png'">
            <img class="text" :src="'images/4.png'">
            <img class="text" :src="'images/5.png'">
            <img class="text" :src="'images/6.png'">
            <img class="text" :src="'images/7.png'">
            <img class="text" :src="'images/8.png'">
            <img class="text" :src="'images/9.png'">
            <img class="pic" :src="'images/home-1.jpg'">
            <img class="arrow-down" :src="'images/arrow-down.png'" @click="nextSec">
        </div>
            
            <!-- <span class="arrow-down"></span> -->
        </section>
        <section :style="{'height':height+'px'}">
        	<div class="sec-room">
	            <div class="room-content">
	                <div class="char-item" v-for="item in charList.a" :class="{'char-item-me': item.from=='self', 'char-item-you':  item.from=='other'}">
	                    <img :src="'images/avatar-me.png'" alt="avatar" class="avatar" v-if="item.from=='self'">
	                    <img :src="'images/avatar-father.png'" alt="avatar" class="avatar" v-if="item.from=='other'">
	                    <p class="text" v-if="item.text">{{item.text}}</p>
	                    <img :src="'images/'+item.gif" alt="" class="gif" v-if="item.gif">
	                    <a :href="item.link" target="_blank" class="link" v-if="item.link"><img :src="'images/wo-link.png'"></a>
	                </div>
	                
	            </div>
	            <div class="room-footer"></div>
	             <img class="arrow-down" :src="'images/arrow-down.png'" v-if="showDown1">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room">
	            <div class="room-content">
	                <div class="char-item" v-for="item in charList.b"   :class="{'char-item-me': item.from=='self', 'char-item-you':  item.from=='other'}">
	                    <img :src="'images/avatar-me.png'" alt="avatar" class="avatar" v-if="item.from=='self'">
	                    <img :src="'images/avatar-father.png'" alt="avatar" class="avatar" v-if="item.from=='other'">
	                    <p class="text" v-if="item.text">{{item.text}}</p>
	                    <img :src="'images/'+item.gif" alt="" class="gif" v-if="item.gif">
	                    <a :href="item.link" target="_blank" class="link" v-if="item.link"><img :src="'images/wo-link.png'"></a>
	                </div>
	                
	            </div>
	            <div class="room-footer"></div>
	             <img class="arrow-down" :src="'images/arrow-down.png'" v-if="showDown2">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room">
	            <div class="room-content">
	                <div class="char-item" v-for="item in charList.c"  :class="{'char-item-me': item.from=='self', 'char-item-you':  item.from=='other'}">
	                    <img :src="'images/avatar-me.png'" alt="avatar" class="avatar" v-if="item.from=='self'">
	                    <img :src="'images/avatar-father.png'" alt="avatar" class="avatar" v-if="item.from=='other'">
	                    <p class="text" v-if="item.text">{{item.text}}</p>
	                    <img :src="'images/'+item.gif" alt="" class="gif" v-if="item.gif">
	                    <a :href="item.link" target="_blank" class="link" v-if="item.link"><img :src="'images/wo-link.png'"></a>
	                </div>
	                <div class="finger-animate" v-show="showFinger" ><img :src="'images/gif.gif'" @click="openLink"></div>
	            </div>
	            <div class="room-footer"></div>
	        </div>
        </section>
    </div>
</template>
<script>
import api from '../api'
var charData = [{
    text: '父亲大人',
    from: 'self',
    audio: 'audio/1_1.0.mp3',
    duration: 2
}, {
    text: '没钱，找你妈要去',
    from: 'other',
    audio: 'audio/8_1.0.mp3',
    duration: 2
}, {
    text: '不是啊 ，你误会了',
    from: 'self',
    audio: 'audio/1_1.1.mp3',
    duration: 3
}, {
    text: '刚刚母亲大人打我电话，响一下就挂了，怎么回事？',
    from: 'self',
    audio: 'audio/1_1.2.mp3',
    duration: 4
}, {
    text: '哦。她刚刚去隔壁李阿姨家',
    from: 'other',
    audio: 'audio/8_1.1.mp3',
    duration: 2
}, {
    text: '回来就打你电话，现在在生气',
    from: 'other',
    audio: 'audio/8_1.2.mp3',
    duration: 3
}, {
    gif: 'gif-1.jpg',
    from: 'self',
    duration: 1
}, {
    text: '你表现的时候到了',
    from: 'self',
    audio: 'audio/1_1.3.mp3',
    duration: 3
}, {
    text: '你等着',
    from: 'other',
    audio: 'audio/8_1.3.mp3',
    duration: 1
}, {
		text: '出来，小兔崽子',
		from: 'other',
		audio: 'audio/8_1.4.mp3',
		duration: 2
	},
	{
		gif: 'gif-3.jpg',
		from: 'self',
		duration: 1
	},
	{
		text: '亲爱的老爸，息怒息怒，有话好好说',
		from: 'self',
		audio: 'audio/1_1.4.mp3',
		duration: 4
	},
	{
		text: '你说，你那铃声是怎么回事',
		from: 'other',
		audio: 'audio/8_1.5.mp3',
		duration: 3
	},
	{
		text: '你母亲刚去李阿姨家，听到李阿姨打电话给她女儿的铃声是她喜欢的那首歌',
		from: 'other',
		audio: 'audio/8_1.6.mp3',
		duration: 8
	},
	{
		text: '回来就打你电话了，听到你的铃声她不喜欢，现在生气了，你看着办吧',
		from: 'other',
		audio: 'audio/8_1.7.mp3',
		duration: 7
	},
	{
		gif: 'gif-2.jpg',
		from: 'self',
		duration: 1
	},
	{
		text: '别这样嘛，说好要相亲相爱的一家人呢',
		from: 'self',
		audio: 'audio/1_1.5.mp3',
		duration: 5
	},
	{
		text: '这个得看你怎么哄你妈了',
		from: 'other',
		audio: 'audio/8_1.8.mp3',
		duration: 4
	},
	{
		text: '你得帮我啊，我不想断水断粮',
		from: 'self',
		audio: 'audio/1_1.6.mp3',
		duration: 3
	},
	{
		text: '你自己看着办吧',
		from: 'other',
		audio: 'audio/8_1.9.mp3',
		duration: 2
	},
	{
		link: 'music.jsp',
		from: 'other',
		duration: 2
	}]
export default {
    data() {
            return {
                secIntro: true,
                secRoom: false,
                height:0,
                charList: {
                	a:[],
                	b:[],
                	c:[]
                },
                charCurrIndex: 0,
                sectionIndex:0,
                showFinger: false,
                item:[9,15,21],
                showDown1: false,
                showDown2: false,
            }
        },
        created() {
            // 加载所有音频
            for (var i = 0; i < charData.length; i++) {
                var item = charData[i]
                if (item.audio) {
                    this.loadSound(item.audio)
                }
            };

            this.addChannel('index.jsp')

        },
        ready() {
            // document.querySelector('.view-home').addEventListener('touchstart', function(e) {
            //         console.log(e)
            //     })
            this.init();
            // this.height = window.screen.height;
            this.height = window.innerHeight;
           
            
        },
        watch: {
            secRoom(val) {
                if (val) {
                    this.playChar()
                }
            },
            sectionIndex(v){
            	if(v!=0){
            		setTimeout(()=>{
					this.clearCharTimer();
            	    this.charTimer()

            		},2000)
            	}
            }
        },


        methods: {
        	getSectionIndex(){
        		for(var i=0;i<  document.getElementsByTagName("section").length;i++){
        			var cc = document.getElementsByTagName("section")[i].getAttribute("class");
        			 if(cc && cc.indexOf("select")!=-1){
        			 	  this.$set("sectionIndex",i)
        			 	  // this.sectionIndex = i;
        			 	  if(i!=1) 
        			 	  	this.charCurrIndex = this.item[i-2];
        // 			 	  if(i!=0){
			     //        		setTimeout(()=>{
								// this.clearCharTimer();
			     //        	    this.charTimer()
			     //        		},2000)
			     //        	}
			     		
        			 }
        		}
        	},
            init() {
                var item = document.querySelectorAll('section');
                console.log(item);
                var that = this;
                for (var i = 0; i < item.length; i++) {
                    console.log(item[i]);
                    //注册上滑事件
                    Rhui.mobile.swipeUp(item[i],
                        function(event) {
                        	console.log(event)
                            var $el = event.currentTarget,
                                top = $el.previousElementSibling,
                                bottom = $el.nextElementSibling;
                            if (bottom) {
                                $el.setAttribute('class', 'top');
                                bottom.setAttribute('class', 'select');
                            }
                           that.getSectionIndex();
                        });
                    //注册下滑事件
                    // Rhui.mobile.swipeDown(item[i],
                    //     function(event) {
                    //         var $el = event.currentTarget,
                    //             top = $el.previousElementSibling,
                    //             bottom = $el.nextElementSibling;
                    //         if (top) {
                    //             $el.setAttribute('class', '');
                    //             top.setAttribute('class', 'select');
                    //         }
                    //          that.getSectionIndex();
                    //     });
                }
            },
            nextSec() {
                this.secIntro = false
                this.secRoom = true
            },

            playChar() {
                this.timer_id = this.charTimer()
            },
            charTimer() {
                var item = charData[this.charCurrIndex]
                if (item.audio) {
                    this.playSound(item.audio)
                }
                if(this.sectionIndex==1)
                {
                	this.charList.a.push(item)
                } 
                else if(this.sectionIndex==2)
                {
                	this.charList.b.push(item)
                }
                else{
                	this.charList.c.push(item)
                }
                this.charCurrIndex++;
                if (this.charCurrIndex >= this.item[this.sectionIndex-1]) {
                    this.clearCharTimer()
                    return;
                }
                if(this.charCurrIndex==20){
                	 setTimeout(function() {
                    this.showFinger = true
                }.bind(this), 3000)

                }
                if(this.charCurrIndex>=0){
                	this.showDown1 = true;
                }
                if(this.charCurrIndex>=9){
                	this.showDown2 = true;
                	this.showDown1 = false;
                }
                this.timer_id = setTimeout(function() {
                    this.charTimer()
                }.bind(this), item.duration * 1300)

            },

            clearCharTimer() {
                clearTimeout(this.timer_id)
            },

            loadSound(source) {
                var instance = createjs.Sound.registerSound(source);
                console.log(instance)
            },
            playSound(source) {
                createjs.Sound.play(source);
            },

            openLink() {
            	
                window.open('music.jsp');
            },
            addChannel(name, type) {
                var obj = {
                    aid: 9,
                    type: 'signin'
                }
                if (type) {
                    obj.type = 'button'
                    obj.button_name = name;
                } else {
                    obj.source = source
                }

                api.addChannelLog(this, obj);
            },

        }
}
</script>
<style lang="sass">
.top {
    transform: translate(0, -100%)!important;
    -webkit-transform: translate(0, -100%)!important;
}

.select {
    transform: translate(0, 0)!important;
    -webkit-transform: translate(0, 0)!important;
    z-index: 10;
}
.finger-animate{
	width: 80%;
    text-align: right;
}
.finger-animate img{
	width: 60%;
	margin-top: -45px;
}

</style>
