function searchService() {
    var _name = $("#serviceName").val();
    if (_name != null && _name != '') {
        window.location.href = easyapi.ctx + "/search?serviceName=" + _name;
    }
}

function enterSearch(){
    var event = window.event || arguments.callee.caller.arguments[0];
    if (event.keyCode == 13){
        searchService();
    }
}
