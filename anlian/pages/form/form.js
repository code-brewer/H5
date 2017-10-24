var utils = require('../../utils/util.js'),
    JcModule = require('./JcModule/JcModule.js'),
    industrySelect = require('./industrySelect/industrySelect.js'),
    healthObj = require('./Health/Health.js'),
    App = getApp();
Page({
    data: {
        isMask: false,
        params: '', //url参数
        product: '', //产品数据集合
        currentDate: '', //基于当前时间加一个自然日的时间点
        tips: false, //温馨提示弹窗活动状态
        tipsText: "", //温馨提示文本
        isLoading: true,
        loadText: '提交订单中',
        /**控制表单的显示和隐藏**/
        nextOrSuccesss: '下一步',
        plan: true, //选择保险计划模块活动状态 true-显示 false-隐藏
        applicant: false, //投保人表单模块活动状态 true-显示 false-隐藏
        bool: false, //被保人表单模块活动状态 true-显示 false-隐藏
        applicantTop: false, //是否显示投保人表单标题活动状态 true-显示 false-隐藏
        planRevamp: false, //是否显示修改选择保险计划模块的按钮 true-显示 false-隐藏
        applicantTopRevamp: false, //是否显示修改选择投保人表单模块的按钮 true-显示 false-隐藏
        insuranceTime: false, //保险期间活动状态
        totalPremium: 0, //总保费
        themeColor: '', //产品线色系
        isValidateCode: false, //是否已经校验了手机 true-已通过 false-未通过
        sendCodeTime: 0, //发送短信时效
        sendCodeTimer: null, //发送短信定时器
        //投保基本信息
        insureMessage: {
            plan: '', //产品计划数据集合
            PlanName: '', //产品计划名称
            PlanCode: '', //产品计划代码

            TimeArr: [], //保险期间列表
            TimeKey: '', //保险期间列表key值
            Time: '', //保险期间选择文本
            TimeDisabled: false, //保险期间是否可编辑  true-不可编辑 false-可编辑

            EffectiveDate: '', //起保时间
            EffectiveDateFormat: '', //起保时间格式化（投保确认接口需要的格式）
            ExpireDate: '', //终保时间
            ExpireDateFormat: '', //终保时间格式化（投保确认接口需要的格式）
            ExpireDateDisabled: false //终保时间是否可编辑  true-不可编辑 false-可编辑

        },
        //投保人信息
        applicantMessage: {
            applicantName: '', //投保人姓名
            cardArr: ['身份证', '护照', '其他'],
            card: '请选择', //证件类型
            cardNumber: '', //证件号码
            birthday: '请选择', //出生日期
            clientGender: true, //性别
            phone: '', //手机号码
            email: '', //邮箱
            same: false, //被保人同投保人是否勾选 true-已勾选 false-未勾选
            read: false, //已阅读投保须知和保险条款是否勾选 true-已勾选 false-未勾选
            phoneCode: '', //手机验证码
            ownNotAllowed: false //限制被保人不能同投保人，禁止勾选被保人同投保人按钮 true-禁止 false-不禁止
        },
        other: [ //被保人信息
            {
                relationArr: ['父母', '配偶', '子女', '其他'],
                relation: '请选择', //与投保人关系
                recognizeeName: '', //被保人姓名
                cardArr: ['身份证', '护照', '其他'],
                card: '请选择', //被保人证件类型
                cardNumber: '', //被保人证件号码
                birthday: '请选择', //被保人出生日期
                recognizeeGender: true, //被保人性别 true-男 false-女
                phone: '', //被保人手机号码
                id: 0, //被保人下标 0-第一个被保人
                industryArr: [], //行业数据集合
                industry: '请选择', //所选行业
                classesArr: [], //职业类别数据集合
                classes: '请选择', //所选职业类别
                professionArr: [], //职业名称数据集合
                profession: '请选择', //所选职业名称
                industryCode: '', //职业代码（投保确认接口所需字段）
                industrySelect: false, //该产品是否具有职业选择模块 true-具有 false-不具有
                jobClassif: '', //职业分类
                isHealth: false, //该产品是否具有健康问卷模块 true-具有 false-不具有
                healthStatement: [] //健康问卷答案集合
            }
        ],
        //财产信息
        isJc: false, //该产品是否是家财险 true-是 false-不是
        propertyMessage: {
            provinceArr: [], //省份数据集合
            province: '请选择', //所选省份
            provinceCode: '', //所选省份代码（投保确认接口所需字段）
            cityArr: [], //城市数据集合
            city: '请选择', //所选城市
            cityCode: '', //所选城市代码（投保确认接口所需字段）
            subCityCode: '', //地区代码（投保确认接口所需字段）
            areaArr: [], //县或镇数据集合
            area: '请选择', //所选县或镇
            areaCode: '', //所选县或镇代码（投保确认接口所需字段）
            address: '', //具体地址
            code: '', //邮政编码
            detail: [false, false, false, false, false], //家财险模块问卷答案
            remark: '' //备注
        },
        share: '' //分享文案
    },
    /**
     * [初始化数据]
     * @param  {object} e [url参数]
     *
     */
    onLoad: function(e) {
        this.setData({
            params: e,
            share: App.getShare('index', e)
        })
    },
    /**
     * [调用发起读取配置文件请求的函数]
     */
    onShow: function() {
        this.getConfig(this.data.params);
    },
    /**
     * [发起读取配置文件的请求]
     * @param  {obj} e url参数
     *
     */
    getConfig: function(e) {
        App.getProduct(e, (e, product, isRefresh) => {
            /** 页面刷新 **/
            if (isRefresh) {
                var path = "../form/form" + App.getParamsStr(this.data.params);
                wx.redirectTo({
                    url: path
                })
                return false;
            }
            var plan = product.Plans[0];

            /** 初始化证件类型 **/
            if (product.IdNoType) {
                var arr = [];
                for (var i in product.IdNoType) {
                    arr.push(i);
                }
                this.data.applicantMessage.cardArr = arr;
                this.data.other[0].cardArr = arr.concat();
            }

            /** 初始化投保人与被保人的关系 **/
            var arr1 = ['父母', '配偶', '子女', '其他'];
            if (product.Relation) {
                arr1 = [];
                for (var i in product.Relation) {
                    if (i !== '本人') {
                        arr1.push(i);
                    }
                }
                if (!product.Relation['本人']) {
                    this.data.applicantMessage.ownNotAllowed = true;
                }
            }
            this.data.other[0].relationArr = arr1;

            /** 初始化健康问卷模块选项为是 **/
            this.data.other[0].healthStatement = [];
            if (product.Health) {
                for (var i in product.HealthList) {
                    this.data.other[0].healthStatement.push(true);
                }
            }

            this.setData({
                applicantMessage: this.data.applicantMessage,
                other: this.data.other,
                currentDate: new Date().add({day: 1}).format('yyyy-MM-dd'),
                insureMessage: this.data.insureMessage,
                themeColor: App.getStyle(product.TypeEn),
                product: product
            })

            this.initPlan(product);

            /** 意外险含职业类型时初始化职业类型选择模块 **/
            if (product.TypeEn.indexOf('yw') > -1 && product.Job) {
                industrySelect.init(this);
            } else if (product.TypeEn === 'jc') {
                JcModule.init(this);
                this.setData({
                    isJc: true
                })
            }
        });
    },
    /** 保险计划--start **/
    /**
     * [初始化保险计划模块]
     */
    initPlan: function(product) {
        var plan = product.Plans[0],
            insureMessage = this.data.insureMessage,
            insuranceTime = false;

        /** 初始化起保时间 **/
        insureMessage.EffectiveDate = new Date().add({day: 1}).format();

        /** 初始化保险计划 **/
        this.changePlans();

        /** 初始化保险期间 **/
        this.changeTime();


        /** 动力无限需要显示保险期间 **/
        if (plan.Period) {
            insuranceTime = true;
        }
        this.setData({
            insureMessage: insureMessage,
            insuranceTime: insuranceTime
        })

    },
    /**
     * [选择保险计划]
     */
    changePlans: function(e) {
        var index = e ? e.detail.value : 0,
            plan = this.data.product.Plans[index],
            insureMessage = this.data.insureMessage,
            applicantMessage = this.data.applicantMessage,
            other = this.data.other,
            type = plan.AgeGroup ? 'AgeGroup' : 'Period',
            TimeArr = [];

        insureMessage.plan = plan;

        /** 计划如果有性别限制，根据plan.Sex为M或者F设置默认性别并限制F或者M不可选 **/
        if (plan.Sex) {
            applicantMessage.clientGender = plan.Sex === 'M' ? true : false;
            other.forEach(item => {
                item.recognizeeGender = plan.Sex === 'M' ? true : false;
            })
        }
        
        /** 设置保险期间或者年龄范围-start **/
        var obj = plan[type];
        for (var i in obj) {
            TimeArr.push({
                'key': i,
                'value': obj[i]
            })
        }
        insureMessage.TimeArr = TimeArr;
        insureMessage.Time = plan.Unit == 'year' ? '全年' : TimeArr[0].value;
        insureMessage.TimeKey = TimeArr[0].key;
        insureMessage.TimeDisabled = plan.Unit == 'year' ? true : false;
        /** 设置保险期间-end **/

        /** 设置终保时间-start **/
        if (plan.Unit == 'year') {
            insureMessage.ExpireDateDisabled = true;
            insureMessage.ExpireDate = new Date(insureMessage.EffectiveDate).add({year: 1, day: -1}).format();
        } else {
            this.selectDayFn();
        }
        /** 设置终保时间-end **/

        this.setData({
            insureMessage: insureMessage,
            applicantMessage: applicantMessage,
            other: other
        })

        /** 设置投保费用-start **/
        this.setPrice();
        /** 设置投保费用-end **/
    },
    /**
     * [选择保险期间]
     */
    changeTime: function(e) {
        var index = e ? e.detail.value : 0,
            plan = this.data.product.Plans[index],
            insureMessage = this.data.insureMessage;

        insureMessage.Time = insureMessage.TimeArr[index].value;
        insureMessage.TimeKey = insureMessage.TimeArr[index].key;

        this.setData({
            insureMessage: insureMessage
        })

        this.selectDayFn();

        /** 设置投保费用-start **/
        this.setPrice();
        /** 设置投保费用-end **/
    },
    /**
     * [更新终保时间为所选保险期间最大天数]
     */
    selectDayFn: function() {
        var insureMessage = this.data.insureMessage,
            key = insureMessage.TimeKey,
            unitVal = insureMessage.plan.Unit,
            nDay = '', HDay = 1;

        if(key && key.split('-').length > 1){
            HDay = key.split('-')[1]-1;
        }
        if(key && key.split('-').length == 1){
            HDay = key.split('-')[0]-1;
        }
        if(unitVal == "month"){
            nDay = new Date(insureMessage.EffectiveDate).add({"month": parseInt(HDay+1), "day": -1}).format();
        }else{
            nDay = new Date(insureMessage.EffectiveDate).add({"day": HDay}).format();
        }
        insureMessage.ExpireDateDisabled = HDay == '364' ? true : false;
        if(unitVal == 'year'){
            insureMessage.ExpireDateDisabled = true;
        }else{
            insureMessage.ExpireDate = nDay;
        }

        this.setData({
            insureMessage: insureMessage
        })
    },
    /**
     * [选择起保时间]
     * @param  {object} e 起保时间选项的实例对象
     */
    startDate: function(e) {

        var insureMessage = this.data.insureMessage,
            startdate = +(new Date(e.detail.value).add({hours: 0, minutes: 0, seconds: 0})),
            now = new Date().add({day: 1}).format(),
            nowTime = +(new Date(now).add({hours: 0, minutes: 0, seconds: 0})),
            product = this.data.product;

        /** 校验所选时间是否小于当天 **/
        if (startdate < nowTime) {
            this.openTip('起保时间不能小于当前时间');
            return false;
        }

        /** 在起保时间有最大值限制的情况下，校验是否超出最大值 **/
        if (product.MaxEffectiveDate) {
            var max = +(new Date(now).add({day: product.MaxEffectiveDate, hours: 0, minutes: 0, seconds: 0}));
            if (startdate > max) {
                this.openTip('起保时间须在投保日的'+product.MaxEffectiveDate+'天内');
                return false;
            }
        }

        insureMessage.EffectiveDate = e.detail.value;
        
        /** 判断投保时间单位是否为年 **/
        if (insureMessage.plan.Unit == 'year') {
            insureMessage.ExpireDate = new Date(insureMessage.EffectiveDate).add({"year": 1, day: -1}).format();
            insureMessage.ExpireDateDisabled = true;
        } else {
            this.selectDayFn();
        }

        this.setData({
            insureMessage: insureMessage
        })
    },
    /**
     * [选择终保时间]
     * @param  {object} e 终保时间选项的实例对象
     */
    endDate: function(e) {

        var insureMessage = this.data.insureMessage,
            key = insureMessage.TimeKey,
            unitVal = insureMessage.plan.Unit,
            nDay = '', LDay = 1, HDay = 1,
            enddate = +(new Date(e.detail.value).add({hours: 0, minutes: 0, seconds: 0}));

        if (unitVal == 'year') {
            return false;
        }
        if (key == 'other') {
            
        } else { /** 校验所选时间是否超出保险期间区间范围 **/
            if(key.split('-').length > 1){
                LDay = key.split('-')[0];
                HDay = key.split('-')[1];
                var date1 = +(new Date(insureMessage.EffectiveDate).add({day: LDay - 1, hours: 0, minutes: 0, seconds: 0}));
                var date2 = +(new Date(insureMessage.EffectiveDate).add({day: HDay - 1, hours: 0, minutes: 0, seconds: 0}));
            }else{
                var date1 = +(new Date(insureMessage.EffectiveDate).add({hours: 0, minutes: 0, seconds: 0}));
                var date2 = +(new Date(insureMessage.EffectiveDate).add({day: key - 1, hours: 0, minutes: 0, seconds: 0}));
            }
            if (enddate < date1 || enddate > date2) {
                this.openTip('终保时间不能超出范围');
                return false;
            }
        }

        insureMessage.ExpireDate = e.detail.value;

        this.setData({
            insureMessage: insureMessage
        })
    },
    /** 保险计划--end **/
    /**
     * [计算投保费用]
     */
    setPrice: function() {
        var plan = this.data.insureMessage.plan,
            insureMessage = this.data.insureMessage,
            applicantMessage = this.data.applicantMessage,
            other = this.data.other,
            price = 0;
        /** 投保时间单位为年 **/
        if (plan.Unit === 'year') {
            if (plan.AgeGroup) {
                /** 投保人和被保险人是同一人 **/
                if (applicantMessage.same) {
                    var ages = this.getTimeInfo(applicantMessage.birthday, insureMessage.EffectiveDate).year,
                        count = 0;
                    for (var i in plan.AgeGroup) {
                        var arr = i.split('-'),
                            left = i.split('-')[0],
                            right = i.split('-')[1];
                        if (arr.length === 1) {
                            price = plan.price[ages];
                        } else if (ages >= left && ages <= right) {
                            price = plan.price[count];
                        }
                        count++;
                    }
                } else { /** 计算所有被保人的投保费用 **/
                    other.forEach(item => {
                        if (item.birthday != '请选择') {
                            var ages = this.getTimeInfo(item.birthday, insureMessage.EffectiveDate).year,
                                count = 0;
                            for (var i in plan.AgeGroup) {
                                var arr = i.split('-'),
                                    left = i.split('-')[0],
                                    right = i.split('-')[1];
                                if (arr.length === 1 && ages == i) {
                                    price += (+(plan.price[ages].replace(/,/g, '')));
                                } else if (ages >= left && ages <= right) {
                                    price += (+(plan.price[count].replace(/,/g, '')));
                                }
                                count++;
                            }
                        }
                    })
                }
            } else {
                price = +(plan.price[0].replace(/,/g, ''));
                price *= this.data.other.length;
            }
        } else {
            if (plan.Period) {
                var count = 0;
                for (var i in plan.Period) {
                    if (i === this.data.insureMessage.TimeKey) {
                        price = +(plan.price[count].replace(/,/g, ''));
                    }
                    count++;
                }
                price *= this.data.other.length;
            }
        }
        this.setData({
            totalPremium: this.formatNumberRgx(price)
        });
    },
    formatNumberRgx: function(num) {  
        var parts = num.toString().split(".");  
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
        return parts.join(".");
    },
    /** 投保人性别选择 **/
    /**
     * [投保人性别选项男的选择]
     */
    changeGenderBoy: function() {
        var Sex = this.data.insureMessage.plan.Sex;
        if (Sex && Sex === 'F' && applicantMessage.same) {
            return;
        }
        this.data.applicantMessage.clientGender = true;
        this.setData({
            applicantMessage: this.data.applicantMessage
        })
    },
    /**
     * [投保人性别选项女的选择]
     */
    changeGenderGirl: function() {
        var Sex = this.data.insureMessage.plan.Sex;
        if (Sex && Sex === 'M' && this.data.applicantMessage.same) {
            return;
        }
        this.data.applicantMessage.clientGender = false;
        this.setData({
            applicantMessage: this.data.applicantMessage
        })
    },
    /** 被投保人性别选择 **/
    /**
     * [被保人性别选项男的选择]
     */
    changeGenderBoy2: function(e) {
        var Sex = this.data.insureMessage.plan.Sex;
        if (Sex && Sex === 'F') {
            return;
        }
        this.data.other[e.currentTarget.dataset.id].recognizeeGender = true;
        this.setData({
            other: this.data.other
        })
    },
    /**
     * [被保人性别选项女的选择]
     */
    changeGenderGirl2: function(e) {
        var Sex = this.data.insureMessage.plan.Sex;
        if (Sex && Sex === 'M') {
            return;
        }
        this.data.other[e.currentTarget.dataset.id].recognizeeGender = false;
        this.setData({
            other: this.data.other
        })
    },
    /** 投保表单验证-start **/
    /**
     * [根据传入参数开始时间和结束时间，计算以天为单位的值，以年为单位的值以及根据年份判断是否成年人]
     * @param  {string} dateStart 开始时间
     * @param  {string} dateEnd   结束时间
     *
     * @return {object}           计算后的数据集合
     */
    getTimeInfo: function(dateStart, dateEnd){
        dateStart = typeof dateStart == 'string' ? new Date(dateStart.replace(/-/g,'/')) : dateStart;
        dateEnd = typeof dateEnd == 'string' ? new Date(dateEnd.replace(/-/g,'/')) : dateEnd;
        var info = {};
        info.totalDays = (dateEnd.getTime() - dateStart.getTime())/1000/60/60/24+1;
        info.year = dateEnd.getFullYear() - dateStart.getFullYear()-((dateEnd.getMonth() < dateStart.getMonth()|| dateEnd.getMonth() == dateStart.getMonth() && dateEnd.getDate() < dateStart.getDate())?1:0);
        info.ageType = info.year >= 18 ? 'adult' : 'child';
        return info;
    },
    /**
     * [表单下一步和提交订单按钮点击]
     */
    nextStep: function() {
        var product = this.data.product;

        if (this.data.plan) { //第一次点击下一步

            if (this.data.isJc) {
                if (!JcModule.check()) {
                    return false;
                }
            }
            this.setData({
                bool: false,
                plan: false,
                applicant: true,
                applicantTop: true,
                nextOrSuccesss: '下一步',
                planRevamp: true
            });

        } else if (this.data.applicant) { //第二次点击下一步

            var message = this.data.applicantMessage;

            if (!message.applicantName || !message.cardNumber || !message.phone || !message.email || message.card == '请选择' || message.birthday == '请选择') {
                this.openTip('亲,请把信息填完整!');
                return
            }
            if (message.card === '身份证') {
                if (utils.validate.checkIdcard(message.cardNumber) !== "ok") {
                    this.openTip('亲,请输入正确的身份证号!');
                    return
                }
            } else {
                if (message.cardNumber.length == 0) {
                    this.openTip('亲,请输入正确的证件号!');
                    return;
                }
            }
            if(this.getTimeInfo(message.birthday, new Date().format("yyyy-MM-dd")).ageType == 'child'){
                this.openTip('亲，投保人必须满18周岁！');
                return;
            }
                
            if (!utils.validate.checkTel(message.phone)) {
                this.openTip('亲,请输入正确的手机号!!');
                return
            }
            if (!utils.validate.checkMail(message.email.replace(/\s*/g, ''))) {
                this.openTip('亲,请输入正确的邮箱!!');
                return
            }
            if (!message.read) {
                this.openTip('亲,请勾选已阅读投保须知和条款!!');
                return
            }
            if (!this.data.isValidateCode) {
                this.openTip('请验证手机号码');
                return;
            }
            if (message.same) { //选被保人同投保人
                var other =  this.data.other[0];
                other.recognizeeName = message.applicantName;
                other.card = message.card;
                other.cardNumber = message.cardNumber;
                other.birthday = message.birthday;
                other.recognizeeGender = message.clientGender;
                other.phone = message.phone;
                /** 验证被保险人年龄 **/
                var insureMessage = this.data.insureMessage;
                if(this.getTimeInfo(message.birthday, insureMessage.EffectiveDate).year > insureMessage.plan.AgeMax){
                    this.openTip('亲，被保人年龄大于'+insureMessage.plan.AgeMax+'周岁！');
                    return;
                }
                if(insureMessage.plan.DayMin && this.getTimeInfo(message.birthday, insureMessage.EffectiveDate).totalDays < insureMessage.plan.DayMin){
                    this.openTip('亲，被保人年龄小于'+insureMessage.plan.DayMin+'天！');
                    return;
                }
                if(insureMessage.plan.AgeMin && this.getTimeInfo(message.birthday, insureMessage.EffectiveDate).year < insureMessage.plan.AgeMin){
                    this.openTip('亲，被保人年龄小于'+insureMessage.plan.AgeMin+'周岁！');
                    return;
                }
                /** 意外险且有职业类型选择 **/
                if (product.TypeEn.indexOf('yw') > -1 && product.Job) {
                    if (other.industrySelect) {
                        if (!industrySelect.check(0)) {
                            return false;
                        }
                    }
                }
                /** 健康类型为true **/
                if (product.Health) {
                    if (!healthObj.check(this,0)) {
                        return false;
                    }
                }
                this.submit();
            } else {
                /** 意外险且有职业类型选择 **/
                if (product.TypeEn.indexOf('yw') > -1 && product.Job) {
                    this.data.other[0].industrySelect = true;
                }
                /** 健康类型为true **/
                if (product.Health) {
                    this.data.other[0].isHealth = true;
                }
                this.setData({
                    other: this.data.other,
                    bool: true,
                    plan: false,
                    applicant: false,
                    applicantTopRevamp: true,
                    nextOrSuccesss: '提交订单',
                })
            }
        } else { //点击提交订单
            this.submit();
        }
    },
    /**
     * [整合投保确认接口的报文和校验多个被保人表单信息]
     */
    submit: function() {
        var m = this.data.applicantMessage,
            p = this.data.propertyMessage,
            product = this.data.product,
            isJc = product.TypeEn === 'jc' ? true : false,
            insureMessage = this.data.insureMessage,
            self = this,
            clickstatus = {bool: false},
            agencyCode = '';
        if (this.data.params.c && this.data.params.c !== 'undefined') {
            agencyCode = this.data.params.c;
        } else {
            agencyCode = this.data.params.defaultAgencyCode || '';
        }
        var options = {
            body: {
                policy: {
                    effectiveDate: new Date(insureMessage.EffectiveDate).add({hours: 0, minutes: 0, seconds: 0}).format('yyyyMMddHHmmss'),
                    expireDate: new Date(insureMessage.ExpireDate).add({hours: 23, minutes: 59, seconds: 59}).format('yyyyMMddHHmmss'),
                    PlanCode: insureMessage.plan.PlanCode,
                    planName: product.Name + '-' + insureMessage.plan.PlanName,
                    productID: product.ProductID,
                    smallPic: product.SmallPic
                },
                agency: {
                    agencyCode: agencyCode
                },
                policyHolder: {
                    policyHolderType: product.PolicyHolderType,
                    policyHolderName: m.applicantName,
                    pHIdType: product.IdNoType ? product.IdNoType[m.card] : ({'身份证': 1, '护照': 2, '其他': 3, '大陆通行证': 3, '出生证': 3})[m.card],
                    pHIdNumber: m.cardNumber,
                    pHBirthDate: new Date(m.birthday).format(isJc ? 'yyyyMMdd' : 'yyyyMMddHHmmss'),
                    pHTelephone: m.phone,
                    pHEmail: m.email
                }
            },
            head: {
                "requestType": product.TypeEn === 'jc' ? '2002' : '0002',
                "user": this.data.params.user || this.data.params.defaultAgencyUser
            }
        }
        var obj = options.body.policy,
            policyHolder = options.body.policyHolder;
        /** 当产品为家财险类型时，报文添加家财险相应报文 **/
        if (this.data.product.TypeEn === 'jc') {
            obj.locCountry = 'CN';
            obj.locProvince = p.provinceCode;
            obj.locCity = p.cityCode;
            obj.locSubCity = p.subCityCode;
            obj.locArea = p.areaCode;
            obj.locHouseholds = p.address;
            obj.locPostCode = p.code;
            obj.remark = p.remark;
            obj.questions = p.detail.join(',').replace(/true/g, '是');
            policyHolder.reqFaPiao = 0;
            policyHolder.reqMail = 0;
        } else {
            obj.groupSize = this.data.other.length;
        }
        /** 当存在多个被保人时，校验每一个被保人并整合报文 **/
        if (!m.same) { 
            if (product.TypeEn != 'jc') {
                options.body.insuredList = {
                    Insured: []
                };
            } 
            for (var i = 0; i < this.data.other.length; i++) {
                var d = this.data.other[i];
                if (!d.recognizeeName || !d.cardNumber || !d.phone || d.card == '请选择' || d.birthday == '请选择' || d.relation == '请选择') {
                    this.openTip('亲,请把信息填完整!');
                    return
                }
                if (d.card === '身份证') {
                    if (utils.validate.checkIdcard(d.cardNumber) !== "ok") {
                        this.openTip('亲,请输入正确的身份证号!');
                        return
                    }
                } else {
                    if (d.cardNumber.length == 0) {
                        this.openTip('亲,请输入正确的证件号!');
                        return
                    }
                }
                if (!utils.validate.checkTel(d.phone)) {
                    this.openTip('亲,请输入正确的手机号!!');
                    return
                }
                /** 验证被保险人年龄 **/
                if(this.getTimeInfo(d.birthday, insureMessage.EffectiveDate).year > insureMessage.plan.AgeMax){
                    this.openTip('亲，被保人年龄大于'+insureMessage.plan.AgeMax+'周岁！');
                    return;
                }
                if(insureMessage.plan.DayMin && this.getTimeInfo(d.birthday, insureMessage.EffectiveDate).totalDays < insureMessage.plan.DayMin){
                    this.openTip('亲，被保人年龄小于'+insureMessage.plan.DayMin+'天！');
                    return;
                }
                if(insureMessage.plan.AgeMin && this.getTimeInfo(d.birthday, insureMessage.EffectiveDate).year < insureMessage.plan.AgeMin){
                    this.openTip('亲，被保人年龄小于'+insureMessage.plan.AgeMin+'周岁！');
                    return;
                }
                /** 当产品为意外险时且有职业类型选择 **/
                if (product.TypeEn.indexOf('yw') > -1 && product.Job) {
                    if (d.industrySelect) {
                        if (!industrySelect.check(i)) {
                            return false;
                        }
                    }
                }
                /** 产品存在健康问卷模块时，校验健康问卷 **/
                if (product.Health) {
                    if (!healthObj.check(this, i)) {
                        return false;
                    }
                }
                var h = '';
                if (product.Health) {
                    h = d.healthStatement.join(',').replace(/false/g, '否');
                    h = h.replace(/true/g, '是');
                }
                var json = {
                    insuredId: i + 1,
                    insuredName: d.recognizeeName,
                    insuredType: isJc ? 'I' : this.getInsuredType(this.data.insureMessage.EffectiveDate, d.birthday),
                    idType: product.IdNoType ? product.IdNoType[d.card] : ({'身份证': 1, '护照': 2, '其他': 3, '大陆通行证': 3, '出生证': 3})[d.card],
                    idNumber: d.cardNumber,
                    birthDate: new Date(d.birthday).format(isJc ? 'yyyyMMdd' : 'yyyyMMddHHmmss'),
                    mobile: d.phone,
                    email: d.email,
                    gender: d.recognizeeGender ? 'M' : 'F',
                    policyholderInsuredRelation: product.Relation ? product.Relation[d.relation] : ({'父母': '02', '配偶': '04', '子女': '03', '其他亲属': '05', '雇佣关系': '06', '其他': '07'})[d.relation],
                    occupationCode: d.industryCode,
                    jkQuestions: h
                };
                if (isJc) {
                    options.body.Insured = json;
                } else {
                    options.body.insuredList.Insured.push(json);
                }
            }
        } else {
            /** 当只有一个被保人时，直接整合报文 **/
            var h = '';
            if (product.Health) {
                h = this.data.other[0].healthStatement.join(',').replace(/false/g, '否');
                h = h.replace(/true/g, '是');
            }
            var json = {
                insuredId: 1,
                insuredName: m.applicantName,
                insuredType: isJc ? 'I' : this.getInsuredType(this.data.insureMessage.EffectiveDate, m.birthday),
                idType: product.IdNoType ? product.IdNoType[m.card] : ({'身份证': 1, '护照': 2, '其他': 3, '大陆通行证': 3, '出生证': 3})[m.card],
                idNumber: m.cardNumber,
                birthDate: new Date(m.birthday).format(isJc ? 'yyyyMMdd' : 'yyyyMMddHHmmss'),
                mobile: m.phone,
                email: m.email,
                gender: m.clientGender ? 'M' : 'F',
                policyholderInsuredRelation: '01',
                occupationCode: this.data.other[0].industryCode,
                jkQuestions: h
            };
            if (isJc) {
                options.body.Insured = json;
            } else {
                options.body.insuredList = {
                    Insured: [json]
                };
            }
        }
        /** 提交订单点击后，在接口数据未返回时，禁止再次点击 **/
        if (clickstatus.bool) {
            return;
        }
        clickstatus.bool = true;
        this.setData({
            isLoading: false,
            loadText: '提交订单中'
        })
        wx.login({
            success: function(login) {
                self.createOrder(login.code, options, clickstatus);
            },
            fail: function() {
                clickstatus.bool = false;
            }
        })
    },
    /**
     * [创建第三方订单]
     */
    createOrder: function(code, options, clickstatus) {
        var self = this,
            url = self.data.product.TypeEn === 'jc' ? 'order/createHomeOrder' : 'order/createOrder',
            port = self.data.product.TypeEn === 'jc' ? '10003' : '10001';
        wx.request({
            url: App.data.interfacePath + url,
            method: 'POST',
            data: {
                base: {
                    proNo: port,
                    reqTime: ''
                },
                body: {
                    code: code,
                    policyJson: options
                }
            },
            success: function(res) {
                clickstatus.bool = false;
                self.setData({
                    isLoading: true
                });
                if (res.data.resCode === '000000') {
                    self.pay(res.data.repBody.requestHandler.allParameters, res.data.repBody.policyRef);
                } else {
                    self.openTip(res.data.resMsg ? res.data.resMsg.replace('ge>', '') : '下单失败，请稍后再试');
                }
            }
        })
    },
    /**
     * [微信支付]
     */
    pay: function(options, policyRef) {
        var self = this;
        wx.requestPayment({
            timeStamp: options.timeStamp,
            nonceStr: options.nonceStr,
            package: options.package,
            signType: options.signType,
            paySign: options.paySign,
            success: function(data) {
                var params = self.data.params;
                params.policyRef = policyRef;
                params.type = 'success';
                wx.redirectTo({
                    url: "../success/success" + App.getParamsStr(params)
                })
            },
            fail: function(e) {
                var params = self.data.params;
                params.policyRef = policyRef;
                params.type = 'fail';
                wx.redirectTo({
                    url: "../success/success" + App.getParamsStr(params)
                })
            }
        })
    },
    /**
     * [温馨提示]
     */
    openTip: function(text) {
        var self = this;
        this.setData({
            tips: true,
            tipsText: text
        })
        setTimeout(function() {
            self.setData({
                tips: false
            })
        }, 3000);
    },
    /**
     * [获取被保险人年龄类型]
     */
    getInsuredType: function(startdate, enddate) {
        var product = this.data.product,
            start = new Date(startdate),
            end = new Date(enddate),
            ages = this.getTimeInfo(end, start).year;
        if (product.InsuredType) {
            var obj = product.InsuredType,
                type = '';
            for (var i in obj) {
                var len = i.split('-').length,
                    left = i.split('-')[0],
                    right = i.split('-')[1];
                if (len === 1 && i == ages) {
                    type = obj[i];
                } else {
                    if (ages >= left && ages <= right) {
                        type = obj[i];
                        break;
                    }
                }
            }
            return type;
        }
        if (ages >= 0 && ages <= 17) {
            return 2;
        } else if (ages >= 18 && ages <= 65) {
            return 1;
        } else if (ages >= 66 && ages <= 100) {
            return 3;
        } else {
            return -1;
        }
    },
    /**
     * [选择保险计划的修改按钮点击]
     */
    planRevampchange: function() {
        this.setData({
            bool: false,
            plan: true,
            applicant: false,
            applicantTopRevamp: false,
            applicantTop: false,
            nextOrSuccesss: '下一步',
            planRevamp: false,
        })
    },
    /**
     * [选择投保人信息的修改按钮点击]
     */
    applicantTopRevampChange: function() {
        this.setData({
            bool: false,
            plan: false,
            applicant: true,
            applicantTop: true,
            nextOrSuccesss: '下一步',
            planRevamp: true,
            applicantTopRevamp: false
        })
    },
    /**
     * [调用职业选择模块的发起获取行业请求的函数]
     */
    changeProfessional: function(e) {
        industrySelect.changeProfessional(e);
    },
    /**
     * [调用职业选择模块的发起获取职业类别请求的函数]
     */
    changeClasses: function(e) {
        industrySelect.changeClasses(e);
    },
    /**
     * [调用职业选择模块的发起获取职业名称请求的函数]
     */
    changeProfession: function(e) {
        industrySelect.changeProfession(e);
    },
    /**
     * [投保人姓名填写]
     */
    applicantInput: function(e) {
        this.data.applicantMessage.applicantName = e.detail.value;
        this.setData({
            applicantMessage: this.data.applicantMessage
        })
    },
    /**
     * [投保人证件类型选择]
     */
    applicantCardChange: function(e) {
        this.data.applicantMessage.card = this.data.applicantMessage.cardArr[e.detail.value]
        this.setData({
            applicantMessage: this.data.applicantMessage
        })
        this.aCardNumberBlur()
    },
    /**
     * [投保人证件号码填写]
     */
    cardNumberInput: function(e) {
        this.data.applicantMessage.cardNumber = e.detail.value;
        this.setData({
            applicantMessage: this.data.applicantMessage
        })
    },
    /**
     * [投保人出生日期选择]
     */
    birthdayChange: function(e) {
        var message = this.data.applicantMessage;
        if(this.getTimeInfo(e.detail.value, new Date().format("yyyy-MM-dd")).ageType == 'child'){
            message.same = false;
            this.setData({
                applicantMessage: message
            })
        }
        message.birthday = e.detail.value
        this.setData({
            applicantMessage: message
        })

        if (message.same) {
            /** 设置投保费用 **/
            this.setPrice();
        }
    },
    /**
     * [投保人手机号码填写]
     */
    iphoneInput: function(e) {
        this.data.applicantMessage.phone = e.detail.value;
        this.setData({
            applicantMessage: this.data.applicantMessage
        })
    },
    /**
     * [投保人手机验证码填写]
     */
    phoneCodeInput: function(e) {
        this.data.applicantMessage.phoneCode = e.detail.value;
        this.setData({
            applicantMessage: this.data.applicantMessage
        })
    },
    /**
     * [重新发送手机短信60秒倒计时]
     */
    setSendCodeTimer: function() {
        var self = this;
        this.data.sendCodeTime = 60;
        this.data.sendCodeTimer = setInterval(function() {
            self.setData({
                sendCodeTime: self.data.sendCodeTime
            })
            if (self.data.sendCodeTime <= 0) {
                self.data.sendCodeTime = 0;
                clearInterval(self.data.sendCodeTimer);
            }
            self.data.sendCodeTime--;
        }, 1000);
        this.setData({
            sendCodeTimer: this.data.sendCodeTimer
        })
    },
    /**
     * [获取手机验证码]
     */
    getPhoneCode: function(e) {
        if (this.data.sendCodeTime > 0) {
            return;
        }
        clearInterval(this.data.sendCodeTimer);
        var phone = this.data.applicantMessage.phone,
            self = this;
        if (!utils.validate.checkTel(phone)) {
            this.openTip('亲,请输入正确的手机号!');
            return;
        }
        this.setData({
            isLoading: false,
            loadText: '短信发送中'
        })
        wx.request({
            url: App.data.interfacePath + 'sms/sendVerificationCode',
            method: 'POST',
            data: {
                base: {
                    proNo: '40001'
                },
                body: {
                    mobilePhone: phone
                }
            },
            success: function(res) {
                self.setData({
                    isLoading: true
                })
                if (res.data.resCode !== '000000') {
                    self.openTip(res.data.resMsg);
                }
            },
            fail: function() {
                self.setData({
                    isLoading: true
                })
                self.openTip('短信发送失败');
            },
            complete: function() {
                self.setSendCodeTimer();
            }
        })     
    },
    /**
     * [校验手机验证码]
     */
    checkCode: function() {
        var phone = this.data.applicantMessage.phone,
            self = this,
            code = this.data.applicantMessage.phoneCode;
        if (!code) {
            return;
        }
        if (code.length < 4 && code.length > 0) {
            this.openTip('请输入四位数字的验证码');
            return;
        }
        this.setData({
            isLoading: false,
            loadText: '校验中'
        })
        wx.request({
            url: App.data.interfacePath + 'sms/checkVerificationCode',
            method: 'POST',
            data: {
                base: {
                    proNo: '40002'
                },
                body: {
                    mobilePhone: phone,
                    code: code
                }
            },
            success: function(res) {
                self.setData({
                    isLoading: true
                })
                if (res.data.resCode === '000000') {
                    wx.showToast({
                        title: '校验成功',
                        icon: 'success'
                    })
                    self.setData({
                        isValidateCode: true
                    })
                } else {
                    self.openTip(res.data.resMsg);
                }
            },
            faile: function() {
                self.setData({
                    isLoading: true
                })
                self.openTip('校验失败');
            }
        })
    },
    /**
     * [投保人邮箱填写]
     */
    emailInput: function(e) {
        this.data.applicantMessage.email = e.detail.value;
        this.setData({
            applicantMessage: this.data.applicantMessage
        })
    },
    /**
     * [被保人同投保人勾选按钮点击]
     */
    sameselect: function(e) {
        var message = this.data.applicantMessage;
        if (message.birthday == "请选择") {
            this.openTip('亲，请先选择出生日期');
            message.same = false;
            this.setData({
                applicantMessage: message
            })
            return false;
        }
        if(this.getTimeInfo(message.birthday, new Date().format("yyyy-MM-dd")).ageType == 'child'){
            this.openTip('亲，投保人必须满18周岁！');
            message.same = false;
            this.setData({
                applicantMessage: message
            })
            return false;
        }
        var product = this.data.product;
        message.same = !message.same;
        if (message.same) {
            var Sex = this.data.insureMessage.plan.Sex;
            if (Sex) {
                message.clientGender = Sex === 'M' ? true : false;
            }
        }
        if (product.TypeEn.indexOf('yw') > -1 && product.Job) {
            this.data.other[0].industrySelect = message.same;
        }
        if (product.Health) {
            this.data.other[0].isHealth = message.same;
        }
        this.setData({
            other: this.data.other,
            applicantMessage: message,
            nextOrSuccesss: message.same ? '提交订单' : '下一步',
        })
        this.setPrice();
    },
    /**
     * [已阅读投保须知和保险条款勾选按钮点击]
     */
    readselect: function(e) {
        this.data.applicantMessage.read = !this.data.applicantMessage.read;
        this.setData({
            applicantMessage: this.data.applicantMessage
        })
    },
    /**
     * [校验投保人身份证号码]
     */
    aCardNumberBlur: function(e) {
        var message = utils.validate.checkIdcard(this.data.applicantMessage.cardNumber)
        if (this.data.applicantMessage.card === '身份证') {
            if (message === 'ok') {
                var data = utils.validate.bindIdNoBirthFn(this.data.applicantMessage.cardNumber)

                this.data.applicantMessage.birthday = data.birth
                this.data.applicantMessage.clientGender = data.sex === "0" ? true : false;
                this.setData({
                    applicantMessage: this.data.applicantMessage
                })
            } else {
                console.log(message)
            }
        }
    },
    // 被保人信息
    /**
     * [与投保人关系选择]
     */
    relationChange: function(e) {
        this.data.other[e.currentTarget.dataset.id].relation = this.data.other[e.currentTarget.dataset.id].relationArr[e.detail.value]
        this.setData({
            other: this.data.other
        })
    },
    /**
     * [被保人姓名填写]
     */
    recognizeeNameInput: function(e) {
        this.data.other[e.currentTarget.dataset.id].recognizeeName = e.detail.value;
        this.setData({
            other: this.data.other
        })
    },
    /**
     * [被保人证件类型选择]
     */
    recognizeeCard: function(e) {
        this.data.other[e.currentTarget.dataset.id].card = this.data.other[e.currentTarget.dataset.id].cardArr[e.detail.value]
        this.setData({
            other: this.data.other
        })
        if (this.data.other[e.currentTarget.dataset.id].cardNumber.length === 0) return
        this.rCardNumberBlur('', e.currentTarget.dataset.id)
    },
    /**
     * [被保人证件号码填写]
     */
    rCardNumberInput: function(e) {
        this.data.other[e.currentTarget.dataset.id].cardNumber = e.detail.value;
        this.setData({
            other: this.data.other
        })
    },
    /**
     * [被保人出生日期选择]
     */
    recognizeeBirthdayChange: function(e) {
        this.data.other[e.currentTarget.dataset.id].birthday = e.detail.value
        this.setData({
            other: this.data.other
        })
        /** 设置投保费用 **/
        this.setPrice();
    },
    /**
     * [被保人手机号码填写]
     */
    recognizeeNumberInput: function(e) {
        this.data.other[e.currentTarget.dataset.id].phone = e.detail.value;
        this.setData({
            other: this.data.other
        })
    },
    // 健康声明
    /**
     * [调用健康问卷模块的选项选择]
     */
    changeHealth: function(e) {
        healthObj.changeHealth(this, e.currentTarget.dataset);
    },
    //家财险
    /**
     * [调用家财险模块房屋所在省获取数据的函数]
     * @param {object} e 房屋所在省选项的实例对象
     */
    propertyProvincechange: function(e) {
        JcModule.propertyProvincechange(e);
    },
    /**
     * [调用家财险模块房屋所在市获取数据的函数]
     * @param {object} e 房屋所在市选项的实例对象
     */
    propertyCitychange: function(e) {
        JcModule.propertyCitychange(e);
    },
    /**
     * [调用家财险模块房屋所在区获取数据的函数]
     * @param {object} e 房屋所在区选项的实例对象
     */
    propertyTownchange: function(e) {
        JcModule.propertyTownchange(e);
    },
    /**
     * [房屋具体地址填写]
     * @param {object} e 房屋具体地址选项的实例对象
     */
    propertyAddressInput: function(e) {
        this.data.propertyMessage.address = e.detail.value;
        this.setData({
            propertyMessage: this.data.propertyMessage
        })
    },
    /**
     * [邮政编码填写]
     * @param {object} e 邮政编码的实例对象
     */
    propertyCodeInput: function(e) {
        this.data.propertyMessage.code = e.detail.value;
        this.setData({
            propertyMessage: this.data.propertyMessage
        })
    },
    /**
     * [调用家财险模块问卷选择的函数]
     * @param {object} e 家财险问卷所点击的当前选项的实例对象
     */
    changeDetail: function(e) {
        JcModule.changeDetail(e.currentTarget.dataset.index);
    },
    /**
     * [家财险模块的备注填写]
     * @param {object} e 备注选项的实例对象
     */
    propertyRemarkInput: function(e) {
        this.data.propertyMessage.remark = e.detail.value;
        this.setData({
            propertyMessage: this.data.propertyMessage
        })
    },

    /**
     * [根据身份证号码获取出生日期]
     * @param {object} e 房屋所在区选项的实例对象
     * @param {number} id1 第几个被保人 0代表第一个
     */
    rCardNumberBlur: function(e, id1) {
        if (typeof(id1) === 'number') {
            var id = id1
        } else {
            var id = e.currentTarget.dataset.id
        }
        if (this.data.other[id].card === '身份证') {
            var message = utils.validate.checkIdcard(this.data.other[id].cardNumber)
            if (message === 'ok') {
                var data = utils.validate.bindIdNoBirthFn(this.data.other[id].cardNumber)

                this.data.other[id].birthday = data.birth
                this.data.other[id].recognizeeGender = data.sex === "0" ? true : false;
                this.setData({
                    other: this.data.other
                })
            } else {
                this.openTip(message);
            }
        }
    },
    /**
     * [添加多个被保险人]
     * @param {object} e 添加按钮的实例对象
     */
    add: function(e) {
        var product = this.data.product,
            _industrySelect = false,
            isHealth = false;
        if (product.TypeEn.indexOf('yw') > -1 && product.Job) {
            _industrySelect = true;
            industrySelect.getProfessional(this.data.other.length);
        }

        var healthStatement = [];
        if (product.Health) {
            isHealth = true;
            for (var i in product.HealthList) {
                healthStatement.push(true);
            }
        }
        /** 初始化被保人证件类型 **/
        var arr = ['身份证', '护照', '其他'];
        if (product.IdNoType) {
            arr = [];
            for (var i in product.IdNoType) {
                arr.push(i);
            }
        }

        /** 初始化与投保人关系 **/
        var arr1 = ['父母', '配偶', '子女', '其他'];
        if (product.Relation) {
            arr1 = [];
            for (var i in product.Relation) {
                if (i !== '本人') {
                    arr1.push(i);
                }
            }
        }
        
        this.data.other.push({
            relationArr: arr1,
            relation: '请选择',
            recognizeeName: '',
            cardArr: arr,
            card: '请选择',
            cardNumber: '',
            birthday: '请选择',
            recognizeeGender: this.data.insureMessage.plan.Sex === 'F' ? false : true,
            phone: '',
            id: this.data.other.length,
            industryArr: [],
            industry: '请选择',
            classesArr: [],
            classes: '请选择',
            professionArr: [],
            profession: '请选择',
            industryCode: '',
            jobClassif: '',
            Sex: this.data.insureMessage.plan.Sex || '',
            industrySelect: _industrySelect,
            isHealth: isHealth,
            healthStatement: healthStatement //这是健康声明
        });

        this.setData({
            other: this.data.other
        })
        /** 设置投保费用 **/
        this.setPrice();
    },
    /**
     * [删除被保人]
     * @param  {object} e 删除按钮的实例对象
     *
     */
    del: function(e) {
        if (this.data.other.length === 1) {
            this.openTip('亲，至少需要添加1个被保人！')
            return
        }
        this.data.other.splice(e.currentTarget.dataset.id, 1)
        for (var i = 0; i < this.data.other.length; i++) {
            this.data.other[i].id = i
        }
        this.setData({
            other: this.data.other
        })
        /** 设置投保费用 **/
        this.setPrice();
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
