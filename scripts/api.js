//添加接口
$("body").on("click", "#btnjk", function () {

    var _categoryId = $("#cateId").val();
    var _appId = $("#appAppId").val();


    var _url = easyapi.ctx + "/ajax/api/add.jsp?categoryId=" + _categoryId + "&appId=" + _appId;

    $.get(_url, function (result) {

        $("#addj").replaceWith(result);

        $("#apiAllAdd").show();
        $("#apiFastAdd").hide();
        $("[apiUpdateApi]").hide();
        var _bigh = $(".all").height();
        $(".leftcat,.stp3").height(_bigh);
    });

});

//快速添加接口
$("body").on("click", "#btnFast", function () {

    var _categoryId = $("#cateId").val();
    var _appId = $("#appAppId").val();


    var _url = easyapi.ctx + "/ajax/api/fast.jsp?categoryId=" + _categoryId + "&appId=" + _appId;

    $.get(_url, function (result) {

        $("#addFast").replaceWith(result);

        $("#apiFastAdd").show();

        $("[apiUpdateApi]").hide();
        $("#apiAllAdd").hide();
        $("#addj").html("");
        var _jsonVal = $("#Canvas").text();
        var _format = $("#format").val();
        if (_jsonVal != null && _jsonVal != '') {
            if (_format != null && _format != '' && _format == 'JSON') {
                $("#Canvas").html(_jsonVal);
                ProcessFormat(_jsonVal, "Canvas");
                sho();
            }
            $("#result").val(_jsonVal);
            var _bigh = $(".all").height();
            $(".leftcat,.stp3").height(_bigh);
        }
    });

});


$("body").on("click", "#catcCancel", function () {
    $("#categoryEdit").remove();
});

//添加接口时添加请求参数
function addAddParam() {
    var _coun = $("#clickCount").val();
    $("#clickCount").attr("value", parseInt(_coun) + 1);

    var _htm = easyapi.ctx + "/ajax/param/add.jsp?clickCount=" + _coun;

    $.get(_htm, function (result) {

        $("#addEnd").before(result);

    });
}


//修改接口时添加请求参数
function updateAddParam() {
    var _coun = $("#clickCount").val();
    $("#clickCount").attr("value", parseInt(_coun) + 1);

    var _htm = easyapi.ctx + "/ajax/param/add.jsp?clickCount=" + _coun;

    $.get(_htm, function (result) {

        $("#updateEnd").before(result);

    });
}


//修改分类提交
$("body").on("click", "[editCate='edit']", function () {


    var _id = $("#editCategoryId").val();
    var _name = $("#catEditName").val();
    var _info = $("#catEditInfo").val();

    var _oldName = $("#catEditName").attr("oldName");
    var _oldInfo = $("#catEditInfo").attr("oldInfo");
    if (_oldName != _name || _oldInfo != _info) {
        showld("保存中...");
        $.ajax({
            url: easyapi.ctx + "/category!update.action",
            type: "post",
            data: {
                "id": _id,
                "category.name": _name,
                "category.description": _info
            },
            dataType: "json",
            success: function (result) {
                if (result.status == 1 || result.status == '1') {
                    var _newStructId = result.msg;

                    var _u = easyapi.ctx + "/ajax/category/view.jsp?cateId=" + _newStructId;
                    $.get(_u, function (data) {
                        $("#category" + _newStructId).replaceWith(data);

                        $("#categoryEdit").remove();
                    });


                } else {
                    layer.msg(result.msg);
                }
            }
        });
        overld();
    } else {
        $("#categoryEdit").remove();
    }

});


//修改分类页面显示
$("body").on("click", "a[e-edit]", function () {
    var _id = $(this).attr("e-edit");

    var url = easyapi.ctx + "/ajax/category/edit.jsp?cateId=" + _id;
    $.get(url, function (result) {
        $("#categoryEdit").remove();
        $("#category" + _id).after(result);
    });
});

//添加分类
$(".addCategor").Validform({
    tiptype: function (msg, o, cssctl) {
        //msg：提示信息;
        //o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
        //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
        if (!o.obj.is("form")) {//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
            var objtip = $(".msg2");
            cssctl(objtip, o.type);
            objtip.text(msg);
        }
    },

    ajaxPost: true,
    callback: function (data) {
        if (data.status == "1") {
            var _id = data.msg;
            var _code = $("#appAppId").attr("code");
            var _docId = $("#appAppId").val();
            window.location.href = easyapi.ctx + "/dashboard/api/?code="+_code+"&documentId="+_docId+"&categoryId=" + _id + "&head=api";
            var _u = easyapi.ctx + "/ajax/category/view.jsp?cateId=" + _id;
            $.get(_u, function (result) {
                $("#categor").children(".active").removeClass("active");
                $("#categor").append(result);
                $(".addCategor").find("#catname").val("");
                $(".addCategor").find("#catinfo").val("");

                var _ur = easyapi.ctx + "/ajax/api/right.jsp?cateId=" + _id;

                $.get(_ur, function (resu) {

                    $(".pg-allapi").replaceWith(resu);

                });
            });

        }
    }
});

//删除接口或分类
function deleteDatas(msg, table, id) {
    if (window.confirm("确定删除吗？")) {
        var url = easyapi.ctx + "/" + table + "!delete.action?id=" + id;
        $.get(url, function (result) {
            var jsonobj = eval('(' + result + ')');
            if (jsonobj.status == 1 || jsonobj.status == '1') {
                $('#' + table + id).slideUp("slow");
                if (table == 'api') {
                    $('#apiAll' + id).html("<span class='delsp'>接口已删除</span>");
                } else if (table == 'category') {
                    $('#categoryAll' + id).html("<span class='delsp'>接口分类已删除</span>");
                }
            } else {
                layer.msg(jsonobj.msg)
            }
        });
        return true;
    }
    return false;
}

//接口排序
$(".jiekou").sortable({
    cursor: "move",
    items: "li",                        //只是li可以拖动
    opacity: 0.6,                       //拖动时，透明度为0.6
    revert: true,                       //释放时，增加动画
    update: function (event, ui) {       //更新排序之后

        var _seq = $(this).sortable('toArray').toString();
        $.ajax({
            url: easyapi.ctx + "/api!sequencing.action",
            type: "post",
            data: {
                "sequences": _seq
            },
            dataType: "json",
            success: function (result) {
            }
        });
    }
});

//分类排序
$("#categor").sortable({
    cursor: "move",
    items: "li",                        //只是li可以拖动
    opacity: 0.6,                       //拖动时，透明度为0.6
    revert: true,                       //释放时，增加动画
    update: function (event, ui) {       //更新排序之后

        var _seq = $(this).sortable('toArray').toString();

        $.ajax({
            url: easyapi.ctx + "/category!sequencing.action",
            type: "post",
            data: {
                "sequences": _seq
            },
            dataType: "json",
            success: function (result) {
            }
        });
    }
});

