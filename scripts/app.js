layer.config({
    move: false
});

var Toolbs = {
    //导出
    outs:function (documentId,code) {
        var _name1="&name="+code+"-api.doc";
        var _name2="&name="+code+"-api.pdf";
        var _htm="<div class='padding' ><p><a class='btn btn-bor btn-block' href='javascript:;' onclick=exportWord('"+_name1+"',"+documentId+");>导出Word</a> <a class='btn btn-block btn-bor margin-top' href='javascript:;' onclick=exportPdf('"+_name2+"',"+documentId+");>导出PDF</a></p></div>"
        layer.open({
            type: 1,
            move: false,
            title:'导出文档',
            content: _htm //这里content是一个普通的String
        });
    },
    delete: function () {//删除参数
        $(this).parents("td").hide();
    },
    addva: function () {//添加参数
        var _htm = '<tr cdle><td class="td-1">' +
            '<input type="text"   name="__parameter__" >' +
            '</td><td class="td-2" >' +
            '<input type="text"   name="__parameter__">&nbsp<input type="checkbox" name="check0" checked="checked">' +
            '</td>' +
            '</tr>';
        $("#params").append(_htm);
    },
    addHeader: function () {//添加参数
        var _htm = '<tr cdle><td class="td-1">' +
            '<input type="text"   name="__headerParameter__" >' +
            '</td><td class="td-2" >' +
            '<input type="text"   name="__headerParameter__">' +
            '</td>' +
            '</tr>';
        $("#headerParams").append(_htm);
    },
    togg: function (dm) {
        $(dm).toggle();
    },
    format: function (url) {//格式化参数
        var p ="";
        if(url.indexOf('?')>-1){
            p = url.substring(url.indexOf('?') + 1).trim();
        }else{
            p=url.trim();
        }
        p = p.replace(/&&/g, "&");
        if (p.length > 1) {
            var l = p.split("=").length;//判断是否有参数
            if (l > 1) {
                var ps = p.split("&");
                $(".td-1").remove();
                $(".td-2").remove();
                for (var i = 0; i < ps.length; i++) {
                    var name = ps[i].substring(0, ps[i].indexOf("="));
                    var value = ps[i].substring(ps[i].indexOf("=") + 1);
                    var itr = "<tr cdle >" +
                        "<td class='td-1' >" + name + "</td>" +
                        "<td class='td-2' >" +
                        "<span  class='tol' data-toggle='tooltip' data-placement='top' title=" + name + " >" +
                        "<input value='" + value + "' name='" + name + "' /> " +
                        "</span>   <input type='checkbox' id='check" + i + "' checked='checked'> </td>";
                        "</tr>";
                    $("#params").append(itr);
                }
            }
        }
    },

    convert: function (url, param, mode, str) {//转换接口url
        if(param.indexOf("__parameter__")>=0){
            var pa=param.substring(0,param.indexOf("__parameter__"));
            var pb=param.substring(param.indexOf("__parameter__"));
            var _p = pb.split("__parameter__=");
            for (var i = 1; i <= _p.length - 1; i += 2) {
                    _p[i] = _p[i].replace('&', '=');
            }
            pb = _p.join('');
            param=pa+pb;
        };
        if(param.indexOf("__headerParameter__")>=0){
            var pa=param.substring(0,param.indexOf("__headerParameter__"));
            var pb=param.substring(param.indexOf("__headerParameter__"));
            var _p = pb.split("__headerParameter__=");
            for (var i = 1; i <= _p.length - 1; i += 2) {
                _p[i] = _p[i].replace('&', '=');
            }
            pb = _p.join('');
            param=pa+pb;
        };
        var ary = new Array();
        var u = url;
        while (u.indexOf('{') != -1) {  //url包含{id}格式
            var temp = u.substring(u.indexOf('{') + 1, u.indexOf('}'));
            u = u.substring(u.indexOf('}') + 1);
            ary.push(temp);
        }
        if (ary.length > 0) {
            $.each(ary, function (i, value) {
                if (param.indexOf(value + "=") != -1) {
                    //包含这个参数，就替换掉
                    var _val = param.split(value + "=")[1].split("&")[0];//填写的参数值
                    if (_val != '') {
                        url = url.replace("{" + value + "}", _val).replace("$", "");
                        param = param.replace(value + "=" + _val, "").replace("&&", "&").replace("?&", "?");
                    }
                }
            });
        }
        if (str == "url") {
            return url;
        } else if (str == "urlParam") {
            var urlParam = url;
            if (mode != null && mode != '' && mode != 'POST' && param != '') {
                if (urlParam.indexOf("?") > 0) {
                    urlParam += "&" + param;
                } else {
                    urlParam += "?" + param;
                }
            }
            if (mode != null && mode != '' && mode == 'POST' && param != '') {
                urlParam += "?" + param;
            }
            return urlParam;
        } else {
            return param;
        }
    },
    convertHeader: function (url, param, mode, str) {//转换接口url
        if(param.indexOf("__parameter__")>=0){
            var pa=param.substring(0,param.indexOf("__parameter__"));
            var pb=param.substring(param.indexOf("__parameter__"));
            var _p = pb.split("__parameter__=");
            for (var i = 1; i <= _p.length - 1; i += 2) {
                    _p[i] = _p[i].replace('&', '=');
            }
            pb = _p.join('');
            param=pa+pb;
        };
        if(param.indexOf("__headerParameter__")>=0){
            var pa=param.substring(0,param.indexOf("__headerParameter__"));
            var pb=param.substring(param.indexOf("__headerParameter__"));
            var _p = pb.split("__headerParameter__=");
            for (var i = 1; i <= _p.length - 1; i += 2) {
                _p[i] = "__headerParameter__"+_p[i].replace('&', '=');
            }
            pb = _p.join('');
            param=pa+pb;
        };
        var ary = new Array();
        var u = url;
        while (u.indexOf('{') != -1) {  //url包含{id}格式
            var temp = u.substring(u.indexOf('{') + 1, u.indexOf('}'));
            u = u.substring(u.indexOf('}') + 1);
            ary.push(temp);
        }
        if (ary.length > 0) {
            $.each(ary, function (i, value) {
                if (param.indexOf(value + "=") != -1) {
                    //包含这个参数，就替换掉
                    var _val = param.split(value + "=")[1].split("&")[0];//填写的参数值
                    if (_val != '') {
                        url = url.replace("{" + value + "}", _val).replace("$", "");
                        param = param.replace(value + "=" + _val, "").replace("&&", "&").replace("?&", "?");
                    }
                }
            });
        }
        if (str == "url") {
            return url;
        } else if (str == "urlParam") {
            var urlParam = url;
            if (mode != null && mode != '' && mode != 'POST' && param != '') {
                if (urlParam.indexOf("?") > 0) {
                    urlParam += "&" + param;
                } else {
                    urlParam += "?" + param;
                }
            }
            if (mode != null && mode != '' && mode == 'POST' && param != '') {
                urlParam += "?" + param;
            }
            return urlParam;
        } else {
            return param;
        }
    }
};


