export function MergeImg(options) {
	this.init(options);
}
MergeImg.prototype = {
	outputArr: [],
	init: function(options) {
		this.default = options;
		this.initWidget();
		this.drawImg(0);
	},
	initWidget() {
		this.outputArr = [];
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.default.bg.scaleW;
		this.canvas.height = this.default.bg.scaleH;
	},
	drawImg: function(i) {
		var self = this;
		let bgLen = this.default.bg.img.length;
		var headurl = new Image(),
			bg = new Image(),
			qrcode = new Image();
			headurl.setAttribute('crossOrigin', 'anonymous');
			bg.setAttribute('crossOrigin', 'anonymous');
			qrcode.setAttribute('crossOrigin', 'anonymous');
		headurl.src = this.default.headurl.img;
		headurl.onload = function() {
			var y = self.default.headurl.y;
			if ((self.default.bg.img[i]).match(/3_8+\/bg3/)) {
				y = self.default.custom.headurl.y;
			}
			self.ctx.drawImage(headurl, 0, 0, headurl.width, headurl.height, self.default.headurl.x, y, self.default.headurl.scaleW, self.default.headurl.scaleH);
			bg.src = basePath + self.default.bg.img[i];
			bg.onload = function() {
				self.ctx.drawImage(bg, 0, 0, bg.width, bg.height, self.default.bg.x, self.default.bg.y, self.default.bg.scaleW, self.default.bg.scaleH);
				qrcode.src = self.default.qrcode.img;
				qrcode.onload = function() {
					self.ctx.drawImage(qrcode, 0, 0, qrcode.width, qrcode.height, self.default.qrcode.x, self.default.qrcode.y, self.default.qrcode.scaleW, self.default.qrcode.scaleH);
					
					self.drawText(++i);
				}
			}
		}
	},
	drawText(index) {
		let _default = this.default;
		for (let i in _default) {
			if (!_default[i].isImg && _default[i].isOn) {
				this.ctx.save();
				var y = _default[i].y;
				if ((this.default.bg.img[index-1]).match(/3_8+\/bg3/) && i === 'nick') {
					y = this.default.custom.nick.y;
				}
				_default[i].color ? this.ctx.fillStyle = _default[i].color : '';
				this.ctx.font = _default[i].font + ' Microsoft YaHei';
				this.ctx.textAlign = _default[i].textAlign || 'center';
				this.ctx.fillText(_default[i].text, _default[i].x, y, _default[i].maxWidth);
				this.ctx.restore();
			}
		}
		// 绘制 长按图片可分享给好友
		// this.ctx.save();
		// this.ctx.beginPath();
		// this.ctx.fiilStyle = 'black';
		// this.ctx.globalAlpha = 0.8;
		// this.ctx.fillRect(0, 0, 640, 60);
		
		// this.ctx.fillStyle = '#ffffff';
		// this.ctx.font = ' 24px Microsoft YaHei';
		// this.ctx.fillText('长按图片即可分享给好友', 200, 40);
		// this.ctx.restore();

		// this.outputArr.push(this.canvas.toDataURL('image/png'));
		this.outputArr[index - 1] = this.canvas.toDataURL('image/png');
		this.canvas.height = this.default.bg.scaleH;
		if (index === this.default.bg.img.length) {
			this.default.fn(this.outputArr);
		} else {
			this.drawImg(index);
		}
		
	}
}