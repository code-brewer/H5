/*******************************************************************************
 * @模块功能： 所有操作数据库的,查询,添加,删除,修改存储过程的处理等方法
 * @编码人： sanbinJiang
 * @版本： 1.0
 * @编写日期： 2009-10-27
 * @工具版本： java1.4
 * @修改人： sanbinJiang
 * @最后修改时间：2009-10-27
 ******************************************************************************/
package cn.comm.db.dbutil;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import oracle.jdbc.OracleTypes;
import oracle.jdbc.driver.OracleCallableStatement;
 

public class OraDBUtil {

	private static final Log log = LogFactory.getLog("smslog");

	// 查询列表
	public static final String TYPE_SEARCHLIST = "searchList";

	// 参数数组
	public static final String KEY_PARAMARR = "paramArr";

	// 参数个数
	public static final String KEY_PARAMCOUNT = "paramCount";

	// 格式化后的存储过程语句
	public static final String KEY_FORMATSQL = "formatSql";

	// 新增、修改、删除操作
	public static final String TYPE_DML = "DML";

	// 总记录数
	public static final String KEY_TOTALCOUNT = "totalCount";

	// 更新数据库返回的代码
	public static final String KEY_CODE = "code";

	// 更新数据库返回的信息
	public static final String KEY_MSG = "msg";

	// 存储过程参数分割符号
	public static final String SQL_SEPAR = "~＃";