$("body").on("click", "span[hide]", function (data) {
    $(this).parents("tr").hide();
});

$("#urlpar").click(function () {
    $(".tbs").toggle();
});


$("#headers").click(function () {
    $(".tb").toggle();
});


function exportWord( _name,documentId) {
    var url = easyapi.ctx + "/document!word.action?id="+documentId;
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        cache: false,
        success: function (data) {
            var href = easyapi.ctx + "/include/excel/export.jsp?path=" + data + _name;
            window.open(href);
        }
    });
}

function exportPdf( _name,documentId) {
    var url = easyapi.ctx + "/document!pdf.action?id="+documentId;
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        cache: false,
        success: function (data) {
            var href = easyapi.ctx + "/include/excel/export.jsp?path=" + data + _name;
            window.open(href);
        }
    });
}

//切换api类型
function categoryChange(id) {
    var str = sessionStorage.lastname;
    var thejson = $.parseJSON(str);
    $("#apiName").html("");
    if (thejson.categories) {
        $.each(thejson.categories, function (i, item) {
            if (item.apis) {
                if (item.id == id) {
                    $.each(this.apis, function (ii, value) {
                        if (ii == 0) {
                            linkage(value);
                            $("tr[cdle]").remove();
                            eachParam(value);
                            $("#docButton").replaceWith('<a href="javascript:;" onClick="Godoc(' + item.id + ',' + value.id + ');" id="docButton" class="btn btn-info btn-sm">文档</a>');
                        }
                        var htm = '<option value="' + value.id + '">' + value.name + '</option> ';
                        $("#apiName").append(htm);
                    });
                }
            }
        });
    }
}

