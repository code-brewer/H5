package cn.comm.db;

import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.comm.db.dbutil.OraDBUtil;
import cn.comm.db.dbutil.Pool;
import cn.comm.util.CommonParams;

/**
 * 数据持久化基类
 * 
 * @version 2013-1-23
 * @author tracy
 */
@SuppressWarnings({ "unused", "static-access", "rawtypes", "unchecked" })
public class BaseDAO extends OraDBUtil {
	protected final Log log = LogFactory.getLog(CommonParams.LOG_SYS);
	private final long serialVersionUID = 1L;
	private Pool pool;

	public Connection getConnection() {
		return pool.getInstanse().getConnection();
	}

	public Map listToPageMap(List list) {
		Map map = new HashMap();
		int total = 0;
		if (null != list && list.size() > 0) {
			total = Integer.parseInt((String) ((Map) list.get(0)).get("total"));
			map.put("list", list);
		}
		map.put("total", total);
		return map;
	}

}
