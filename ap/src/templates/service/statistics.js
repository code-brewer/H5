import Url from '../utils/url'
let pathUrl = 'http://huodong.10155.com/apu/activity.jsp?aid=136#!/'
let visitPageCode = pathUrl  // 进入页面URL, 必填
let gatePageCode = pathUrl // 当前页面URL, 必填
let gateModel = '' // 操作入口, 必填
let operate = 'load' // 必填
let contentId = '' // 选填
let account = '' // 选填
let portal = 'wap' // 必填
let nextPageUrl = pathUrl // 去往页面URL, 必填
let channel_id = Url.getArgsFromUrl('channel') || 'channel' // 渠道号, 必填

const homePageArgs = {
    visitPageCode: visitPageCode,
    gatePageCode: gatePageCode, 
    gateModel: pathUrl, 
    operate: operate, 
    contentId: contentId, 
    account: account, 
    portal: portal, 
    channel_id: channel_id, 
    nextPageUrl: pathUrl+':game:myprize'
}

const gamePageArgs = {
    visitPageCode: homePageArgs.gatePageCode,
    gatePageCode: gatePageCode+'game', 
    gateModel: 'home_start_btn', 
    operate: 'click', 
    contentId: contentId, 
    account: account, 
    portal: portal, 
    channel_id: channel_id, 
    nextPageUrl: pathUrl+':success:fail'
}

const successPageArgs = {
    visitPageCode: gamePageArgs.gatePageCode,
    gatePageCode: gamePageArgs.gatePageCode, 
    gateModel: 'game_submit_btn', 
    operate: 'click', 
    contentId: contentId, 
    account: account, 
    portal: portal, 
    channel_id: channel_id, 
    nextPageUrl: pathUrl+'success'
}

const failPageArgs = {
    visitPageCode: gamePageArgs.gatePageCode,
    gatePageCode: gamePageArgs.gatePageCode, 
    gateModel: 'game_submit_btn', 
    operate: 'click', 
    contentId: contentId, 
    account: account, 
    portal: portal, 
    channel_id: channel_id, 
    nextPageUrl: pathUrl+'fail'
}

const myprizePageArgs = {
    visitPageCode: homePageArgs.gatePageCode,
    gatePageCode: homePageArgs.gatePageCode, 
    gateModel: 'home_myprize_btn', 
    operate: 'click', 
    contentId: contentId, 
    account: account, 
    portal: portal, 
    channel_id: channel_id, 
    nextPageUrl: pathUrl+'prize'
}

const getprizePageArgs = {
    visitPageCode: myprizePageArgs.gatePageCode,
    gatePageCode: myprizePageArgs.nextPageUrl, 
    gateModel: 'get_prize_btn', 
    operate: 'click', 
    contentId: contentId, 
    account: account, 
    portal: portal, 
    channel_id: channel_id, 
    nextPageUrl: pathUrl+'receive'
}

const playArgs = {
    visitPageCode: homePageArgs.gatePageCode,
    gatePageCode: gamePageArgs.gatePageCode, 
    gateModel: 'play_btn', 
    operate: operate, 
    contentId: contentId, 
    account: account, 
    portal: portal, 
    channel_id: channel_id, 
    nextPageUrl: gamePageArgs.gatePageCode
}

const correctUrlArgs = {
    visitPageCode: successPageArgs.gatePageCode,
    gatePageCode: successPageArgs.gatePageCode, 
    gateModel: 'view_music_btn', 
    operate: 'click', 
    contentId: contentId, 
    account: account, 
    portal: portal, 
    channel_id: channel_id, 
    nextPageUrl: successPageArgs.gatePageCode
}

const errorUrlArgs = {
    visitPageCode: failPageArgs.gatePageCode,
    gatePageCode: failPageArgs.gatePageCode, 
    gateModel: 'view_answer_btn', 
    operate: 'click', 
    contentId: contentId, 
    account: account, 
    portal: portal, 
    channel_id: channel_id, 
    nextPageUrl: failPageArgs.gatePageCode
}

