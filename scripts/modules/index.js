define(function(require, exports, module) {

	require('onepage');
	exports.run = function() { 
		$('body').onepage_scroll({
		sectionContainer: 'body',
		pagination:'false'
	});

		 
	}
});