import Url from '../../utils/url'
let channel_id = Url.getArgsFromUrl('channle') || 'channel' // 渠道号, 必填
let aid = Url.getArgsFromUrl('aid') || 'aid' // 活动id, 必填
let pathUrl = 'http://huodong.10155.com/gsu/activity.jsp?aid=' + aid + '&channle=' + channel_id + '#!/'
let visitPageCode = pathUrl // 进入页面URL, 必填
let gatePageCode = pathUrl // 当前页面URL, 必填
let gateModel = '' // 操作入口, 必填
let operate = 'load' // 必填
let contentId = '' // 选填
let account = '' // 选填
let portal = 'wap' // 必填
let nextPageUrl = pathUrl // 去往页面URL, 必填
let accountType = window.openid || '' // 
let songlistid = ''
let nameid = 'aid='+aid

export default {
  // 首页pv/uv
  homePage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'home',
        'login',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 底部banner
  banner: (banner, url) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        banner,
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        url)
    }
  },
  // 查看更多
  historeyMore: (url) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'more',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        url)
    }
  },
  // 试听
  listen: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_listen',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 订购
  order: (index, contentId) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_order1',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 获取验证码
  loginReceive: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_receive',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 登录
  loginSign: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_sign',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 关闭登录
  loginClose: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_close1',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 取消开通炫铃功能
  openbellCancel: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_cancel1',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 开通炫铃功能
  openbellOpen: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_open',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 关闭开通炫铃
  openbellClose: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_close2',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 取消订购炫铃
  orderbellCancel: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_cancel2',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 订购炫铃
  orderbellOrder: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_order2',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },
  // 关闭订购炫铃
  orderbellClose: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_close3',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },

  ordersuccessSure: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+(index+1)+'_sure',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },

  ordersuccessPersonal: (index, url) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+index+'_personal',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        url)
    }
  },

  ordersuccessClose: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+index+'_close4',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },

  orderfailSure: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+index+'_sure1',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  },

  orderfailClose: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(visitPageCode,
        gatePageCode,
        'part'+index+'_close5',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPageUrl,
        songlistid,
        nameid)
    }
  }

}
