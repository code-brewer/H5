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
let accountType = Url.getArgsFromUrl('accountType') || 'WeixinID' // 
let songlistid = ''
let nameid = 'aid='+aid

const homePageArgs = {
  visitPageCode: visitPageCode,
  gatePageCode: gatePageCode,
  gateModel: pathUrl,
  operate: 'login',
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: pathUrl + ':game:myprize'
}

const gamePageArgs = {
  visitPageCode: gatePageCode + 'game',
  gatePageCode: homePageArgs.visitPageCode,
  gateModel: homePageArgs.visitPageCode,
  operate: 'load',
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: pathUrl + ':success:fail'
}

const successPageArgs = {
  visitPageCode: visitPageCode + 'success',
  gatePageCode: gamePageArgs.visitPageCode,
  gateModel: 'sure_success',
  operate: 'click',
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: pathUrl + 'receive'
}

const failPageArgs = {
  visitPageCode: visitPageCode + 'fail',
  gatePageCode: gamePageArgs.visitPageCode,
  gateModel: 'sure_fail',
  operate: 'click',
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: pathUrl + ':home:answer'
}

const myprizePageArgs = {
  visitPageCode: visitPageCode + 'prize',
  gatePageCode: homePageArgs.gatePageCode,
  gateModel: 'award',
  operate: 'click',
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: pathUrl + 'receive/:gid'
}

const getprizePageArgs = {
  visitPageCode: myprizePageArgs.nextPageUrl,
  gatePageCode: myprizePageArgs.visitPageCode,
  gateModel: 'submit',
  operate: 'click',
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: pathUrl + 'receive'
}

const playArgs = {
  visitPageCode: gamePageArgs.gatePageCode,
  gatePageCode: homePageArgs.gatePageCode,
  gateModel: 'replay',
  operate: operate,
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: gamePageArgs.gatePageCode
}

const correctUrlArgs = {
  visitPageCode: successPageArgs.gatePageCode,
  gatePageCode: successPageArgs.gatePageCode,
  gateModel: 'right_jump',
  operate: 'click',
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: successPageArgs.gatePageCode
}

const errorUrlArgs = {
  visitPageCode: failPageArgs.gatePageCode,
  gatePageCode: failPageArgs.gatePageCode,
  gateModel: 'wrong_jump',
  operate: 'click',
  contentId: contentId,
  account: account,
  portal: portal,
  channel_id: channel_id,
  accountType: accountType,
  nextPageUrl: failPageArgs.gatePageCode
}

