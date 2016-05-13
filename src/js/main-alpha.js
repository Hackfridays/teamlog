/**
 * Require dependencies
 */
require.config(
{
	baseUrl: '/js/',
	shim:
	{
		bootstrap: {
			deps: ['jquery'],
			exports: 'bootstrap'
		}
	},
	paths: 
	{
		bootstrap: '/vendor/bootstrap/dist/js/bootstrap.min',
		jquery:    '/vendor/jquery/dist/jquery.min',
		mustache:  '/vendor/mustache.js/mustache'
	},
	
});

require(
	['jquery', 'bootstrap', 'Utilities/Alpha'],
	function($, bootstrap, Alpha)
	{
		Alpha.init();
	}
);