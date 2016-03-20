define(
	['config'],
	function (config)
	{	
		var Alpha = {
			
			/**
			 * First time
			 * set up the first time protocols
			 */
			init: function ()
			{
				
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