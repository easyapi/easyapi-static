
var Gateway = {
    alerterror: function (url) {
        $.post(url, {}, function (str) {
            layer.open({
                type: 1,
                title: "报警历史",
                move: false,
                area: ['820px', '600px'], //宽高
                content: str
            });
        });
    },
    alertadd: function (url) {
        $.post(url, {}, function (str) {
            layer.open({
                type: 1,
                title: "添加规则",
                move: false,
                area: ['820px', '500px'], //宽高
                content: str
            });
        });
    },
    trafficadd: function (url) {
        $.post(url, {}, function (str) {
            layer.open({
                type: 1,
                title: "创建策略",
                move: false,
                area: ['820px', '600px'], //宽高
                content: str
            });
        });
    },
    keyadd: function (url) {
        $.post(url, {}, function (str) {
            layer.open({
                type: 1,
                title: "创建密钥",
                move: false,
                area: ['820px', '400px'], //宽高
                content: str
            });
        });
    },
    alertteam: function (url) {
        $.post(url, {}, function (str) {
            layer.open({
                type: 1,
                title: "团队成员",
                move: false,
                area: ['320px', '300px'], //宽高
                content: str
            });
        });
    },
    rongqi: function (url) {
        $.post(url, {}, function (str) {
            layer.open({
                type: 1,
                title: "接口容器",
                move: false,
                area: ['820px', '600px'], //宽高
                content: str
            });
        });

    }

}