//接口移动到其他分类（修改分类）
$("[catid]").droppable({

    drop: function (event, ui) {
        var _api = ui.draggable.attr("id");
        var _cate = $(this).attr("id");

        var _apiId = _api.replace("api", "");
        var _cateId = _cate.replace("category", "");
        $.ajax({
            url: easyapi.ctx + "/api!update.action",
            type: "post",
            data: {
                "id": _apiId,
                "api.category.id": _cateId
            },
            dataType: "json",
            success: function (result) {

            }
        });
//            ui.draggable.hide();
        $('#api' + _apiId).slideUp("slow");
        $('#apiAll' + _apiId).html("<span class='delsp'>接口分类已修改</span>");

    }

});


$("a[toog]").on("click", function () {
    var z = $(this).attr("toog");
    if (z == "y") {
        $(this).toggle();
        $("#categoryAdd").toggle();
    }
    if (z == "z") {
        $("a[toog=y]").show();
        $("#categoryAdd").toggle();
    }

})

$("div[c]").on("click", function () {
    var _i = $(this).attr("c");
    if (_i == 1) {
        $(this).next(".st").show();
        $(this).remove();
    }
    if (_i == 2) {
        $(".bg_yd").remove();
    }

})

$("[tootl=sh]").on("click", function () {
    $(this).next(".over").toggle();
})


//修改接口
//    $("#apiUpdateForm").Validform({
//        tiptype: function (msg, o, cssctl) {
//            if (!o.obj.is("form")) {
//                var objtip = o.obj.parents("form").find("#msgbx");
//                cssctl(objtip, o.type);
//                objtip.text(msg);
//            } else {
//                var objtip = o.obj.find("#msgbx");
//                cssctl(objtip, o.type);
//                objtip.text(msg);
//            }
//        }
//    });

//修改接口提交
//    function updateSaveApi(){
$("#apiUpdateForm").Validform({
    tiptype: function (msg, o, cssctl) {
        if (!o.obj.is("form")) {
            var objtip = o.obj.parents("form").find("#msgbx");
            cssctl(objtip, o.type);
            objtip.text(msg);
        } else {
            var objtip = o.obj.find("#msgbx");
            cssctl(objtip, o.type);
            objtip.text(msg);
        }
    },

    ajaxPost: true,
    callback: function (data) {
        if (data.status == "1") {
            var _apiId = data.msg;
            var _deta = easyapi.ctx + "/ajax/api/view.jsp?apId=" + _apiId;
            $.get(_deta, function (da) {
                $("#api" + _apiId).replaceWith(da);
                $("#msgbx").html("修改成功").removeClass("Validform_loading");
            });

        }
    }
});
//    }


//添加接口
var yes = $("#apiAddForm").Validform({
    tiptype: function (msg, o, cssctl) {
        //msg：提示信息;
        //o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
        //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
        if (!o.obj.is("form")) {//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
            var objtip = $("#msgbxs");
            cssctl(objtip, o.type);
            objtip.text(msg);
        } else {
            var objtip = o.obj.find("#msgbxs");
            cssctl(objtip, o.type);
            objtip.text(msg);
        }
    },

    ajaxPost: true,
    callback: function (data) {
        if (data.status == "1") {
            var _apId = data.msg;
            var _u = easyapi.ctx + "/ajax/api/view.jsp?apId=" + _apId;
            $.get(_u, function (data) {
                $("#apiLis").children(".active").removeClass("active");
                $("#apiLis").append(data);
                $("#msgbxs").html("添加成功").removeClass("Validform_loading");
                $(".api-nobody").hide();
                var _deta = easyapi.ctx + "/ajax/api/edit.jsp?apId=" + _apId;
                $.get(_deta, function (da) {
                    $("#apiUpd").replaceWith(da);

                    $("#apiAllAdd").hide();
                    $("#addj").html("");
                    $("#apiFastAdd").hide();
                    $("#addFast").html("");
                    $("[apiUpdateApi]").show();

                    var _format = $("#format").val();
                    var _jsonVal = $("#Canvas").text();
                    if (_format != null && _format != '' && _format == "JSON") {

                        $("#Canvas").html(_jsonVal);
                        ProcessFormat(_jsonVal, "Canvas");
                        sho();

                        var _result = $("#otherResultUpdate").val();
                        ProcessFormat(_result, "CanvasOther");
                    }
                    if (_format != null && _format != '' && _format == 'XML') {
                        _jsonVal = $("#resultUpdate").val();
                        $("#Canvas").children(".CodeContainer").html("");
                        $("#Canvas").children(".CodeContainer").append("<code class='hljs xml'></code>");
                        $("#Canvas").children(".CodeContainer").children("code").text(_jsonVal);

                        var _resu = hljs.highlightAuto(_jsonVal, ["xml"]);
                        if (_resu != null) {
                            $("#Canvas").children(".CodeContainer").children("code").html(_resu.value);
                            setTimeout(shoXml("Canvas"), 1000);
                        }
                    }
                    $("#result").val(_jsonVal);
                });

            });

        }
    },
    postonce: true
});


//快速添加接口
var yes = $("#apiFastAddForm").Validform({
    tiptype: function (msg, o, cssctl) {
        //msg：提示信息;
        //o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
        //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
        if (!o.obj.is("form")) {//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
            var objtip = $("#msgbxs");
            cssctl(objtip, o.type);
            objtip.text(msg);
        } else {
            var objtip = o.obj.find("#msgbxs");
            cssctl(objtip, o.type);
            objtip.text(msg);
        }
    },

    ajaxPost: true,
    callback: function (data) {
        if (data.status == "1") {
            var _apId = data.msg;
            var _u = easyapi.ctx + "/ajax/api/view.jsp?apId=" + _apId;
            $.get(_u, function (data) {
                $("#apiLis").children(".active").removeClass("active");
                $("#apiLis").append(data);
                $("#msgbxs").html("添加成功").removeClass("Validform_loading");
                $(".api-nobody").hide();
                var _deta = easyapi.ctx + "/ajax/api/edit.jsp?apId=" + _apId;
                $.get(_deta, function (da) {
                    $("#apiUpd").replaceWith(da);

                    $("#apiAllAdd").hide();
                    $("#apiFastAdd").hide();
                    $("[apiUpdateApi]").show();

                    var _format = $("#format").val();
                    if (_format != null && _format != '' && _format == "JSON") {
                        var _jsonVal = $("#Canvas").text();
                        $("#Canvas").html(_jsonVal);
                        ProcessFormat(_jsonVal, "Canvas");
                        sho();

                    }
                    if (_format != null && _format != '' && _format == 'XML') {
                        var _jsonVal = $("#resultUpdate").val();
                        $("#Canvas").children(".CodeContainer").html("");
                        $("#Canvas").children(".CodeContainer").append("<code class='hljs xml'></code>");
                        $("#Canvas").children(".CodeContainer").children("code").text(_jsonVal);

                        var _resu = hljs.highlightAuto(_jsonVal, ["xml"]);
                        if (_resu != null) {
                            $("#Canvas").children(".CodeContainer").children("code").html(_resu.value);
                            setTimeout(shoXml("Canvas"), 1000);
                        }
                    }
                });

            });

        }
    },
    postonce: true
});

