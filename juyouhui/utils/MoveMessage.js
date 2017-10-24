export var MoveMessage = function(val) {
	var _this = val;
	if (_this.todayMessage.length == 0 ) return 
	var tempMessage = _this.todayMessage[_this.todayMessage.length-1]
	_this.todayMessage.unshift(tempMessage)
	var dom = _this.$els.todaymessage
	var temp = 1;
	dom.style.top = -50*temp+'px'; 
	var length = _this.todayMessage.length/1;
	var timeId = setInterval(function () {
			temp+=1;
			temp = temp % length
			temp ===0 ? dom.style.transition= 'none' : dom.style.transition= 'all 2s';
			// dom.style.transform = 'translateY('+-50*temp+'px)'; 
			// if (dom.style.transform ==='translateY('+-50*(length)+'px)'){
			// 	dom.style.transition= 'none';
			// 	temp = 0 ;
			// 	dom.style.transform = 'translateY(0px)'; 
			// }
			dom.style.top = -50*temp+'px'; 
			if (dom.style.top ===-50*(length)+'px'){
				dom.style.transition= 'none';
				temp = 0 ;
				dom.style.top = '0px'; 
			}

	},3000)
	
};