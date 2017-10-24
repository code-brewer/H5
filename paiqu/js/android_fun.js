// var json_val={"imgPath":["test1.jpg","test.jpg"],"type":"1"}

window.dataJson = (json_val) => {
    var image = new Image();
    image.src = json_val.imgPath[0];
    image.onload = function() {
        json_val.imgPath[0] = (function(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
            var dataURL = canvas.toDataURL("image/" + ext);
            return dataURL;
        })(image);
        console.log(json_val);
        window.json_val = json_val;
        if (json_val.type == 1) {
            /*跳转指定处理模块*/
            window.location.href = "https://www.baidu.com/";
            return "type=1"

        } else if (json_val.type == 2) {

            window.location.hash = "/build-text";
            return "type=2"
        } else if (json_val.type == 3) {
            window.location.hash = "/build-text";

            return "type=3"
        }
    }

}