//删除请求参数
function deleteParam(msg, id, paramId) {
    if (window.confirm(msg)) {
        if (paramId != null && paramId != '') {
            var url = easyapi.ctx + "/request-param!delete.action?id=" + paramId;
            $.get(url, function (result) {
            })
        }
        $("#" + id).remove();
        return true;
    }
    return false;
}




//点击接口示例，显示接口示例列表页面
$("body").on("click", "#example", function () {
    var _id = $("#apiAppId").val();

    var url = easyapi.ctx + "/ajax/example/index.jsp?apId=" + _id;
    $.get(url, function (result) {
        $("#apiUpd").replaceWith(result);

    });
});

//点击接口详情，显示接口详情修改页面
$("body").on("click", "#detail", function () {
    var _id = $("#apiAppId").val();

    var url = easyapi.ctx + "/ajax/api/edit.jsp?apId=" + _id;
    $.get(url, function (result) {
        $("#apiUpd").replaceWith(result);
        var _bigh = $("#apiUpd").height();
        $(".leftcat,.stp3").height(_bigh);

        var _jsonVal = $("#Canvas").text();
        var _format = $("#format").val();
        if (_jsonVal != null && _jsonVal != '') {
            if (_format != null && _format != '' && _format == 'JSON') {
                $("#Canvas").html(_jsonVal);
                ProcessFormat(_jsonVal, "Canvas");
                sho();
                var _result = $("#otherResultUpdate").val();
                ProcessFormat(_result, "CanvasOther");
            }
            if (_format != null && _format != '' && _format == 'XML') {
                _jsonVal = $("#resultUpdate").val();
                $("#Canvas").children(".CodeContainer").html("");
                $("#Canvas").children(".CodeContainer").append("<code class='hljs xml'></code>");
                $("#Canvas").children(".CodeContainer").children("code").text(_jsonVal);

                var _resu = hljs.highlightAuto(_jsonVal, ["xml"]);
                if (_resu != null) {
                    $("#Canvas").children(".CodeContainer").children("code").html(_resu.value);
                    setTimeout(shoXml("Canvas"), 1000);
                }
            }
            $("#result").val(_jsonVal);
        }
    });
});


//添加接口示例提交
function addExample() {
    var _apiId = $("#apiAppId").val();
    var _url = $("#exampleUrl").val().replace(/(^\s*)|(\s*$)/g, "");
    var _content = $("#exampleContent").val().replace(/(^\s*)|(\s*$)/g, "");
    $.ajax({
        url: easyapi.ctx + "/example!save.action",
        type: "post",
        data: {
            "example.api.id": _apiId,
            "example.url": _url,
            "example.content": _content
        },
        dataType: "json",
        success: function (data) {
            if (data.status == "1") {
                var _exampleId = data.msg;
                var _deta = easyapi.ctx + "/ajax/example/view.jsp?exampleId=" + _exampleId;
                $.get(_deta, function (da) {
                    $("#exampleAdd").append(da);
                    var _uu = easyapi.ctx + "/ajax/example/add.jsp";
                    $.get(_uu, function (dat) {
                        $("#apiExampleAdd").replaceWith(dat);

                        $("#apiExampleAdd").hide();
                        $(".showaddapiecample").show();
                    });

                });

            }
        }
    });
}


//修改接口示例页面显示
$("body").on("click", "a[exampleEdit]", function () {
    var _id = $(this).attr("exampleEdit");

    var url = easyapi.ctx + "/ajax/example/edit.jsp?exampleId=" + _id;
    $.get(url, function (result) {
        $("#example" + _id).replaceWith(result);

        $("#apiExampleAdd").hide();
        $(".showaddapiecample").show();
    });
});

//修改接口示例提交
function updateExample() {
    var _expId = $("#expId").val();
    var _url = $("#exampleUpdateUrl").val().replace(/(^\s*)|(\s*$)/g, "");
    var _content = $("#exampleUpdateContent").val().replace(/(^\s*)|(\s*$)/g, "");

    $("#apiExampleAdd").hide();
    $(".showaddapiecample").show();

    $.ajax({
        url: easyapi.ctx + "/example!update.action",
        type: "post",
        data: {
            "id": _expId,
            "example.url": _url,
            "example.content": _content
        },
        dataType: "json",
        success: function (data) {
            if (data.status == "1") {
                var _exampleId = data.msg;
                var _deta = easyapi.ctx + "/ajax/example/view.jsp?exampleId=" + _exampleId;
                $.get(_deta, function (da) {

                    $("#exampleUpdate" + _exampleId).replaceWith(da);

//                        var _uu = easyapi.ctx + "/ajax/example/add.jsp";
//                        $.get(_uu, function (dat) {
//                            $("#apiExampleUpdate").replaceWith(dat);
//                        });

                });

            }
        }
    });
}
//    $("body").on("click", "#updateExampleButton", function () {
//
//    });

//修改接口示例放弃
$("body").on("click", "#exampleClose", function () {
    var _id = $("#apiAppId").val();

    $("#apiExampleAdd").hide();
    $(".showaddapiecample").show();

    var url = easyapi.ctx + "/ajax/example/index.jsp?apId=" + _id;
    $.get(url, function (result) {
        $("#apiUpd").replaceWith(result);
    });
});


//修改接口JSON导入
$("body").on("click", "#jsonParamUpdate", function () {
    $("#myModal").modal('show');
    $("#type").val("update");
});

//添加接口JSON导入
$("body").on("click", "#jsonParamAdd", function () {
    $("#myModal").modal('show');
    $("#type").val("add");
});


//切换返回示例
$("body").on("click", "#responseResult", function () {
    //获取当前的级别
    $("#responseResultBox").show();
    $("#otherResultBox").hide();
    $(".resulttabs").find(".active").removeClass("active");
    $(this).addClass("active");
});

