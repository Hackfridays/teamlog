require.config(
{
	baseUrl : '/js/',
	shim:
	{
		bootstrap: {
			deps: ['jquery'],
			exports: 'bootstrap'
		},
		backgrid: {
			deps: ['jquery','backbone','underscore'],
			exports: 'Backgrid'
		},
		chosen: {
			deps: ['jquery'],
			exports: 'jQuery.fn.chosen'
		}
	},
	paths:
	{
		jquery:     '/vendor/jquery/dist/jquery.min',
		backbone:   '/vendor/backbone/backbone-min',
		requirejs:  '/vendor/requirejs/require',
		underscore: '/vendor/underscore/underscore-min',
		mustache:   '/vendor/mustache.js/mustache',
		bootstrap:  '/vendor/bootstrap/dist/js/bootstrap.min',
		backgrid:   '/vendor/backgrid/lib/backgrid',
		chosen:     '/vendor/chosen/chosen.jquery'
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});

/**
 * Set up the global project name
 */
var Teamlog;
var Store;

require(
	['backbone', 'bootstrap', 'Teamlog', 'Utilities/storage/IDBStorage', 'config'],
	function(Backbone, bootstrap, tml, Storage, config)
	{
		Store = new Storage (config.appname, config.dbversion);
		
		// Start
		Teamlog = tml.init ();
		Teamlog.activate ();
	}
);
