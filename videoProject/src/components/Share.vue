<template>
<div class="">
  <div class="component-share-btn" @click="share">
    <slot></slot>
  </div>
  <Modal :show="shareModal" modal-color="transparent" :bg="false" :backdrop="false">
    <img :src="share_bg" @click="go_end()" alt="分享" style="display: block;width: 100%;height:1080px;position: absolute;z-index: 1000;" />
  </Modal>
</div>
</template>
<style scoped>
.modal_bg {
  background: none!important;
}
</style>
<script>
import wx from '../assets/js/Wx'
import Modal from '../components/Modal'
export default {
  components: {
    Modal
  },
  data() {
    return {
      share_bg: './static/img/share_bg.png',
      shareModal: false,
    }
  },
  props: {
    // 分享标题
    title: {
      type: String
    },
    // 分享描述
    desc: {
      type: String
    },
    // 分享链接
    link: {
      type: String
    },
    // 分享缩略图
    imgUrl: {
      type: String
    },

    func: {
      type: Function,
      default: function() {}
    }
  },
  methods: {
    go_end: function(){
      var _this = this;
      _this.shareModal = false;
      _this.$router.push({
        name: 'AllEnd'
      })
    },
    share: function() {
      var that = this;
      // if (iswx == "true") {
      that.shareModal = true;
      // wx.share(this.title, this.desc, this.link, this.img_url, (type, status) => {
      //   that.shareModal = false;
      //   that.func(type, status)
      // });
      // }

    }
  }
}
</script>
