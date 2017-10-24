<template>
    <div>
        <!-- 顶部导航栏 -->
        <header class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-header pull-left">
                <a href="javascript:;" class="navbar-brand">广州市软件行业协会后台管理系统</a>
                <span>广州市软件行业协会后台管理系统</span>
            </div>
            <ul class="nav navbar-nav pull-right toolbar">
                <li class="dropdown">
                    <a href="javascript:;">{{userInfo.nick+'，欢迎您'}}</a>
                </li>
                <li class="dropdown">
                    <a href="javascript:;" @click="logout">退出</a>
                </li>
            </ul>
        </header>
        <!-- 主区域 -->
        <div id="page-container" class="clearfix">
            <nav id="page-leftbar">
                <div style="position: fixed;width: 230px;">
                    <ul id="sidebar">
                        <li v-for="menu in leftMenus" :class="{hasChild: menu.submenus, open: menu.showSub, active: leftMenuActive.indexOf(menu.url)>-1}">
                            <accordion-menu :is-open="true">
                                <b slot="top">
									<i class="fa {{menu.icon}}"></i><span>{{menu.name}}</span>
								</b>
                                <ul slot="content" v-if="menu.submenus">
                                    <li v-for="sub in menu.submenus" :class="{active: sub.active}" @click="setActive(sub.id)">
                                        <a v-link="{path: sub.url}">
                                            <i class="fa {{sub.icon}}"></i>
                                            <span>{{sub.name}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </accordion-menu>
                        </li>
                    </ul>
                </div>
            </nav>
            <div id="page-content" class="clearfix">
                <div id="wrap" class="mainview-animatio">
                    <div class="page-heading">
                        <ol class="breadcrumb" style="background: white;">
                            <li class="active"><i class="fa fa-home"></i>首页</li>
                            <li class="active" v-for="list in pathName">{{list}}</li>
                        </ol>
                    </div>
                    <div class="page-content" :style="{'min-height': minHeight}">
                        <!-- <div class="link-box">
							<ul>
								<li v-for="sub in currSubmenus" :class="{active: leftMenuActive==sub.url}"><a v-link="{path: sub.url}"><i class="fa {{sub.icon}}"></i><span>{{sub.name}}</span></a></li>
							</ul>
							
						</div> -->
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部栏 -->
        <footer id="footer">
            <p>2016广州市软件行业协会后台管理系统版权所有</p>
        </footer>
        <modal title="alertModal.title" :show.sync="alertModal.show" effect="zoom" :width="400">
            <div class="modal-header">
                <h5 class="modal-title">{{alertModal.title}}</h5>
            </div>
            <div class="modal-body">
                {{alertModal.msg}}
            </div>
            <div class="modal-footer">
                <span class="btn btn-primary" @click="alertModal.show = false">{{alertModal.btnText}}</span>
            </div>
        </modal>
        <modal title="confirmModal.title" :show.sync="confirmModal.show" effect="zoom" :width="400">
            <div class="modal-header">
                <h5 class="modal-title">{{confirmModal.title}}</h5>
            </div>
            <div class="modal-body">
                {{confirmModal.msg}}
            </div>
            <div class="modal-footer">
                <span class="btn btn-primary" @click="confirmModal.fn(), confirmModal.show = false">{{confirmModal.btnText}}</span>
                <span class="btn btn-default" @click="confirmModal.show = false">取消</span>
            </div>
        </modal>
        <div class="progress progress-striped skylo" v-if="progress" transition="progress">
            <div class="progress-bar progress-bar-striped bar active" role="progressbar">
            </div>
        </div>
    </div>
</template>
<script>
import AccordionMenu from '../components/bootstrap/AccordionMenu.vue'
import Modal from '../components/bootstrap/Modal.vue'
import Dropdown from '../components/bootstrap/Dropdown.vue'

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
    data() {
        return {
            leftMenus: [{
                name: '菜单管理',
                icon: 'fa-pie-chart',
                submenus: []
            },{
                name: '设置',
                icon: 'fa-pie-chart',
                submenus: [{
                    active: false,
                    icon: "fa-pie-chart",
                    id: "0",
                    name: "友情链接",
                    url: "/links"
                }]
            }],
            leftMenuActive: '',
            currSubmenus: [],

            progress: false,
            minHeight: null,

            userInfo: {},

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
            pathName: [],
            parent_id: '' //设置左边栏目选中项
        }
    },
    ready() {
        this.minHeight = (window.innerHeight - 145) + 'px';
        var that = this;

        if (checkLogin()) {
            this.userInfo = eval('(' + localStorage.getItem('ams_user_info') + ')');
        }

        router.beforeEach((transition) => {
            if (checkLogin()) {
                transition.next()
            }

        })

        router.afterEach(function(transition) {
            that.leftMenuActive = transition.to.path;
            that.parent_id = window.sessionStorage.getItem('parent_id') || '0';
            for (var i = 0; i < that.leftMenus.length; i++) {
                if (that.leftMenuActive.indexOf(that.leftMenus[i].url) > -1) {
                    that.currSubmenus = that.leftMenus[i].submenus;
                }
            };
        });





        this.$on('progress', (val) => {
            if (val) {
                this.progress = true;
            } else {
                that.progress = false;
            }
        })

        this.$on('alertModal', (obj) => {

            if (obj.show) {
                this.alertModal.show = obj.show;
            }
            if (obj.title) {
                this.alertModal.title = obj.title;
            }
            if (obj.msg) {
                this.alertModal.msg = obj.msg;
            }
            if (obj.btnText) {
                this.alertModal.btnText = obj.btnText;
            }
        });

        this.$on('confirmModal', (obj) => {

            if (obj.show) {
                this.confirmModal.show = obj.show;
            }
            if (obj.title) {
                this.confirmModal.title = obj.title;
            }
            if (obj.msg) {
                this.confirmModal.msg = obj.msg;
            }
            if (obj.btnText) {
                this.confirmModal.btnText = obj.btnText;
            }
            if (obj.fn) {
                this.confirmModal.fn = obj.fn;
            }
        });

        this.$on('setActive', (id) => {
            this.setActive(id)
        })

        //this.getPathName(0);

        this.getNavigationList();
    },
    watch: {
        'leftMenuActive' (val) {
            this.getPathName();
        }
    },
    methods: {
        setActive(id) {
            this.leftMenus[0].submenus.forEach(val => {
                val.active = val.id == id ? true : false;
            })
            this.parent_id = id;
            window.sessionStorage.setItem('parent_id', id);
        },

        logout() {
            api.logout(this, {}, (back) => {
                checkLogin();
            })
        },

        /**
         * [设置导航标题]
         */
        getPathName() {
            let data = this.leftMenus;
            this.pathName = [];
            let bool = false;
            for (var i = 0; i < data.length; i++) {
                if (this.leftMenuActive.indexOf(data[i].url) > -1) {
                    this.pathName.push(data[i].name);
                    bool = true;
                    break;
                } else if (data[i].submenus.length) {
                    for (let j = 0, len = data[i].submenus.length; j < len; j++) {
                        if (this.leftMenuActive.indexOf(data[i].submenus[j].url) > -1) {
                            this.pathName.push(data[i].name);
                            this.pathName.push(data[i].submenus[j].name);
                            bool = true;
                            break;
                        }
                    }
                }
            }
            if (bool) {
                window.localStorage.setItem('pathName', this.pathName.join(','));
            } else {
                let pathName = window.localStorage.getItem('pathName');
                if (pathName) {
                    this.pathName = pathName.split(',');
                }
            }
        },
        /**
         * [获取一级菜单]
         */
        getNavigationList() {
            var body = {
                type: 'parent',
                parent_id: '',
            }
            api.getNavigationList(this, body, (back) => {
                let parent_id = this.parent_id || '0';
                if (back.resCode == '0') {
                    let data = [];
                    back.repBody.unshift({
                        id: '0',
                        title: '网站首页'
                    })
                    back.repBody.forEach(value => {
                        data.push({
                            id: value.id,
                            name: value.title,
                            icon: 'fa-pie-chart',
                            url: value.id === '0' ? '/one-menu' : '/two-menu/' + value.id,
                            active: value.id == parent_id ? true : false
                        })

                        // this.leftMenus[0].submenus.push({
                        // 	name: value.title,
                        // 	icon: 'fa-pie-chart',
                        // 	url: '/two-menu/' + value.id
                        // })
                    });
                    this.leftMenus[0].submenus = data;
                    this.getPathName();
                    // this.lists =  back.repBody;
                }
            })
        }
    }
}

function checkLogin() {
    var login = false;
    if (document.cookie.indexOf('admin_token') < 0 || !localStorage['ams_user_info']) {
        location.href = basePath + 'login.jsp';
        localStorage.removeItem('ams_user_info');
    } else {
        login = true;
    }

    return login;
}
</script>
<style scoped>
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
</style>
