export default {
// var DateUtils = {
    now: function(){
        var date = new Date(),
            year = date.getFullYear(),
            months = (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1),
            days = (date.getDate() > 9 ? '' : '0') + date.getDate(),
            hours = (date.getHours() > 9 ? '' : '0') + date.getHours(),
            minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes(),
            secounds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds();

        return ('' + year + months + days + hours + minutes + secounds);
    },
    format: function(date, format) {
        if(!date) date = new Date();
        if(!format) format = 'yyyyMMddHHmmss';
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        // let monthName = this.getMonthName(date.getMonth())
        let str = format
            .replace(/yyyy/, year)
            .replace(/yy/, String(year).slice(2))
            // .replace(/MMMM/, this.getMonthName(date.getMonth()))
            // .replace(/MMM/, this.getMonthNameAbbr(date.getMonth()))
            .replace(/MM/, ('0' + month).slice(-2))
            .replace(/M(?!a)/, month)
            .replace(/dd/, ('0' + day).slice(-2))
            .replace(/d/, day)
            // .replace(/S/, this.getNthSuffix(date.getDate()))
            // .replace(/D/, this.getDayNameAbbr(date))
            .replace(/HH/, (date.getHours() > 9 ? '' : '0') + date.getHours())
            .replace(/mm/, (date.getMinutes() > 9 ? '' : '0') + date.getMinutes())
            .replace(/ss/, (date.getSeconds() > 9 ? '' : '0') + date.getSeconds())

        return str;
    },
    formatEmoij: function(comment){
        var text = comment.match(/(\[[^[|.]+\])/g);
        if (text && text.length) {
            text.forEach(item => {
                comment = comment.replace(item, '<span style="display: inline-block; width: 82.81px; height: 56px; margin: 0 -12px; vertical-align: middle; background-image: url(' + emoji.imgPath + '); background-position: ' + emoji.data[item].dingwei + '; background-repeat: no-repeat;"></span>');
            })
        }
        return comment;
    }
// };
}