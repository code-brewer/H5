package cn.comm.util;

import java.text.DecimalFormat;
import java.util.Random;
import java.util.UUID;

public class StringUtil {
	/**
	 * 获取随机的字符
	 * 
	 * @param num
	 * @return
	 */
	public static String getRandomString(int length) {
		StringBuffer buffer = new StringBuffer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
		StringBuffer sb = new StringBuffer();
		Random r = new Random();
		int range = buffer.length();
		for (int i = 0; i < length; i++) {
			sb.append(buffer.charAt(r.nextInt(range)));
		}
		return sb.toString();
	}

	public static boolean isNull(Object... objs) {
		for (Object obj : objs) {
			if (obj == null || "".equals(obj))
				return true;
		}
		return false;
	}

	/**
	 * 获取UUID字符串,(已去掉中划线，长度32位)
	 * 
	 * @return
	 * @throws Exception
	 */
	public static final String getUUID() throws Exception {
		String old_uuid = UUID.randomUUID().toString();
		final String new_uuid = old_uuid.substring(0, 8) + old_uuid.substring(9, 13) + old_uuid.substring(14, 18) + old_uuid.substring(19, 23) + old_uuid.substring(24);
		return new_uuid;
	}

	/**
	 * 
	 * @Description (根据指导字符串获取数据字符串)
	 * @param str
	 * @return String
	 * @date 2016年1月15日下午4:13:27
	 * @author qiufh
	 */
	public static String confuse(String str) {
		if (str == null || str.trim().length() == 0) {
			return str;
		}
		char[] chs = str.toCharArray();
		Random ran = new Random();
		for (int i = 0, k = chs.length * 2; i < k; i++) {
			int first = ran.nextInt(k) % chs.length;
			char t = chs[first];
			int second = ran.nextInt(k) % chs.length;
			chs[first] = chs[second];
			chs[second] = t;
		}
		return new String(chs);
	}

	/**
	 * 
	 * @Description (获取（1到 num-1）位的随机数字)
	 * @param num
	 * @return int
	 * @date 2016年1月15日下午4:15:30
	 * @author qiufh
	 */
	public static int random(int num) {
		return (int) (Math.random() * num);
	}

	/**
	 * 
	 * @Description (获取百分比)
	 * @param x		除数
	 * @param total	被除数
	 * @return String
	 * @date 2016年2月24日上午11:42:19
	 * @author qiufh
	 */
	public static String getPercent(double x, double total) {
		String result = "";//接受百分比的值  
		double tempresult = x / total;
		/*NumberFormat nf = NumberFormat.getPercentInstance(); //注释掉的也是一种方法  
		nf.setMinimumFractionDigits(2); //保留到小数点后几位  
		result = nf.format(tempresult);*/
		DecimalFormat df1 = new DecimalFormat("0.00%");
		result = df1.format(tempresult);
		return result;
	}

	public static String getExcept(double x, double total) {
		String result = "";//接受百分比的值  
		Number tempresult = x / total;
		DecimalFormat df1 = new DecimalFormat("0.00");
		result = df1.format(tempresult);
		return result;
	}
}