//切换异常示例
$("body").on("click", "#otherResult", function () {
    //获取当前的级别
    $("#responseResultBox").hide();
    $("#otherResultBox").show();
    $(".resulttabs").find(".active").removeClass("active");
    $(this).addClass("active");
});


//编辑返回示例
$("body").on("click", "#returnParam", function () {
    $("#Canvas").hide();
    $("#resultUpdate").show();
});

//编辑异常示例
$("body").on("click", "#returnParamOther", function () {
    $("#CanvasOther").hide();
    $("#otherResultUpdate").show();
});


//返回示例
$("body").on("mouseleave", "#resultUpdate", function () {
    //获取当前的级别
    var _result = $("#resultUpdate").val();
    $("#resultUpdate").hide();
    $("#Canvas").show();
    var _format = $("#format").val();
    if (_result != null && _result.trim() != '') {
        if (_format != null && _format != '' && _format == 'JSON') {

            //json示例导入到返回参数中
            var _type = $("#returnParam").attr("pty");
            if (_type == 'update') {//修改接口JSON导入
                var _apiId = $("#apiAppId").val();

                $.ajax({
                    url: easyapi.ctx + "/api!json.action",
                    type: "post",
                    data: {
                        "id": _apiId,
                        "paramJsons": _result
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.status == "1") {
                            var _newJson = JSON.stringify(eval(data.resultJson));
                            $("#updateResponseParamIds").val(data.msg);

                            if (_newJson != null && _newJson != '') {
                                if (_format != null && _format != '' && _format == 'JSON') {
                                    $("#Canvas").html(_newJson);
                                    ProcessFormat(_newJson, "Canvas");
                                }
                                $("#result").val(_newJson);
                                $("#resultUpdate").val(_newJson);

                                sho();
                            }

                        } else {
                            layer.msg("JSON格式错误");
                            $("#result").val(_result);
                            $("#Canvas").html(_result);
                            ProcessFormat(_result, "Canvas");
                        }
                    }
                });
            }
            if (_type == 'add') {//添加接口JSON导入


                $.ajax({
                    url: easyapi.ctx + "/api!json.action",
                    type: "post",
                    data: {
                        "paramJsons": _result
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.status == "1") {
                            var _newJson = JSON.stringify(eval(data.resultJson));
                            $("#addResponseParamIds").val(data.msg);

                            if (_newJson != null && _newJson != '') {
                                if (_format != null && _format != '' && _format == 'JSON') {
                                    $("#Canvas").html(_newJson);
                                    ProcessFormat(_newJson, "Canvas");
                                }
                                $("#result").val(_newJson);
                                $("#resultUpdate").val(_newJson);

                                sho();
                            }
                        } else {
                            $("#result").val(_result);

                            $("#Canvas").html(_result);
                            ProcessFormat(_result, "Canvas");
                        }

                    }
                });
            }


        } else if (_format != null && _format != '' && _format == 'XML') {
            //xml示例导入到返回参数中
            var _type = $("#returnParam").attr("pty");
            if (_type == 'update') {//修改接口xml导入
                var _apiId = $("#apiAppId").val();

                $.ajax({
                    url: easyapi.ctx + "/api!xml.action",
                    type: "post",
                    data: {
                        "id": _apiId,
                        "paramJsons": _result
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.status == "1") {
                            $("#updateResponseParamIds").val(data.msg);
                            $("#result").val(_result);
                            $("#Canvas").children(".CodeContainer").text(_result);
                        } else {
                            $("#result").val(_result);
                            $("#Canvas").children(".CodeContainer").text(_result);
                        }
                    }
                });
            }
            if (_type == 'add') {//添加接口xml导入
                $.ajax({
                    url: easyapi.ctx + "/api!xml.action",
                    type: "post",
                    data: {
                        "paramJsons": _result
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.status == "1") {
                            $("#addResponseParamIds").val(data.msg);
                            $("#result").val(_result);
                            $("#Canvas").children(".CodeContainer").text(_result);

                        } else {
                            layer.msg("JSON格式错误");
                            $("#result").val(_result);
                            $("#Canvas").children(".CodeContainer").text(_result);
                        }

                    }
                });
            }
        } else {
            $("#result").val(_result);
            $("#Canvas").html(_result);
        }

    } else if (_result != null && _result.trim() == '') {
        $("#Canvas").html("<PRE class='CodeContainer'></PRE>");
        $("#result").val(_result);
    }
//        $("#resultUpdate").text(_result);
});

//异常示例
$("body").on("mouseleave", "#otherResultUpdate", function () {
    //获取当前的级别
    var _result = $("#otherResultUpdate").val();

    $("#otherResultUpdate").hide();
    $("#CanvasOther").show();

    var _format = $("#format").val();
    if (_result != null && _result.trim() != '') {
        if (_format != null && _format != '' && _format == 'JSON') {
            $("#CanvasOther").html(_result);
            ProcessFormat(_result, "CanvasOther");
        }
        if (_format != null && _format != '' && _format == 'XML') {

            $("#CanvasOther").children(".CodeContainer").html("");
            $("#CanvasOther").children(".CodeContainer").append("<code class='hljs xml'></code>");
            $("#CanvasOther").children(".CodeContainer").children("code").text(_jsonVal);

            var _resu = hljs.highlightAuto(_result, ["xml"]);
            if (_resu != null) {
                $("#CanvasOther").children(".CodeContainer").children("code").html(_resu.value);
                setTimeout(shoXml("CanvasOther"), 1000);
            }
        }
        $("#otherResultVal").val(_result);
    } else if (_result != null && _result.trim() == '') {
        $("#CanvasOther").html("<PRE class='CodeContainer'></PRE>");
        $("#otherResultVal").val(_result);
    }


});


//请求参数点击一行选中
$("body").on("click", "tr[ar='para']", function () {
    $("#parList").children(".active").removeClass("active");
    $(this).addClass("active");
});

//请求参数下移
$("body").on("click", "#pardown", function () {
    var self = $("#parList").children(".active").first();
    var down = self.next("tr[ar='para']");
    self.before(down);
});

//请求参数上移
$("body").on("click", "#parup", function () {
    var self = $("#parList").children(".active").first();
    var up = self.prev("tr[ar='para']");
    self.after(up);
});


function showaddapiecample() {
    $("#apiExampleAdd").show();
    $(".showaddapiecample").hide();
}


layer.config({
    shade: 0,
    skin: 'struct-class',
    move: false
});


