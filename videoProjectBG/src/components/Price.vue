<template lang="html">
  <div class="">

  <div class="layout-breadcrumb" style="text-align: left;margin-left: 70px;">
    <Breadcrumb>
      <Breadcrumb-item href="">首页</Breadcrumb-item>
      <Breadcrumb-item href="">中奖名单</Breadcrumb-item>
    </Breadcrumb>
  </div>
  <div class="layout-content">
    <div class="layout-content-main">
      <Form :model="formItem" :label-width="80">
        <Form-item label="奖品:">
          <Row>
            <Col span="5">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
            </Col>
            <Col span="2" style="text-align: center">&nbsp;</Col>
            <Col span="2" style="text-align: center">是否分享:</Col>
            <Col span="5">
              <Select v-model="formItem.select" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="5">
            <Button type="primary" @click="search()">搜索</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div style="padding-bottom:0">
        <Table highlight-row border :columns="columns5" :data="data5"></Table>
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
      page: '1',//页数
      all_list: '',
      cityList: [
          {
            value: 'yes',
            label: '是'
          },
          {
            value: 'no',
            label: '否'
          }
        ],
        columns5: [{
            title: '序号',
            key: 'num',
            // sortable: true
          },
          {
            title: '微信名',
            key: 'time',
            // sortable: true
          },
          {
            title: '手机号',
            key: 'mobile'
          },
          {
            title: '奖品',
            key: 'pname'
          },
          {
            title: '评分',
            key: 'size',
            // sortable: true
          },
          {
            title: '是否分享',
            key: 'browser'
          }
        ],
        data5: [
          // {
          //   num: '1',
          //   time: "2017.6.23  15:39:12",
          //   ip: '192.11.6.01',
          //   place: '广州天河',
          //   size: '30M/130s',
          //   browser: 'chrome',
          //   code: '50'
          // },
        ],
        formItem: {
          name: '',
          select: '',
        },
      }
    },
    components: {},
      created() {},
      mounted() {},
      methods: {
        pageSize: function(e){
          console.log(e);
          this.page = e;
          this.search();
        },
        search: function() {
          var _this = this;
          var body = {
            pname: _this.formItem.name,								//奖品名称
            isShare: _this.formItem.select,								//是否分享
            page: _this.page,										//第几页			(必填)
            size: '10',										//每页几条			(必填)
          };
          api.getListRegisterInfo(_this, body, (res)=> {
            console.log(res);
            console.log(res.data.repBody.count);
            _this.all_list = res.data.repBody.count;
            if (res.data.repBody.result) {
              _this.data5 = res.data.repBody.result;
            }
          });
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
