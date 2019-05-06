define(function(require, exports, module) {
	require('jquery.validform');
 
	var onReady = function() {  
		$("a[to-delete]").click(function(){
			var ms=$(this).attr("to-delete");
			var lin=$(this).attr("lin"); 
			 $.get(ms, function(data) { $('#'+lin).slideUp();});
		})  
	
   		 $('form#projectForm').Validform({
	         btnSubmit:"#btn_sub",
	       tiptype:2
    	});
        $('form#infoForm').Validform({
            btnSubmit:"#btn_sub",
            tiptype:2
        });
        $('form#categoryForm').Validform({
            btnSubmit:"#btn_sub",
            tiptype:2
        });
        $('form#apiForm').Validform({
            btnSubmit:"#btn_sub",
            tiptype:2
        });
        $('form#paramForm').Validform({
            btnSubmit:"#btn_sub",
            tiptype:2
        });
		
		
		
    };
	exports.run = function() { 
	window.openapi={ctx:"${ctx}"};
		$(onReady());
	}

});