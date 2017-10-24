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
let nameid = 'aid='+aid
let songlistid = ''
const homePageArgs = {
  visitPageCode: visitPageCode,
  gatePageCode: gatePageCode,
  gateModel: 'page',
  operate: pathUrl,
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: pathUrl,
  songlistid:songlistid,
  nameid: nameid
}

export default {

  homePage: (gateModel,operate,contentId) => {
    if (window.submitStatInfo) {
      submitStatInfo(homePageArgs.visitPageCode,
        homePageArgs.gatePageCode,
        gateModel,
        operate,
        contentId,
        homePageArgs.account,
        homePageArgs.portal,
        homePageArgs.channel_id,
        accountType,
        homePageArgs.nextPageUrl,
        homePageArgs.songlistid,
        homePageArgs.nameid
        )
    }
  },

  
}
