import utils from '../utils/index.js'
var nowDate = new Date(),
  beginDate = "",
  endDate = "";
beginDate = utils.formatDate(nowDate, "yyyy-MM-dd");
nowDate.setDate(nowDate.getDate() + 1);
endDate = utils.formatDate(nowDate, "yyyy-MM-dd");
export default {
  activityConfig: {
   weixinShare: {
      defaultImgUrl: 'http://157.255.23.23/images/fsd/ap/20170615/88_057c689c_0842_42e1_b196_6bd35e32ffd3.png',
      imgUrl: 'http://157.255.23.23/images/fsd/ap/20170615/88_057c689c_0842_42e1_b196_6bd35e32ffd3.png',
      title: '',
      description: ''
    },
    bg: {
      imgUrl: ''
    },
    shortScreen:[{
        imgUrl: 'http://157.255.23.23/images/fsd/ap/20170510/88_3edd6153_ba8e_43fc_9dc9_004210b694cc.jpg',
        toneId: '',
        song: '歌曲',
        url: 'http://157.255.23.23/images/fsd/ap/20170515/88_73667831_c0e1_40dc_a9a3_3b44723d2c6d.mp3',
        ringType:'ring_tone',
        musicId:'',
        musicVipId:''
      },{
        imgUrl: 'http://157.255.23.23/images/fsd/ap/20170510/88_2c2cb0b2_79de_433e_9c26_c607c907103b.jpg',
        toneId: '',
        song: '歌曲',
        url: 'http://157.255.23.23/images/fsd/ap/20170516/88_439104e5_21c0_4b95_a334_bcd2459b9de0.mp3',
        ringType:'ring_tone',
        musicId:'',
        musicVipId:''
      }, {
        imgUrl: 'http://157.255.23.23/images/fsd/ap/20170510/88_825b8de1_72f3_4372_b596_a2005087644a.jpg',
        toneId: '',
        song: '歌曲',
        url: 'http://157.255.23.23/images/fsd/ap/20170515/88_73667831_c0e1_40dc_a9a3_3b44723d2c6d.mp3',
        ringType:'ring_tone',
        musicId:'',
        musicVipId:''
      }],
   switchtype:'heng'

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
