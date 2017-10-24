<template>

    <body>
        <div class="header">
            <h1>违章查询</h1>
        </div>
        <!-- 违章查询 -->
        <div class="middle" v-show="shuru">
            <h1>请填写当事人车辆信息:</h1>
            <table>
                <tbody>
                    <tr>
                        <td class="leftTd">车牌号码：</td>
                        <td>
                            <select style="height: 27px;" v-model="searchConfig.plateplace">
                                <option value="京">京</option>
                                <option value="粤">粤</option>
                                <option value="桂">桂</option>
                                <option value="沪">沪</option>
                                <option value="湘">湘</option>
                                <option value="鄂">鄂</option>
                                <option value="豫">豫</option>
                                <option value="冀">冀</option>
                                <option value="苏">苏</option>
                                <option value="浙">浙</option>
                                <option value="川">川</option>
                                <option value="贵">贵 </option>
                                <option value="皖">皖</option>
                                <option value="鲁">鲁</option>
                                <option value="辽">辽</option>
                                <option value="吉">吉</option>
                                <option value="闽">闽 </option>
                                <option value="渝">渝</option>
                                <option value="宁">宁</option>
                                <option value="青">青 </option>
                                <option value="云">云</option>
                                <option value="宁">琼</option>
                                <option value="琼">陕</option>
                                <option value="甘">甘</option>
                                <option value="黑">黑</option>
                                <option value="蒙">蒙</option>
                                <option value="新">新</option>
                                <option value="藏">藏</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" style="width:135px;" v-model="searchConfig.platenumber"></input>
                        </td>
                        <td><a class="btn" @click="find()">查询</a></td>
                    </tr>
                    <tr>
                        <td class="leftTd">号牌种类：</td>
                        <td colspan="3">
                            <select style="width: 200px;height: 27px;box-sizing: border-box;" v-model="searchConfig.platetype">
                                <option value="02">小型汽车</option>
                                <option value="01">大型汽车</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="leftTd">车辆识别号(后6位)：</td>
                        <td colspan="3">
                            <input type="text" v-model="searchConfig.framenumber"></input>
                        </td>
                    </tr>
                    <tr>
                        <td class="leftTd">发动机号(后4位)：</td>
                        <td colspan="3">
                            <input type="text" v-model="searchConfig.enginenumber"></input>
                        </td>
                    </tr>
                    <tr>
                        <td class="leftTd">手机号码：</td>
                        <td colspan="3">
                            <input type="text" v-model="searchConfig.phone"></input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="submit" style="margin:0;">
                <a class="resultbtn" @click="phoneSave(searchConfig.id)" style="">保存</a> <a class="resultbtn" @click="search()">查看</a>
            </div>
        </div>
        <!-- 违章详情选择页面 -->
        <div class="choose" v-show="choose">
            <p>{{searchConfig.plateplace}}{{searchConfig.platenumber}} 查到以下违章信息</p>
            <table>
                <tbody>
                    <tr style="background-color:#FAA354;color:#fff">
                        <td style="width: 60px;"></td>
                        <td style="width: 60px;">序号</td>
                        <td style="width: 180px;">违法时间</td>
                        <td style="width: 210px;">违法地点</td>
                        <td style="width: 100px;">处理状态</td>
                    </tr>
                    <tr v-for="list in IllegalQuerys">
                        <td width="">
                            <input type="checkbox" v-model="archive" :value="list.archive" name="we" :checked="$index+1 ==1" />
                        </td>
                        <td width="">{{$index+1}}</td>
                        <td width="">{{list.time}}</td>
                        <td width="">{{list.location}}</td>
                        <td width="">{{list.status==0?'未处理':'已处理'}}</td>
                        <!-- <span class="radio">
                        
                    </span> -->
                    </tr>
                </tbody>
            </table>
            <div class="footer">
                <a @click="goback1()">返回</a>
                <!-- <input type=button value=后退 onclick="window.history.go(-1)"> -->
                <a @click="lookDetail()">查看</a>
            </div>
        </div>
        <!-- 违章详情 -->
        <div class="detail" v-show="detail">
            <p>{{searchConfig.plateplace}}{{searchConfig.platenumber}} 的违章详细信息</p>
            <table v-for="list in IllegalQuery">
                <tbody>
                    <tr>
                        <td style="width: 115px">序号</td>
                        <td value="">{{list.index}}</td>
                    </tr>
                    <tr>
                        <td>本次交通违法记分</td>
                        <td><span style="color:#FF0000 ">{{list.degree}}</span>分</td>
                    </tr>
                    <tr>
                        <td>罚款金额</td>
                        <td><span style="color:#FF0000 ">{{list.count}}</span>元</td>
                    </tr>
                    <tr>
                        <td>违法地点</td>
                        <td>{{list.location}}</td>
                    </tr>
                    <tr>
                        <td>违法行为</td>
                        <td>{{list.reason}}</td>
                    </tr>
                    <tr>
                        <td>违法时间</td>
                        <td>{{list.time}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="footer3">
                <a @click="goback2()">返回</a>
            </div>
        </div>
    </body>
    <modale :show.sync="UploadStatus.showMsg" :msg.sync="UploadStatus.msg">
        <div class="close"><span @click="this.UploadStatus.showMsg = false" class="comite"></span></div>
        <!-- <div style="padding:0 50px;">
            <p style="line-height:100px;text-align:center;">{{UploadStatus.msg}}</p>
            <a @click="this.UploadStatus.showMsg = false" class="juzhong" style="display:block;">确定</a>
        </div> -->
        <div style="height:214px;width:100%;position:relative;">
            <div style="padding: 40px 30px 0;line-height:25px;">
                <p style="text-align:center;">{{UploadStatus.msg}}</p>
                <a @click="this.UploadStatus.showMsg = false" class="juzhong" style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;">确定</a>
            </div>
        </div>
    </modale>
</template>
<script>
import api from '../api'
import {
    router
} from '../index'
import Modale from '../components/newComponts/Modale.vue'
export default {
    components: {
        Modale,
    },
    data() {
        return {
            UploadStatus: { //双重确认
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
            lists: [],
            list: [],
            archive: [],
            searchConfig: {
                enginenumber: '', //发动机号
                framenumber: '', //车架号
                platenumber: '', //车牌号码
                plateplace: '粤', //车牌归属
                platetype: '02', //车牌类型
                id:'',
                phone:''
            },
            finddata: {
                platenumber: '', //车牌号码
                plateplace: '',
            },
            shuru: true,
            choose: false,
            detail: false,
            IllegalQuery: [],
            IllegalQuerys: [
               
            ],
        }
    },
    ready() {

    },
    methods: {
        show(message) {
            this.UploadStatus.msg = message;
            this.UploadStatus.showMsg = true;
        },
        //查看
        find() {
            var that = this;
            if (!this.searchConfig.platenumber) {
                this.show("车牌号不能为空");
                return;
            }
            if (this.searchConfig.platenumber.length != 6 || !(/^[A-Z]{1}[A-Z_0-9]{5}$/.test(this.searchConfig.platenumber))) {
                this.show("请输入正确的车牌号");
                return;
            }
            this.isLoad = true;
            api.find(this, this.searchConfig, (back) => {
                if (back.resCode == "0") {
                    this.isLoad = false;
                    this.searchConfig = back.repBody;
                } else {
                    this.isLoad = false;
                    this.show(back.resMsg + '，请输入详细信息');
                    return;
                }
            })

        },
        //查询违章
        search() {
            if (!this.searchConfig.platenumber) {
                this.show("车牌号不能为空");
                return;
            }
            if (this.searchConfig.platenumber.length != 6 || !(/^[A-Z]{1}[A-Z_0-9]{5}$/.test(this.searchConfig.platenumber))) {
                this.show("请输入正确的车牌号");
                return;
            }
            if (!this.searchConfig.framenumber) {
                this.show("车辆识别号不能为空");
                return;
            }

            if (this.searchConfig.framenumber.length != 6 || !(/^[A-Z0-9]{6}$/.test(this.searchConfig.framenumber))) {
                this.show("请输入正确的车辆识别号");
                return;
            }
            if (!this.searchConfig.enginenumber) {
                this.show("发动机号不能为空");
                return;
            }
            if (this.searchConfig.enginenumber.length != 4 || !(/^[A-Z_0-9]{4}$/.test(this.searchConfig.enginenumber))) {
                this.show("请输入正确的发动机号");
                return;
            }
            var that = this;
            // this.isLoad = true;
            api.search(this, this.searchConfig, (back) => {
                if (back.repBody.hasdata == false) {
                    this.show("该车最近没有查到违章信息");
                    return;
                } else {
                    if (back.resCode == "0") {
                        this.shuru = false;
                        this.choose = true;
                        this.IllegalQuerys = back.repBody.records;
                    }
                }
                if (back.resCode == "-61") {
                    this.show(back.resMsg);
                    return;
                }
                if (back.resCode == "-62") {
                    this.show('车辆识别号错误,请重新输入');
                    return;
                }

            })

        },
        //查看详情
        lookDetail() {
            let set = new Set(this.archive);
            this.IllegalQuery = this.IllegalQuerys.filter(value => {
                    return set.has(value.archive);
                })
                //在IllegalQuerys加入index
            this.IllegalQuerys.forEach((value, index) => {
                value.index = index + 1;
            })
            this.choose = false;
            this.detail = true;
        },
        phoneSave(id){
            api.save(this, this.searchConfig, (back) => {
                if (back.resCode == '0') {
                    this.show("保存成功!");
                }else {
                    this.show(back.resMsg);
                }

            })
        },
        goback1() {
            this.choose = false;
            this.shuru = true;
            // location.reload([]);//刷新页面
        },
        goback2() {
            this.choose = true;
            this.detail = false;
        }

    }
}
</script>
<style scoped>
.header {
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #B9B7B7;
}

.header h1 {
    color: #ED6D03;
    line-height: 60px;
    margin-top: 0px;
    font-family: 'Microsoft YaHei';
    font-size: 20px;
    margin-left: 45px;
}


/*违章查询*/

.middle {
    background-color: #fff;
    margin: 37px auto;
    border: 1px solid #BFBFBF;
    width: 560px;
    height: 427px;
    font-family: '宋体';
    font-size: 12px;
    color: #000;
}

.middle h1 {
    color: #F57303;
    font-size: 14px;
    padding: 0px;
    margin-left: 30px;
    margin-top: 20px;
}

.middle table {
    margin: 50px 42px;
}

.middle input {
    height: 23px;
    width: 196px;
}

.middle td {
    padding: 11px;
}

.leftTd {
    text-align: right;
}

.submit {
    font-family: 'Microsoft YaHei';
    /*margin: 0 auto;*/
    /*width: 75px;*/
    height: 27px;
    text-align: center;
}

.btn {
    width: 73px;
    background-color: #f57303;
    border: 1px solid #e55c00;
    color: #fff;
    line-height: 28px;
    text-align: center;
    border-radius: 3px;
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
}


/*违章详情选择页面*/

.choose {
    font-size: 12px;
    font-family: '宋体';
    width: 560px;
    margin: 37px 300px;
    background-color: #fff;
    border: 1px solid #C7C7C7;
}

.choose p {
    background-color: #F0C69E;
    color: #fff;
    font-size: 14px;
    line-height: 40px;
    padding-left: 32px;
}

.choose table {
    margin-top: -10px;
    color: #000;
}

.choose tr {
    padding: 3px;
}

.choose td {
    width: auto;
    height: 27px;
    text-align: center;
    padding-top: 5px;
}

.footer {
    font-family: 'Microsoft YaHei';
    font-size: 14px;
    padding: 47px 0 32px 142px;
    ;
    width: 100%;
}

.footer a {
    background-color: #F57303;
    color: #fff;
    border: 1px solid #e55c00;
    border-radius: 3px;
    width: 73px;
    line-height: 28px;
    margin-left: 40px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
}


/*违章详情*/

.detail {
    font-size: 12px;
    font-family: '宋体';
    width: 560px;
    /*height: 372px;*/
    margin-left: 300px;
    margin-top: 37px;
    background-color: #fff;
    border: 1px solid #C7C7C7;
    padding: 0 0 40px 0;
    margin-bottom: 40px;
}

.detail p {
    background-color: #FAA354;
    color: #fff;
    font-size: 14px;
    line-height: 40px;
    padding-left: 32px;
}

.detail table {
    margin: 30px 70px;
    width: 430px;
    height: 217px;
    text-align: center;
}

.detail td {
    border: 1px solid #D7D7D7;
}

.footer3 {
    font-family: 'Microsoft YaHei';
    font-size: 14px;
    padding: 43px 0 3px 0px;
    width: 100%;
}

.footer3 a {
    width: 73px;
    height: 28px;
    background-color: #f57303;
    border: 1px solid #e55c00;
    color: #fff;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    margin: 0 240px;
    border-radius: 3px;
    text-decoration: none;
    cursor: pointer;
}

.close {
    height: 30px;
    line-height: 30px;
    background-color: #faa354;
    position: relative;
}

.actiontong,
.nothx,
.juzhong {
    width: 73px;
    height: 28px;
    background-color: #f57303;
    border: 1px solid #e55c00;
    color: #fff;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    margin: 0 auto;
    border-radius: 3px;
    cursor: pointer;
    /*background: url(./images/btnBg.png);*/
}
.resultbtn{
    width: 73px;
    background-color: #f57303;
    border: 1px solid #e55c00;
    color: #fff;
    line-height: 28px;
    text-align: center;
    border-radius: 3px;
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
    margin-right: 5px;
}
</style>
