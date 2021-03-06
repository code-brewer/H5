var validate = {
    //身份证验证
    checkIdcard: function(idcard) {

        var Errors = ["ok", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!"];
        var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
        var idcard, Y, JYM, S, M, idcard_array = [],
            retflag = false,
            ereg;
        idcard_array = idcard.split("");
        if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
        switch (idcard.length) {
            case 15:
                return Errors[2];
                break;
            case 18:
                if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                    ereg = /^[1-9][0-9]{5}[1|2][0|9][0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
                } else {
                    ereg = /^[1-9][0-9]{5}[1|2][0|9][0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
                }
                if (ereg.test(idcard)) {
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y, 1);
                    if (M == idcard_array[17].toUpperCase())
                        return Errors[0];
                    else
                        return Errors[3];
                } else
                    return Errors[2];
                break;
            default:
                return Errors[1];
                break;
        }
    },
    //邮箱验证
    checkMail: function(val) {
        var flag = /^([a-zA-Z0-9]+[_|\_|\.|\-]+?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]+?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val);

        return flag;
    },
    //手机验证
    checkTel: function(val) {
        var flag = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(val);
        return flag;
    },
    // 绑定生日
    bindIdNoBirthFn: function(val) {
        if (val.length > 13) {
            var birth = val.substr(6, 4) + "-" + val.substr(10, 2) + "-" + val.substr(12, 2);
            var sex = parseInt(val.substr(16, 1), 10) % 2 == 0 ? "1" : "0"; //1是女性
            return { birth: birth, sex: sex }
        }

    }
}
module.exports = {
    validate: validate
}
