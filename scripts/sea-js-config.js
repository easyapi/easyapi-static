seajs.config({
  // 配置插件
  plugins: ['shim'],

  // 配置别名
  alias: {
    // 配置 jquery 的 shim 配置，这样我们就可以通过 require('jquery') 来获取 jQuery
    'jquery': {
      src: 'libs/jquery/1.9.1/jquery.js',
      exports: 'jQuery'
    },
    // 配置 jquery validate
    'jquery.validate': {
      src: 'libs/jquery.validate/1.11.1/jquery.validate.js',
      deps: ['jquery']//validate依赖jquery，所在在这里做了配置
    },
    'jquery.validform': {
      src: 'libs/validform/validform.min.js',
      deps: ['jquery']
    },
	'bootstrapjs': {
      src: 'http://apps.bdimg.com/libs/bootstrap/3.2.0/js/bootstrap.js',
      deps: ['jquery']
    },
  'jqueryform': {
      src: 'libs/jquery.form.js',
      deps: ['jquery']
    },
  'jqueryui': {
      src: 'http://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js',
      deps: ['jquery']
    },
  'onepage': {
      src: 'libs/jquery.onepage-scroll.min.js',
      deps: ['jquery']
    }


	
  }
});