import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

//Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

router.map({
    '/': {
        component: require('./views/newhome.vue')
    },
    '/audit': {
        component: require('./views/Audit.vue')
    },
    '/apply': {
        component: require('./views/ApplyAudit.vue')
    },
    '/progress/:order_num': {
        name: 'progress',
        component: require('./views/AuditProgress.vue')
    },
    '/progressed/:order_num': {
        name: 'progressed',
        component: require('./views/AuditProgressed.vue')
    },
    '/progressing/:order_num': {
        name: 'progressing',
        component: require('./views/AuditProgressing.vue')
    },
    '/failure/:order_num': {
        name: 'failure',
        component: require('./views/AuditProgressFailure.vue')
    },
    '/welcome': {
        component: require('./views/welcome.vue')
    },
    '/newhome': { //首页
        component: require('./views/newhome.vue')
    },
    '/personCen': { //个人中心
        component: require('./views/personalCenter.vue')
    },
    '/myOrder': { //我的订单
        component: require('./views/myOrder.vue')
    },
    '/orderDetail/:oid/:state': { //订单详情
        component: require('./views/orderDetail.vue')
    },
    '/myConchCoin': { //我的贝壳币
        component: require('./views/myConchCoin.vue')
    },
    '/rules': {
        component: require('./views/newrulses.vue')
    },
    '/ConchCoinEditForm': { //编辑我的档案
        component: require('./views/ConchCoinEditForm.vue')
    },
    '/ConchCoinCheckForm': { //查看我的档案
        component: require('./views/ConchCoinCheckForm.vue')
    },
    '/Conchwelfare/:type/:orderid': { //兑换完成页面
        component: require('./views/Conchwelfare.vue')
    },
    '/Welfaretex/:type/:gid': { //type: invented1-手机流量、话费；invented2-其他虚拟产品；entity-实物兑换；0-实物奖品
        component: require('./views/Welfaretex.vue')
    },
    '/Welfaretex1/:oid': { //type: invented1-手机流量、话费；invented2-其他虚拟产品；entity-实物兑换；0-实物奖品
        component: require('./views/Welfaretex1.vue')
    },
    '/presentForm/:gid': {
        component: require('./views/presentForm.vue')
    },

    //礼品模块--start
    '/presentList': {
        component: require('./views/presentList.vue')
    },
    '/presentDetails/:gid/:level/:ConchCoin': {
        component: require('./views/presentDetails.vue')
    },
    '/presentDetails/:gid': {
        component: require('./views/presentDetails.vue')
    },

    //礼品模块--end
    '/gardenRule': { //花园规则
        component: require('./views/gardenRule.vue')
    },
    // '/Welfarechou/:type': { //抽奖页面
    //     component: require('./views/Welfarechou.vue')
    // },
    '/Welfarechou2/:id': { //推荐5个好友新增一次抽奖
        component: require('./views/Welfarechou2.vue')
    },
    '/baby': {
        component: require('./views/baby.vue') 
    },
    '/huanle': {
        component: require('./views/huanle.vue')
    },
    '/daiwa': {
        component: require('./views/daiwa.vue')
    },
    '/diema': {
        component: require('./views/diema.vue')
    },
    '/goodsDetail/:gid/:level/:ConchCoin': { //兑换礼品详情
        component: require('./views/goodsDetail2.vue')
    },
    /*
    推荐好友分享
    */
    '/newSignIn/notConcerned/:id': {
        component: require('./views/signIn/notConcerned.vue')
    },
    '/recommend': {
        component: require('./views/recommend.vue')
    },
    '/recommend2': {
        component: require('./views/recommend2.vue')
    },
    '/recommend2/:id': {
        component: require('./views/recommend2.vue')
    },
    // '/recommend1': {
    //     component: require('./views/recommend1.vue')
    // },
    // '/recommend3': {
    //     component: require('./views/recommend3.vue')
    // },
    // '/recommend3/:id': {
    //     component: require('./views/recommend3.vue')
    // },
    '/recommend4': {
        component: require('./views/recommend4.vue')
    },
    '/recommend4/:id': {
        component: require('./views/recommend4.vue')
    },
    '/ApplyJietu': {
        component: require('./views/ApplyJietu.vue')
    },
    /*
    打卡活动
     */
    // '/newSignIn': {
    //     component: require('./views/newSignIn.vue'),
    //     subRoutes: {
    //         '/plan': {
    //             component: require('./views/signIn/plan.vue')
    //         },
    //         '/plan/:id': {
    //             component: require('./views/signIn/plan.vue')
    //         },
    //         '/template': {
    //             component: require('./views/signIn/template.vue')
    //         },
    //         '/rankingList': {
    //             component: require('./views/signIn/rankingList.vue')
    //         }
    //     }
    // },
    // '/newSignIn/setUp/:day': {
    //     component: require('./views/signIn/setUp.vue')
    // },
    // '/newSignIn/notConcerned/:id': {
    //     component: require('./views/signIn/notConcerned.vue')
    // },
    /*
    bannerUrl
     */
    '/tips': {
        component: require('./views/tips.vue')
    },
    '/tips2': {
        component: require('./views/tips2.vue')
    },
    '/tips3': {
        component: require('./views/tips3.vue')
    },
    '/tips4': {
        component: require('./views/tips4.vue')
    },
    /*
    展示页面
    */
    '/huamayuer': {
        component: require('./views/huamayuer.vue')
    },
    '/hmClass': {
        component: require('./views/hmClass.vue')
    },
    /*
    团购活动-----start
     */
    '/groupMain': {
        component: require('./views/groupShop/main.vue'),
        subRoutes: {
            '/groupShop': {
                component: require('./views/groupShop/groupShop.vue')
            },
            '/groupOrder/:id': {
                component: require('./views/groupShop/groupOrder.vue')
            },
            '/groupAccount': {
                component: require('./views/groupShop/groupAccount.vue')
            },
        }
    },
    '/groupOrderDetails/:id': {
        component: require('./views/groupShop/groupOrderDetails.vue')
    },
    '/groupAddress': {
        component: require('./views/groupShop/groupAddress.vue')
    },
    '/groupAddress/:id': {
        component: require('./views/groupShop/groupAddress.vue')
    },
    '/groupAddressDetails': {
        component: require('./views/groupShop/groupAddressDetails.vue')
    },
    '/groupAddressDetails/:id': {
        component: require('./views/groupShop/groupAddressDetails.vue')
    },
    '/groupQRCode': {
        component: require('./views/groupShop/groupQRCode.vue')
    },
    '/groupQRCode/:id': {
        component: require('./views/groupShop/groupQRCode.vue')
    },
    '/grouprefund/:id': {
        component: require('./views/groupShop/grouprefund.vue')
    },
    '/grouplogistics/:id': {
        component: require('./views/groupShop/grouplogistics.vue')
    },
    '/groupDetails/:id': {
        component: require('./views/groupShop/groupDetails.vue')
    },
    '/groupDetails': {
        component: require('./views/groupShop/groupDetails.vue')
    },
    '/groupDetails2': {
        component: require('./views/groupShop/groupDetails2.vue')
    },
    '/groupRule': {
        component: require('./views/groupShop/groupRule.vue')
    },
    '/groupPay/:id': {
        component: require('./views/groupShop/groupPay.vue')
    },

    /*
    团购活动-----end
     */
    /*
    邀请卡
     */
    '/invitationCard': {
        component: require('./views/invitationCard/invitationCard.vue')
    },
    '/details/:time': {
        component: require('./views/invitationCard/details.vue')
    },
    '/date': {
        component: require('./views/invitationCard/date.vue')
    },
    //组团
    // '/teamsMain/:id': {//入口
    //  component: require('./views/teamsMain.vue')
    // },
    // '/teamsIndex/:status1/:status2': {//status1-10人团  status2-20人团  //开团页面
    //  component: require('./views/teamsIndex.vue')
    // },
    // '/teamsPerson': {//组团主页
    //  component: require('./views/teamsPerson.vue')
    // },
    // '/teamsRule': {//组团规则
    //  component: require('./views/teamsRule.vue')
    // },
    // '/teamsOther': {//组虚拟团
    //  component: require('./views/teamsOther.vue')
    // },
    // '/teamsEnd': {//组团成功并填写了资料
    //  component: require('./views/teamsEnd.vue')
    // },
    // '/teamsForm': {//组团成功填写页
    //  component: require('./views/teamsForm.vue')
    // },
    // '/teamsShare1/:id': {//实物组团分享页
    //  component: require('./views/teamsShare1.vue')
    // },
    // '/teamsShare2/:id': {//虚拟组团分享页
    //  component: require('./views/teamsShare2.vue')
    // },
    // '/teamsDetails': {//查看当天组团信息
    //  component: require('./views/teamsDetails.vue')
    // },
    // '/teamsRecord': {//查看当月组团信息
    //  component: require('./views/teamsRecord.vue')
    // }

})

router.redirect({
    '*': '/'
})

init = function() {
    router.start(require('./views/App.vue'), 'app')
}