export default {

  homePage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(homePageArgs.visitPageCode,
        homePageArgs.gatePageCode,
        homePageArgs.gateModel,
        homePageArgs.operate,
        homePageArgs.contentId,
        homePageArgs.account,
        homePageArgs.portal,
        homePageArgs.channel_id,
        accountType,
        homePageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  },

  gamePage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(gamePageArgs.visitPageCode,
        gamePageArgs.gatePageCode,
        gamePageArgs.gateModel,
        gamePageArgs.operate,
        gamePageArgs.contentId,
        gamePageArgs.account,
        gamePageArgs.portal,
        gamePageArgs.channel_id,
        accountType,
        gamePageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  },

  successPage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(successPageArgs.visitPageCode,
        successPageArgs.gatePageCode,
        successPageArgs.gateModel,
        successPageArgs.operate,
        successPageArgs.contentId,
        successPageArgs.account,
        successPageArgs.portal,
        successPageArgs.channel_id,
        accountType,
        successPageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  },

  failPage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(failPageArgs.visitPageCode,
        failPageArgs.gatePageCode,
        failPageArgs.gateModel,
        failPageArgs.operate,
        failPageArgs.contentId,
        failPageArgs.account,
        failPageArgs.portal,
        failPageArgs.channel_id,
        accountType,
        failPageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  },

  myprizePage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(myprizePageArgs.visitPageCode,
        myprizePageArgs.gatePageCode,
        myprizePageArgs.gateModel,
        myprizePageArgs.operate,
        myprizePageArgs.contentId,
        myprizePageArgs.account,
        myprizePageArgs.portal,
        myprizePageArgs.channel_id,
        accountType,
        myprizePageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  },

  getprizePage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(getprizePageArgs.visitPageCode,
        getprizePageArgs.gatePageCode,
        getprizePageArgs.gateModel,
        getprizePageArgs.operate,
        getprizePageArgs.contentId,
        getprizePageArgs.account,
        getprizePageArgs.portal,
        getprizePageArgs.channel_id,
        accountType,
        getprizePageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  },

  playPage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(playPageArgs.visitPageCode,
        playPageArgs.gatePageCode,
        playPageArgs.gateModel,
        playPageArgs.operate,
        playPageArgs.contentId,
        playPageArgs.account,
        playPageArgs.portal,
        playPageArgs.channel_id,
        accountType,
        playPageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  },

  correctUrl: (url) => {
    if (window.submitStatInfo) {
      submitStatInfo(correctUrlArgs.visitPageCode,
        correctUrlArgs.gatePageCode,
        correctUrlArgs.gateModel,
        correctUrlArgs.operate,
        correctUrlArgs.contentId,
        correctUrlArgs.account,
        correctUrlArgs.portal,
        correctUrlArgs.channel_id,
        accountType,
        url)
    }
  },

  errorUrl: (url) => {
    if (window.submitStatInfo) {
      submitStatInfo(errorUrlArgs.visitPageCode,
        errorUrlArgs.gatePageCode,
        errorUrlArgs.gateModel,
        errorUrlArgs.operate,
        errorUrlArgs.contentId,
        errorUrlArgs.account,
        errorUrlArgs.portal,
        errorUrlArgs.channel_id,
        accountType,
        url,
        songlistid,
        nameid)
    }
  },

  // 首页按钮统计
  myPrize: () => {
    if (window.submitStatInfo) {
      submitStatInfo(homePageArgs.visitPageCode,
        homePageArgs.visitPageCode,
        'myprize',
        'click',
        homePageArgs.contentId,
        homePageArgs.account,
        homePageArgs.portal,
        homePageArgs.channel_id,
        accountType,
        myprizePageArgs.gatePageCode,
        songlistid,
        nameid)
    }
  },

  startBtn: () => {
    if (window.submitStatInfo) {
      submitStatInfo(homePageArgs.visitPageCode,
        homePageArgs.visitPageCode,
        'start',
        'click',
        homePageArgs.contentId,
        homePageArgs.account,
        homePageArgs.portal,
        homePageArgs.channel_id,
        accountType,
        gamePageArgs.gatePageCode,
        songlistid,
        nameid)
    }
  },

  activityRule: () => {
    if (window.submitStatInfo) {
      submitStatInfo(homePageArgs.visitPageCode,
        homePageArgs.visitPageCode,
        'rule1',
        'click',
        homePageArgs.contentId,
        homePageArgs.account,
        homePageArgs.portal,
        homePageArgs.channel_id,
        accountType,
        homePageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  activityRuleClose: () => {
    if (window.submitStatInfo) {
      submitStatInfo(homePageArgs.visitPageCode,
        homePageArgs.visitPageCode,
        'rule1_close',
        'click',
        homePageArgs.contentId,
        homePageArgs.account,
        homePageArgs.portal,
        homePageArgs.channel_id,
        accountType,
        homePageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  // 游戏页按钮统计
  musicRelay: () => {
    if (window.submitStatInfo) {
      submitStatInfo(gamePageArgs.visitPageCode,
        gamePageArgs.visitPageCode,
        'replay',
        'click',
        gamePageArgs.contentId,
        gamePageArgs.account,
        gamePageArgs.portal,
        gamePageArgs.channel_id,
        accountType,
        gamePageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  musicSubmit: () => {
    if (window.submitStatInfo) {
      submitStatInfo(gamePageArgs.visitPageCode,
        gamePageArgs.visitPageCode,
        'sure',
        'click',
        gamePageArgs.contentId,
        gamePageArgs.account,
        gamePageArgs.portal,
        gamePageArgs.channel_id,
        accountType,
        gamePageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  },

  musicSelection: (index) => {
    if (window.submitStatInfo) {
      submitStatInfo(gamePageArgs.visitPageCode,
        gamePageArgs.visitPageCode,
        'selection' + index,
        'click',
        gamePageArgs.contentId,
        gamePageArgs.account,
        gamePageArgs.portal,
        gamePageArgs.channel_id,
        accountType,
        gamePageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  // 回答正确页
  luckDraw: () => {
    if (window.submitStatInfo) {
      submitStatInfo(successPageArgs.visitPageCode,
        successPageArgs.visitPageCode,
        'luck_draw',
        'click',
        successPageArgs.contentId,
        successPageArgs.account,
        successPageArgs.portal,
        successPageArgs.channel_id,
        accountType,
        successPageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  rightJump: (nextUrl) => {
    if (window.submitStatInfo) {
      submitStatInfo(successPageArgs.visitPageCode,
        successPageArgs.visitPageCode,
        'right_jump',
        'click',
        successPageArgs.contentId,
        successPageArgs.account,
        successPageArgs.portal,
        successPageArgs.channel_id,
        accountType,
        nextUrl,
        songlistid,
        nameid)
    }
  },

  receiveRule: () => {
    if (window.submitStatInfo) {
      submitStatInfo(successPageArgs.visitPageCode,
        successPageArgs.visitPageCode,
        'rule2',
        'click',
        successPageArgs.contentId,
        successPageArgs.account,
        successPageArgs.portal,
        successPageArgs.channel_id,
        accountType,
        successPageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  receiveRuleClose: () => {
    if (window.submitStatInfo) {
      submitStatInfo(successPageArgs.visitPageCode,
        successPageArgs.visitPageCode,
        'rule2_close',
        'click',
        successPageArgs.contentId,
        successPageArgs.account,
        successPageArgs.portal,
        successPageArgs.channel_id,
        accountType,
        successPageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  winSure: () => {
    if (window.submitStatInfo) {
      submitStatInfo(successPageArgs.visitPageCode,
        successPageArgs.visitPageCode,
        'win_sure',
        'click',
        successPageArgs.contentId,
        successPageArgs.account,
        successPageArgs.portal,
        successPageArgs.channel_id,
        accountType,
        successPageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  failSure: () => {
    if (window.submitStatInfo) {
      submitStatInfo(successPageArgs.visitPageCode,
        successPageArgs.visitPageCode,
        'fail_sure',
        'click',
        successPageArgs.contentId,
        successPageArgs.account,
        successPageArgs.portal,
        successPageArgs.channel_id,
        accountType,
        successPageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  noChanceSure: () => {
    if (window.submitStatInfo) {
      submitStatInfo(successPageArgs.visitPageCode,
        successPageArgs.visitPageCode,
        'no_chance_sure',
        'click',
        successPageArgs.contentId,
        successPageArgs.account,
        successPageArgs.portal,
        successPageArgs.channel_id,
        accountType,
        successPageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },

  drawModalClose: (dolucky) => {
    let btnType = ''
    if(dolucky == 1) {
      btnType = 'win_close'
    }
    if(dolucky == 2) {
      btnType = 'fail_close'
    }
    if(dolucky == 3) {
      btnType = 'no_chance_close'
    }

    if (window.submitStatInfo) {
      submitStatInfo(successPageArgs.visitPageCode,
        successPageArgs.visitPageCode,
        'no_chance_close',
        'click',
        successPageArgs.contentId,
        successPageArgs.account,
        successPageArgs.portal,
        successPageArgs.channel_id,
        accountType,
        successPageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },
  
  // 回答错误
  reChallenge: () => {
    if (window.submitStatInfo) {
      submitStatInfo(failPageArgs.visitPageCode,
        failPageArgs.visitPageCode,
        'rechallenge',
        'click',
        failPageArgs.contentId,
        failPageArgs.account,
        failPageArgs.portal,
        failPageArgs.channel_id,
        accountType,
        gamePageArgs.visitPageCode,
        songlistid,
        nameid)
    }
  },
  
  wrongJump: (nextUrl) => {
    if (window.submitStatInfo) {
      submitStatInfo(failPageArgs.visitPageCode,
        failPageArgs.visitPageCode,
        'wrong_jump',
        'click',
        failPageArgs.contentId,
        failPageArgs.account,
        failPageArgs.portal,
        failPageArgs.channel_id,
        accountType,
        nextUrl,
        songlistid,
        nameid)
    }
  },
  
  // 领奖页
  receiveSubmit: () => {
    if (window.submitStatInfo) {
      submitStatInfo(getprizePageArgs.visitPageCode,
        getprizePageArgs.visitPageCode,
        'submit',
        'click',
        getprizePageArgs.contentId,
        getprizePageArgs.account,
        getprizePageArgs.portal,
        getprizePageArgs.channel_id,
        accountType,
        getprizePageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  },
  
  // 我的奖品页
  awardBtn: () => {
    if (window.submitStatInfo) {
      submitStatInfo(myprizePageArgs.visitPageCode,
        myprizePageArgs.visitPageCode,
        'award',
        'click',
        myprizePageArgs.contentId,
        myprizePageArgs.account,
        myprizePageArgs.portal,
        myprizePageArgs.channel_id,
        accountType,
        myprizePageArgs.nextPageUrl,
        songlistid,
        nameid)
    }
  }
}
