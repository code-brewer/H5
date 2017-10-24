export default{
	getCookie (c_name) {
		var c_start,c_end;
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=")
		  if (c_start!=-1)
		    { 
		    c_start=c_start + c_name.length+1 
		    c_end=document.cookie.indexOf(";",c_start)
		    if (c_end==-1) c_end=document.cookie.length
		    return unescape(document.cookie.substring(c_start,c_end))
		    } 
		  }
		return ""
	},

	getId () {
		var mes = this.getCookie('ID');
		if (!mes) return ;
		return mes.slice(0,mes.indexOf(',')).replace('"','')
	},
	getNumber () {
		var mes = this.getCookie('ID');
		if (!mes) return ;
		var temp = mes.slice(mes.indexOf(',')+1).replace('"','')
		return temp.slice(0,3)+'****'+temp.slice(7)
	}, 
	getNumber1 () {//获取手机号码
		var mes = this.getCookie('ID');
		if (!mes) return ;
		var temp = mes.slice(mes.indexOf(',')+1).replace('"','')
		return temp
	}, 
	setCookie (c_name,value,expiredays) {
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+";path=/")
	},
	delCookie (name) {
		this.setCookie(name,'',-1)
	},
}