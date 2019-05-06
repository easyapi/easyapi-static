
var Monitor = {
    alerterror:function(url){
        $.post(url, {}, function(str){
            layer.open({
                type: 1,
                title: "报警历史",
                move: false,
                area: ['820px', '600px'], //宽高
                content: str
            });
        });
    },
    kaiguan:function (ii) {
            $(".kaiguan"+ii).show().siblings("i").hide();
            $("#kaiguan").val(ii);
    },
    alertteam:function (url) {
        $.post(url, {}, function(str){
            layer.open({
                type: 1,
                title: "团队成员",
                move: false,
                area: ['320px', '300px'], //宽高
                content: str
            });
        });
    }
}