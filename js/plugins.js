// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

var inArray = function(needle, haystack) {
	for (var i=0, e=haystack.length; i<e; i++){
		if ( haystack[i] == needle ) {
			return true;
		}
	}
	return false;
};

$(document).ready(function(){
	// Place any jQuery/helper plugins in here.]
	$('td[data-key]').on('click', function(){
		$('.highlight').removeClass('highlight');
		var player = $(this).attr('data-key');
		$('[data-key='+player+']').addClass('highlight');
	});

	// Validate entries
	var matchReady = 'matchReady';

	$('body').on(matchReady, function(){
		$('tr[data-key]').each(function(){
			var self = $(this),
				player = self.attr('data-key'),
				expectedGames = parseInt(self.find('.player span').html()),
				matches = [];

			// Get own matches
			self.find('td[data-key]').each(function(i){
				if ( i > 0 ) {
					matches.push($(this).attr('data-key'));
				}
			});

			// Get individual matches
			$('td[data-key='+player+']').each(function(){
				var parent = $(this).parent('tr[data-key]').attr('data-key');
				if ( parent != player && !inArray(parent, matches) ) {
					matches.push(parent);
				}
			});

			// Mark invalid ones
			if ( expectedGames != matches.length ) {
				console.log(player+'('+expectedGames+'): '+matches+'('+matches.length+')');
			}
		});
	});

	// Trigger body
	$('body').trigger(matchReady);
});
