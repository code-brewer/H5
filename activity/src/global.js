import utils from './utils/index.js'
var nowDate = new Date(),
	beginDate = "",
	endDate = "";
beginDate = utils.formatDate(nowDate, "yyyy-MM-dd");
nowDate.setDate(nowDate.getDate() + 1);
endDate = utils.formatDate(nowDate, "yyyy-MM-dd");
window.store = {
	activityConfig: {
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
			defaultBgUrl: "http://www.soyu.cn/fsd/ap/20160819/88_8c7ceb3b_4750_40f3_ad52_06c77e1fe9a0.png"
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
			imgUrl: 'http://www.soyu.cn/fsd/ap/20160906/88_e864f2dc_65f1_46b7_a2fa_5556d73b754d.png',
			imgH: '',
			text: {
				value: '易杰数码',
				color: '',
				fontSize: ''
			},
		},
		banner: {
			imgH: '',
			imgUrl: ''
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
			content: '获奖后，输入手机号码即可领奖，如出现违规作弊行为，经查实，取消参加活动资格'
		},
		rank: {
			value: '查看排名',
			color: '',
			fontSize: '',
		},
		weixinShare: {
			imgUrl: 'http://www.soyu.cn/fsd/ap/20160906/88_98c1f77f_a845_4a10_87be_50033aa29cc4.png',
			title: '',
			description: ''
		},
		qeCode: {
			imgUrl: 'http://www.soyu.cn/fsd/ap/20160906/88_98c1f77f_a845_4a10_87be_50033aa29cc4.png',
			title: '',
		},
		bannerPage: {
			enable: false,
			show: false,
			imgUrl: 'http://www.soyu.cn/fsd/ap/20160906/88_f81a587b_dcf6_4cda_80c8_775349c0b17c.png',
		}
	},
	selectList: [],
	configData: {
		aid: "",
		test: [2, 3, 4],
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
		sharecnt: "0",  //每天可分享加积分次数
        leastscore: "10", //分享最少得分
        tiptopscore: "90", //分享最高得分
		logourl: '',
		isshare: false,
		player: ['W'],
		mid: '',
		status: '6',
		types: '',
		utime: '',
		title: '',
		prizeJson: '',
		isfollow: [],
		delCardIds: "",
		verificationcodestyle: 'picture',
		jspath: ''
	}
}
window.getParams = function() {
	if(window.location.search.length == 0) return {};
	var param = window.location.search.substring(1),
		newObj = {};
	if(param.length != 0) {
		var item = param.split("&");
		for(var i = 0; i < item.length; i++) {
			var key = item[i].substring(0, item[i].indexOf("=")),
				value = decodeURIComponent(item[i].substring(item[i].indexOf("=") + 1));
			newObj[key] = value;
		}
	}
	return newObj;
}