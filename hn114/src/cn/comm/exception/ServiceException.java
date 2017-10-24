package cn.comm.exception;

import cn.comm.util.MsgUtil;

@SuppressWarnings("serial")
public class ServiceException extends RuntimeException
{
    public ServiceException()
    {
        super("service接口异常");
    }
    public ServiceException(String msgKey)
    {
        super(MsgUtil.getMsg(msgKey));
    }
}