//关联数据结构，打开数据库
function apiLinkDb(apiId) {
    var inl = layer.open({
        type: 1,
        content: '',
        success: function (layero, index) {
            //打开数据库
            var htm = easyapi.ctx + "/ajax/apiStruct/db.jsp?apiId=" + apiId + "&index=" + index;
            $.get(htm, function (result) {
                $("#layui-layer" + index).find(".layui-layer-content").html(result);
            });
        }
    });
}

//关联数据结构,打开表结构
function linkStruct(apiId, index, dbId) {

    //打开表结构
    var htm = easyapi.ctx + "/ajax/apiStruct/struct.jsp?apiId=" + apiId + "&index=" + index + "&dbId=" + dbId;
    $.get(htm, function (result) {
        $("#layui-layer" + index).find(".layui-layer-content").html(result);
    });

}

//接口关联数据结构
function linkApiStruct(apiId, index, structId, structName) {
    var _ch = $("input[checkStr='" + structId + "']");
    var _check = null;
    if (_ch.is(':checked')) {
        _check = true;
    } else {
        _check = false;
    }
    $.ajax({
        url: easyapi.ctx + "/api!struct.action",
        type: "POST",
        dataType: "json",
        data: {
            id: apiId,
            structId: structId,
            check: _check
        },
        success: function (result) {
            if (result.status == 1 || result.status == "1") {
//                    window.location.reload();
                if (_check == true) {
                    var _htm = '<span class="btn-default  btn-sm" structId="' + structId + '">' + structName + '<em onclick="deleteStruct(' + apiId + ',' + structId + ');">x</em></span>';
                    $("#databaslink").before(_htm);
                } else {
                    $("span[structId='" + structId + "']").remove();
                }
                layer.close(index);
            } else {
                var html = '<div class="padding"><div class="form-group" align="center">' + result.msg + '</div></div>';
                $("#layui-layer" + index).find(".layui-layer-content").html(html);
            }
        }
    });
}

//移除数据结构
function deleteStruct(apiId, structId) {
    var _check = false;
    $.ajax({
        url: easyapi.ctx + "/api!struct.action",
        type: "POST",
        dataType: "json",
        data: {
            id: apiId,
            structId: structId,
            check: _check
        },
        success: function (result) {
            if (result.status == 1 || result.status == "1") {
                $("span[structId='" + structId + "']").remove();
            } else {
                layer.msg(result.msg);
            }
        }
    });
}



//打开接口操作框
function openBox(apiId) {
    var offset = $("[openapiId=" + apiId + "]").offset();
    var _t=$(document).scrollTop();
    var inl = layer.open({
        type: 1,
        title: "接口编辑",
        offset: [offset.top-_t, offset.left],
        content: "..",
        shade: .00001,
        shadeClose:true,
        area: ['260px', '300px'],
        success: function (layero, index) {
            var htm = easyapi.ctx + "/ajax/api/box.jsp?apiId=" + apiId + "&index=" + index;
            $.get(htm, function (result) {
                layero.find(".layui-layer-content").html(result);
            });

        }
    });
}


//删除接口操作
function deleteApi(apiId, index) {
    if (window.confirm("确定删除该接口？")) {
        $.ajax({
            url: easyapi.ctx + "/api!recycle.action",
            type: "POST",
            dataType: "json",
            data: {
                id: apiId
            },
            success: function (result) {
                if (result.status == 1 || result.status == "1") {
                    $("#api" + apiId).slideUp("slow");
                    layer.close(index);
                } else {
                    var html = '<div class="padding"><div class="form-group" align="center">' + result.msg + '</div></div>';
                    $("#layui-layer" + index).find(".layui-layer-content").html(html);
                }
            }
        });
        return true;
    }
    return false;
}

//删除接口页面(加入到回收站)
function deleteApiBox(apiId, index) {
    var html = '<div class="padding"><div class="form-group" align="center">确定删除此接口吗?</div><a href="javascript:;" onclick="deleteApi(' + apiId + ',' + index + ');" class="btn btn-danger btn-block">删除</a></div>';
    $("#layui-layer" + index).find(".layui-layer-content").html(html);
    $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>删除接口");
}


//复制接口页面
function copyApiBox(apiId, index) {
    var htm = easyapi.ctx + "/ajax/team/box.jsp?apiId=" + apiId + "&index=" + index + "&type=copy";
    $.get(htm, function (result) {
        $("#layui-layer" + index).find(".layui-layer-content").html(result);
        $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>复制接口-选择团队");
    });
}


//移动接口页面
function moveApiBox(apiId, index) {
    var htm = easyapi.ctx + "/ajax/team/box.jsp?apiId=" + apiId + "&index=" + index + "&type=move";
    $.get(htm, function (result) {
        $("#layui-layer" + index).find(".layui-layer-content").html(result);
        $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>移动接口-选择应用");
    });
}


//返回接口操作页面
function layApiBox(apiId, index) {
    var htm = easyapi.ctx + "/ajax/api/box.jsp?apiId=" + apiId + "&index=" + index;
    $.get(htm, function (result) {
        $("#layui-layer" + index).find(".layui-layer-title").find("i").hide();
        $("#layui-layer" + index).find(".layui-layer-content").html(result);
    });
}

//返回接口操作选择项目页面
function layTeamBox(apiId, index, type) {
    var htm = easyapi.ctx + "/ajax/team/box.jsp?apiId=" + apiId + "&index=" + index + "&type=" + type;
    $.get(htm, function (result) {
        $("#layui-layer" + index).find(".layui-layer-content").html(result);
        if (type == 'copy') {
            $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>复制接口-选择团队");
        }
        if (type == 'move') {
            $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>移动接口-选择团队");
        }
    });
}


//返回接口操作选择项目页面
function layProjectBox(apiId, index, type,projectId,teamId) {
    var htm = easyapi.ctx + "/ajax/project/box.jsp?apiId=" + apiId + "&index=" + index + "&type=" + type+"&teamId="+teamId;
    $.get(htm, function (result) {
        $("#layui-layer" + index).find(".layui-layer-content").html(result);

        var ht = easyapi.ctx + "/ajax/project/header.jsp?index=" + index + "&apiId=" + apiId + "&type=" + type+"&teamId="+teamId;

        $.get(ht, function (dat) {
            $("#layui-layer" + index).find(".layui-layer-title").html(dat);
        });
    });
}

//返回接口操作选择文档页面
function layDocumentBox(apiId, index, type,documentId,projectId,teamId) {
    var htm = easyapi.ctx + "/ajax/document/box.jsp?apiId=" + apiId + "&index=" + index + "&type=" + type+"&projectId="+projectId;
    $.get(htm, function (result) {
        $("#layui-layer" + index).find(".layui-layer-content").html(result);

        var ht = easyapi.ctx + "/ajax/document/header.jsp?index=" + index + "&apiId=" + apiId + "&type=" + type+"&projectId="+projectId+"&teamId="+teamId;

        $.get(ht, function (dat) {
            $("#layui-layer" + index).find(".layui-layer-title").html(dat);
        });
    });
}


