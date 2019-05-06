define(function (require, exports, module) {


    require('jqueryui');

    exports.run = function () {
        function ht() {
            var _hi = $(window).height() - 120;
            $(".panel").height(_hi);
            $(".overy").height(_hi - 40);
        }

        $(document).ready(function () {
            ht();
        });
        ht();
        $(window).resize(function () {
            ht();
        });


        $(".jiekou").sortable({
            cursor: "move",
            items: "li",                        //只是li可以拖动
            opacity: 0.6,                       //拖动时，透明度为0.6
            revert: true,                       //释放时，增加动画
            update: function (event, ui) {       //更新排序之后
                alert($(this).sortable("toArray"));
            }
        });


        $(".close").on("click", function () {
            $(".modal").hide();
            $(".modal-body").html("");
        })

        $("a[addtar]").on("click", function () {
            var url = $(this).attr("addtar");
            $(".modal").show();
            //$(".modal-body").html(url);
            $.post(url, function (data) {
                $(".modal-body").html(data);
            });
        })

        $("li[data-src]").on("click", function () {
            var url = $(this).attr("data-src");
            var catId = $(this).attr("catId");
            url = url + "?categoryId=" + catId;
            $.post(url, function (data) {
                $("#api").html(data);
            });
        })

        $("li[data-param]").on("click", function () {
            var url = $(this).attr("data-param");
            var apiId = $(this).attr("apiId");
            url = url + "?apiId=" + apiId;
            $.post(url, function (data) {
                $("#showt").html(data);
            });
        })


        $("a[data-add]").on("click", function () {
            var url = $(this).attr("url");
            var catId = $(this).attr("catId");
            url = url + "?categoryId=" + catId;
            $.post(url, function (data) {
                $("#showt").addClass("none");
                $("#addjk").show().html(data);
            });
        })


        $("#okcat").on("click", function () {
            var _n = $("#catname").val();
            var _i = $("#catinfo").val();
            var _p = $("#projectId").val();
            var url = $(this).attr("ur");
            var _url = $(this).attr("aj");
            if ((_n != "") && (_i != "")) {
                $.post(url, {
                    "category.name": _n,
                    "category.description": _i,
                    "category.project.id": _p
                }, function (result) {
                    if (result.status == "1") {
                        var _u = _url + "?id=" + result.msg;
                        $.get(_u, function (data) {
                            $("#categor").append(data);
                        });
                    }
                    if (result.status == "0") {
                        alert(result.msg);
                    }
                }, "JSON");
            }
        })


    }
});