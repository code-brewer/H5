<template>
    <!-- 顶部导航栏 -->
    <header class="heading">
        <div class="title"><span class="ddd">丨</span>后台管理系统</div>
        <ul class="topRight">
            <li class="">
                <a href="javascript:;" style="text-decoration:none;color:#000">用户名:{{username}}</a>
            </li>
            <!-- <li class="">
                <a href="javascript:;" style="color:#000;">设置</a>
            </li> -->
            <li class="">
                <a href="javascript:;" @click="logout()" style="color:#000;">退出</a>
            </li>
        </ul>
    </header>
    <!-- 主区域 -->
    <div id="page-container" class="clearfix">
        <nav id="page-leftbar">
            <div style="width: 17%;background-color:#efdf56;min-height:1000px;float:left">
                <div class="left_menu">
                    <!-- <li :class="{active: this.$route.path == list.url }" v-for="list in lists" class="listMenu" v-link="{path:list.url}" v-if="user_type == 1">
                        <i :style="{'background': 'url('+list.icon+') 15% 50% no-repeat'}" class="iconLeft"></i>
                        <a> {{list.name}}</a>
                    </li> -->
                    <div class="top" @click="menu(1)"><i class="i"></i>景区管理</div>
                    <div v-if="this.show1 === true">
                        <a style="display:block" class="menuList" href="javascript:location.reload();" @click="right(1)" :class="this.bg1?'bg':''"><i class="menu1"></i>新建景区</a>
                        <p class="menuList" @click="right(2)" :class="this.bg2?'bg':''"><i class="menu2"></i>上下线管理</p>
                    </div>
                    <!-- <div class="top" @click="menu(2)"><i class="i"></i>贴吧管理</div> -->
                    <!-- <div v-if="this.show2 === true">
                        <p class="menuList" @click="right(3)" :class="this.bg3?'bg':''"><i class="menu3"></i>审贴</p>
                      </div> -->
                </div>
            </div>
            <div class="right_pages">
                <div class="one" v-if="this.one === true">
                    <div class="header">
                        <span>景区管理 > 新建景点</span>
                    </div>
                    <div class="middle">
                        <p class="middle_list">古镇标题：
                            <input type="text" v-model="home.title" placeholder="请输入" style="font-size: 15px;padding: 10px 0;"><i class="star">*</i></p>
                        <p class="middle_list">古镇简介：
                            <input type="text" v-model="home.dec" placeholder="请输入" style="font-size: 15px;padding: 10px 0;"><i class="star">*</i></p>
                        <p class="middle_list">古镇宣传页：</p>
                        <div class='finish_room'>
                            <div class='finish_room1'>
                                <div style="border:none;width:120px" class='room_add_img1' v-if="home.small_imgurl != null || home.small_imgurl != '' || home.small_imgurl != undefined">
                                    <img :src="home.small_imgurl" width="120" height="100">
                                    <!-- <span @click='delete_img1(index)'><img :src="delete_img"></span> -->
                                    <input @change='add_img1' type="file">
                                </div>
                                <div class='room_add_img1' v-if="home.small_imgurl == null || home.small_imgurl == '' || home.small_imgurl == undefined">
                                    <span><img :src="add_img"></span>
                                    <span>上传小图</span>
                                    <input @change='add_img1' type="file">
                                </div>
                            </div>
                            <div class='finish_room2'>
                                <div style="border:none;width:180px;height:120px" class='room_add_img2' v-if="home.big_imgurl != null || '' || undefined">
                                    <img :src="home.big_imgurl" width="180" height="120">
                                    <input @change='add_img2' type="file">
                                    <!-- <span @click='delete_img2(index)'><img :src="delete_img"></span> -->
                                </div>
                                <div class='room_add_img2' v-if="home.big_imgurl == null || home.big_imgurl == '' || home.big_imgurl == undefined">
                                    <span><img :src="add_img"></span>
                                    <span>上传大图</span>
                                    <input @change='add_img2' type="file">
                                </div>
                                <i class="star">*</i>
                            </div>
                        </div>
                        <div style="margin-left:85px;color:#ddd">
                            <p>1.小图尺寸80px*80px，大小不超过100kb.</p>
                            <p>2.大图尺寸640px*400px，大小不超过200kb.</p>
                            <p>3.支持jpg .jpeg .png .gif格式照。</p>
                        </div>
                        <p class="middle_list">景区介绍：<i class="star">*</i></p>
                        <div class="bottom">
                            <textarea id="div1" :style="wangEditobj"></textarea>
                        </div>
                        <div class="bottom_btn">
                            <button @click="save()" type="button" name="button" style="background-color:#ffa030;color:#fff;margin-right:50px;width: 70px;height: 30px;">保存</button>
                            <button @click="save_online()" type="button" name="button" style="background-color:#1bcc30;color:#fff;margin-right:50px;width: 90px;height: 30px;">保存并上线</button>
                            <button @click="not()" type="button" name="button" style="background-color:#3aa0ff;color:#fff;margin-right:50px;width: 70px;height: 30px;">取消</button>
                        </div>
                    </div>
                </div>
                <div class="two" v-if="this.two === true">
                    <div class="header">
                        <span>景区管理 > 上下线管理</span>
                    </div>
                    <div class="middle" style="height:800px">
                        <input class="middle_list" v-model="two_title" placeholder="按标题搜索" style="height:20px" />
                        <button type="button" @click="search()" style="background-color:#ffa030;color:#fff;margin-left:30px;width: 70px;height: 33px;font-size:18px">搜索</button>
                        <div class="list" v-for="(index,item) in lists">
                            <div class="" style="width:27%;padding: 25px;">
                                <img :src="item.bigImgurl" alt="bigImgurl" width="200" height="135">
                            </div>
                            <div class="" style="display:flex;flex-direction:column;width:50%">
                                <h2>{{item.title}}</h2>
                                <p>{{item.introduction.substring(0,20)}}</p>
                                <p>{{item.updateTime}}</p>
                            </div>
                            <div class="" style="display:flex;flex-direction:column;width:23%">
                                <p><a style="padding-right: 10px;" href="javascript:;" @click="stick(item)">审贴 |</a><a href="javascript:location.reload();" @click="editor_go(item)">编辑 |</a><a href="javascript:;" class="aa" @click="delete_id(item)">删除</a><a style="padding-right:10px" href="javascript:;" @click="online(item)">|{{lists[$index].status == 1?'上线':'下线'}}</a></p>
                                <div class="" style="display:flex;flex-direction:row;margin-top: 50px;">
                                    <p style="padding-right: 10px;">
                                        <button @click="cope(item)" type="button" style="width: 73px;height: 50px;background-color: #7f7f7f;
    color: #fff;">复制URL</button>
                                    </p>
                                    <p>
                                        <button @click="code(item)" type="button" style="width:80px;height:50px;background-color: #7f7f7f;
    color: #fff;">浏览二维码</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom1" style="height: 30px;line-height: 30px;padding-top: 50px;margin-left: 90px;">
                        <a href="javascript:;" @click="gopage_up()" style="padding: 10px;font-size: 20px;">上页</a>
                        <input type="number" class="bbb" v-model="page_number"><a style="font-size: 20px;" href="javascript:;" @click="gopage()">跳转</a>
                        <a href="javascript:;" style="padding: 10px;font-size: 20px;">共{{allnum}}页</a>
                        <a href="javascript:;" @click="gopage_dowm()" style="padding: 10px;font-size: 20px;">下页</a>
                    </div>
                </div>
                <div class="three" v-if="this.three === true">
                    <div class="header">
                        <span>贴吧管理 > 审贴</span>
                    </div>
                    <div class="middle">
                        <p class="middle_list">
                            <span style="margin-right:10px">查看：</span>
                            <select v-model="select" style="width: 100px;height: 30px;" class="xla_k">
                                <option selected="selected" v-for="option in options" :value="option.value">{{option.value}}</option>
                            </select>
                            <!-- <i class="star">*</i> -->
                        </p>
                        <div style="margin-left:90px">
                            <table class="table">
                                <thead>
                                    <th class="height" style="width:130px">时间</th>
                                    <th class="height" style="width:180px">标题</th>
                                    <th class="height" style="width:210px">内容</th>
                                    <th class="height" style="width:230px">操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="item in menuLists">
                                        <td class="height td_color ac">{{item.createTime}}</td>
                                        <td class="height td_color ac">{{item.title}}</td>
                                        <td class="height td_color ac">{{item.share.substring(0,20)}}</td>
                                        <td class="height td_color ac">
                                            <button type="button" @click="look(item)" style="background-color:orange;padding:5px;width:40px">查看</button>
                                            <button type="button" @click="Stick(item)" v-if="menuLists[$index].operationStatus === 2 || menuLists[$index].operationStatus === 1" class="defall">置顶</button>
                                            <button type="button" v-if="menuLists[$index].operationStatus === 3 && this.noooo1 === true" class="back">置顶</button>
                                            <button type="button" @click="cream(item)" v-if="menuLists[$index].operationStatus === 3 || menuLists[$index].operationStatus === 1" class="defall">精华</button>
                                            <button type="button" v-if="menuLists[$index].operationStatus === 2 && this.noooo === false" class="back">精华</button>
                                            <button type="button" @click="deleteB(item)" style="background-color:red;padding:5px;width:40px">删除</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="bottom1" style="height: 30px;line-height: 30px;padding-top: 50px;margin-left: 90px;">
                        <a href="javascript:;" @click="gopage_up1()" style="padding: 10px;font-size: 20px;">上页</a>
                        <input type="number" class="bbb" v-model="page_number1"><a style="font-size: 20px;" href="javascript:;" @click="gopage1()">跳转</a>
                        <a href="javascript:;" style="padding: 10px;font-size: 20px;">共{{allnum1}}页</a>
                        <a href="javascript:;" @click="gopage_dowm1()" style="padding: 10px;font-size: 20px;">下页</a>
                    </div>
                </div>
                <div class="three" v-if="this.four === true">
                    <div class="header">
                        <span>贴吧管理 > 上下线管理 >查看详情</span>
                    </div>
                    <div class="middle" style="padding:50px">
                        <div class="" style="background-color:#fff;padding:30px">
                            <div class="detail_top" style="display:flex;flex-direction:row;width:100%">
                                <div class="ac" style="width:10%;height:60px">
                                    <img :src="detail.openNameUrl" alt="" style="width: 50px;height: 50px;border-radius: 20px">
                                </div>
                                <div class="" style="width:90%;display:flex;flex-direction:column;">
                                    <p style="margin:0">{{detail.openName}}</p>
                                    <p style="margin:0;color:#ddd;margin-top:8px">{{detail.createTime}} <span>浏览{{detail.browse}}</span></p>
                                </div>
                            </div>
                            <div class="" style="width:100%;padding-left:15px">
                                <p>{{detail.title}}</p>
                                <div class="">
                                    {{detail.share}}
                                </div>
                                <div class="" style="width:100%;display:flex;flex-direction:row;margin-top:30px">
                                    <div class=""><img :src="detail.imgUrl" style="margin-left:10px;width:200px;height:150px"></div>
                                </div>
                                <p><img :src="place_logo" style="width:30px;height:40px;vertical-align:middle">
                                    <span style="vertical-align:middle">{{detail.location}}</span>
                                </p>
                            </div>
                            <div class="ac" style="width:100%">
                                <button @click="this.four = false,this.three = true" type="button" style="background-color:#ffa030;width:100px;height:35px">返回</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shade" v-show="this.shade === true">
                <!--这里市遮罩层 -->
            </div>
            <div class="modal" v-show="this.modal3 === true" style="width:500px;height:300px;border-radius:5px;background-color:#fff;position:fixed;top:20%;left:27%;z-index:99;">
                <div class="modal_top" style="height:210px">
                    <div class="ac" id="m_url" style="width: 70%;margin: 0 auto;padding-top: 100px;">
                        <h1>确认删除？</h1>
                    </div>
                    <div id="qrcode"></div>
                    <div class="gore">
                        <!-- 倒三角-->
                    </div>
                </div>
                <div class="modal_bottom" style="background-color:#15caae;height:90px;height: 90px;padding: 30px;">
                    <div style="margin-left:90px">
                        <button type="button" class="btn" data-clipboard-action="copy" data-clipboard-target="#foo" @click="deeee(item)" style="background-color:orange;width:100px;height:40px;margin-right:50px">确定</button>
                        <button type="button" @click="this.modal3 = false,this.shade = false" style="background-color:#b1b1b1;width:100px;height:40px">取消</button>
                    </div>
                </div>
                <div class="close1" @click="this.modal3 = false,this.shade = false">×</div>
            </div>
            <div class="modal" v-show="this.modal2 === true" style="width:500px;height:300px;border-radius:5px;background-color:#fff;position:fixed;top:20%;left:27%;z-index:99;">
                <div class="modal_top" style="height:210px">
                    <div class="ac" id="m_url" style="width: 70%;margin: 0 auto;padding-top: 100px;">
                        <h1>确认删除？</h1>
                    </div>
                    <div id="qrcode"></div>
                    <div class="gore">
                        <!-- 倒三角-->
                    </div>
                </div>
                <div class="modal_bottom" style="background-color:#15caae;height:90px;height: 90px;padding: 30px;">
                    <div style="margin-left:90px">
                        <button type="button" class="btn" data-clipboard-action="copy" data-clipboard-target="#foo" @click="del(item)" style="background-color:orange;width:100px;height:40px;margin-right:50px">确定</button>
                        <button type="button" @click="this.modal2 = false,this.shade = false" style="background-color:#b1b1b1;width:100px;height:40px">取消</button>
                    </div>
                </div>
                <div class="close1" @click="this.modal2 = false,this.shade = false">×</div>
            </div>
            <div class="modal" v-show="this.modal1 === true" style="width:500px;height:300px;border-radius:5px;background-color:#fff;position:fixed;top:20%;left:27%;z-index:99;">
                <div class="modal_top" style="height:210px">
                    <div class="ac" id="m_url" v-if="this.show_one === true" style="width: 70%;margin: 0 auto;padding-top: 100px;">
                        <input type="text" id="foo" class="inp" v-model="modal.url" style="font-size:30px">
                    </div>
                    <div class="ac" v-if="this.show_two === true" style="width: 50%;margin: 0 auto;padding-top: 50px;">
                        <img :src="'http://s.jiathis.com/qrcode.php?url='+modal.code" width="120" height="120">
                        <div id="qrcode"></div>
                    </div>
                    <div class="gore">
                        <!-- 倒三角-->
                    </div>
                </div>
                <div class="modal_bottom" style="background-color:#15caae;height:90px;height: 90px;padding: 30px;">
                    <div class="ac" v-if="this.show_two === true">
                        <button type="button" @click="this.modal1 = false,this.shade = false" style="background-color:orange;width:100px;height:40px">完成</button>
                    </div>
                    <div class="" v-if="this.show_one === true" style="margin-left:90px">
                        <button type="button" class="btn" data-clipboard-action="copy" data-clipboard-target="#foo" @click="cope1(item)" style="background-color:orange;width:100px;height:40px;margin-right:50px">复制</button>
                        <button type="button" @click="this.modal1 = false,this.shade = false" style="background-color:#b1b1b1;width:100px;height:40px">取消</button>
                    </div>
                </div>
                <div class="close1" @click="this.modal1 = false,this.shade = false">×</div>
            </div>
    </div>
    </nav>
    <!-- <div id="page-content" class="clearfix">
            <router-view></router-view>
        </div> -->
    </div>
