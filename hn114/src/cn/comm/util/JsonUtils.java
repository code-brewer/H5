package cn.comm.util;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

public class JsonUtils
{
    private static Logger logger = Logger.getLogger(CommonParams.LOG_SYS);

    public static void outJsonAndClose(HttpServletResponse response, String json)
    {
        try
        {
            logger.info("response_json:" + json);
            response.setContentType("text/html");
            response.setCharacterEncoding("utf-8");
            ServletOutputStream os = response.getOutputStream();
            IOUtils.write(json, os, "utf-8");
            os.close();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }
}
