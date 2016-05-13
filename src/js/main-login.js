/**
 * Require dependencies
 */
require.config(
{
	baseUrl: '/js/',
	paths: 
	{
		jquery:   '/vendor/jquery/dist/jquery.min',
		mustache: '/vendor/mustache.js/mustache'
	},
	
});

require(
	['jquery', 'Utilities/Authorize'],
	function($, auth)
	{
		auth.hasToken();
	}
);