define(function (require, exports, module) {
    require('jqueryform');
    var onReady = function () {

        xOffset = 10;
        yOffset = 20;
        $(".tooltip").hover(function (e) {
                this.t = this.title;
                this.title = "";
                $("body").append("<p id='tooltip'>" + this.t + "</p>");
                $("#tooltip").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px").fadeIn("fast")
            },
            function () {
                this.title = this.t;
                $("#tooltip").remove()
            });
        $(".tooltip").mousemove(function (e) {
            $("#tooltip").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px")
        })

        //api测试工具发送按钮操作
        $("#J_call").on("click", function () {
            var ctx = $(this).attr("ctx");
            var _p=$('#form').serialize().split("parameter=");
            for(var i=1;i<=_p.length-1;i+=2){
                _p[i]=_p[i].replace('&','=');
            }
            var _pp=_p.join('');
            var j = $("#apiUrl").find("option:selected").attr("apiU")+ "?" +_pp ;
            var ff = encodeURIComponent(j);
            $.get(ctx + "/api!response.action?url=" + ff, function (data) {
                $("#responseHeader").html(data.substring(0,data.indexOf('||')));
                $("#responseBody").html(data.substring(data.indexOf('||')+2));
            });

        })


    };


    exports.run = function () {

        $(onReady());
    }
});