//切换api
function apiChange(id) {
    var str = sessionStorage.lastname;
    var thejson = $.parseJSON(str);
    $("tr[cdle]").remove();
    if (thejson.categories) {
        $.each(thejson.categories, function (i, item) {
            if (item.apis) {
                $.each(item.apis, function (i, value) {
                    if (value.id == id) {

                        linkage(value);
                        if (value.requestParams) {
                            eachParam(value);
                        }
                        $("#docButton").replaceWith('<a href="javascript:;" onClick="Godoc(' + item.id + ',' + id + ');" id="docButton" class="btn btn-info btn-sm">文档</a>');

                    }
                });
            }

        });
    }
}


//切换api的时候联动修改历史记录，接口示例，以及api的各个参数值
function linkage(obj) {
    var _appId=$("#appId").val();
    $("#apiUrl").val(obj.url);
    $("#apiFormat").val(obj.format);
    $("#apiMode").val(obj.mode);
    $("#example").load(easyapi.ctx+"/include/tool/example.jsp?apiId=" + obj.id + "&appId="+_appId);
    $("#profile").load(easyapi.ctx+"/include/tool/historyApp.jsp?apiId=" + obj.id + "&appId="+_appId);
    $("#urlParam").val("");
    $("#newOpen").attr("href", "javascript:;");
    //$("#apiDetail").attr("href", "${ctx}/"+_appCode+"/api/" + obj.id + "?themeId=${view.app.theme.id}&categoryId=${apiView.api.category.id}");
}

