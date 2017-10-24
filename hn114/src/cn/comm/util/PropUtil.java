package cn.comm.util;

import java.io.InputStream;
import java.util.Properties;

import cn.comm.db.dbutil.ReadProperties;
 
public class PropUtil {

	public static Properties propers = new Properties();
	private static PropUtil prop=new PropUtil();
	private PropUtil(){}
	public static PropUtil getInstance(){
		if (prop==null)
		{
			prop=new PropUtil();
		}
		return prop;
	}
	
	public static String get(String key){
		 
		return (String)PropUtil.propers.getProperty(key);
	}

	private static void initDbByInputStream(InputStream input) {
		try {
			ReadProperties.load(input, propers);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	static{
		initDbByInputStream(PropUtil.class.getClassLoader().getResourceAsStream("config.properties"));
	}
	
	public static void main(String[] args) {
		
		System.out.println(""+PropUtil.get("portalurl"));
	}
	

}
