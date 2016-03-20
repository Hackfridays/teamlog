define(
	['backbone', 'Session', 'Router', 'config', 'Views/Navigation'],
	function (Backbone, Session, Router, config, NavigationView)
	{
		var Teamlog = {

			passthrough: null,	// Ignores token if not null. "the-Golden-Key-28chars-token"

			init : function ()
			{
				// Validate
				
				
				
				// Authentication
				Session.authenticate (this.passthrough);

				// Set config
				this.config = config;
				this.config.url = config.apiurl + config.apiversion + '/';

				return this;
			},

			activate: function ()
			{
				// First load essential user data
				Session.loadEssentialData (function ()
				{
					// And then rout the router.
					this.router = new Router ();

					// Load navigation
					this.navigation = new NavigationView (this);
					$('nav.navbar').html(this.navigation.render().el);

					Backbone.history.start();

				}.bind (this));
			}
		};

		/*
		 *	Add authorization headers to each Backbone.sync call
		 */
		Backbone.ajax = function()
		{
			// Is there a auth token?
			if(Session.authenticationtoken)

				arguments[0].headers = {
		            'Authorization': 'Bearer ' + Session.authenticationtoken,
		            'Accept': "application/json"
		        };

			return Backbone.$.ajax.apply(Backbone.$, arguments);
		};

    return Teamlog;
	}
);