//接口操作选择团队
$("body").on("click", "[ace='teamSe']", function () {
    var _teamId = $(this).attr("handTeam");
    var _apiId = $(this).attr("handApi");
    var _index = $(this).attr("handIndex");
    var _type = $(this).attr("handType");
    var htm = easyapi.ctx + "/ajax/project/box.jsp?teamId=" + _teamId + "&index=" + _index + "&apiId=" + _apiId + "&type=" + _type;
    $.get(htm, function (result) {
        $("#layui-layer" + _index).find(".layui-layer-content").html(result);

        var ht = easyapi.ctx + "/ajax/project/header.jsp?index=" + _index + "&apiId=" + _apiId + "&type=" + _type+"&teamId="+_teamId;

        $.get(ht, function (dat) {
            $("#layui-layer" + _index).find(".layui-layer-title").html(dat);
        });

    });

});

//接口操作选择项目
$("body").on("click", "[ace='proSe']", function () {
    var _teamId = $(this).attr("handTeam");
    var _projectId = $(this).attr("handProject");
    var _apiId = $(this).attr("handApi");
    var _index = $(this).attr("handIndex");
    var _type = $(this).attr("handType");
    var htm = easyapi.ctx + "/ajax/document/box.jsp?projectId=" + _projectId + "&index=" + _index + "&apiId=" + _apiId + "&type=" + _type;
    $.get(htm, function (result) {
        $("#layui-layer" + _index).find(".layui-layer-content").html(result);

        var ht = easyapi.ctx + "/ajax/document/header.jsp?index=" + _index + "&apiId=" + _apiId + "&type=" + _type+"&projectId="+_projectId+"&teamId="+_teamId;

        $.get(ht, function (dat) {
            $("#layui-layer" + _index).find(".layui-layer-title").html(dat);
        });

    });

});

//接口操作选择文档
$("body").on("click", "[ace='docSe']", function () {
    var _projectId = $(this).attr("handProject");
    var _teamId = $(this).attr("handTeam");
    var _documentId = $(this).attr("handDocument");
    var _apiId = $(this).attr("handApi");
    var _index = $(this).attr("handIndex");
    var _type = $(this).attr("handType");
    var htm = easyapi.ctx + "/ajax/category/box.jsp?documentId=" + _documentId + "&index=" + _index + "&apiId=" + _apiId + "&type=" + _type;
    $.get(htm, function (result) {
        $("#layui-layer" + _index).find(".layui-layer-content").html(result);

        var ht = easyapi.ctx + "/ajax/category/header.jsp?index=" + _index + "&apiId=" + _apiId + "&type=" + _type+"&documentId="+_documentId+"&projectId="+_projectId+"&teamId="+_teamId;

        $.get(ht, function (dat) {
            $("#layui-layer" + _index).find(".layui-layer-title").html(dat);
        });

    });

});



//接口操作选择分类
function apiCopyMove(_categoryId, _apiId, _index, _type) {
    if (_type == 'copy') {
        $.ajax({
            url: easyapi.ctx + "/api!copy.action",
            type: "post",
            data: {
                "id": _apiId,
                "categoryId": _categoryId
            },
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.status == 1 || result.status == '1') {
                    var html = '<div class="padding"><div class="form-group" align="center">复制接口成功</div></div>';
                    $("#layui-layer" + _index).find(".layui-layer-content").html(html);
                    window.setTimeout(removeLay(_index), 3000);
                } else {
                    var html = '<div class="padding"><div class="form-group" align="center">' + result.msg + '</div></div>';
                    $("#layui-layer" + _index).find(".layui-layer-content").html(html);

                    window.setTimeout(removeLay(_index), 3000);
                }
            }
        })
    }
    if (_type == 'move') {

        $.ajax({
            url: easyapi.ctx + "/api!move.action",
            type: "post",
            data: {
                "id": _apiId,
                "categoryId": _categoryId
            },
            dataType: "json",
            success: function (result) {
                if (result.status == 1 || result.status == '1') {

                    $("#api" + _apiId).slideUp("slow");

                    var html = '<div class="padding"><div class="form-group" align="center">移动接口成功</div></div>';
                    $("#layui-layer" + _index).find(".layui-layer-content").html(html);

                    window.setTimeout(removeLay(_index), 3000);

                } else {

                    var html = '<div class="padding"><div class="form-group" align="center">' + result.msg + '</div></div>';
                    $("#layui-layer" + _index).find(".layui-layer-content").html(html);

                    window.setTimeout(removeLay(_index), 3000);
                }
            }
        })

    }
}

//废弃接口页面
function deprecatedApiBox(apiId, index) {
    var html = '<div class="padding"><div class="form-group" align="center">确定废弃此接口吗?</div><a href="javascript:;" onclick="deprecatedApi(' + apiId + ',' + index + ');" class="btn btn-danger btn-block">废弃</a></div>';
    $("#layui-layer" + index).find(".layui-layer-content").html(html);
    $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>废弃接口");
}

//废弃接口
function deprecatedApi(apiId, index) {
    $.ajax({
        url: easyapi.ctx + "/api!deprecated.action",
        type: "POST",
        dataType: "json",
        data: {
            id: apiId
        },
        success: function (result) {
            if (result.status == 1 || result.status == "1") {
                $("#api" + apiId).children(":first").addClass("del-line");
                layer.close(index);
            } else {
                var html = '<div class="padding"><div class="form-group" align="center">' + result.msg + '</div></div>';
                $("#layui-layer" + index).find(".layui-layer-content").html(html);
            }
        }
    });
}

//启用接口页面
function activateApiBox(apiId, index) {
    var html = '<div class="padding"><div class="form-group" align="center">确定启用此接口吗?</div><a href="javascript:;" onclick="activateApi(' + apiId + ',' + index + ');" class="btn btn-danger btn-block">启用</a></div>';
    $("#layui-layer" + index).find(".layui-layer-content").html(html);
    $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>启用接口");
}

//启用接口
function activateApi(apiId, index) {
    $.ajax({
        url: easyapi.ctx + "/api!activate.action",
        type: "POST",
        dataType: "json",
        data: {
            id: apiId
        },
        success: function (result) {
            if (result.status == 1 || result.status == "1") {
                $("#api" + apiId).children(":first").removeClass("del-line");
                layer.close(index);
            } else {
                var html = '<div class="padding"><div class="form-group" align="center">' + result.msg + '</div></div>';
                $("#layui-layer" + index).find(".layui-layer-content").html(html);
            }
        }
    });
}

