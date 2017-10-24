package cn.comm.exception;

@SuppressWarnings("serial")
public class OSNotPassException extends ServiceException
{
    public OSNotPassException()
    {
        super("参数校验失败");
    }

    public OSNotPassException(String version, String protocol)
    {
        super( protocol +"$ 无该操作权限");
    }
}
