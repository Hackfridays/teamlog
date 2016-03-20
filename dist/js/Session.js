define(
	['backbone', 'mustache', 'Teamlog', 'Models/Me'],
	function (Backbone, Mustache, Teamlog, Me)
	{
		Session =
		{
			user : null,

			authenticate: function (fallback)
			{
				var token = window.localStorage.getItem ('token');

				// Check if there is authentication
				if(token || fallback)

					this.authenticationtoken = token && token.length >= 18? token: fallback;

				else window.location = "/login.html";
			},


			// Loads logged user data
			loadEssentialData : function (callback)
			{
				// Load me.
				this.user = new Me ();
				this.user.fetch({error: this.revoke});

				// Continue
				callback ();
			},

			revoke: function ()
			{
				this.user = this.authenticationtoken = null;
				window.localStorage.removeItem ('token');

				// if (!Teamlog.passthrough)

					window.location = "/login.html";
			},

			isLoaded : function ()
			{
				return this.user !== null;
			},

			render: function ()
			{
				// Do some rendering
				$('#page').html (this.view.render ().el);
			},

			setView: function (view)
			{
				// Remove the old
				if (this.view) this.view.remove();

				Session.trigger('destroy:view');

				this.view = view;

				this.render();
			}
		};

		// Add events
		_.extend(Session, Backbone.Events);

		return Session;
	}
);
