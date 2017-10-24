package cn.comm.bean;

import com.alibaba.fastjson.JSONObject;

public class RequestMsg {
	private String reqTime;
	private String proNo;
	private String mobile;
	private String signature;
	private String openid;
	
	
	private JSONObject reqBody;
	private JSONObject reqBase;

	public JSONObject getReqBase() {
		return reqBase;
	}

	public void setReqBase(JSONObject reqBase) {
		this.reqBase = reqBase;
	}

	public String getProNo() {
		return proNo;
	}

	public void setProNo(String proNo) {
		this.proNo = proNo;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public RequestMsg() {
	}

	public String getReqTime() {
		return reqTime;
	}

	public void setReqTime(String reqTime) {
		this.reqTime = reqTime;
	}

	public JSONObject getReqBody() {
		return reqBody;
	}

	public void setReqBody(JSONObject reqBody) {
		this.reqBody = reqBody;
	}
}
