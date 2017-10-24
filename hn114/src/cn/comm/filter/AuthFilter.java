package cn.comm.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.filter.OncePerRequestFilter;

import com.alibaba.fastjson.JSON;

import cn.comm.bean.ResponseMsg;
import cn.comm.util.CommonParams;
import cn.comm.util.ConfigUtil;
import cn.comm.util.JsonUtils;

public class AuthFilter extends OncePerRequestFilter {
	private static final Logger logger = Logger.getLogger(CommonParams.LOG_SYS);

	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		boolean doFilter = false;
		String config= ConfigUtil.get("ip.list");
		String addr = request.getRemoteAddr();
		logger.info("ip.list:"+config+",remoteAddr:" + addr);

		if (doFilter) {
			ResponseMsg re = new ResponseMsg();
			re.setResCode("4008");
			re.setResMsg("IP鉴权失败");
			JsonUtils.outJsonAndClose(response, JSON.toJSONString(re));
		} else {
			// 如果不执行过滤，则继续
			doDefaultNext(request, response, chain);
		}
	}

	private void doDefaultNext(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		chain.doFilter(request, response);
	}

}
