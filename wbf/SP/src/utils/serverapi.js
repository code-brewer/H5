export default {
    Operscore(context, type, fun){
        // initParam();
        var p = "";
        if(type == "share"){
            p = "mbl_no="+window.mbl_no+"&uuid="+window.uuid+"&score_type=100001&10000100";
        }
        else{
            p = "mbl_no="+window.mbl_no+"&uuid="+window.uuid+"&score_type=100002&10000100";
        }
        var np = p+"&sign="+hex_md5(p);
        var b = new Base64();
        sdpost('/mkm/member/operscore',"channel_id=yijie&req_data="+b.encode(np),fun);
        // {"msgCode":"MKM00000","msgInfo":"积分下发成功","data":{"mblNo":"15018724935","isNew":null,"flag":null,"is_limit":"0"}}
    },
    qryUserInfo(context,fun){
        var p = "auth_token="+window.auttok+"&10000100";
        // alert(p);
        var np = p+"&sign="+hex_md5(p);
        var b = new Base64();
        sdget("/mkm/third/qryUserInfo?channel_id=yijie&req_data="+b.encode(np),fun);
    }
};

function sdpost(url,content,callback){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){
            if(xmlhttp.status==200){
                if(callback){
                    callback(JSON.parse(xmlhttp.responseText));
                }
            }
            else{
                if(callback){
                    callback({"msgCode":"500","msgInfo":"网络错误"},xmlhttp.readyState+"|"+xmlhttp.status);
                }
            }
        }
    }
    xmlhttp.open("POST",serverPath + url,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(content);
}
function sdget(url,callback){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){
            if(xmlhttp.status==200){
                // alert(xmlhttp.responseText);
                if(callback){
                    callback(JSON.parse(xmlhttp.responseText));
                }
            }
            else{
                if(callback){
                    callback({"msgCode":"500","msgInfo":"网络错误"},xmlhttp.readyState+"|"+xmlhttp.status);
                }
            }
        }
    }
    xmlhttp.open("GET",serverPath + url,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(null);
}

// function initParam(){
//     if(typeof(window.mbl_no) == "undefined"){
//         window.mbl_no = getArgsFromUrl("mbl_no");
//         var nus = navigator.userAgent.split('_');
//         window.uuid = nus[nus.length-1];
//     }
// }


