var App = getApp(),
    utils = require('../../utils/util.js');
Page({
    data: {
        params: '', //url参数
        product: '', //产品数据集合
        isLoading: true,
        loadText: '',
         //保费试算
        bfss: {
            price: '', //投保费用
            planName: '', //产品计划名称
            plan: '', //所选产品计划数据集合
            Period: '请选择', //所选保险期间
            PeriodArr: [], //保险期间展示数据集合
            PeriodKey: [], //保险期间进行逻辑运算的数据集合
            PeriodIndex: 0, //所选的保险期间下标 0-选中保险期间第一个
            AgeGroup: '请选择', //所选年龄范围
            AgeGroupArr: [], //年龄范围展示数据集合
            AgeGroupKey: [], //年龄范围进行逻辑运算的数据集合
            AgeGroupIndex: 0, //所选的年龄范围下标 0-选中年龄范围第一个
            isAge: false, //产品计划是否含有年龄范围 true-含有 false-不含油
            type: '', //AgeGroup-年龄范围 Period-保险期间
            startdate: '请选择', //起保时间
            enddate: '请选择', //终保时间
            isDisabled: false, //禁止选择终保时间
            isYearDisabled: false //承保期为一年时禁止选择
        },
         //保费说明
        bfsm: [],
        //产品特点
        Character: {
            current: '', //当前选择的项
            width: '', //tab宽度百分比
            isTese: false, //产品特色活动状态
        },
        currentDate: '', //基于当前时间加一个自然日的时间点
        themeColor: '', //产品线色系

        tipsText: '',
        tips: false,

        beforeImg: 'http://www.allianz.cn/images/wxApplet/plan.png',
        rightImg: 'http://www.allianz.cn/images/wxApplet/title_right_arrow.png',
        bottomImg: 'http://www.allianz.cn/images/wxApplet/title_bottom_arrow.png',
        spreadOutObj: [],
        share: ''
    },
    /**
     * [初始化数据]
     * @param  {object} e url参数
     *
     */
    onLoad: function(e) {
        var json = [];
        for (var i = 0; i < 4; i++) {
            json.push({
                show: i === 2 ? true : false,
                img: i === 2 ? this.data.bottomImg : this.data.rightImg
            })
        }
        this.setData({
            spreadOutObj: json,
            params: e,
            share: App.getShare('index', e)
        })
    },
    onShow: function() {
        this.getConfig(this.data.params);
    },
    /**
     * [获取配置文件]
     * @param  {Object} e [实际的url参数--产品代码列表和渠道代码和配置文件名]
     *
     */
    getConfig: function(e) {
        App.getProduct(e, (e, product, isRefresh) => {
            /** 页面刷新 **/
            if (isRefresh) {
                var path = "../detail/detail" + App.getParamsStr(this.data.params);
                wx.redirectTo({
                    url: path
                })
                return false;
            }
            var plan = product.Plans[0],
                bfss = this.data.bfss;
            bfss.type = plan.AgeGroup ? 'AgeGroup' : 'Period';

            /** 初始化起保时间和终保时间 **/
            bfss.startdate = new Date().add({day: 1}).format();
            /** 投保时间单位为年时，设置终保时间不可选 **/
            if (plan.Unit == 'year') {
                bfss.enddate = new Date().add({year: 1}).format();
                bfss.isYearDisabled = true;
            }
            
            /** 判断显示保险期间还是年龄范围 **/
            bfss.isAge = bfss.type === 'AgeGroup' ? true : false;
            
            /** 初始化产品特点 **/
            this.setCharacter(product);
            this.setData({
                product: product,
                bfss: bfss,
                currentDate: new Date().add({day: 1}).format(),
                themeColor: App.getStyle(product.TypeEn)
            });
            /** 默认显示第一个计划 **/
            this.changePlan();
        }) 
    },
    /**
     * [设置保险期间或者年龄范围的数据]
     * @param  {Object} obj [选中计划中所属的保险期间枚举或者年龄范围枚举]
     */
    setArr: function(obj) {
        var bfss = this.data.bfss,
            type = bfss.type,
            count = 0;
        bfss[type+'Arr'] = [];
        bfss[type+'Key'] = [];
        bfss[type+'Index'] = 0;
        for (var i in obj) {
            if (!count) {
                bfss[type] = obj[i];
                count++;
            }
            bfss[type+'Arr'].push(obj[i]);
            bfss[type+'Key'].push(i);
        }
    },
    /**
     * [选择产品计划]
     * @param {object} e [页面计划选项自身对象]
     */
    changePlan: function(e) {
        var bfss = this.data.bfss,
            index = e ? e.detail.value : 0,
            type = bfss.type,
            plan = this.data.product.Plans[index]

        bfss.plan = plan;
        this.setArr(plan[bfss.type]);
        bfss.planName = plan.PlanName;

        if (plan.Unit === 'year') {
            bfss.isDisabled = bfss.isYearDisabled = true;
            bfss.enddate = new Date(bfss.startdate).add({year: 1, day: -1}).format();
        } else {
            bfss.isYearDisabled = false;
            this.selectDayFn();
        }

        this.setData({
            bfss: bfss
        })
        this.setPrice();
    },
    /**
     * [选择天数]
     */
    selectDayFn: function() {
        var bfss = this.data.bfss,
            key = bfss.PeriodKey[bfss.PeriodIndex],
            unitVal = bfss.plan.Unit,
            nDay = '', HDay = 1;

        if (key == 'other') {

        } else {
            if(key && key.split('-').length > 1){
                HDay = key.split('-')[1]-1;
            }
            if(key && key.split('-').length == 1){
                HDay = key.split('-')[0]-1;
            }
            if(unitVal == "month"){
                nDay = new Date(bfss.startdate).add({"month": parseInt(HDay+1), "day": -1}).format("yyyy-MM-dd");
            }else{
                nDay = new Date(bfss.startdate).add({"day": HDay}).format("yyyy-MM-dd");
            }
            bfss.isDisabled = HDay == '364' ? true : false;
            if(unitVal == 'year'){
                bfss.isDisabled = true;
            }else{
                bfss.enddate = nDay;
            }
        }
        this.setData({
            bfss: bfss
        })
    },
    /**
     * [选择保险期间]
     */
    changePeriod: function(e) {
        var bfss = this.data.bfss;
        bfss.Period = bfss.PeriodArr[e.detail.value];
        bfss.PeriodIndex = e.detail.value;
        this.setData({
            bfss: bfss
        })
        this.selectDayFn();
        this.setPrice();
    },
    /**
     * 选择年龄范围
     * 
     */
    changeAge: function(e) {
        var bfss = this.data.bfss;
        bfss.AgeGroup = bfss.AgeGroupArr[e.detail.value];
        bfss.AgeGroupIndex = e.detail.value;
        this.setData({
            bfss: bfss
        })
        this.setPrice();
    },
    /**
     * [设置投保费用]
     */
    setPrice: function() {
        var bfss = this.data.bfss,
            plan = bfss.plan,
            index = 0;
        bfss.price = plan.price[bfss[bfss.type+'Index']];
        this.setData({
            bfss: bfss
        })
    },
    /**
     * [选择起保时间]
     */
    startDate: function(e) {
        var bfss = this.data.bfss,
            startdate = +(new Date(e.detail.value).add({hours: 0, minutes: 0, seconds: 0})),
            now = new Date().add({day: 1}).format(),
            nowTime = +(new Date(now).add({hours: 0, minutes: 0, seconds: 0}));

        /** 设置起保时间不能小于当天，以天为单位 **/
        if (startdate < nowTime) {
            this.openTip('起保时间不能小于当前时间');
            return false;
        }

        bfss.startdate = e.detail.value;
        
        /** 如果产品计划投保时间单位为年，直接设置终保时间为一年并不可选 **/
        if (bfss.plan.Unit == 'year') {
            bfss.enddate = new Date(bfss.startdate).add({"year": 1, "day": -1}).format();
            bfss.isDisabled = true;
        } else {
            this.selectDayFn();
        }
        
        this.setData({
            bfss: bfss
        })
    },
    /**
     * [选择终保时间]
     */
    endDate: function(e) {
        var bfss = this.data.bfss,
            key = bfss.PeriodKey[bfss.PeriodIndex],
            unitVal = bfss.plan.Unit,
            nDay = '', LDay = 1, HDay = 1,
            enddate = +(new Date(e.detail.value).add({hours: 0, minutes: 0, seconds: 0}));

        if (unitVal == 'year') {
            return false;
        }

        /** 解析所选保险期间的天数区间 **/
        if(key.split('-').length > 1){
            LDay = key.split('-')[0];
            HDay = key.split('-')[1];
            var date1 = +(new Date(bfss.startdate).add({day: LDay - 1, hours: 0, minutes: 0, seconds: 0}));
            var date2 = +(new Date(bfss.startdate).add({day: HDay - 1, hours: 0, minutes: 0, seconds: 0}));
        }else{
            var date1 = +(new Date(bfss.startdate).add({hours: 0, minutes: 0, seconds: 0}));
            var date2 = +(new Date(bfss.startdate).add({day: key - 1, hours: 0, minutes: 0, seconds: 0}));
        }
        if (enddate < date1 || enddate > date2) {
            this.openTip('终保时间不能超出范围');
            return false;
        }

        bfss.enddate = e.detail.value;

        this.setData({
            bfss: bfss
        })
    },
    /**
     * [初始化产品特点(产品特色、救援服务、理赔服务)]
     */
    setCharacter: function(product) {
        var count = 0;
        for (var i in product.Character) {
            if (!count) {
                this.data.Character.current = i;
            }
            count++;
        }
        this.data.Character.width = (1 / count * 100) + '%';
        this.setData({
            Character: this.data.Character
        })
    },
    /**
     * [弹窗温馨提示]
     */
    openTip: function(text) {
        var self = this;
        this.setData({
            tipsText: text,
            tips: true
        })
        setTimeout(function() {
            self.setData({
                tips: false
            })
        }, 3000)
    },
    /**
     * [切换产品卖点标签页]
     */
    changeTab: function(e) {
        this.data.Character.current = e.currentTarget.dataset.current;
        this.setData({
            Character: this.data.Character
        })
    },
    /**
     * [立即购买点击]
     */
    buyServer: function() {
        wx.navigateTo({
            url: './../form/form' + App.getParamsStr(this.data.params)
        });
    },
    /**
     * [保费试算、保费说明、保障范围、投保须知四个模块的展开和收起功能实现]
     */
    spreadOut: function(e) {
        var index = e.currentTarget.dataset.index,
            obj = this.data.spreadOutObj[index];
        obj.show = !obj.show;
        obj.img = obj.show ? this.data.bottomImg : this.data.rightImg;
        this.setData({
            spreadOutObj: this.data.spreadOutObj
        })
    },
    /**
     * [阅读条款－下载pdf并打开pdf文档]
     */
    term: function(e){
        this.setData({
            isLoading: false,
            loadText: '正在加载...'
        })
        var self = this;
        wx.downloadFile({
            url: App.data.interfacePath + 'resources/'+e.currentTarget.dataset.key+'.pdf',
            success: function(res) {
                wx.openDocument({
                    filePath: res.tempFilePath,
                    success: function(r) {
                        self.setData({
                            isLoading: true
                        })
                    },
                    fail: function() {
                        self.setData({
                            isLoading: true,
                            loadText: '请重新加载'
                        })
                    },
                    complete: function(res){
                        console.log(res)
                    }
                })
            },
            fail: function(res) {
                console.log(res)
            }
        })
    },
    /**
     * [自定义分享]
     */
    onShareAppMessage: function() {
        return {
            title: this.data.share.title,
            path: this.data.share.path
        }
    }
})
