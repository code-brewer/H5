export default {
	isEmptyObject(obj) {
		var bool = true;
		for(let i in obj){
			bool = false;
		}
		return bool;
	},
	validate: {
		isMob(val) {
			var reg = /^\d{11}$/;
			return reg.test(val);
		}
	}
}