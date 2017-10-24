export default {
	isEmptyObject(obj) {
		var bool = true;
		for(let i in obj){
			bool = false;
		}
		return bool;
	},
	trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
}