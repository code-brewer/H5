import utils from '../utils/index.js'
var nowDate = new Date(),
  beginDate = "",
  endDate = "";
beginDate = utils.formatDate(nowDate, "yyyy-MM-dd");
nowDate.setDate(nowDate.getDate() + 1);
endDate = utils.formatDate(nowDate, "yyyy-MM-dd");
export default {
  activityConfig: {
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
      bg: '#e3e3e3',
      mainColor: '#ffb81d',
      secondColor: '#fff',
      bgUrl: '',
      btnUrl: '',
      btnStyle: 'boxer',
      btnEnable: false,
      btnColor: '',
      defaultBgUrl: "http://157.255.23.23/images/fsd/ap/20170615/88_34c77635_9c2c_4c84_b3a3_4b64601ac295.png"
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
    //活动规则
    ruleTitle: {
      value: '活动规则',
      color: '',
      fontSize: '',
    },
    //活动规则内容
    ruleCon: {
      value: '',
      color: '',
      fontSize: '',
    },
    //领奖规则内容
    prizeRule: {
      value: '',
      color: '',
      fontSize: ''
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
    //我的奖品
    prizeList: {
      status: 1,
      bgUrl: '',
      btnImgUrl: 'http://157.255.23.23/images/fsd/ap/20170406/88_9e4cf8f2_9fbb_4836_ab44_63ea44492f3b.png',
      titleImgUrl: 'http://157.255.23.23/images/fsd/ap/20170406/88_64997cdb_dcb8_4eda_89fb_39cbca7e250c.png',
      titleTmgH: '',
      unprizeImgUrl: 'http://157.255.23.23/images/fsd/ap/20170406/88_48935cbd_d8c0_4c30_ab6d_c5bf5e3f5903.png',
      unprizeImgH: '',
      typeShow: true
    },
    //闯关成功
    success: {
      titleImg: '',
      titleImgH: '',
      bgUrl: '',
      btnImg: '',
      btnImgH: '',
      completeMusicImg: '',
      completeMusicImgH: '',
      completeLink: '',
      ruleBtn: 'http://157.255.23.23/images/fsd/ap/20170401/88_2b53593a_3c98_44c4_804d_d0ba6cd116d0.png',
      prizeImgUrl: '',
      num: {
        color: '',
        fontSize: '', // rem
        value: 0
      },
      addValue: '3',
      text: {
        valueL: '今天剩余',
        valueR: '次抽奖机会',
        color: '',
        fontSize: '', // rem
      }

    },
    //闯关失败
    fail: {
      bgUrl: '',
      titleImg: '',
      titleImgH: '',
      btnImg: '',
      btnImgH: '',
      completeMusicImg: '',
      completeMusicImgH: '',
      completeLink: ''
    },
    //挑战成功弹框 中奖
    lucky: {
      title: '恭喜你中奖了',
      titleColor: '',
      titleSize: '',
      con: {
        valueL: '恭喜你抽中',
        valueR: '，请到我的奖品处查看中奖信息。',
        color: '',
        fontSize: '', // rem
      },
      btnImg: '',
      btnImgH: '',
    },
    //挑战成功弹框 不中奖
    unlucky: {
      title: '差那么一点',
      titleColor: '',
      titleSize: '',
      con: '差那么一点就中奖了！',
      conColor: '',
      conSize: '',
      btnImg: '',
      btnImgH: '',
    },
    //挑战成功弹框 没机会
    noChange: {
      title: '重复抽奖',
      titleColor: '',
      titleSize: '',
      con: '你已经抽过奖了， 每人只有一次机会哦。',
      conColor: '',
      conSize: '',
      btnImg: '',
      btnImgH: '',
    },
    // 游戏页面
    game: {
      bgUrl: '', // 背景图片
      confirmUrl: '', // 按钮图片
      question: { // 题目
        fontSize: '1.28', // rem
        color: '#fff',
        text: '这首好听到耳朵怀孕的歌是谁唱的?'
      },
      optionType: 'txt', // txt: 文字, img: 图片
      options: {
        img: [{
            url: '',
            correct: true
          },
          {
            url: '',
            correct: false
          },
          {
            url: '',
            correct: false
          },
          {
            url: '',
            correct: false
          }
        ],
        txt: [{
            option: '歌曲一',
            correct: true
          },
          {
            option: '歌曲二',
            correct: false
          },
          {
            option: '歌曲三',
            correct: false
          },
          {
            option: '歌曲四',
            correct: false
          }
        ]
      }, // 选项
      fileType: 'url',
      musicUrl: { // 歌曲链接
        url: '',
        upload: ''
      },
      selected: '2' // 0: 错误, 1: 正确, 2: 未选
    },
    // 领奖页面
    receive: {
      bgUrl: '',
      titleUrl: '',
      btnUrl: ''
    }
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
