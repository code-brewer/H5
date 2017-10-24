package cn.comm.db.dbutil;

import java.io.InputStream;
import java.util.Properties;
import org.apache.log4j.Logger;


/**
 * @author jek@gmail.com
 * 
 */
public class DbProp {

	private static Logger log = Logger.getLogger(DbProp.class);

	public static String sysConfigPath = null;

	public static Properties dbPropers = new Properties();

	private static String connUrl = null;

	private static String driverclass = null;

	private static String userName = null;

	private static String password = null;

	private static int initConnNumber=1;// 初始化连接数

	private static int minIdleConnNumber=1;// 最小空闲连接数

	private static int maxIdleConnNumber=1;// 最大空闲连接数

	private static int maxActiveConnNumber=1;// 最大活动数
	private static int maxOpenPreparedStatements=0;// 预处理打开的最大数量，默认为0，不限制
	private static boolean testOnBorrow=true;
	private static boolean testOnReturn=true;
	private static long timeBetweenEvictionRunsMillis=1800000L;
	private static int numTestsPerEvictionRun=1;
	private static long minEvictableIdleTimeMillis=1800000L;
	private static boolean testWhileIdle=true;
	private static String validationQuery="SELECT COUNT(*) FROM DUAL";
	private static int validationQueryTimeout=5;
	private static long maxwait=5;
	private static boolean poolPreparedStatements=true;

	private static String connPoolType = null;
	
	private static DbProp dbprop=new DbProp();
	
	private DbProp(){}
	
	public DbProp getInstance(){
		return dbprop;
	}
	
	/**
	 * 获取maxwait配置,单位(ms)
	 * 设置是否将预处理sql语句池化
	 */
	public static boolean getPoolPreparedStatements(){
		DbProp.poolPreparedStatements=Boolean.valueOf(DbProp.dbPropers.getProperty("poolPreparedStatements"));
		return DbProp.poolPreparedStatements;
	}
	
	
	/**
	 * 获取maxwait配置,单位(ms)
	 * 设置等待连接返回的超时时间
	 */
	public static long getMaxwait(){
		DbProp.maxwait=Long.valueOf(DbProp.dbPropers.getProperty("maxwait"));
		return DbProp.maxwait;
	}
	
	/**
	 * 获取配置testOnBorrow
	 * 设置是否为池中连接进行检验，如果检验失败，从池中去除连接，并尝试取出另一个,如设置为true,则validationQuery为非空* 
	 * @return true为校验
	 */
	public static boolean getTestOnBorrow(){
		DbProp.testOnBorrow=Boolean.valueOf(DbProp.dbPropers.getProperty("testOnBorrow"));
		return DbProp.testOnBorrow;
	}
	
	/**
	 * 获取testOnReturn配置
	 * 设置是否在归还池中时进行校验，如设置为true,则validationQuery为非空
	 */
	public static boolean getTestOnReturn(){
		DbProp.testOnReturn=Boolean.valueOf(DbProp.dbPropers.getProperty("testOnReturn"));
		return DbProp.testOnReturn;
	}
	
	/**
	 * 获取timeBetweenEvictionRunsMillis配置
	 * 设置空闲连接回收器运行的时间隔(单位：ms)
	 */
	public static long getTimeBetweenEvictionRunsMillis(){
		DbProp.timeBetweenEvictionRunsMillis=Long.valueOf(DbProp.dbPropers.getProperty("timeBetweenEvictionRunsMillis"));
		return DbProp.timeBetweenEvictionRunsMillis;
	}
	
	/**
	 * 获取numTestsPerEvictionRun
	 * 设置空闲连接回收器每次校验的空闲连接数
	 */
	public static Integer getNumTestsPerEvictionRun(){
		DbProp.numTestsPerEvictionRun=Integer.valueOf(DbProp.dbPropers.getProperty("numTestsPerEvictionRun"));
		return DbProp.numTestsPerEvictionRun;
	}
	
	/**
	 * testWhileIdle
	 * 设置是否被空闲连接回收器进行校验，如果校验失败则从池中去除，如设置为true,则validationQuery为非空
	 */
	public static Boolean getTestWhileIdle(){
		DbProp.testWhileIdle=Boolean.valueOf(DbProp.dbPropers.getProperty("testWhileIdle"));
		return DbProp.testWhileIdle;
	}
	
	/**
	 * validationQuery
	 * 设置校验的sql语句
	 */
	public static String getValidationQuery(){
		DbProp.validationQuery=String.valueOf(DbProp.dbPropers.getProperty("validationQuery"));
		return DbProp.validationQuery;
	}
	