</template>
<script>
import AccordionMenu from '../components/bootstrap/AccordionMenu.vue'
import Modal from '../components/bootstrap/Modal.vue'
import Dropdown from '../components/bootstrap/Dropdown.vue'
import $ from 'jquery'
// import '../css/wangEditor.css'
import {
    router
} from '../index'
import api from '../api'

export default {
    components: {
        AccordionMenu,
        Modal,
        Dropdown
    },
    watch: {
        'select': function(val, oldVal) {
            if (val === '置顶') {
                this.condition = 3
            } else if (val === '精华') {
                this.condition = 2
            } else {
                this.condition = 1
            }
            console.log('new: %s, old: %s', val, oldVal);
            api.issue(this, {
                'pagenum': 1,
                'pagesize': 5,
                'status': this.condition
            }, (back) => {
                if (back.resCode === '000000') {
                    this.menuLists = back.repBody;
                    this.allnum1 = back.resPage.pageCount
                }
            })
        },
    },
    data() {
        return {
            noooo: false,
            noooo1: true,
            condition: '',
            options: [{
                value: '精华'
            }, {
                value: '置顶'
            }, {
                value: '全部'
            }],
            select: '',
            place_logo: 'http://img36.photophoto.cn/20150801/0007020006745382_s.jpg',
            detail: {
                createTime: '',
                essenceTime: '',
                id: '',
                imgUrl: '',
                location: '',
                openName: '',
                browse: '',
                openNameUrl: '',
                openid: '',
                operationStatus: '',
                share: '',
                title: '',
                topTime: '',
                updateTime: ''
            },
            // imgs:[
            //   {moreimg:'http://img5.imgtn.bdimg.com/it/u=17466364,2905790047&fm=23&gp=0.jpg'},
            //   {moreimg:'http://img4.imgtn.bdimg.com/it/u=1968041425,2101449513&fm=23&gp=0.jpg'},
            //   {moreimg:'http://file28.mafengwo.net/M00/7B/51/wKgB6lTF91aAS0h6AAIfJdUa3L437.jpeg'},
            //   {moreimg:'http://file28.mafengwo.net/M00/7B/51/wKgB6lTF91aAS0h6AAIfJdUa3L437.jpeg'},
            // ],
            modal: {
                url: '',
                code: ''
            },
            show_one: false,
            show_two: false,
            nowpage: 1,
            allnum: '',
            page_number: 1,
            nowpage1: 1,
            allnum1: '',
            page_number1: 1,
            home: {
                title: '',
                dec: '',
                big_imgurl: '',
                small_imgurl: '',
                text: ''
            },
            wangEditobj: {
                height: '200px',
                maxheight: '500px'
            },
            modal1: false,
            modal2: false,
            modal3: false,
            shade: false,
            lists: [],
            menuLists: [],
            go_down: '',
            two_title: '',
            one: false,
            two: false,
            three: false,
            four: false,
            delete_img: './images/delete.png',
            add_img: './images/add_img.png',
            show1: false,
            show2: false,
            bg1: false,
            bg2: false,
            bg3: false,
            currSubmenus: [],

            progress: false,
            minHeight: null,

            userInfo: null,

            alertModal: {
                show: false,
                title: '提示',
                msg: '',
                btnText: '确定'
            },
            confirmModal: {
                show: false,
                title: '提示',
                msg: '',
                btnText: '确定',
                fn() {}
            },
            username: '',
            userData: {},
            personData: [],
            user_type: ''

        }
    },
    // created: function () {
    //   this.editor();
    // },
    ready() {
        let uname = localStorage.getItem('username');
        this.username = uname;
        this.two = false;
        this.three = false;
        this.one = true; //default
        this.four = false;
        this.show1 = true;
        this.bg1 = true;
        this.bg2 = false;
        console.log('small_imgurl', this.home.small_imgurl);
        console.log(this.home.big_imgurl);
        this.editor();
        // this.qcode();
        let ho = sessionStorage.getItem('de');
        console.log(ho);
        if (ho) {
            this.home = JSON.parse(ho);
            console.log(this.home);
        }


    },
    route: {
        data: function(transition) {
            this.checkLogin();
        }
    },
    router(transition) {

        //登录成功后加入登录的标识
        // sessionStorage.setItem('isLogin',true);

        router.beforeEach((transition) => {
            if (this.checkLogin()) {
                transition.next()
            }

        })

        router.afterEach(function(transition) {
            that.leftMenuActive = transition.to.path;

            for (var i = 0; i < that.leftMenus.length; i++) {
                if (that.leftMenuActive.indexOf(that.leftMenus[i].url) > -1) {
                    that.currSubmenus = that.leftMenus[i].submenus;
                }
            };
        });
    },
    methods: {
        detailssss(item) {
            // let item = sessionStorage.getItem('look');
            // console.log();
            api.getback(this, {
                'id': item.id
            }, (back) => {
                if (back.resCode === '000000') {
                    this.detail = back.repBody;
                }
            })
        },
        deleteB(t) {
            console.log(t);
            let t1 = JSON.stringify(t);
            sessionStorage.setItem('t', t1);
            this.shade = true;
            this.modal3 = true;
            console.log('t', t1);
        },
        deeee() {
            let _this = this;
            let t1 = JSON.parse(sessionStorage.getItem('t'));
            let index = _this.menuLists.indexOf(t1);

            api.update(_this, {
                'id': t1.id,
                'tourist_id': t1.touristId,
                'operation_status': -1
            }, (back) => {
                if (back.resCode === '000000') {
                    console.log('删除成功！')
                    _this.menuLists.splice(index, 1);
                    _this.shade = false;
                    _this.modal3 = false;
                }
            })
        },
        cream(i) {
            console.log('i', i);
            api.update(this, {
                'id': i.id,
                'tourist_id': i.touristId,
                'operation_status': 2
            }, (back) => {
                if (back.resCode === '000000') {
                    console.log('精华成功！');
                    let aaa = this.menuLists.indexOf(i);
                    console.log('aaa', aaa);
                    this.menuLists[aaa].operationStatus = 2;
                    this.noooo = false;
                    this.noooo1 = true;
                    console.log(this.menuLists[aaa].operationStatus);
                }
            })
        },
        Stick(y) {
            console.log('y', y);
            api.update(this, {
                'id': y.id,
                'tourist_id': y.touristId,
                'operation_status': 3
            }, (back) => {
                if (back.resCode === '000000') {
                    console.log('置顶成功！');
                    let aaa = this.menuLists.indexOf(y);
                    console.log('aaa', aaa);
                    this.menuLists[aaa].operationStatus = 3;
                    this.noooo = false;
                    this.noooo1 = true;
                    console.log(this.menuLists[aaa].operationStatus);
                }
            })
        },
        look(item) {
            sessionStorage.setItem('look', item);
            console.log(item);
            this.three = false;
            this.four = true;
            this.detailssss(item);
        },
        save() {
            let a = sessionStorage.getItem('a');
            this.home.text = a;
            api.home_add(this, {
                'status': 3,
                'admin_id': 1,
                'scenic': this.home.text,
                'small_imgurl': this.home.small_imgurl,
                'big_imgurl': this.home.big_imgurl,
                'introduction': this.home.dec,
                'title': this.home.title,
            }, (back) => {
                if (back.resCode === '000000') {
                    alert('保存成功！')
                }
            })
        },
        save_online() {
            api.home_add(this, {
                'status': 3,
                'admin_id': 1,
                'scenic': this.home.text,
                'small_imgurl': this.home.small_imgurl,
                'big_imgurl': this.home.big_imgurl,
                'introduction': this.home.dec,
                'title': this.home.title,
            }, (back) => {
                if (back.resCode === '000000') {
                    api.home_add(this, {
                        'status': 1,
                        'admin_id': 1,
                        'scenic': this.home.text,
                        'small_imgurl': this.home.small_imgurl,
                        'big_imgurl': this.home.big_imgurl,
                        'introduction': this.home.dec,
                        'title': this.home.title,
                    }, (back) => {
                        if (back.resCode === '000000') {
                            alert('保存并上线成功！')
                        }
                    })
                }
            })
        },
        not() {
            this.home = '';
        },
        cope1(item) {
            require(['../js/clipboard.min.js'], function(Clipboard) {
                var clipboard = new Clipboard('.btn');
                clipboard.on('success', function(e) {
                    console.log('success');
                })
            });
        },
        code(item) {
            console.log(item);
            this.shade = true;
            this.modal1 = true;
            this.show_two = true;
            this.show_one = false;
            this.modal.code = item.qrcodeUrl;
            // console.log(this.modal.code);
        },
        cope(item) {
            console.log(item);
            this.shade = true;
            this.modal1 = true;
            this.show_one = true;
            this.show_two = false;
            this.modal.url = item.qrcodeUrl;
        },
        stick(item) {
            console.log('item:', item);
            this.one = false;
            this.two = false;
            this.three = true;
        },
        editor() {
            require(['../js/wangEditor.js'], function(wangEditor) {
                var editor = new wangEditor('div1');
                editor.config.menus = [
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    'eraser',
                    'forecolor',
                    'bgcolor',
                    '|',
                    'quote',
                    'fontfamily',
                    'fontsize',
                    'head',
                    'unorderlist',
                    'orderlist',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    '|',
                    'img',
                    '|',
                    'undo',
                    'redo',
                    'fullscreen'
                ];
                editor.config.uploadImgUrl = 'wangEditorH5File';
                // 设置 headers（举例）
                // editor.config.uploadHeaders = {
                //      'Accept' : '*/*'
                //  };
                editor.create();
                editor.onchange = function() {
                    // this.home.text = editor.$txt.html();
                    var a = editor.$txt.html();
                    console.log('a:', a);
                    sessionStorage.setItem('a', a)
                }
            })
        },
        gopage() {
            var _this = this;
            // key = _this.nowpage;
            api.search(_this, {
                'pagenum': _this.page_number,
                'pagesize': 3,
                'title': _this.two_title
            }, (back) => {
                if (back.resCode === '000000') {
                    _this.lists = back.repBody;
                    _this.page_number = back.resPage.pagenum;
                    _this.allnum = back.resPage.pageCount;
                }
            })
        },
        gopage1() {
            var _this = this;
            // key = _this.nowpage;
            api.issue(_this, {
                'pagenum': _this.page_number1,
                'pagesize': 5,
                'status': _this.condition
            }, (back) => {
                if (back.resCode === '000000') {
                    _this.menuLists = back.repBody;
                    _this.page_number1 = back.resPage.pagenum;
                    _this.allnum1 = back.resPage.pageCount;
                    // 哈哈哈1
                }
            })
        },
        gopage_up() {
            var _this = this;
            _this.nowpage -= 1;
            if (_this.nowpage <= 1) {
                _this.nowpage = 1;
                api.search(_this, {
                    'pagenum': 1,
                    'pagesize': 3,
                    'title': _this.two_title
                }, (back) => {
                    if (back.resCode === '000000') {
                        _this.lists = back.repBody;
                        _this.page_number = back.resPage.pagenum;
                    }
                })
            } else {
                api.search(_this, {
                    'pagenum': _this.nowpage,
                    'title': _this.two_title
                }, (back) => {
                    if (back.resCode === '000000') {
                        _this.lists = back.repBody;
                        _this.page_number = back.resPage.pagenum;
                    }
                })
            }
        },
        gopage_up1() {
            var _this = this;
            _this.nowpage1 -= 1;
            if (_this.nowpage1 <= 1) {
                _this.nowpage1 = 1;
                api.issue(_this, {
                    'pagenum': 1,
                    'pagesize': 5,
                    'status': _this.condition
                }, (back) => {
                    if (back.resCode === '000000') {
                        _this.menuLists = back.repBody;
                        _this.page_number1 = back.resPage.pagenum;
                    }
                })
            } else {
                api.issue(_this, {
                    'pagenum': _this.nowpage1,
                    'pagesize': 5,
                    'status': _this.condition
                }, (back) => {
                    if (back.resCode === '000000') {
                        _this.menuLists = back.repBody;
                        _this.page_number1 = back.resPage.pagenum;
                    }
                })
            }
        },
        gopage_dowm() {
            var _this = this;
            _this.nowpage += 1;
            if (_this.nowpage >= _this.allnum) {
                _this.page_number = _this.allnum;
                _this.nowpage = _this.allnum;
                api.search(_this, {
                    'pagenum': _this.allnum,
                    'pagesize': 3,
                    'title': _this.two_title
                }, (back) => {
                    if (back.resCode === '000000') {
                        _this.lists = back.repBody;
                    }
                })
            } else {
                api.search(_this, {
                    'pagenum': _this.nowpage,
                    'pagesize': 3,
                    'title': _this.two_title
                }, (back) => {
                    if (back.resCode === '000000') {
                        _this.lists = back.repBody;
                        _this.page_number = back.resPage.pagenum;
                    }
                })
            }
        },
        gopage_dowm1() {
            var _this = this;
            _this.nowpage1 += 1;
            if (_this.nowpage1 >= _this.allnum1) {
                _this.page_number1 = _this.allnum1;
                _this.nowpage1 = _this.allnum1;
                api.issue(_this, {
                    'pagenum': _this.allnum1,
                    'pagesize': 5,
                    'status': _this.condition
                }, (back) => {
                    if (back.resCode === '000000') {
                        _this.menuLists = back.repBody;
                    }
                })
            } else {
                api.issue(_this, {
                    'pagenum': _this.nowpage1,
                    'pagesize': 5,
                    'status': _this.condition
                }, (back) => {
                    if (back.resCode === '000000') {
                        _this.menuLists = back.repBody;
                        _this.page_number1 = back.resPage.pagenum;
                    }
                })
            }
        },
        editor_go(item) {
            console.log(item);
            this.show1 = true;
            this.bg1 = true;
            this.bg2 = false;
            let de = {
                title: item.title,
                dec: item.introduction,
                big_imgurl: item.bigImgurl,
                small_imgurl: item.smallImgurl,
                text: item.title,
            };
            let home = JSON.stringify(de);
            sessionStorage.setItem('de', home);
            let i = sessionStorage.getItem('de');
            if (i != '') {
                window.location.reload();
            }
        },

        delete_id(item) {
            console.log(item);
            let item1 = JSON.stringify(item);
            sessionStorage.setItem('lists', item1);
            this.shade = true;
            this.modal2 = true;
        },
        del() {
            let _this = this;
            let item = JSON.parse(sessionStorage.getItem('lists'));
            let id = item.id;
            let index = _this.lists.indexOf(item);
            // 哈哈哈
            api.domore(_this, {
                'id': id,
                'status': 2
            }, (back) => {
                if (back.resCode === '000000') {
                    _this.lists.splice(index, 1);
                    this.shade = false;
                    this.modal2 = false;
                }
            })
        },
        online(item) {
            var _this = this;
            console.log('item:', item)
            var id = item.id;
            if (item.status === 1) {
                api.domore(_this, {
                    'id': id,
                    'status': 4
                }, (back) => {
                    if (back.resCode === '000000') {
                        let bbb = _this.lists.indexOf(item);
                        console.log(bbb);
                        _this.lists[bbb].status = 4;
                        // _this.search();
                    }
                })
            } else {
                api.domore(_this, {
                    'id': id,
                    'status': 1
                }, (back) => {
                    if (back.resCode === '000000') {
                        let bbb = _this.lists.indexOf(item);
                        console.log(bbb);
                        _this.lists[bbb].status = 1;
                        // _this.search();
                    }
                })
            }
        },
        search() {
            var _this = this;
            api.search(_this, {
                'pagenum': 1,
                'pagesize': 3,
                'title': _this.two_title
            }, (back) => {
                if (back.resCode === '000000') {
                    _this.lists = back.repBody;
                    _this.allnum = back.resPage.pageCount;
                    _this.nowpage = back.resPage.pagenum;
                    // let a = back.repBody[0].status;
                    console.log(back.repBody.status);
                    // let index = _this.lists.indexOf(item);
                    //   if(a === 1){
                    //     // 哈哈哈
                    //   _this.go_down =  '上线';
                    // }else if (a === 4) {
                    //   _this.go_down =  '下线';
                    // }
                    console.log(back.resPage)
                }
            })
        },
        delete_img1(item) {
            this.home.small_imgurl = null;
        },
        delete_img2(item) {
            this.home.big_imgurl = null;
        },
        add_img1(event) {
            let reader = new FileReader();
            let img1 = event.target.files[0];
            let that = this;
            console.log('img1:', img1);
            reader.onload = function(e) {
                console.log(e);
                that.$set('home.small_imgurl', e.target.result);
            };
            reader.readAsDataURL(img1);
            var form = new FormData();
            form.append('file', img1, img1.name);
            that.uploadimage(form, function(back) {
                if (back.code != '0') {
                    that.$dispatch('handle_server_error', back);
                } else {
                    var urls = back.data;
                    that.$set('home.small_imgurl', urls);
                    console.log('urls:', urls);
                    console.log('small_imgurl:', that.home.small_imgurl);
                    // .save(urls);
                }
            }, function(e) {});
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
        add_img2(event) {
            let reader = new FileReader();
            let img2 = event.target.files[0];
            let that = this;
            console.log('img2:', img2);
            reader.onload = function(e) {
                console.log(e)
                that.$set('home.big_imgurl', e.target.result);
            }
            reader.readAsDataURL(img2);
            var form = new FormData();
            form.append('file', img2, img2.name);
            that.uploadimage(form, function(back) {
                if (back.code != '0') {
                    that.$dispatch('handle_server_error', back);
                } else {
                    var urls = back.data;
                    that.$set('home.big_imgurl', urls);
                    console.log('urls:', urls);
                    console.log('big_imgurl:', that.home.big_imgurl);
                    // .save(urls);
                }
            }, function(e) {});
        },

        right(type) {
            if (type === 1) {
                this.bg1 = true;
                this.bg2 = false;
                this.bg3 = false;
                this.one = true;
                this.two = false;
                this.three = false;
                this.four = false;
            } else if (type === 2) {
                this.bg2 = true;
                this.bg1 = false;
                this.bg3 = false;
                this.one = false;
                this.two = true;
                this.three = false;
                this.four = false;
                this.search();
            } else if (type === 3) {
                this.bg3 = true;
                this.bg1 = false;
                this.bg2 = false;
                this.one = false;
                this.two = false;
                this.three = true;
                this.four = true;
            }
        },

        menu(num) {
            if (num === 1) {
                if (this.show1 === false) {
                    this.show1 = true;
                } else {
                    this.show1 = false;
                }
            } else if (num === 2) {
                if (this.show2 === false) {
                    this.show2 = true;
                } else {
                    this.show2 = false;
                }
            }
        },

        logout() {
            api.loginout(this, {}, (back) => {
                if (back.resCode === '000000') {
                    sessionStorage.removeItem('isLogin');
                    this.$route.router.go({
                        path: "/login"
                    });
                }
            })

        },

        getPathName() {
            var name = '';
            for (var i = 0; i < this.leftMenus.length; i++) {
                if (this.leftMenuActive.indexOf(this.leftMenus[i].url) > -1) {
                    name = this.leftMenus[i].name;
                }
            }
            return name;
        },
        checkLogin() {

            if (sessionStorage.getItem('isLogin')) {
                //登录了
            } else {
                //未登录
                this.$route.router.go({
                    path: "/login"
                });
            }
        }
    }
}

// function checkLogin() {
//     var login = true;
//     if (document.cookie.indexOf('admin_token') < 0 || !localStorage['ams_user_info']) {
//         location.href = basePath + 'login.jsp';
//         localStorage.removeItem('ams_user_info');
//     } else {
//         login = true;
//     }

//     return login;
// }
</script>
<style scoped>
input {
    border: 1px solid #ccc;
}

button {
    border: none;
    color: #fff
}

.defall {
    background-color: green;
    padding: 5px;
    width: 40px
}

.back {
    background-color: #ddd;
    padding: 5px;
    width: 40px
}

.accordion-transition {
    -webkit-transition: all .2s ease-in;
    -moz-transition: all .2s ease-in;
    -ms-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    transition: all .2s ease-in;
}

.accordion-enter,
.accordion-leave {
    opacity: 0;
    color: $brand-positive;
}

.progress-transition {
    -webkit-transition: opacity .8s ease-in-out;
    -moz-transition: opacity .8s ease-in-out;
    -ms-transition: opacity .8s ease-in-out;
    -o-transition: opacity .8s ease-in-out;
    transition: opacity .8s ease-in-out;
}

.progress-transition .bar {
    width: 75%;
    -webkit-animation-duration: .5s;
    -moz-animation-duration: .5s;
    -o-animation-duration: .5s;
    animation-duration: .5s;
}

.progress-enter {
    opacity: .6;
}

.progress-leave {
    opacity: 0;
}

.progress-enter .bar {
    width: 0;
}

.progress-leave .bar {
    width: 100%;
}

.view-transition {
    -webkit-transition: opacity .3s ease-in;
    -moz-transition: opacity .3s ease-in;
    -ms-transition: opacity .3s ease-in;
    -o-transition: opacity .3s ease-in;
    transition: opacity .3s ease-in;
}

.view-enter,
.view-leave {
    opacity: 0;
}

.view-leave {
    display: none;
}

.navbar-header span {
    line-height: 50px;
}

.heading {
    height: 80px;
    background-color: #15caae;
    padding: 0;
    line-height: 80px;
    position: relative;
}

.title {
    font-size: 26px;
    font-family: '黑体';
    color: #fff;
    padding-left: 110px;
    background: url(../images/116114logo.png) 18px 16px no-repeat;
    /*border-bottom: 1px solid #e3d5ba;*/
}

.left_menu {
    padding-top: 60px;
    color: #fff;
    font-size: 20px;
}

.star {
    color: red
}

.top {
    height: 50px;
    line-height: 50px;
    text-align: left;
    /*background-color: #ddd;*/
    padding-left: 30px;
}

.i {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fff;
    font-size: 0;
    line-height: 0;
    margin-bottom: 5px;
    margin-right: 10px;
}

.menu1 {
    display: inline-block;
    width: 22px;
    height: 22px;
    vertical-align: middle;
    background: url(../images/menu1.png) no-repeat;
    background-position: left;
}

.menu2 {
    display: inline-block;
    width: 22px;
    height: 22px;
    vertical-align: middle;
    background: url(../images/menu2.png) no-repeat;
    background-position: left;
}

.menu3 {
    display: inline-block;
    width: 22px;
    height: 22px;
    vertical-align: middle;
    background: url(../images/menu3.png) no-repeat;
    background-position: left;
}

.right_pages {
    float: left;
    width: 83%;
}

.header {
    height: 60px;
    line-height: 60px;
    padding-left: 50px;
    border-bottom: 2px solid #ddd;
    font-size: 20px;
}

.middle {
    padding-top: 50px;
    background-color: #fafafa;
}

.middle_list {
    margin-left: 90px;
    font-size: 17px;
    padding: 10px 0;
}

.middle_list input {
    width: 300px;
    height: 25px
}

.top:hover {
    cursor: pointer;
    background-color: #d7c23d;
}

.bg {
    background-color: #d7c23d;
}

.menuList:hover {
    cursor: pointer;
    background-color: #d7c23d;
}

.menuList {
    height: 50px;
    line-height: 50px;
    padding-left: 50px;
    color: #fff;
}

.finish_room {
    width: 430px;
    height: auto;
    display: flex;
    flex-direction: row;
    margin-left: 90px
}

.finish_room1 {
    width: 100%;
    height: auto;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    /*border-bottom: 2px solid #e1e1e1;*/
}

.finish_room1 .room_img {
    width: 150px;
    height: 100px;
    margin-right: 10px;
    position: relative;
    overflow: hidden;
}

.finish_room1 .room_img img {
    width: 100%;
    height: 100%;
}

.finish_room1>.room_img span {
    position: absolute;
    width: auto;
    height: auto;
    right: 5px;
    bottom: 3px;
}

.finish_room2 {
    margin-left: 50px;
    width: 100%;
    height: auto;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    /*border-bottom: 2px solid #e1e1e1;*/
}

.finish_room2 .room_img {
    width: 150px;
    height: 100px;
    margin-right: 10px;
    position: relative;
    overflow: hidden;
}

.finish_room2 .room_img img {
    width: 100%;
    height: 100%;
}

.finish_room2>.room_img span {
    position: absolute;
    width: auto;
    height: auto;
    right: 5px;
    bottom: 3px;
}

.room_add_img1 {
    width: 100px;
    height: 95px;
    border: 1px solid #e1e1e1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.room_add_img1 >span:nth-child(1) {
    margin-top: 20px;
    width: 40px;
    height: 40px;
    overflow: hidden;
}

.room_add_img1 >span:nth-child(2) {
    margin-bottom: 10px;
}

.room_add_img1 input {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    /*z-index: 9;*/
    opacity: 0;
}

.room_add_img2 {
    width: 148px;
    height: 98px;
    border: 1px solid #e1e1e1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    /*z-index: 9;*/
}

.room_add_img2 >span:nth-child(1) {
    margin-top: 20px;
    width: 40px;
    height: 40px;
    overflow: hidden;
}

.room_add_img2 >span:nth-child(2) {
    margin-bottom: 10px;
}

.room_add_img2 input {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    /*z-index: 9;*/
    opacity: 0;
}

.bottom {
    margin-left: 90px;
}

.bottom_btn {
    margin-left: 90px;
    margin-top: 50px;
    padding-bottom: 50px
}

.list {
    display: flex;
    flex-direction: row;
    width: 90%;
    margin-left: 90px;
    margin-top: 35px;
    border: 1px solid #ddd;
}

a {
    text-decoration: none;
}

.aa {
    padding: 0 10px;
}

.table {
    border: 1px solid #ddd;
    border-bottom: none;
    border-spacing: 0;
}

.table th {
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.table th:last-child {
    border-right: none;
}

.table td {
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.table td:last-child {
    border-right: none;
}

.height {
    height: 42px;
}

.td_color {
    background-color: #fff
}

.ac {
    text-align: center;
}

.gore {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 22px solid #fff;
    position: absolute;
    top: 210px;
    left: 225px;
}

.bbb {
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
    border: 2px solid #ddd;
}

.shade {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0.7;
    height: 300%
}

.close1 {
    position: absolute;
    top: 4px;
    left: 464px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 20px;
    background-color: #ddd;
}

.listMenu {
    border: solid #e3d5ba;
    border-width: 0 0px 1px 0;
    /*border:1px solid #e7e7e7;*/
    box-sizing: border-box;
    line-height: 40px;
    height: 40px;
    padding-left: 40px;
    position: relative;
    border-left: 1px solid #e3d5ba;
}

.listMenu.active {
    background-color: #fdebdf;
}

.listMenu:first-child {
    border-top: 1px solid #e3d5ba;
    /*border-left: 1px solid #e3d5ba;*/
}

.listMenu a {
    color: #ff8b2f;
    text-decoration: none;
}

.listMenu:hover {
    background-color: #fdebdf;
}

.topRight {
    display: inline-block;
    position: absolute;
    top: -15px;
    right: 25px;
    list-style: none;
}

.topRight li {
    margin: 0 15px;
    float: left;
}

.topRight li a {
    color: #faa354;
}

.iconLeft {
    display: inline-block;
    display: block;
    position: absolute;
    left: 16px;
    top: 11px;
    width: 20px;
    height: 15px;
}
</style>
