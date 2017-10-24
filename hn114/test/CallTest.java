
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.alibaba.fastjson.JSONObject;

import cn.comm.util.Tokener;

/**
 * 测试类
 * 
 * @version 2016-7-27
 * @author jsan
 */
public class CallTest extends ServerHttpRequestClient {

	long start = 0;
	long end = 0;

	@Before
	public void init() {
		start = System.currentTimeMillis();
	}

	@After
	public void destory() {
		end = System.currentTimeMillis();
		System.out.println("调用消耗时间（毫秒）：" + (end - start));
	}
	
	//@Test
		public void getarea() { 
			getMethod(SERVERURI + "wo/getarea");
		}
		 

	//@Test
	public void getShopTypeList() {
		 
		getMethod(SERVERURI + "wo/getShopTypeList");

	}
	 
	//@Test
	public void searchShopInfo() {
		String openid = "weopenid15516379352";
		String reqtime = getStringDate();
		String mobile = "15516379352";
		String signature = Tokener.encodeStr(openid + reqtime+Tokener.MMKEY + mobile);
		String modes = "1";
		
		JSONObject req = JSONObject.parseObject("{reqtime:'" + reqtime + "',openid:'" + openid + "',mobile:'" + mobile
				+ "',signature:'" + signature +  "',mode:'" + modes + "'}");
		//System.out.println("" + req.toJSONString());
		
		//postMethod(SERVERURI + "wo/searchShopInfo", req.toJSONString());
		postMethod(SERVERURI + "wo/searchShopInfo", "{shopType:'02030000'}");
		

	}
	
	   @Test
		public void httpProxy() {
			String requrl = "http://61.158.237.34/WoLife-MobileInterface/mobile/query1/getShopTypeList.do";
			String method = "POST";
			String mobile = "02030000";
			 
			
			JSONObject req = JSONObject.parseObject("{requrl:'" + requrl + "',method:'" + method + "',pramslist:{ shopType:'" + mobile +  "'} }");
			System.out.println("" + req.toJSONString());
			
			//postMethod(SERVERURI + "wo/searchShopInfo", req.toJSONString());
			postMethod(SERVERURI + "http/proxy", req.toJSONString());
			

		}

	
	

	public static String getStringDate() {
		String dateString = String.valueOf(System.currentTimeMillis());
		return dateString;
	}

}