	/**
	 * validationQueryTimeout
	 * 设置校验时的响应超时时间
	 */
	public static Integer getValidationQueryTimeout(){
		DbProp.validationQueryTimeout=Integer.valueOf(DbProp.dbPropers.getProperty("validationQueryTimeout"));
		return DbProp.validationQueryTimeout;
	}
	
	
	/**
	 * 获取连接池可缓存的sql语句数量，默认不限制
	 */
	public static int getMaxStatements() {
		DbProp.maxOpenPreparedStatements = Integer.valueOf(DbProp.dbPropers.getProperty("maxOpenPreparedStatements"));
		return DbProp.maxOpenPreparedStatements;
	}
	
	
	/**
	 * 获取最大连接活动数
	 */
	public static int getMaxActiveNumber() {
		String tempStr = DbProp.dbPropers
				.getProperty("maxActiveConnNumber");
		try {
			DbProp.maxActiveConnNumber = Integer.parseInt(tempStr);
		} catch (NumberFormatException e) {
			log.error("获取最大连接活动数失败" + e);
		}
		return DbProp.maxActiveConnNumber;
	}

	/**
	 * 从内容DbProp中获取参数
	 */
	public static String getValueByKey(String key) {
		return DbProp.dbPropers.getProperty(key);
	}

	/**
	 * 向dbpropers中设置参数
	 */
	public static void setProperty(String key, String value) {
		DbProp.dbPropers.setProperty(key, value);
	}

	/**
	 * 连接连接池的最小设置连接,默认1个连接
	 */
	public static int getMinIdleConnNumber() {
		DbProp.minIdleConnNumber = Integer.valueOf(DbProp.dbPropers.getProperty("minIdleConnNumber"));
		return DbProp.minIdleConnNumber;
	}

	/**
	 * 获取配置连接池的最大空闲连接数,默认最大10
	 */
	public static int getMaxIdleConnNumber() {
		String tempStr = DbProp.dbPropers.getProperty("maxIdleConnNumber");
		try {
			DbProp.maxIdleConnNumber=Integer.parseInt(tempStr);
		} catch (NumberFormatException e) {
			log.error("获取配置连接池的最大空闲连接数" + e);
		}
		return DbProp.maxIdleConnNumber;
	}

	/**
	 * 获取空闲连接的超时时间
	 * 设置空闲连接空闲时间（单位：ms）
	 */
	public static long getIdleConnTimeOut() {
		String tempStr = DbProp.dbPropers
				.getProperty("minEvictableIdleTimeMillis");

		try {
			DbProp.minEvictableIdleTimeMillis = Integer.parseInt(tempStr);
		} catch (NumberFormatException e) {
			log.error("获取配置连接池的最大空闲连接数" + e);
		}
		return DbProp.minEvictableIdleTimeMillis;
	}

	/**
	 * 连接数据库的密码
	 */
	public static String getPassword() {
		DbProp.password = DbProp.dbPropers.getProperty("password") == null ? ""
				: new String(DbProp.dbPropers.getProperty("password").trim());

		return DbProp.password;
	}

	/**
	 * 连接数据库的用户名
	 */
	public static String getUserName() {
		DbProp.userName = DbProp.dbPropers.getProperty("username") == null ? ""
				: new String(DbProp.dbPropers.getProperty("username").trim());
		return DbProp.userName;
	}

	/**
	 * 连接数据库的驱动类地址
	 */
	public static String getDriverclass() {
		DbProp.driverclass = DbProp.dbPropers.getProperty("driver.class");
		return DbProp.driverclass;
	}

	/**
	 * 连接数据库的连接地址
	 */
	public static String getConnUrl() {
		DbProp.connUrl = DbProp.dbPropers.getProperty("connection.url") == null ? ""
				: new String(DbProp.dbPropers.getProperty("connection.url")
						.trim());

		return DbProp.connUrl;
	}


	/**
	 * 获取连接池类型
	 */
	public static String getConnPoolType() {
		DbProp.connPoolType = DbProp.dbPropers.getProperty("connpool.type")
				.trim();
		return DbProp.connPoolType;
	}

	/**
	 * 获取初始化连接数 <功能详细描述>
	 */
	public static int getInitConnNumber() {
		String tempStr = DbProp.dbPropers.getProperty("initConnNumber");

		try {
			DbProp.initConnNumber = Integer.parseInt(tempStr);
		} catch (NumberFormatException e) {
			log.error("初始化连接数配置错误"+e);
		}
		return DbProp.initConnNumber;

	}

	private static void initDbByInputStream(InputStream input) {
		try {
			ReadProperties.load(input, dbPropers);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	static{
		initDbByInputStream(DbProp.class.getClassLoader().getResourceAsStream("db.properties"));
	}

}
