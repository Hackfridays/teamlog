define(
	['config', 'mustache'],
	function (config, Mustache)
	{	
		var Alpha = {
			
			/**
			 * First time
			 * set up the first time protocols
			 */
			init: function ()
			{
				$("#alpha").html(Mustache.render (Templates.alpha_one, config));
			}			
		}
		
		return Alpha;
});

/**
 * Origin function
 */
var origin = function ()
{
	return (window.location.origin)? window.location.origin : window.location.protocol + "//" + window.location.hostname;
}