//显示参数列表
function eachParam(value) {
    if (value.requestParams) {
        $.each(value.requestParams, function (i, p) {
            var _param = "";
            var _type;
            if (p.type == 'file' || p.type == 'File') {
                _type = 'file';
            } else if(p.type == 'date' || p.type == 'datetime'){
                _type = 'date';
            }else{
                _type = 'text';
            }
            if (p.sample == null || p.sample == '') {
                if (p.required == true) {
                    if(_type=='date'){
                        _param = "<tr title='" + p.description + "' cdle><td class='td-1'>" + p.name + "</td>" +
                        "<td class='td-2' >" +
                        "<span  class='tol' data-toggle='tooltip' data-placement='top' title=" + p.description + " >" +
                        "<input type='text'   onClick='WdatePicker()'  value='' name='" + p.name + "' />" +
                        "</span>  <input type='checkbox' id='check" + p.id + "' checked='checked'> </td></tr>";
                    }else{
                        _param = "<tr title='" + p.description + "' cdle><td class='td-1'>" + p.name + "</td>" +
                        "<td class='td-2' >" +
                        "<span  class='tol' data-toggle='tooltip' data-placement='top' title=" + p.description + " >" +
                        "<input type='" + _type + "'  value='' name='" + p.name + "' />" +
                        "</span>  <input type='checkbox' id='check" + p.id + "' checked='checked'> </td></tr>";
                    }

                } else {
                    if(_type=='date'){
                        _param = "<tr title='" + p.description + "' cdle><td class='td-1'>" + p.name + "</td>" +
                        "<td class='td-2' >" +
                        "<span  class='tol' data-toggle='tooltip' data-placement='top' title=" + p.description + " >" +
                        "<input type='text'  onClick='WdatePicker()'  value='' disabled='disabled'   name='" + p.name + "' />" +
                        "</span>  <input type='checkbox' id='check" + p.id + "'> </td></tr>";
                    }else{
                        _param = "<tr title='" + p.description + "' cdle><td class='td-1'>" + p.name + "</td>" +
                        "<td class='td-2' >" +
                        "<span  class='tol' data-toggle='tooltip' data-placement='top' title=" + p.description + " >" +
                        "<input type='" + _type + "'  value='' disabled='disabled'   name='" + p.name + "' />" +
                        "</span>  <input type='checkbox' id='check" + p.id + "'> </td></tr>";
                    }

                }
                $("#params").prepend(_param);
            } else {

                if (p.required == true) {
                    if(_type=='date'){
                        _param = "<tr title='" + p.description + "' cdle><td class='td-1'>" + p.name + "</td>" +
                        "<td class='td-2' >" +
                        "<span  class='tol' data-toggle='tooltip' data-placement='top' title=" + p.description + " >" +
                        "<input type='text'   onClick='WdatePicker()' value='" + p.sample + "' name='" + p.name + "' />" +

                        "</span>  <input type='checkbox' id='check" + p.id + "' checked='checked'> </td></tr>";
                    }else{
                        _param = "<tr title='" + p.description + "' cdle><td class='td-1'>" + p.name + "</td>" +
                        "<td class='td-2' >" +
                        "<span  class='tol' data-toggle='tooltip' data-placement='top' title=" + p.description + " >" +
                        "<input type='" + _type + "'  value='" + p.sample + "' name='" + p.name + "' />" +

                        "</span>  <input type='checkbox' id='check" + p.id + "' checked='checked'> </td></tr>";
                    }

                } else {
                    if(_type=='date'){
                        _param = "<tr title='" + p.description + "' cdle><td class='td-1'>" + p.name + "</td>" +
                        "<td class='td-2' >" +
                        "<span  class='tol' data-toggle='tooltip' data-placement='top' title=" + p.description + " >" +
                        "<input type='text'   onClick='WdatePicker()'  value='" + p.sample + "' disabled='disabled'  name='" + p.name + "' />" +
                        "</span>  <input type='checkbox' id='check" + p.id + "' > </td></tr>";
                    }else{
                        _param = "<tr title='" + p.description + "' cdle><td class='td-1'>" + p.name + "</td>" +
                        "<td class='td-2' >" +
                        "<span  class='tol' data-toggle='tooltip' data-placement='top' title=" + p.description + " >" +
                        "<input type='" + _type + "'   value='" + p.sample + "' disabled='disabled'  name='" + p.name + "' />" +
                        "</span>  <input type='checkbox' id='check" + p.id + "' > </td></tr>";
                    }

                }
                $("#params").prepend(_param);

            }

        });
    }

}

//点击复选框筛选参数（自带的参数）
$("body").on("click", "input[id^='check']", function () {
    if (!$(this).is(':checked')) {
        $(this).prev("span").children("input").attr("disabled", true);
    } else {
        $(this).prev("span").children("input").removeAttr("disabled");
    }
});
//点击复选框筛选参数（添加的参数）
$("body").on("click", "input[name='check0']", function () {
    if (!$(this).is(':checked')) {
        $(this).prev("input").attr("disabled", true);
        $(this).parent("td").prev("td").children("input").attr("disabled", true);
    } else {
        $(this).prev("input").removeAttr("disabled");
        $(this).parent("td").prev("td").children("input").removeAttr("disabled");
    }
});


function toog(id) {
    $("[clist]").find(".lay").hide();
    $("[clist]").removeClass("active");
    $("[clist=" + id + "]").find(".lay").show();
    $("[clist=" + id + "]").addClass("active");
}

function goapi(id) {
    $("a[goapi]").removeClass("active");
    $("a[goapi=" + id + "]").addClass("active");
    $('html,body').animate({scrollTop: $("#go" + id).offset().top - 80}, 800);
}