	/**
	 * 处理web页面传过来的SQL语句
	 * 
	 * @param str
	 *            待运行的SQL语句
	 * @return 过滤得到合法的SQL语句
	 */
	public final String toSqlStr(String str) {
		if (str == null || str.length() == 0) {
			return "";
		}
		int strLen = str.length();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < strLen; ++i) {
			char c = str.charAt(i);
			if (c == '\'') {
				sb.append("''");
			} else {
				sb.append(c);
			}
		}
		return sb.toString();
	}

	/**
	 * 通过sql进行处理数据(DML)
	 * 
	 * @param conn
	 *            数据库连接对象
	 * @param sql
	 *            sql语句
	 * @return map，保存的是<code,数字>和<msg,信息>， 其中数字为0时表示操作成功， 数字为1时表示失败
	 * @throws SQLException
	 */
	@SuppressWarnings( { "unchecked" })
	public Map callDMLSql(Connection conn, String sql) throws SQLException {

		Map map = new HashMap();
		Statement stmt = null;
		try {
			map.put(KEY_CODE, "1");
			map.put(KEY_MSG, "fail");

			log.debug("sql=" + sql);

			stmt = conn.createStatement();
			stmt.execute(sql);

			map.put("callsql", sql);
			map.put(KEY_CODE, "" + 0);
			map.put(KEY_MSG, "" + "ok");

			stmt.close();

		} catch (Exception e) {
			log.error(e.toString());
		} finally {
			if (stmt != null) {
				stmt.close();
				stmt = null;
			}

			if (conn != null) {
				conn.close();
				conn = null;
			}
		}
		return map;
	}
	 
	
	/**
	 * 通过sql查询数据库，获取结果集，返回列表，分页由sql进行处理
	 * 
	 * @param conn
	 *            连接对象
	 * @param sql
	 *            sql语句
	 * @return list(map)
	 * @throws Exception
	 */
	@SuppressWarnings( { "unchecked" })
	public List queryToListBySql(Connection conn, String sql) throws Exception {

		// 列属性类型
		String columnType = "";
		// 处理的字符类型
		String stringValue = "";
		// 处理的数字类型(对应oracle的number类型)
		BigDecimal decimalValue;
		// 处理的日期类型
		Date dateValue;
		// 大文本对象
		String blobValue;
		// 大型对象
		String clobValue;

		if (conn == null) {
			throw new Exception("数据库连接为空");
		}

		if (sql == null) {
			throw new Exception("sql语句为空");
		}

		log.debug("sql=" + sql);

		// 处理可变参数
		List rs_list = new ArrayList();
		ResultSet rs = null;
		Statement stmt = null;
		try {
			// 转换成普通的结果集
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);

			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			while (rs.next()) {
				HashMap map = new HashMap();
				for (int i = 1; i <= columnCount; i++) {
					columnType = rsmd.getColumnTypeName(i).trim();
					// 字符
					if (columnType.toUpperCase().equals("CHAR")
							|| columnType.toUpperCase().equals("VARCHAR")
							|| columnType.toUpperCase().equals("VARCHAR2")
							|| columnType.toUpperCase().equals("NVARCHAR")
							|| columnType.toUpperCase().equals("NVARCHAR2")) {
						stringValue = rs.getString(i);
						setColName(rsmd.getColumnLabel(i),
								toFormatString(stringValue), map);
					}

					// 数据类型
					if (columnType.toUpperCase().equals("NUMBER")
							|| columnType.toUpperCase().equals("INT")
							|| columnType.toUpperCase().equals("FLOAT")) {
						decimalValue = rs.getBigDecimal(i);
						//getColumnLabel --getColumnName
						setColName(rsmd.getColumnLabel(i), decimalValue + "",
								map);
					}

					// 日期类型
					if (columnType.toUpperCase().equals("DATE")
							||columnType.toUpperCase().equals("DATETIME")
							||columnType.toUpperCase().equals("TIMESTAMP")) {
						dateValue = rs.getDate(i);

						SimpleDateFormat df = new SimpleDateFormat(
								"yyyy-MM-dd HH:mm");
						if (dateValue != null && !dateValue.equals("")) {
							setColName(rsmd.getColumnLabel(i), df.format(rs
									.getTimestamp(i)), map);
						} else {
							setColName(rsmd.getColumnLabel(i), "", map);
						}

					}

					// 大文本类型
					if (columnType.toUpperCase().equals("BLOB")) {
						blobValue = rs.getString(i);
						setColName(rsmd.getColumnLabel(i), blobValue, map);
					}

					// clob object
					if (columnType.toUpperCase().equals("CLOB")) {
						clobValue = rs.getString(i);
						setColName(rsmd.getColumnLabel(i), clobValue, map);
					}

				}
				rs_list.add(map);
			}

		} finally {
			try {
				if (rs != null) {
					rs.close();
					rs = null;
				}

				if (stmt != null) {
					stmt.close();
					stmt = null;
				}

				if (conn != null) {
					conn.close();
					conn = null;
				}

			} catch (SQLException e) {
				log.error(e.toString());
			}
		}
		return rs_list;
	}
	 
	/**
	 * 通过存储过程查询数据库，获取结果集，返回列表，分页由存储过程进行处理
	 * 
	 * @param conn
	 *            连接对象
	 * @param procName
	 *            存储过程名称，形如 sp_test
	 * @param params
	 *            参数，形如 'a','b',1,2
	 * @return list(map)
	 * @throws Exception
	 */
	@SuppressWarnings( { "unchecked" })
	public List queryToListByProc(Connection conn, String procName,
			String params, String[] args) throws Exception {

		// 列属性类型
		String columnType = "";
		// 处理的字符类型
		String stringValue = "";
		// 处理的数字类型(对应oracle的number类型)
		BigDecimal decimalValue;
		// 处理的日期类型
		Date dateValue;
		// 大文本对象
		String blobValue;
		// 大型对象
		String clobValue;
		// 转换后的日期
		String dateStr;

		if (conn == null) {
			throw new Exception("数据库连接为空");
		}

		if (procName == null) {
			throw new Exception("存储过程名称为空");
		}

		// 处理可变参数
		String[] arr = args;
		String strings = generateStrings(arr);

		List rs_list = new ArrayList();
		ResultSet rs = null;
		CallableStatement stmt = null;
		try {
			Map ret = formatProcedure(procName, params, TYPE_SEARCHLIST);
			String sql = (String) ret.get(KEY_FORMATSQL);
			log.debug("procName=" + sql + " params=" + params);
			int count = Integer.parseInt("" + ret.get(KEY_PARAMCOUNT));
			
			String[] paramArr = (String[]) ret.get(KEY_PARAMARR);
			stmt = conn.prepareCall(sql.toUpperCase());
			/**
			 * 为所有的过程添加一个输出参数，为游标类型的参数
			 */
			stmt.registerOutParameter(1, OracleTypes.CURSOR);

			// 所有的输入类型参数为字符类型
			String p=null;
			for (int i = 0; i < count; i++) {
				String param = paramArr[i];
				if (param.indexOf("'") != -1) {// 字符
					if (param.replaceAll("'", "").length()==0)
					{
					  p=null;
					  //System.out.println(i + 2+" param?:"+p);
					}else
					{
					  p=param.replaceAll("'", "");
					}
					//System.out.println((i + 2) +" param:"+p);
					stmt.setString(i + 2, p);
					 
					
				} else {// 数值
					stmt.setBigDecimal(i + 2, new BigDecimal(paramArr[i]));
				}
			}
			
			stmt.execute();
			// 转换成普通的结果集
			rs = (ResultSet) stmt.getObject(1);
			//rs=stmt.getResultSet();

			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			while (rs.next()) {
				HashMap map = new HashMap();
				for (int i = 1; i <= columnCount; i++) {
					columnType = rsmd.getColumnTypeName(i).trim();
					// 字符
					if (columnType.toUpperCase().equals("CHAR")
							|| columnType.toUpperCase().equals("VARCHAR")
							|| columnType.toUpperCase().equals("VARCHAR2")
							|| columnType.toUpperCase().equals("NVARCHAR")
							|| columnType.toUpperCase().equals("NVARCHAR2")) {
						stringValue = rs.getString(i);
						//rsmd.getColumnName(i)
						setColName(rsmd.getColumnLabel(i),
								toFormatString(stringValue), map);
					}

					// 数据类型
					if (columnType.toUpperCase().equals("NUMBER")
							|| columnType.toUpperCase().equals("INT")
							|| columnType.toUpperCase().equals("FLOAT")
							|| columnType.toUpperCase().equals("DOUBLE")
							|| columnType.toUpperCase().equals("DECIMAL")) {
						decimalValue = rs.getBigDecimal(i);
						setColName(rsmd.getColumnLabel(i), decimalValue + "",
								map);
					}

					// 日期类型
					if (columnType.toUpperCase().equals("DATE")
						||columnType.toUpperCase().equals("TIMESTAMP")
						||columnType.toUpperCase().equals("DATETIME")) {
						dateValue = rs.getDate(i);
						dateStr = rs.getString(i);

						if (strings.indexOf(rsmd.getColumnLabel(i)) != -1) {// 如果需要带时、分、秒的日期

							SimpleDateFormat df = new SimpleDateFormat(
									"yyyy-MM-dd HH:mm:ss");
							setColName(rsmd.getColumnLabel(i), df.format(rs
									.getTimestamp(i)), map);

							if (dateStr != null && dateStr.length() > 2) {
								setColName(rsmd.getColumnLabel(i), dateStr
										.substring(0, dateStr.length() - 2),
										map);
							}

						} else {

							SimpleDateFormat df = new SimpleDateFormat(
									"yyyy-MM-dd HH:mm:ss");
							if (dateValue != null && !dateValue.equals("")) {
								setColName(rsmd.getColumnLabel(i), df.format(rs
										.getTimestamp(i)), map);
							} else {
								setColName(rsmd.getColumnLabel(i), dateStr, map);
							}
						}

					}

					// 大文本类型
					if (columnType.toUpperCase().equals("BLOB")) {
						blobValue = rs.getString(i);
						setColName(rsmd.getColumnLabel(i), blobValue, map);
					}

					// clob object
					if (columnType.toUpperCase().equals("CLOB")) {
						clobValue = rs.getString(i);
						setColName(rsmd.getColumnLabel(i), clobValue, map);
					}

				}
				rs_list.add(map);
			}

		} finally {
			try {
				if (rs != null) {
					rs.close();
					rs = null;
				}

				if (stmt != null) {
					stmt.close();
					stmt = null;
				}

				if (conn != null) {
					conn.close();
					conn = null;
				}

			} catch (SQLException e) {
				log.error(e.toString());
			}
		}
		return rs_list;
	}

	/**
	 * 通过存储过程进行处理数据(DML)
	 * 
	 * @param conn
	 *            数据库连接对象
	 * @param procName
	 *            存储过程名称
	 * @param params
	 *            参数
	 * @return map，保存的是<code,数字>和<msg,信息>， 其中数字为0时表示操作成功， 数字为1时表示失败
	 * @throws SQLException
	 */
	@SuppressWarnings( { "unchecked" })
	public Map callDMLProc(Connection conn, String procName, String params)
			throws SQLException {

		Map map = new HashMap();
		CallableStatement stmt = null;
		try {
			map.put(KEY_CODE, "");
			map.put(KEY_MSG, "");
			Map ret = formatProcedure(procName, params, TYPE_DML);
			String sql = (String) ret.get(KEY_FORMATSQL);
			log.debug("procName=" + sql + " params=" + params);
			int count = Integer.parseInt("" + ret.get(KEY_PARAMCOUNT));
			String[] paramArr = (String[]) ret.get(KEY_PARAMARR);
			stmt = conn.prepareCall(sql.toUpperCase());

			// 增加输入参数的赋值
			stmt.registerOutParameter(1, OracleTypes.VARCHAR);
			stmt.registerOutParameter(2, OracleTypes.VARCHAR);

			String p=null;
			for (int i = 0; i < count; i++) {
				String param = paramArr[i];
				if (param.indexOf("'") != -1) {// 字符
					if ( param.replaceAll("'", "").length()==0){
						p=null;
					}else
					{
						p=param.replaceAll("'", "");
					}
					stmt.setString(i + 3,p);
				} else {// 数值
					stmt.setBigDecimal(i + 3, new BigDecimal(paramArr[i]));
				}
			}
			stmt.execute();

			// map.put("callsql", "procName=" + sql + "params=" + params);
			map.put(KEY_CODE, "" + stmt.getString(1));
			map.put(KEY_MSG, "" + stmt.getString(2));

			stmt.close();
		} catch (Exception e) {
			map.put(KEY_CODE, "400003");
			map.put(KEY_MSG, "" + e.toString());
			log.error(e.toString());
		} finally {
			if (stmt != null) {
				stmt.close();
				stmt = null;
			}

			if (conn != null) {
				conn.close();
				conn = null;
			}
		}
		return map;
	}

	/**
	 * 对字符为空是的处理
	 * 
	 * @param par
	 *            要处理的字符
	 * @return
	 */
	private String toFormatString(String par) {
		if (par == null || par.equals("NULL") || par.equals("null")) {
			return "";
		} else {
			return par;
		}
	}

	/**
	 * 设置同列名自动递增
	 * 
	 * @param key
	 *            对应map的key
	 * @param keyValue
	 *            对应map的value
	 * @param map
	 *            装载值的map
	 */
	@SuppressWarnings( { "unchecked" })
	private void setColName(String key, String keyValue, HashMap map) {
		int i = 1;
		key = key == null ? "" : key.toLowerCase(); // key.toUpperCase()
													// key.toLowerCase();
		String temp = key;
		while (map.containsKey(temp)) {
			temp = key + i;
			i++;
		}

		// log.info(temp+":"+keyValue);
		if (null != keyValue && !"null".equals(keyValue) && !"".equals(keyValue)) {
			map.put(temp, keyValue);
		   // log.info(temp+"::"+keyValue+"size:"+keyValue.length());
		}

	}

	/**
	 * 通过存储过程的名称和参数格式化成{call sp_test(?,?,?,?)}的格式
	 * 
	 * @param procName
	 *            存储过程名称
	 * @param params
	 *            调用存储过程的参数(不用包含输出的参数)
	 * @param type
	 *            类型，包括有查询结果集的(searchList)、 查询总记录数(searchCount)、新增或者修改或者删除的(cud)
	 * @return 装载着参数数组，参数个数和格式化后的存储过程调用的map对象
	 */
	@SuppressWarnings( { "unchecked" })
	private Map formatProcedure(String procName, String params, String type) {
		Map ret = new HashMap();
		// 先转换存储过程语句的格式
		if (!procName.toLowerCase().startsWith("call")) {
			procName = "call " + procName;
		}
		String sql;
		if (type.equals(TYPE_SEARCHLIST)) {// 查询返回结果集列表
			 sql = "?,";
			//sql = "";
		} else if (type.equals(TYPE_DML)) {
			// 新增、修改、删除,总记录数等
			sql = "?,?,";
		} else {// 其他
			sql = "";
		}

		String[] paramAttr = new String[0];
		if (params != null && !params.trim().equals("")) {
			paramAttr = params.split(SQL_SEPAR);
			// 输出结果参数，除了参数外，默认增加一个输入结果参数
			for (int i = 0; i < paramAttr.length; i++) {
				sql += "?,";
			}

		}
		// 拼凑参数
		if (sql.length() > 0) {
			sql = "( " + sql.substring(0, sql.length() - 1) + " )";
		} else {
			sql = "( " + sql.substring(0, sql.length()) + " )";
		}
		sql = "{" + procName + sql + "}";
		ret.put(KEY_PARAMARR, paramAttr);
		ret.put(KEY_PARAMCOUNT, String.valueOf(paramAttr.length));
		ret.put(KEY_FORMATSQL, sql);

		log.debug("sql:" + sql + ",ret:" + ret.toString());
		// 返回
		return ret;
	}

	/**
	 * 根据可变参数生成用逗号分隔的字符串
	 * 
	 * @param arr
	 *            可变参数对应的数组
	 * @return 拼凑后的字符串
	 */
	private String generateStrings(String[] arr) {
		String strings = "";
		if (arr != null && arr.length > 0) {
			int len = arr.length;
			String s = "";
			for (int k = 0; k < len; k++) {
				s += arr[k] + ",";
			}
			strings = (s == null || s.length() < 1) ? "" : s.substring(0, s
					.length() - 1);
		}
		return strings;
	}

	/**
	 * 处理一行有mod列的列表
	 * 
	 * @param list
	 *            被处理的list
	 * @param mod
	 *            每一行数据的列数
	 * @return 被处理后的列表
	 */
	@SuppressWarnings( { "unchecked" })
	private List getSubList(List list, int mod) {
		List rslist = new ArrayList();
		Map map = null;
		if (list != null && list.size() > 0) {
			int start = 0;
			int end = 0;
			int len = list.size();
			mod = mod > 1 ? mod : 1;
			do {
				start = end;
				end += mod;
				end = end >= len ? len : end;
				map = new HashMap();
				map.put("subList", list.subList(start, end));
				rslist.add(map);
			} while (end < len);
		}
		return rslist;
	}

	/**
	 * 使用批量操作
	 * 
	 * @param size
	 * @throws SQLException
	 */
	public boolean insertByBatchStat(Connection conn, Object[][] parm,
			String sql) throws SQLException {
		boolean flag = false;
		Statement stmt = null;
		try {
			conn.setAutoCommit(false);
			stmt = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			for (int x = 0; x < parm.length; x++) {
				stmt.addBatch(sql);
			}
			stmt.executeBatch();
			conn.commit();
			conn.close();
			flag = true;
		} catch (SQLException ex) {
			flag = false;
			log.error(ex.toString());
		} catch (Exception e) {
			log.error(e.toString());
			flag = false;
		} finally {
			if (stmt != null) {
				stmt.close();
				stmt = null;
			}
			if (conn != null) {
				conn.close();
				conn = null;
			}
		}
		return flag;
	}
}
