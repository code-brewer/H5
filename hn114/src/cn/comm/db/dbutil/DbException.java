package cn.comm.db.dbutil;

/** 
 * @ClassName: DbException 
 * @author jek@gmail.com
 * @date 2012-11-28 下午3:38:25  
 */

@SuppressWarnings("serial")
public class DbException extends Exception {

	private String errorCode;// 对异常标识的错误码；

	private String errorDesc;// 对异常的错误描述；

	Exception exception;// 对异常体的记录

	
	public DbException() {
		super();
	}

	public DbException(String errorCode, String errorDesc, Exception exception) {
		super();
		this.errorCode = errorCode;
		this.errorDesc = errorDesc;
		this.exception = exception;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorDesc() {
		return errorDesc;
	}

	public void setErrorDesc(String errorDesc) {
		this.errorDesc = errorDesc;
	}
}
