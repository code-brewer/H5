export default {
    // 获取参数
    getArgsFromUrl(sArgName) {
        var sHref = window.location.search;
        var args = sHref.split("?");
        var retval = "";
        if(args[0] == sHref)
        {
            return retval;
        }
        var str = args[1];
        args = str.split("&");
        for(var i = 0; i < args.length; i++ )
        {
            str = args[i];
            var arg = str.split("=");
            if(arg.length <= 1) continue;
            if(arg[0] == sArgName) retval = arg[1];
        }
        return retval;
　　},
};