export default {

    homePage: ()=>{
        if(window.submitStatInfo) {
            submitStatInfo(homePageArgs.visitPageCode, 
            homePageArgs.gatePageCode, 
            homePageArgs.gateModel, 
            homePageArgs.operate, 
            homePageArgs.contentId, 
            homePageArgs.account, 
            homePageArgs.portal, 
            homePageArgs.channel_id, 
            homePageArgs.nextPageUrl)
        }
    },

    gamePage: ()=>{
        if(window.submitStatInfo) {
            submitStatInfo(gamePageArgs.visitPageCode, 
            gamePageArgs.gatePageCode, 
            gamePageArgs.gateModel, 
            gamePageArgs.operate, 
            gamePageArgs.contentId, 
            gamePageArgs.account, 
            gamePageArgs.portal, 
            gamePageArgs.channel_id, 
            gamePageArgs.nextPageUrl)
        }
    },

    successPage: ()=>{
        if(window.submitStatInfo) {
            submitStatInfo(successPageArgs.visitPageCode, 
            successPageArgs.gatePageCode, 
            successPageArgs.gateModel, 
            successPageArgs.operate, 
            successPageArgs.contentId, 
            successPageArgs.account, 
            successPageArgs.portal, 
            successPageArgs.channel_id, 
            successPageArgs.nextPageUrl)
        }
    },

    failPage: ()=>{
        if(window.submitStatInfo) {
            submitStatInfo(failPageArgs.visitPageCode, 
            failPageArgs.gatePageCode, 
            failPageArgs.gateModel, 
            failPageArgs.operate, 
            failPageArgs.contentId, 
            failPageArgs.account, 
            failPageArgs.portal, 
            failPageArgs.channel_id, 
            failPageArgs.nextPageUrl)
        }
    },

    myprizePage: ()=>{
        if(window.submitStatInfo) {
            submitStatInfo(myprizePageArgs.visitPageCode, 
            myprizePageArgs.gatePageCode, 
            myprizePageArgs.gateModel, 
            myprizePageArgs.operate, 
            myprizePageArgs.contentId, 
            myprizePageArgs.account, 
            myprizePageArgs.portal, 
            myprizePageArgs.channel_id, 
            myprizePageArgs.nextPageUrl)
        }
    },

    getprizePage: ()=>{
        if(window.submitStatInfo) {
            submitStatInfo(getprizePageArgs.visitPageCode, 
            getprizePageArgs.gatePageCode, 
            getprizePageArgs.gateModel, 
            getprizePageArgs.operate, 
            getprizePageArgs.contentId, 
            getprizePageArgs.account, 
            getprizePageArgs.portal, 
            getprizePageArgs.channel_id, 
            getprizePageArgs.nextPageUrl)
        }
    },

    playPage: ()=>{
        if(window.submitStatInfo) {
            submitStatInfo(playPageArgs.visitPageCode, 
            playPageArgs.gatePageCode, 
            playPageArgs.gateModel, 
            playPageArgs.operate, 
            playPageArgs.contentId, 
            playPageArgs.account, 
            playPageArgs.portal, 
            playPageArgs.channel_id, 
            playPageArgs.nextPageUrl)
        }
    },

    correctUrl: (url)=>{
        if(window.submitStatInfo) {
            submitStatInfo(correctUrlArgs.visitPageCode, 
            correctUrlArgs.gatePageCode, 
            correctUrlArgs.gateModel, 
            correctUrlArgs.operate, 
            correctUrlArgs.contentId, 
            correctUrlArgs.account, 
            correctUrlArgs.portal, 
            correctUrlArgs.channel_id, 
            url)
        }
    },

    errorUrl: (url)=>{
        if(window.submitStatInfo) {
            submitStatInfo(errorUrlArgs.visitPageCode, 
            errorUrlArgs.gatePageCode, 
            errorUrlArgs.gateModel, 
            errorUrlArgs.operate, 
            errorUrlArgs.contentId, 
            errorUrlArgs.account, 
            errorUrlArgs.portal, 
            errorUrlArgs.channel_id, 
            url)
        }
    }
}