//发送
$("body").on("click", "#send", function () {

    $(this).next(".Validform_checktip").show().html("发送中..");

    var baseUrl = $("#baseUrl").val();//跟地址
    if (typeof(baseUrl) == "undefined") {
        baseUrl = '';
    }
    var url = baseUrl + $("#apiUrl").val().replace(/[ ]/g, "");//接口url
    var format = $("#apiFormat").val();//数据格式
    var mode = $("#apiMode").val();//请求方式
    var param = $('#form').serialize();//请求参数
    url = Toolbs.convert(url, param, mode, "url");
    var urlParam = Toolbs.convert(url, param, mode, "urlParam");  //前台显示参数
    param = Toolbs.convertHeader(url, param, mode, "param"); //后台传输
    $("#urlParam").val(decodeURIComponent(urlParam));
    $("#newOpen").attr("href", urlParam);
    $("#send").attr("disabled", true);

    var _apiId = $("#apiName").val();

    $(".overtips").remove();
    $(".tipsone").remove();


    $.get(easyapi.ctx + "/api!response.action?url=" + encodeURIComponent(url) + "&param=" + encodeURIComponent(param) + "&mode=" + mode + "&id=" + _apiId, function (data) {
        var _h = data.substring(0, data.indexOf('||'));
        var _hd = _h.split('[');
        _h = _hd.join('<br>');
        var _hhd = _h.split(',');
        _h = _hhd.join(',<br>');
        $("#pencil").html(_h);
        var _b = data.substring(data.indexOf('||') + 2);
        $("#Canvas").text(_b);
        if (format != null && format != '' && (format == "JSON" || format == "json")) {
            Process(_b);//显示JSON数据
        }
        $("#msgbx").removeClass("Validform_loading").html("已发送");
    });


    $.get(easyapi.ctx + "/api!jsonParam.action?url=" + encodeURIComponent(url) + "&param=" + encodeURIComponent(param) + "&mode=" + mode + "&id=" + _apiId, function (data) {
        try {
            var jsonobj = eval('(' + data + ')');
            if (jsonobj.status == 1 || jsonobj.status == '1') {
                var _s = JSON.stringify(jsonobj.msg);
                $("#urlParam").val(url + "?" + _s);
            }
        } catch (e) {
            $("#urlParam").val(url + "?" + data);
        }
    });

    setTimeout(' $("#send").attr("disabled", false)', 2000);
    saveHistory(url.replace(baseUrl, ""), param);//保存历史记录
    $("#data").show();

});


$("body").on("click", "#deploy", function () {
    $("#pencil").toggle();
})

//保存历史记录
function saveHistory(url, param) {
    $.post(easyapi.ctx +"/history!save.action", {
        appId:$("#appId").val(),
        apiUrl: url,
        param: param
    }, function (result) {
        if (result.status == '1' || result.status == 1) {
            var _hiId = result.msg;
            var _ur = easyapi.ctx +"/ajax/history/view.jsp?historyId=" + _hiId;
            $.get(_ur, function (resu) {
                $("#history").prepend(resu);
            });

        }
    }, "JSON");
}

//格式化参数
$("body").on("click", "#format", function () {
    var url = $("#urlParam").val().trim();
    if (url == null || url == "") {
        alert("请您现在上方的输入框输入url")
    } else {
        if (url.indexOf("?") > 0) {
            Toolbs.format(url);
        }
    }
});

//测试工具数据类型显示与隐藏
$("body").on("click", "#dataStyle", function () {
    if ($("#dataStyle").is(':checked')) {
        $("span[name='style']").show();
    } else {
        $("span[name='style']").hide();
    }
});

