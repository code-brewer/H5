package cn.comm.exception;

import org.apache.log4j.Logger;

import cn.comm.util.CommonParams;

@SuppressWarnings({ "serial", "unused" })
public class ParamValiException extends ServiceException {

	private final Logger logger = Logger.getLogger(CommonParams.LOG_SYS);

	public ParamValiException() {
		super("参数校验失败");
	}

	public ParamValiException(String version, String protocol, String prop, String regKey) {
		super(prop + "参数格式输入有误");
	}
}
