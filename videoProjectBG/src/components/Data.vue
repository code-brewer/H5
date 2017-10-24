<template lang="html">
  <div class="">
  <div class="layout-breadcrumb" style="text-align: left;margin-left: 70px;">
    <Breadcrumb>
      <Breadcrumb-item href="">首页</Breadcrumb-item>
      <Breadcrumb-item href="">数据管理</Breadcrumb-item>
    </Breadcrumb>
  </div>
  <div class="layout-content">
    <div class="layout-content-main">
      <Form :model="formItem" :label-width="80">
        <Form-item label="测试时间:">
          <Row>
            <Col span="5">
            <Date-picker type="date" placeholder="选择日期" v-model="formItem.date1"></Date-picker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="5">
            <Date-picker type="date" placeholder="选择日期" v-model="formItem.date2"></Date-picker>
            </Col>
            <Col span="4" style="text-align:right;padding-right: 10px;"> 测试浏览器:
            </Col>
            <Col span="5">
            <Input v-model="formItem.browser" placeholder="请输入"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="测试得分:">
          <Row>
            <Col span="3">
            <Input v-model="formItem.number1" placeholder="请输入"></Input>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="3">
            <Input v-model="formItem.number2" placeholder="请输入"></Input>
            </Col>
            <Col span="3" style="text-align:right;padding-right: 10px;"> IP地址:
            </Col>
            <Col span="5">
            <Input v-model="formItem.ip" placeholder="请输入"></Input>
            </Col>
            <Col span="5">
            <Button type="primary" @click="search()">搜索</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div style="padding-bottom:0">
        <Table highlight-row border :columns="columns" :data="data"></Table>
      </div>

      <Page :total="all_list" show-elevator @on-change="pageSize" show-total style="margin-top:50px;padding-bottom:20px"></Page>
    </div>
  </div>
    </div>
</template>

<script>
import api from '../api/config'
export default {
  data() {
    return {
      page: '1', //页数
      all_list: '',
      columns: [
        // {
        //   title: '序号',
        //   key: 'num',
        // },
        {
          title: '测试时间',
          key: 'idx_ctime',
          // sortable: true
        },
        {
          title: 'IP地址',
          key: 'idx_ip'
        },
        {
          title: '视频源位置',
          key: 'videoLocation'
        },
        {
          title: '视频大小/时长',
          key: 'video_size',
          // sortable: true
        },
        {
          title: '测试浏览器',
          key: 'idx_browser_name'
        },
        {
          title: '测试得分',
          key: 'idx_score',
          // sortable: true
        }
      ],
      data: [
        // {
        // num: '1',
        // idxCtime: "2017.6.23  15:39:12",
        // idxIp: '192.11.6.01',
        // place: '广州天河',
        // videoTime: '30M/130s',
        // idxBrowserName: 'chrome',
        // code: '50'
        // },
      ],
      formItem: {
        number1: '',
        number2: '',
        browser: '',
        ip: '',
        select: '',
        date1: '',
        date2: '',
      },
    }
  },
  components: {},
  created() {},
  mounted() {
    this.$nextTick(function() {

    })
  },
  methods: {
    pageSize: function(e) {
      console.log(e);
      this.page = e;
      this.search();
    },
    search: function() {
      var _this = this;
      var body = {
        page: _this.page, //第几页   		(必填)
        size: '10', //每页几条				(必填)
        idxIp: _this.formItem.ip, //测速ip地址
        idxBrowserName: _this.formItem.browser, //浏览器名称
        lesser: _this.formItem.number1, //测速得分段中低分值
        higher: _this.formItem.number2, //测速得分段中高分值
        begintime: _this.formateDate(_this.formItem.date1), //测试时间段的开始时间
        endtime: _this.formateDate(_this.formItem.date2), //测试时间段的结束时间
      };
      api.getList(_this, body, (res) => {
        console.log(res.data.repBody.count);
        _this.all_list = res.data.repBody.count;
        console.log(res.data.repBody.result);
        if (res.data.repBody.result) {
          _this.data = res.data.repBody.result;
        }
      });
    },
    formateDate: function(date) {
      if (typeof date == null || date == '') {
        return ''
      } else {
        var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (m < 10) {
          m = "0" + m;
        }
        if (d < 10) {
          d = "0" + d;
        }
        return y + "-" + m + "-" + d;
      }
    },
  }

}
</script>

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
  height: 800px;
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
