package cn.comm.listener;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.web.context.support.WebApplicationContextUtils;

import cn.comm.util.CommonParams;
import cn.comm.util.ConfigUtil;
import cn.comm.util.MsgUtil;
import cn.comm.util.SpringBeanUtil;

public class ApplicationContextListener implements ServletContextListener
{
    private static Logger logger = Logger.getLogger(CommonParams.LOG_SYS);

    public void contextDestroyed(ServletContextEvent arg0)
    {
        // TODO Auto-generated method stub
    }

    public void contextInitialized(ServletContextEvent context)
    {
        initSpring(context);
        initProp(context); // 必须预先加载配置
        initMsg(context);
    }

    

    private void initSpring(ServletContextEvent context)
    {
        // spring 工厂类
        SpringBeanUtil.springContext = WebApplicationContextUtils
                .getWebApplicationContext(context.getServletContext());
    }

   
 

    private void initProp(ServletContextEvent context)
    {
        // 初始化prop配置文件
        Properties properties = new Properties();
        try
        {
            InputStreamReader reader = new InputStreamReader(getClass()
                    .getResourceAsStream("/config.properties"), "UTF-8");
            properties.load(reader);
            ConfigUtil.setConfig(properties);
        }
        catch (IOException e)
        {
            logger.error(e.getMessage(), e);
        }
    }
 

    private void initMsg(ServletContextEvent context)
    {
        // 初始化系统消息配置文件
        Properties properties = new Properties();
        try
        {
            properties.load(new InputStreamReader(getClass()
                    .getResourceAsStream("/msg_cn.properties"), "UTF-8"));
            MsgUtil.add("cn", properties);
        }
        catch (IOException e)
        {
            logger.error(e.getMessage(), e);
        }
    }

}
