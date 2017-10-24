<?php 
require './url.php';

print_r(get_data("http://61.158.237.34/WoLife-MobileInterface/mobile/main/getarea.do?".http_build_query($_GET), false, 'get'));

