package cn.comm.db.dbutil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.apache.log4j.Logger;
import org.apache.tomcat.dbcp.dbcp.BasicDataSource;

/**
 * @ClassName: ConnectionPool
 * @author jek@gmail.com
 * @date 2012-11-28 星期四 1:05:23
 */

public class Pool implements IConnectionPool {

	private static BasicDataSource ds = null;

	private static Logger log = Logger.getLogger(Pool.class);
	private static Pool connPool = null;

	public Pool() {
	}

	static {
		try {
			getInstanse().createConnPool();
		} catch (Exception e) {
			log.error(" DBCPConnPool.createConnPool error,\n,stack:" + e);

		}
	}

	public static Pool getInstanse() {
		if (connPool == null) {
			connPool = new Pool();
		}
		return connPool;
	}

	private void setDdataSource() {
		try {
			ds.setDriverClassName(DbProp.getDriverclass());
			ds.setUrl(DbProp.getConnUrl());
			ds.setUsername(DbProp.getUserName());
			ds.setPassword(DbProp.getPassword());
			ds.setInitialSize(DbProp.getInitConnNumber());
			ds.setMinIdle(DbProp.getMinIdleConnNumber());
			ds.setMaxIdle(DbProp.getMaxIdleConnNumber());
			ds.setMaxActive(DbProp.getMaxActiveNumber());
			ds.setTimeBetweenEvictionRunsMillis(DbProp
					.getTimeBetweenEvictionRunsMillis());
			ds.setNumTestsPerEvictionRun(DbProp.getNumTestsPerEvictionRun());
			ds.setMinEvictableIdleTimeMillis(DbProp.getIdleConnTimeOut());
			ds.setMaxWait(DbProp.getMaxwait());
			ds.setPoolPreparedStatements(DbProp.getPoolPreparedStatements());
			ds.setMaxOpenPreparedStatements(DbProp.getMaxStatements());
			ds.setTestOnBorrow(DbProp.getTestOnBorrow());
			ds.setTestWhileIdle(DbProp.getTestWhileIdle());
			ds.setTestOnReturn(DbProp.getTestOnReturn());
			ds.setValidationQuery(DbProp.getValidationQuery());
			//ds.setValidationQueryTimeout(DbProp.getValidationQueryTimeout());
		} catch (Exception e) {
			log.error("bliss DBCPConnPool.setDS error,\n,message:" + e);
		}
	}

	/**
	 * 创建连接池
	 */
	public Pool createConnPool() {
		try {
			connPool.setDs(new BasicDataSource());
			connPool.setDdataSource();
			return connPool;
		} catch (Exception e) {
			log.error("bliss DBCPConnPool.createConnPool error,\n,message:" + e);
			log.error("bliss DBCPConnPool.createConnPool error,\n,stack:" + e);

		}

		return null;
	}

	public BasicDataSource getDs() {
		return ds;
	}

	public void setDs(BasicDataSource ds) {
		Pool.ds = ds;
	}

	public int getActiveSize() {
		return ds.getNumActive();
	}

	public int getCacheSize() {
		return ds.getNumActive() + ds.getNumIdle();
	}

	public Connection getConnection() {
		Connection conn = null;
		try {
			if (ds != null) {
				conn = ds.getConnection();
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("bliss DBCPConnPool.getConnection error,\n,message:" + e);
			log.error("bliss DBCPConnPool.getConnection error,\n,stack:" + e);

		}
		return conn;
	}

	public static void main(String[] args) {
		try {
			// getInstanse().createConnPool();
			for (int i = 0; i < 10; i++) {
				Connection conn = getInstanse().getConnection();
				PreparedStatement statement = conn
						.prepareStatement("SELECT COUNT(*) FROM DUAL");
				ResultSet rs = statement.executeQuery();

				System.out
						.println("idle:" + getInstanse().getDs().getNumIdle());
				rs.next();
				System.out.println("COUNT:" + rs.getString(1));
				// /System.out.println("currentactive:"+getInstanse().getDs().getNumActive());
				// System.out.println("active:"+getInstanse().getDs().getMaxActive());
				// conn.close();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