//测试工具数据注释显示与隐藏
$("body").on("click", "#dataDescription", function () {
    var _apiId = $("#apiName").val();
    if ($("#dataDescription").is(':checked')) {
        $("span.PropertyName").each(function () {
            var _this = $(this);
            var _name = _this.text().replace("\"", "").replace("\"", "");
            if (_name.indexOf("<span") > 0) {
                _name = _name.substring(0, _name.indexOf("<span"));
            }
            var _before = _this.prev();
            var _parentName = '';
            if (_before != null && _before != '') {
                while (!_before.hasClass("ObjectBrace")) {
                    _before = _before.prev();
                }
                if (_before.hasClass("ObjectBrace")) {
                    var _last = _before.prev();
                    if (_last != null && _last != '' && _last.hasClass("PropertyName")) {
                        _parentName = _last.text();
                    }
                    if (_last != null && _last != '' && _last.hasClass("ArrayBrace")) {
                        _last = _last.prev();
                        _parentName = _last.text();
                    }
                    if (_parentName.indexOf("<span") > 0) {
                        _parentName = _parentName.substring(0, _parentName.indexOf("<span"));
                    }
                }
            }
            if (_parentName != null && _parentName != '') {
                _parentName = _parentName.split("\"")[1].replace("\"", "").replace("\"", "");
            }
            var _des = "";
            $.ajax({
                url: easyapi.ctx +"/response-param!tool.action",
                type: "post",
                data: {
                    "query.appId": $("#appId").val(),
                    "query.name": _name,
                    "query.apiId": _apiId,
                    "query.parentName": _parentName
                },
                dataType: "json",
                success: function (result) {
                    _des = result.msg;
                    _this.append("<span class='PropertyDescription'>" + _des + "</span>");
                }
            });


        });
    } else {
        $("span.PropertyDescription").remove();
    }
});

//文档数据类型显示与隐藏
$("body").on("click", "[ar='dataStyle']", function () {
    var _this = $(this);
    var _parent = _this.parent().parent(".fr").parent(".clearfix").parent(".e_box");
    if (_this.is(':checked')) {
        _parent.children(".e_body").children(".padding").children(".CodeContainer").children("span[name='style']").show();
    } else {
        _parent.children(".e_body").children(".padding").children(".CodeContainer").children("span[name='style']").hide();
    }
});

//文档数据注释显示与隐藏
$("body").on("click", "[ar='dataDescription']", function () {
    var _this = $(this);
    var _parent = _this.parent().parent(".fr").parent(".clearfix").parent(".e_box");
    if (_this.is(':checked')) {

        $(_parent.children(".e_body").children(".padding").children(".CodeContainer").children("span.PropertyName")).each(function () {
            var _p = $(this);
            var _apiId = _p.parent().parent(".padding").attr("id").replace("apiResult", "").replace("apiOtherResult", "");
            var _name = _p.text().replace("\"", "").replace("\"", "");
            if (_name.indexOf("<span") > 0) {
                _name = _name.substring(0, _name.indexOf("<span"));
            }
            var _before = _p.prev();
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
            _name = _name + "";
            _apiId = Number(_apiId);
            if (_parentName == '') {
                if (db({"name": _name, "apiId": _apiId, "level": 1}).first() != false) {
                    _des = db({"name": _name, "apiId": _apiId, "level": 1}).first().name;
                }
            } else {
                if (db({
                        "name": _name,
                        "apiId": _apiId,
                        "level": {'>': 1},
                        "parentName": _parentName
                    }).first() != false) {
                    _des = db({
                        "name": _name,
                        "apiId": _apiId,
                        "level": {'>': 1},
                        "parentName": _parentName
                    }).first().name;
                }
            }
            if (_des != '') {
                _p.append("<span class='PropertyDescription'>" + _des + "</span>");
            }
        });
    } else {
        _parent.children(".e_body").children(".padding").children(".CodeContainer").children("span.PropertyName").children("span.PropertyDescription").remove();
    }
});




function Godoc(ida, id) {
    $("[channav=1]").click();
    $('html,body').animate({scrollTop: $("#go" + id).offset().top - 80}, 800);
    toog(ida);
    goapi(id);
}

function Testtool(categoryId, apiId) {
    $("[channav=2]").click();
    $("#category").val(categoryId);
    categoryChange(categoryId);
    $("#apiName").val(apiId);
    apiChange(apiId);

}





