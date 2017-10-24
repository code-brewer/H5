<?php 

function get_data($url, $params, $method = 'get') {
	$curl = curl_init($url);

	if($method=="get") {
		curl_setopt( $curl, CURLOPT_HEADER, 0 ); 
		curl_setopt( $curl, CURLOPT_RETURNTRANSFER , 1 );
		$response = curl_exec($curl);
	}
	elseif($method=="post") {
		curl_setopt( $curl, CURLOPT_POST, 1 );
		if($params) {
			curl_setopt( $curl, CURLOPT_POSTFIELDS, $params );
		}
		curl_setopt( $curl, CURLOPT_HEADER, 0 );
		curl_setopt( $curl, CURLOPT_RETURNTRANSFER , 1 );
		$response = curl_exec($curl);
	}
	else {
		curl_close($curl);
	}

	curl_close($curl);

	return $response;
}
