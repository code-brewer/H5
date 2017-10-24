import utils from '../utils/index.js'
var nowDate = new Date(),
  beginDate = "",
  endDate = "";
beginDate = utils.formatDate(nowDate, "yyyy-MM-dd");
nowDate.setDate(nowDate.getDate() + 1);
endDate = utils.formatDate(nowDate, "yyyy-MM-dd");
export default {
  activityConfig: {
    defaultImgUrl: 'http://157.255.23.23/images/fsd/ap/20170510/88_48a97045_7d13_4af8_9a98_9e32f16100a1.png',
    allWinrate: 0,
    playerNum: [],
    atNum: {
      show: false,
      disabled: false,
      num: {
        color: '',
        fontSize: '', // rem
        value: 0
      },
      text: {
        valueL: '还有',
        valueR: '张电影票送出',
        color: '',
        fontSize: '', // rem
      }
    },
    common: {
      bg: '#ddca98',
      mainColor: '#ffb81d',
      secondColor: '#fff',
      bgUrl: 'http://157.255.23.23/images/fsd/ap/20170511/88_ee3d7aca_a490_4c90_b968_abcf31858664.jpg',
      btnUrl: '',
      btnStyle: 'boxer',
      btnEnable: false,
      btnColor: '',
      defaultBgUrl: "http://157.255.23.23/images/fsd/ap/20170511/88_ee3d7aca_a490_4c90_b968_abcf31858664.jpg"
    },
    participant: {
      show: false,
      disabled: false,
      num: {
        color: '',
        fontSize: '', // rem
        value: 0
      },
      addValue: '900',
      text: {
        valueL: '已有',
        valueR: '人参与',
        color: '',
        fontSize: '', // rem
      }
    },
    logo: {
      show: true,
      isText: 'false',
      imgUrl: 'http://157.255.23.23/images/fsd/ap/20170615/88_504fd05e_c0d5_4b90_9595_f964d5f3306a.png',
      imgH: '',
      text: {
        value: '易杰数码',
        color: '',
        fontSize: ''
      },
    },
    banner: {
      imgH: '',
      imgUrl: '',
      show: true
    },
    box: {
      imgH: '',
      imgUrl: ''
    },
    bg: {
      imgUrl: ''
    },
    startBtn: {
      text: {
        value: '点击参与活动',
        color: '',
        fontSize: ''
      },
      bg: {
        color: '',
        imgUrl: '',
        imgH: ''
      }
    },
    prizeBtn: {
      text: {
        value: '去领奖',
        color: '#fff',
        fontSize: 1.3
      },
      bg: {
        color: '#ffb81d',
        imgUrl: ''
      }
    },
    rule: {
      value: '活动规则',
      color: '',
      fontSize: '',
      content: '获奖后，输入手机号码即可领奖，如出现违规作弊行为，经查实，取消参加活动资格',
      imgUrl: 'http://157.255.23.23/images/fsd/ap/20170401/88_2b53593a_3c98_44c4_804d_d0ba6cd116d0.png'
    },
    rank: {
      value: '查看排名',
      color: '',
      fontSize: '',
    },
    weixinShare: {
      defaultImgUrl: 'http://157.255.23.23/images/fsd/ap/20170615/88_057c689c_0842_42e1_b196_6bd35e32ffd3.png',
      imgUrl: 'http://157.255.23.23/images/fsd/ap/20170615/88_057c689c_0842_42e1_b196_6bd35e32ffd3.png',
      title: '',
      description: ''
    },
    qeCode: {
      defaultImgUrl: 'http://157.255.23.23/images/fsd/ap/20170615/88_057c689c_0842_42e1_b196_6bd35e32ffd3.png',
      imgUrl: '',
      title: '',
      disabled: false,
      show: true,
    },
    bannerPage: {
      defaultImgUrl: 'http://157.255.23.23/images/fsd/ap/20170615/88_c39930f8_b270_4966_8c30_795c83e5832d.png',
      enable: false,
      show: false,
      imgUrl: '',
    },
    enterPhone: false,
    musicPos: 0,
    musics: [],
    history: [{
      imgUrl: '',
      href: '#'
    }, {
      imgUrl: '',
      href: '#'
    }],
    history_a: {
      imgUrl: 'http://157.255.23.23/images/fsd/ap/20170602/88_a71159a2_9795_4dc2_96cb_9d2ea42bdd05.jpg',
      defaultImgUrl: 'http://157.255.23.23/images/fsd/ap/20170602/88_a71159a2_9795_4dc2_96cb_9d2ea42bdd05.jpg',
      href: ''
    },
    history_b: {
      imgUrl: 'http://157.255.23.23/images/fsd/ap/20170602/88_afe9f852_9204_4421_86ef_4c7ae5ac2c88.jpg',
      defaultImgUrl: 'http://157.255.23.23/images/fsd/ap/20170602/88_afe9f852_9204_4421_86ef_4c7ae5ac2c88.jpg',
      href: ''
    },
    more: ''
  },
  selectList: [],
  configData: {
    aid: "",
    firstGidcnt: '0',
    gidcnt: '0',
    color: '',
    ctime: '',
    des: '',
    prizeway: 'false',
    starttime: beginDate,
    endtime: endDate,
    extbody: '',
    isprize: '0',
    sharecnt: "0", //每天可分享加积分次数
    leastscore: "10", //分享最少得分
    tiptopscore: "90", //分享最高得分
    logourl: '',
    isshare: false,
    player: ['M'],
    mid: '',
    status: '6',
    types: '',
    utime: '',
    title: '',
    prizeJson: '',
    isfollow: [],
    delCardIds: "",
    verificationcodestyle: 'picture',
    jspath: '',
    channel: [], // 渠道号
  }
}
