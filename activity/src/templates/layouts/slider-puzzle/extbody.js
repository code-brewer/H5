module.exports = {
	atNum: {
		show: true,
		disabled: false,
		text: {
			valueL: '还有',
			valueR: '份奖品送出',
		}
	},
	participant: {
		show: true,
		disabled: false,
		addValue: "901",
		text: {
			valueL: '已有',
			valueR: '人参与活动'
		}
	},
	common: {
		bg: '#333',
	},
	// 关卡
	levels: [{
		square: 2,
		title: '四宫格',
		isEdit: false,
		time: {
			mins: 0,
			secounds: 10
		},
		score: 5
	}, {
		square: 3,
		title: '九宫格',
		isEdit: false,
		time: {
			mins: 1,
			secounds: 30
		},
		score: 15
	}, {
		square: 4,
		title: '十六宫格',
		isEdit: false,
		time: {
			mins: 2,
			secounds: 15
		},
		score: 25
	}],
	// 拼图图片集合
	images: ['http://211.147.242.132:9008/fsd/ap/20160408/88_5b3413b6_5967_4423_912c_392038e84754.jpg', 'http://211.147.242.132:9008/fsd/ap/20160408/88_72e86062_e9cd_4c82_9ca1_1e94a0576936.jpg', 'http://211.147.242.132:9008/fsd/ap/20160408/88_6b75872c_bc91_4405_8037_2ba3198a71b6.jpg']
}