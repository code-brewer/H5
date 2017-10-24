package cn.comm.service.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.comm.db.BaseDAO;

/**
 * 用户数据持久化DAO
 * 
 * @version 2015-12-23
 * @author json
 */
@SuppressWarnings({ "rawtypes", "unchecked", "unused" })
public class DataDao extends BaseDAO {

	/**
	 * 添加
	 * 
	 * @return
	 */
	public Map addWeCallUser(String opendid, String mobile) {

		Map map = null;
		try {
			String procName = "wecall_add_user";
			StringBuffer params = new StringBuffer();
			params.append("'" + toSqlStr(opendid) + "'" + SQL_SEPAR);
			params.append("'" + toSqlStr(mobile) + "'");
			map = callDMLProc(getConnection(), procName, params.toString());
		} catch (Exception e) {
			log.error(e.toString());
		}
		return map;
	}
	
	/**
	 * 添加
	 * 
	 * @return
	 */
	public Map bindWeCallUser(String opendid, String mobile) {

		Map map = null;
		try {
			String procName = "wecall_bind_user";
			StringBuffer params = new StringBuffer();
			params.append("'" + toSqlStr(opendid) + "'" + SQL_SEPAR);
			params.append("'" + toSqlStr(mobile) + "'");
			map = callDMLProc(getConnection(), procName, params.toString());
		} catch (Exception e) {
			log.error(e.toString());
		}
		return map;
	}
	
	
	/**
	 * 添加
	 * 
	 * @return
	 */
	public Map setMode(String opendid, String mobile,String modes) {

		Map map = null;
		try {
			String procName = "wecall_set_modes";
			StringBuffer params = new StringBuffer();
			params.append("'" + toSqlStr(opendid) + "'" + SQL_SEPAR);
			params.append("'" + toSqlStr(mobile) + "'"+ SQL_SEPAR);
			params.append("'" + toSqlStr(modes) + "'");
			map = callDMLProc(getConnection(), procName, params.toString());
		} catch (Exception e) {
			log.error(e.toString());
		}
		return map;
	}

	/**
	 * 列表
	 * 
	 * @return
	 */
	public Map getWeCallUser(String opendid, String mobile) {

		List list = null;
		Map map = new HashMap();
		try {
			String procName = "wecall.wecall_get_user";
			StringBuffer params = new StringBuffer();
			params.append("'" + toSqlStr(opendid) + "'" + SQL_SEPAR);
			params.append("'" + toSqlStr(mobile) + "'");
			list = queryToListByProc(getConnection(), procName, params.toString(), null);
			if (list.size() > 0) {
				map = (Map) list.get(0);
			}
		} catch (Exception e) {
			log.error("", e);
		}
		return map;
	}

	 
	public static void main(String args[]) {
		try {

			DataDao dao = new DataDao();
			Map map = null;
			map = dao.addWeCallUser("weopenid15516379352", "15516379352");
			System.out.println(map);

			Map list = dao.getWeCallUser("weopenid15516379352", "15516379352");
			System.out.println("list.size:" + list.size() +"map:"+ list);
			 

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
