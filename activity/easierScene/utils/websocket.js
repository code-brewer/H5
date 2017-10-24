export default {
	socket() {
		var websocket;
		if('WebSocket' in window) {
			websocket = new WebSocket("ws://" + path + "/ws?uid=" + uid + "&type=" + this.type);
		} else if('MozWebSocket' in window) {
			websocket = new MozWebSocket("ws://" + path + "/ws" + uid);
		} else {
			websocket = new SockJS("http://" + path + "/ws/sockjs" + uid);
		}
		websocket.onopen = function(event) {
			console.log('websocket已连接');
			console.log(event);

		};
		websocket.onmessage = function(event) {

		};
		websocket.onerror = function(event) {
			console.log('websocket错误');
			console.log(event);
		};
		websocket.onclose = function(event) {
			console.log('websocket已关闭');
			console.log(event);
		}
		return websocket;
	},
	type: ''
}