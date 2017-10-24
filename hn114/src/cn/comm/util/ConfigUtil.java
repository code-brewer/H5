package cn.comm.util;

import java.io.IOException;
import java.util.Properties;

public class ConfigUtil {
	private static Properties config;

	public static String get(String key) {
		if (null == config) {
			try {
				config = new Properties();
				config.load(ConfigUtil.class.getClassLoader().getResourceAsStream("config.properties"));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return config.getProperty(key);
	}

	public static Properties getConfig() {
		return config;
	}

	public static void setConfig(Properties conf) {
		config = conf;
	}

	public static void main(String arg[]) {
		
		System.out.println("" + getConfig().toString());

	}

}
