<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-breadcrumb {
  padding: 10px 15px 0;
}

.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  padding: 10px;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-menu-left {
  background: #464c5b;
}

.layout-header {
  height: 60px;
  background: rgb(245, 247, 249);
  /*box-shadow: 0 1px 1px rgba(0, 0, 0, .1);*/
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.layout-ceiling-main a {
  color: #9ba7b5;
}

.layout-hide-text .layout-text {
  display: none;
}

.ivu-col {
  transition: width .2s ease-in-out;
}






/*...................................*/

.bg {
  background-color: #464c5b;
  color: #2d8cf0;
  height: 65px;
  line-height: 65px;
  /*text-align: left;*/
  /*padding-left: 20px*/
}






/*.ivu-input-wrapper {
    display: inline-block;
    width: 45%!important;
    position: relative;
    vertical-align: middle;
  }*/
</style>
<template>
<div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
  <div class="bg">
    <h2 style="width:20%;float:left">H5网络视频测试后台</h2>
    <p style="width:80%;float:left;text-align:right;font-size:15px">
      <span style="margin-right:30px;font-weight: 700">{{user_name}}</span>
      <a style="margin-right:30px;font-weight: 700" @click="login_out()">退出</a>
    </p>

  </div>
  <Row type="flex">
    <i-col :span="spanLeft" class="layout-menu-left">
      <Menu active-name="1" theme="dark" width="auto">
        <!-- <div class="layout-logo-left"></div> -->
        <Menu-item name="1" @click.native="data_show">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <span class="layout-text">数据管理</span>
        </Menu-item>
        <Menu-item name="2" @click.native="price_show">
          <Icon type="ios-keypad" :size="iconSize"></Icon>
          <span class="layout-text">中奖名单</span>
        </Menu-item>
        <!-- <Menu-item name="3">
          <Icon type="ios-analytics" :size="iconSize"></Icon>
          <span class="layout-text">选项 3</span>
        </Menu-item> -->
      </Menu>
    </i-col>
    <i-col :span="spanRight">
      <div class="layout-header" style="float:left;height:45px;margin-left:15px">
        <i-button type="text" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
        </i-button>
      </div>
      <Data v-if="data_model"></Data>
      <Price v-else-if="price_model"></Price>
      <div class="layout-copy">
        Copyright&copy;1999-2017 中国联通 版权所有
      </div>
    </i-col>
  </Row>
</div>
</template>
<script>
import Data from '../components/Data'
import Price from '../components/Price'
export default {
  data() {
    return {
      spanLeft: 4,
      spanRight: 20,
      user_name: '',
      data_model: true,
      price_model: false,
      select_name: '',
      // name: [1,2],
    }
  },
  components: {
    Data,
    Price
  },
  mounted() {
    this.$nextTick(function() {
      this.user_name = localStorage.getItem('user_name');
    })
  },
  watch: {
    select_name: function(val) {
      if (val == 1) {
        this.data_model = true;
        this.price_model = false
      } else if (val == 2) {
        this.data_model = false;
        this.price_model = true;
      }
    }
  },
  computed: {
    iconSize: function() {
      return this.spanLeft === 4 ? 14 : 24;
    }
  },
  methods: {
    data_show: function() {
      console.log(11);
      var _this = this;
      _this.data_model = true;
      _this.price_model = false;
    },
    price_show: function() {
      console.log(22);
      var _this = this;
      _this.data_model = false;
      _this.price_model = true;
    },
    login_out: function() {
      var _this = this;
      localStorage.clear();
      _this.$router.push({
        path: '/'
      });
    },

    toggleClick: function() {
      if (this.spanLeft === 4) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 4;
        this.spanRight = 20;
      }
    }
  }
}
</script>
