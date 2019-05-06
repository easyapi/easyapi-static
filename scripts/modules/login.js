define(function(require, exports, module) {

	require('jquery.validform');



	var onReady = function() { 
	var showmsg=function(msg){   
         $("#alertMessage").css("display", "block");
         $("#alertMessage").html(msg);
         $("#alertMessage").fadeIn(400).delay(2000).hide(0); 
    }	
   		 $('form.login-form').Validform({
	         btnSubmit:"#btn_sub", 
	        tiptype:function(msg){showmsg(msg);},
	        datatype:{
				"phone":function(gets,obj,curform,regxp){
					/*参数gets是获取到的表单元素值，
					  obj为当前表单元素，
					  curform为当前验证的表单，
					  regxp为内置的一些正则表达式的引用。*/

					var reg1=regxp["m"],
						reg2=regxp["e"];
						 
					if(reg1.test(gets)){return true;}
					if(reg2.test(gets)){return true;}
					
					return false;
				}	
			}   
    	});

   		$('form#signupForm').Validform({
	         btnSubmit:"#btn_sub", 
	        tiptype:function(msg){showmsg(msg);}, 
	        datatype:{
	                "need2":function(gets,obj,curform,regxp){
	                    var need=1,
	                        numselected=curform.find("input[zcc]:checked").length;
	                    return  numselected >= need ? true : "请至少选择"+need+"项！";
	                },
	                "psd":function(gets,obj,curform,regxp){
	                	var _ps1=curform.find("#password").val();
	                	var reg1=regxp["*"];
						if(reg1.test(gets)&&(_ps1==gets)){return true;}else{
							return "两次密码不相符，请仔细输入！"
						}

	                }
	            }   
    	}); 

	};

	exports.run = function() {
		$(onReady());
	}

});