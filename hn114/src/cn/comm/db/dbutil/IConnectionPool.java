package cn.comm.db.dbutil;

import java.sql.Connection;

/**
 * @ClassName: IConnectionPool
 * @author jek@gmail.com
 * @date 2012-11-28 10:40:12
 */

public interface IConnectionPool {

	public Connection getConnection() throws Exception;

	public Pool createConnPool() throws Exception;
	public int getActiveSize();

	public int getCacheSize();
}
