<?php 
require './url.php';

print_r(get_data("http://lbs.juhe.cn/api/getaddressbylngb?".http_build_query($_GET), false, 'get'));

