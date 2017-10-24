(function() {
    Date.prototype.add = function(obj) {
        for(var i in obj) {
            switch(i) {
                case 'year': 
                    this.setFullYear(+obj[i] + this.getFullYear());
                    break;
                case 'month': 
                    this.setMonth(+obj[i] + this.getMonth() + 1);
                    break;
                case 'day':
                    this.setDate(+obj[i] + this.getDate());
                    break;
                case 'hours':
                    this.setHours(+obj[i]);
                    break;
                case 'minutes':
                    this.setMinutes(+obj[i]);
                    break;
                case 'seconds':
                    this.setSeconds(+obj[i]);
                    break;
            }
        }
        return this;
    };
    Date.prototype.format = function(format) {
        if (!format) {
            format = 'yyyy-MM-dd';
        }
        var month = this.getMonth() + 1,
            date = this.getDate(),
            hours = this.getHours(),
            minutes = this.getMinutes(),
            seconds = this.getSeconds(),
            str = format
            .replace(/yyyy/, this.getFullYear())
            .replace(/MM/, (month > 9 ? '' : '0') + month)
            .replace(/dd/, (date > 9 ? '' : '0') + date)
            .replace(/HH/, (hours > 9 ? '' : '0') + hours)
            .replace(/mm/, (minutes > 9 ? '' : '0') + minutes)
            .replace(/ss/, (seconds > 9 ? '' : '0') + seconds);
        return str;
    };
}())