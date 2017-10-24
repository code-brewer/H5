package cn.comm.ctrl;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSONObject;

import cn.comm.util.CommonParams;
import cn.comm.util.ConverterCharacterSetUtil;
import cn.comm.util.HttpKit;
import cn.comm.util.JsonUtils;
import cn.comm.util.PropUtil;
import cn.comm.util.StrUtil;

@Controller("weCallCtrl")
@SuppressWarnings({ "unused", "rawtypes", "unchecked" })
public class WeCallCtrl {
	protected final Log log = LogFactory.getLog(CommonParams.LOG_SYS);
	String HTTP_URL = PropUtil.get("http.server.url");

	/**
	 * http接口代理
	 * 
	 * @param model
	 * @param req
	 * @param resp
	 * @return
	 */
	@RequestMapping(value = "/http/proxy", method = RequestMethod.POST)
	public String httpProxy(ModelMap model, HttpServletRequest req, HttpServletResponse resp) {
		 
		String rsp = "";
		try {
			String reqMsgStr = ConverterCharacterSetUtil.converterToUtf8(req);
			log.info("请求json数据:" + reqMsgStr);
			JSONObject jsonreq = JSONObject.parseObject(reqMsgStr);
			String method = StrUtil.valueOf(jsonreq.getString("method"));
			String requrl = StrUtil.valueOf(jsonreq.getString("requrl"));
			String pramslist = StrUtil.valueOf(jsonreq.getString("pramslist"));

			Map<String, String> params = new HashMap<String, String>();
			if (null != pramslist && !"".equals(pramslist) && !"{}".equals(pramslist)) {
				params = JSONObject.parseObject(pramslist, HashMap.class);
			}

			 
			// 请求服务
			try {
				if ("GET".equals(method)) {
					rsp = HttpKit.get(requrl, params);
				}else
				{
					rsp = HttpKit.post(requrl, pramslist);
				}
				JSONObject jsrsp = JSONObject.parseObject(rsp);
				log.info(requrl + ",pramslist:" + pramslist);
			} catch (Exception e) {
				log.error("", e);
				JSONObject err = JSONObject.parseObject("{retCode:'9999',retMsg:'" + e.getMessage() + "'}");
				JsonUtils.outJsonAndClose(resp,err.toJSONString());
			}
			// 写json到客户端
			JsonUtils.outJsonAndClose(resp, rsp);
		} catch (Exception e) {
			log.error("", e);
			JSONObject err = JSONObject.parseObject("{retCode:'9999',retMsg:'" + e.getMessage() + "'}");
			JsonUtils.outJsonAndClose(resp,err.toJSONString());
		}
		return null;
	}

	/**
	 * 获取地市列表接口（18地市列表）
	 * 
	 * @param model
	 * @param req
	 * @param resp
	 * @return
	 */
	@RequestMapping(value = "/wo/getarea", method = RequestMethod.GET)
	public String getarea(ModelMap model, HttpServletRequest req, HttpServletResponse resp) {
		String url = HTTP_URL + "mobile/main/getarea.do";
		String rsp = "";
		try {
			String reqMsgStr = ConverterCharacterSetUtil.converterToUtf8(req);
			log.info("请求json数据:" + reqMsgStr);

			// 请求服务
			try {
				rsp = HttpKit.get(url, null);
				JSONObject jsrsp = JSONObject.parseObject(rsp);
				log.info(url + ",jsrsp:" + jsrsp);
			} catch (Exception e) {
				log.error("", e);
			}
			// 写json到客户端
			JsonUtils.outJsonAndClose(resp, rsp);
		} catch (Exception e) {
			JsonUtils.outJsonAndClose(resp, e.getMessage());
			log.error("", e);
		}
		return null;
	}

	/**
	 * 获取商家分类接口
	 * 
	 * @param model
	 * @param req
	 * @param resp
	 * @return
	 */
	@RequestMapping(value = "/wo/getShopTypeList", method = RequestMethod.GET)
	public String getShopTypeList(ModelMap model, HttpServletRequest req, HttpServletResponse resp) {
		String url = HTTP_URL + "mobile/query/getShopTypeList.do";
		String rsp = "";
		try {
			String reqMsgStr = ConverterCharacterSetUtil.converterToUtf8(req);
			log.info("请求json数据:" + reqMsgStr);

			// 请求服务
			try {
				rsp = HttpKit.get(url, null);
				JSONObject jsrsp = JSONObject.parseObject(rsp);
				log.info(url + ",jsrsp:" + jsrsp);
			} catch (Exception e) {
				log.error("", e);
			}
			// 写json到客户端
			JsonUtils.outJsonAndClose(resp, rsp);
		} catch (Exception e) {
			JsonUtils.outJsonAndClose(resp, e.getMessage());
			log.error("", e);
		}
		return null;
	}

	/**
	 * 搜索商家
	 * 
	 * @param model
	 * @param req
	 * @param resp
	 * @return
	 */
	@RequestMapping(value = "/wo/searchShopInfo", method = RequestMethod.POST)
	public String searchShopInfo(ModelMap model, HttpServletRequest req, HttpServletResponse resp) {
		String url = HTTP_URL + "mobile/query/searchShopInfo.do";
		String rsp = "";
		try {
			String reqMsgStr = ConverterCharacterSetUtil.converterToUtf8(req);
			log.info("请求json数据:" + reqMsgStr);
			JSONObject jsonreq = JSONObject.parseObject(reqMsgStr);
			String queryWord = StrUtil.valueOf(jsonreq.getString("queryWord"));
			String shopType = StrUtil.valueOf(jsonreq.getString("shopType"));
			String shopTypeFather = StrUtil.valueOf(jsonreq.getString("shopTypeFather"));
			String areaId = StrUtil.valueOf(jsonreq.getString("areaId"));
			String pageNo = StrUtil.valueOf(jsonreq.getString("pageNo"));
			String pageSize = StrUtil.valueOf(jsonreq.getString("pageSize"));
			String sort = StrUtil.valueOf(jsonreq.getString("sort"));
			String shopx = StrUtil.valueOf(jsonreq.getString("shopx"));
			String shopy = StrUtil.valueOf(jsonreq.getString("shopy"));
			Map<String, String> params = new HashMap<String, String>();
			if (!"".equals(queryWord)) {
				params.put("queryWord", queryWord);
			}
			if (!"".equals(shopType)) {
				params.put("shopType", shopType);
			}
			if (!"".equals(shopTypeFather)) {
				params.put("shopTypeFather", shopTypeFather);
			}
			if (!"".equals(areaId)) {
				params.put("areaId", areaId);
			}
			if (!"".equals(pageNo)) {
				params.put("pageNo", pageNo);
			}
			if (!"".equals(pageSize)) {
				params.put("pageSize", pageSize);
			}
			if (!"".equals(sort)) {
				params.put("sort", sort);
			}
			if (!"".equals(shopx)) {
				params.put("shopx", shopx);
			}
			if (!"".equals(shopy)) {
				params.put("shopy", shopy);
			}

			log.info(url + params.toString());
			// 请求服务
			try {
				rsp = HttpKit.get(url, params);
				JSONObject jsrsp = JSONObject.parseObject(rsp);
				log.info(url + ",jsrsp:" + jsrsp);
			} catch (Exception e) {
				log.error("", e);
			}
			// 写json到客户端
			JsonUtils.outJsonAndClose(resp, rsp);
		} catch (Exception e) {
			JsonUtils.outJsonAndClose(resp, e.getMessage());
			log.error("", e);
		}
		return null;
	}

}
