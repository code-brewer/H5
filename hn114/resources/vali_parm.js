{
	patterns: {
		isDigital: "^\\d*$",
		nullable: "^.*$",
		notNull: "^.+$",
		idCard: "\\d{17}[\\d|x]",
		email: "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$",
		orderStatus: "^[08]$",
		payType: "^[13]$",
		price: "^\\d+(\\.\\d{1,2})?$"
	},
	valis: {
		H_1002: {
			openid: "notNull(10,64)",
			mobile: "notNull(11,11)"
		},
		H_1003: {
			openid: "notNull(10,64)",
			mobile: "notNull(11,11)"
		},
		H_1004: {
			openid: "notNull(10,64)",
			mobile: "notNull(11,11)",
			mode: "isDigital"
		},
		H_1005: {
			openid: "notNull(10,64)",
			mobile: "notNull(11,11)"
		},
		H_2008: {
			
		},
		 
	}
}