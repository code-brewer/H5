/**
 * [获取时间戳]
 * @return {Number} [时间戳]
 */
export function getTime() {
    return (new Date()).getTime();
}
/**
 * [自定义click事件]
 * @param  {elemnt} e [元素]
 *
 */
export function customClick(e) {
    var target = e.target || e.srcElement,
        ev;
    ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
    ev.initEvent('click', true, true);
    target.dispatchEvent(ev);
}
/**
 * [检测是否登录]
 * @return {Boolean} [true:已登录  false:未登录]
 */
export function checkLogin() {
    var login = false;
    if (document.cookie.indexOf('cn.easier.wmpo.user') < 0) {

    } else {
        login = true;
    }

    return login;
}
/**
 * [获取cookie]
 * @param  {String} name [key值]
 *
 * @return {String}      [返回cookie中key值对应的value值]
 */
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
/**
 * [表单校验工具]
 */
export var validate = {
        /**
         * [校验手机号码格式]
         * @param  {String}  val [手机号码]
         *
         * @return {Boolean}     [true: 正确  false: 不正确]
         */
        isMob: function(val) {
            var reg = /^\d{11}$/;
            return reg.test(val);
        }
    }
    /**
     * 接口响应后的处理事件
     */
export function ajaxHandler(data, callback) {
    if (data && data.resCode === '0') {
        if (typeof callback === 'function') {
            callback.call(this);
        }
    } else {
        let _root = this;
        while (_root.$el.id != 'wrap') {
            _root = _root.$parent;
        };
        _root.$emit('showError', data);
    }
}
