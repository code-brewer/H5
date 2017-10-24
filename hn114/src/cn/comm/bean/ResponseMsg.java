package cn.comm.bean;

public class ResponseMsg
{
    private Object repBody;
    private String resCode;
    private String resMsg;
    private String reqTime;
    private String proNo;
    
    public ResponseMsg()
    {
        this.repBody = new Object();
        this.resCode = "0";
        this.resMsg = "success";
    }

    public String getReqTime()
    {
        return reqTime;
    }

    public void setReqTime(String reqTime)
    {
        this.reqTime = reqTime;
    }

    public String getProNo()
    {
        return proNo;
    }

    public void setProNo(String proNo)
    {
        this.proNo = proNo;
    }

    public ResponseMsg(Object rep)
    {
        if("".equals(rep) || null == rep)
        {
            rep = new Object();
        }
        this.repBody = rep;
        this.resCode = "0";
        this.resMsg = "success";
    }
    
    public void setResponseMsg(Object rep)
    {
        if("".equals(rep) || null == rep)
        {
            rep = new Object();
        }
        this.repBody = rep;
       
    }

    public String getResCode()
    {
        return resCode;
    }

    public void setResCode(String resCode)
    {
        this.resCode = resCode;
    }

    public String getResMsg()
    {
        return resMsg;
    }

    public void setResMsg(String resMsg)
    {
        this.resMsg = resMsg;
    }

    public Object getRepBody()
    {
        return repBody;
    }

    public void setRepBody(Object repBody)
    {
        if(repBody != null)
        {
            this.repBody = repBody;
        }
    }

}
