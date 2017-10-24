<template>
<el-row class="container">
  <!--头部-->
  <el-col :span="24" class="topbar-wrap">
    <div class="topbar-logo topbar-btn" style="width:150px;margin-left:20px;color:#fff">
      <!-- <a href="/"><img src="../assets/logo.png" style="padding-left:8px;"></a> -->
      <span>H5网络视频测速后台</span>
    </div>
    <div class="topbar-logos" v-show="!collapsed">
      <!-- <a href="/"><img src="../assets/logotxt.png"></a> -->
    </div>
    <div class="topbar-title">
      <span style="font-size: 18px;color: #fff;"></span>
    </div>
    <div class="topbar-account topbar-btn">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{sysUserName}}  <i
            class="iconfont icon-down"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/user/profile"><span style="color: #555;font-size: 14px;">人员管理</span></router-link>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-col>

  <!--中间-->
  <el-col :span="24" class="main">
    <!--左侧导航-->
    <aside :class="{showSidebar:!collapsed}">
      <!--展开折叠开关-->
      <div class="menu-toggle" @click.prevent="collapse">
        <i class="iconfont icon-menufold" v-show="!collapsed"></i>
        <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
      </div>
      <!--导航菜单-->
      <el-menu default-active="0" router :collapse="collapsed">
        <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item @click="goPage(term)" v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow" :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
                <i :class="[term.id == 'second'?'el-submenu__icon-arrow'+' '+ nowSat:'']"></i>
                <i :class="[term.id == 'secondOther'?'el-submenu__icon-arrow'+' '+ nowSatOther:'']"></i>
              </el-menu-item>
              <el-menu-item v-for="term in item.team" :key="term.path" :index="term.path" v-if="showSecondMenu" :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
              <el-menu-item v-for="term in item.teamOther" :key="term.path" :index="term.path" v-if="showSecondMenuOhter" :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
        </template>
      </el-menu>
    </aside>

    <!--右侧内容区-->
    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </div>
    </section>
  </el-col>

</el-row>
</template>

<script>
import {
  bus
} from '../bus.js'
export default {
  name: 'home',
  created() {
    bus.$on('setUserName', (text) => {
      this.sysUserName = text;
    })
  },
  data() {
    return {
      nowSatOther: 'el-icon-arrow-down',
      nowSat: 'el-icon-arrow-down',
      showSecondMenu: false,
      showSecondMenuOhter: false,
      sysUserName: '',
      sysUserAvatar: '',
      collapsed: false,
    }
  },
  methods: {
    handleOpen() {
      //console.log('handleopen');
    },
    handleClose() {
      //console.log('handleclose');
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    },
    logout() {
      var _this = this;
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('access-user');
        _this.$router.push('/login');
      }).catch(() => {

      });
    },
    goPage: function(key){
      console.log(key.id);
      if(key.id == 'second'){
        this.showSecondMenu = !this.showSecondMenu;
        this.nowSat == 'el-icon-arrow-up'?this.nowSat = 'el-icon-arrow-down':this.nowSat = 'el-icon-arrow-up'
      }else if (key.id == 'secondOther') {
        this.showSecondMenuOhter = !this.showSecondMenuOhter;
        this.nowSatOther == 'el-icon-arrow-up'?this.nowSatOther = 'el-icon-arrow-down':this.nowSatOther = 'el-icon-arrow-up'
      }

    }
  },
  mounted() {
    var user = sessionStorage.getItem('access-user');
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || '';
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;

    .topbar-wrap {
        height: 50px;
        line-height: 50px;
        background: #1ea2ff;
        padding: 0;

        .topbar-btn {
            color: #fff;
        }
        /*.topbar-btn:hover {*/
        /*background-color: #4A5064;*/
        /*}*/
        .topbar-logo {
            float: left;
            width: 110px;
            line-height: 48px;
        }
        .topbar-logos {
            float: left;
            width: 120px;
            line-height: 26px;
        }
        .topbar-logo img,
        .topbar-logos img {
            height: 40px;
            margin-top: 5px;
            margin-left: 2px;
        }
        .topbar-title {
            float: left;
            text-align: left;
            width: 200px;
            padding-left: 10px;
            border-left: 1px solid #000;
        }
        .topbar-account {
            float: right;
            padding-right: 12px;
        }
        .userinfo-inner {
            cursor: pointer;
            color: #fff;
            padding-left: 10px;
        }
    }
    .main {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        top: 50px;
        bottom: 0;
        overflow: hidden;
    }

    aside {
        min-width: 50px;
        background: #3966ac;
        &::-webkit-scrollbar {
            display: none;
        }

        &.showSidebar {
            overflow-x: hidden;
            overflow-y: auto;
        }

        .el-menu {
            height: 100%;
            /*写给不支持calc()的浏览器*/
            height: -moz-calc(100% - 80px);
            height: -webkit-calc(100% - 80px);
            height: calc(100% - 80px);
            border-radius: 0;
            background-color: #3966ac;
        }

        .el-submenu .el-menu-item {
            min-width: 60px;
        }
        .el-menu {
            width: 180px;
        }
        .el-menu--collapse {
            width: 60px;
        }

        .el-menu .el-menu-item,
        .el-submenu .el-submenu__title {
            height: 46px;
            line-height: 46px;
        }
        .el-menu-item:hover,
        .el-submenu .el-menu-item:hover,
        .el-submenu__title:hover {
            background-color: #1ea2ff;
        }
    }

    .menu-toggle {
        background: #3966ac;
        text-align: center;
        color: white;
        height: 26px;
        line-height: 30px;
    }

    .content-container {
        background: #fff;
        flex: 1;
        overflow-y: auto;
        padding: 10px 10px 1px;

        .content-wrapper {
            background-color: #fff;
            box-sizing: border-box;
        }
    }
}
</style>