function removeLay(index) {
    setTimeout("closed(" + index + ")", 1000);
}
function closed(index) {
    $("#layui-layer" + index).remove()
}


//标签设置
function setTag(apiId, index) {
    var html = easyapi.ctx + "/ajax/apiTag/index.jsp?apiId=" + apiId + "&index=" + index;

    $.get(html, function (result) {
        $("#layui-layer" + index).find(".layui-layer-content").html(result);
        $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>定义标签");
    });
}

//修改标签
function editTag(apiId, index, id) {
    var html = easyapi.ctx + "/ajax/apiTag/edit.jsp?apiId=" + apiId + "&index=" + index + "&id=" + id;
    $.get(html, function (result) {
        $("#layui-layer" + index).find(".layui-layer-content").html(result);
        $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>编辑标签");
    });

}

//添加标签
function addTag(apiId, index) {
    var html = easyapi.ctx + "/ajax/apiTag/add.jsp?apiId=" + apiId + "&index=" + index;
    $.get(html, function (result) {
        $("#layui-layer" + index).find(".layui-layer-content").html(result);
        $("#layui-layer" + index).find(".layui-layer-title").html("<i class='fa back fa-chevron-left' onclick='layApiBox(" + apiId + "," + index + ");'></i>编辑标签");
    });
}

//添加标签保存
function addApiTag(apiId, index) {
    var _name = $("#tagName").val();
    var _color = $(".tgs").children(".act").first().attr("color");
    $.ajax({
        url: easyapi.ctx + "/api-tag!save.action",
        type: "POST",
        dataType: "json",
        data: {
            "apiTag.api.id": apiId,
            "apiTag.name": _name,
            "apiTag.color": _color
        },
        success: function (result) {
            if (result.status == 1 || result.status == "1") {
                var html = easyapi.ctx + "/ajax/api/view.jsp?apId=" + apiId;

                $.get(html, function (result) {
                    $("#api" + apiId).replaceWith(result);
                });
                layer.close(index);
            } else {
                var html = '<div class="padding"><div class="form-group" align="center">' + result.msg + '</div></div>';
                $("#layui-layer" + index).find(".layui-layer-content").html(html);
            }
        }
    });
}

//修改标签保存
function editApiTag(apiId, index, id) {
    var _name = $("#tagName").val();
    var _color = $(".tgs").children(".act").first().attr("color");
    $.ajax({
        url: easyapi.ctx + "/api-tag!update.action",
        type: "POST",
        dataType: "json",
        data: {
            "id": id,
            "apiTag.name": _name,
            "apiTag.color": _color
        },
        success: function (result) {
            if (result.status == 1 || result.status == "1") {
                var html = easyapi.ctx + "/ajax/api/view.jsp?apId=" + apiId;

                $.get(html, function (result) {
                    $("#api" + apiId).replaceWith(result);
                });
                layer.close(index);
            } else {
                var html = '<div class="padding"><div class="form-group" align="center">' + result.msg + '</div></div>';
                $("#layui-layer" + index).find(".layui-layer-content").html(html);
            }
        }
    });
}

//删除标签
function deleteApiTag(apiId, index, id) {
    if (window.confirm("确定删除该标签？")) {
        $.ajax({
            url: easyapi.ctx + "/api-tag!delete.action",
            type: "POST",
            dataType: "json",
            data: {
                "id": id
            },
            success: function (result) {
                if (result.status == 1 || result.status == "1") {
                    var html = easyapi.ctx + "/ajax/api/view.jsp?apId=" + apiId;

                    $.get(html, function (result) {
                        $("#api" + apiId).replaceWith(result);
                    });
                    layer.close(index);
                } else {
                    var html = '<div class="padding"><div class="form-group" align="center">' + result.msg + '</div></div>';
                    $("#layui-layer" + index).find(".layui-layer-content").html(html);
                }
            }
        });
        return true;
    }
    return false;
}

//请求参数required选中时value为true，未选中为false
$("body").on("change", "[name='required']", function () {
    if ($(this).is(':checked')) {
        $(this).prev("[name='paramRequireds']").val("true");
    } else {
        $(this).prev("[name='paramRequireds']").val("false");
    }
})

//请求参数formatJson选中时value为true，未选中为false
$("body").on("change", "[name='formatJson']", function () {
    if ($(this).is(':checked')) {
        $(this).prev("[name='paramFormatJsons']").val("true");
    } else {
        $(this).prev("[name='paramFormatJsons']").val("false");
    }
})


$("body").on("click", "a[ckformat]", function () {
    var _txt = $(this).text();
    $(this).parents(".btn-group").find(".value").text(_txt);
    $("#format").val(_txt);
})

$("body").on("click", "a[ckmode]", function () {
    var _txt = $(this).text();
    $("#apimode").val(_txt);
    $(this).parents(".btn-group").find(".value").text(_txt);
})


$("body").on("click", "a[ckptp]", function () {
    var _txt = $(this).text();
    $(this).parents(".btn-group").find(".value").text(_txt);
    $(this).parents(".btn-group").find(".paramType").val(_txt);
})


$("body").on("click", "i[class^='cr-']", function () {
    $("i[class^='cr-']").removeClass("act");
    $(this).addClass("act");
})

$(document).keydown(function (event) {
        if ((event.ctrlKey || event.metaKey) && event.which == 83) {
            $("#lding").click();
            event.preventDefault();
            return false;
        }
        ;
    }
);


//JSON文档数据注释显示
function sho() {
    $("#Canvas").children(".CodeContainer").children("span.PropertyName").each(function () {
        var _p = $(this);
        var _before = _p.prev();
        if (_before.prev().prev().length == 0) {
            //第一个的时候前面不存在
            _before.removeAttr("name");
        }
        if (_before.prev().length > 0 && _before.prev().attr("class") == 'ObjectBrace' && _before.prev().prev().prev().prev().prev().length > 0 && _before.prev().prev().prev().prev().prev().attr("class") == 'ArrayBrace') {
            //数组的时候前面[
            _before.removeAttr("name");
        }
        var _typeApi = $("#returnParam").attr("pty");
        var _apiId = '';
        if (_typeApi == 'update') {
            _apiId = $("#apiAppId").val();
        }
        var _name = _p.text().replace("\"", "").replace("\"", "");
        if (_name.indexOf("<span") > 0) {
            _name = _name.substring(0, _name.indexOf("<span"));
        }
        var _parentName = '';
        if (_before != null || _before != '') {
            while (!_before.hasClass("ObjectBrace")) {
                _before = _before.prev();
            }
            if (_before.hasClass("ObjectBrace")) {

                var _text = _before.text(); //当前括号

                var _befores = _before.prevAll(".ObjectBrace");
                var _lasts = _before.nextAll(".ObjectBrace");

                var _length = _befores.length;
                var _lastLength = _lasts.length;
                if (_length != 0) { //不是第一个
                    if (_length > 1 && _lastLength > 1) {
                        var _count = 0;//}大括号一对的数量
                        var _numb = 0;//{大括号数量
                        while (_text.indexOf("}") >= 0) {
                            _count = _count + 1;
                            _before = _before.prev();
                            if (_before != null && _before != '') {
                                while (!_before.hasClass("ObjectBrace")) {
                                    _before = _before.prev();
                                }
                                if (_before.hasClass("ObjectBrace")) {
                                    _text = _before.text(); //当前括号
                                }
                                if (_text.indexOf("}") >= 0) { //右括号
                                    _count = _count + 1;
                                } else {  //左括号
                                    _numb = _numb + 1;
                                    if ((_numb - _count) < 1) {
                                        _before = _before.prev();
                                        if (_before != null && _before != '') {
                                            while (!_before.hasClass("ObjectBrace")) {
                                                _before = _before.prev();
                                            }
                                            if (_before.hasClass("ObjectBrace")) {
                                                _text = _before.text(); //当前括号
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (_lastLength > 1) {
                    var _last = _before.prev();
                    if (_last != null && _last != '' && _last.hasClass("PropertyName")) { //array
                        _parentName = _last.text();
                    }
                    if (_last != null && _last != '' && _last.hasClass("ArrayBrace")) { //array
                        _last = _last.prev();
                        _parentName = _last.text();
                    }

                    if (_parentName.indexOf("<span") > 0) {
                        _parentName = _parentName.substring(0, _parentName.indexOf("<span"));
                    }
                }

            }
        }
        if (_parentName != null && _parentName != '') {
            _parentName = _parentName.split("\"")[1].replace("\"", "").replace("\"", "");
        }
        var _des = "";
        var _appId = $("#appAppId").val();
        $.ajax({
            url: easyapi.ctx + "/response-param!tool.action",
            type: "post",
            data: {
                "query.appId": _appId,
                "query.name": _name,
                "query.apiId": _apiId,
                "query.parentName": _parentName
            },
            dataType: "json",
            success: function (result) {
                _des = result.msg;

                var _descr = _p.next().next().next("[name='responseParamDescriptions']");

                if (typeof(_descr.attr("type")) == "undefined") {
                    _descr = _p.next().next("[name='responseParamDescriptions']");
                }
                _descr.show();
                _descr.attr("value",_des);
                //当前参数名称
                _descr.after("<input type='hidden' name='responseParamNames' value='" + _name + "'>");
                //上一级名称
                _descr.after("<input type='hidden' name='responseParamParentNames' value='" + _parentName + "'>");


            }
        });


    })
}

//XML文档数据注释显示
function shoXml(documentId) {
    $("#" + documentId).children(".CodeContainer").children(".xml").children(".hljs-tag").each(function () {
        var _p = $(this);
        _p.after('<input type="text" class="returnparam"  style="display: none"  value="暂无注释">');

        var _typeApi = $("#returnParam").attr("pty");
        var _apiId = '';
        if (_typeApi == 'update') {
            _apiId = $("#apiAppId").val();
        }
        var _name = _p.children("span.hljs-title").first().text();

        var _block = null;//要显示的input
        var _before = _p.prev();
        var _next = _p.next();


        var _parentName = '';


        if (_p.text().indexOf("<") >= 0 && _p.text().indexOf("</") < 0 && _before.prev(".hljs-tag").length < 1) {
            //根节点
            _next.attr("style", "");
            _next.attr("name", "responseParamDescriptions");
            _block = _next;
        } else if (_p.text().indexOf("</") >= 0 && _before.prev(".hljs-tag").length > 0 && _before.prev(".hljs-tag").text().indexOf("<") >= 0 && _before.prev(".hljs-tag").text().indexOf("</") < 0) {
            //没有子节点
            _next.attr("style", "");
            _next.attr("name", "responseParamDescriptions");
            _block = _next;
        } else if (_p.text().indexOf("<") >= 0 && _p.text().indexOf("</") < 0 && _next.next(".hljs-tag").length > 0 && _next.next(".hljs-tag").text().indexOf("<") >= 0 && _next.next(".hljs-tag").text().indexOf("</") < 0) {
            //有子节点
            _next.attr("style", "");
            _next.attr("name", "responseParamDescriptions");
            _block = _next;

        }
        if (_block != null && _block != '') {

            var _befores = _p.prevAll(".hljs-tag");

            if (_befores.length > 0) {

                var _archieve = false;//是否获取到父名称
                var _be = _p; //当前一个tag
                var _beBefore = _be.prev().prev(".hljs-tag");//当前前一个tag

                var _left = 0;
                var _right = 0;


                if (_be.text().indexOf("</") >= 0) {
                    _right = _right + 1;
                } else {
                    _left = _left + 1;
                }
                if (_beBefore.text().indexOf("</") >= 0) {
                    _right = _right + 1;
                } else {
                    _left = _left + 1;
                }
                if (_be.length > 0 && _beBefore.length > 0) {
                    while (_archieve == false) {
                        if ((_left - _right) == 2) {
                            _archieve = true;
                        } else {
                            _be = _beBefore;
                            _beBefore = _be.prev().prev(".hljs-tag");
                            _archieve = false;

                            if (_be.text().indexOf("</") >= 0) {
                                _right = _right + 1;
                            } else {
                                _left = _left + 1;
                            }
                            if (_beBefore.text().indexOf("</") >= 0) {
                                _right = _right + 1;
                            } else {
                                _left = _left + 1;
                            }
                        }
                    }
                    _parentName = _beBefore.children("span.hljs-title").first().text();
                }

            }

            var _des = "";
            var _appId = $("#appAppId").val();
            $.ajax({
                url: easyapi.ctx + "/response-param!tool.action",
                type: "post",
                data: {
                    "query.appId": _appId,
                    "query.name": _name,
                    "query.apiId": _apiId,
                    "query.parentName": _parentName
                },
                dataType: "json",
                success: function (result) {
                    _des = result.msg;

                    _block.show();
                    _block.val(_des);
                    //当前参数名称
                    _block.after("<input type='hidden' name='responseParamNames' value='" + _name + "'>");
                    //上一级名称
                    _block.after("<input type='hidden' name='responseParamParentNames' value='" + _parentName + "'>");


                }
            });
        }

    })
}



