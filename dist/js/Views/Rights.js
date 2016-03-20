define (
	['mustache', 'Views/Pageview', 'Views/Panel', 'Session', 'Views/Panels/Iframe'],
	function (Mustache, Pageview, Panel, Session, IframePanel)
	{
		var Page = Pageview.extend(
		{

			initialize: function (models, type)
			{
				this.pagetype = type;
				this.capitalize = function (word) {
			    return word.charAt(0).toUpperCase() + word.slice(1);
				};
			},

			render: function ()
			{

				// Build Pageview
				this.$el.html (Mustache.render (Templates.pageview, {'title' : this.capitalize(this.pagetype) + " Rights"}));

				// Panels parent
				this.$container = this.$el.find("#container").eq(0);

				// segment
				if (this.pagetype == 'apps') {
					this.appsview();
				}

				return this;
			},

			appsview: function ()
			{
				// Access Token
				var token = new Panel ({title: 'Your Access Token', body: Session.authenticationtoken, footer: 'Do not share this token.'});
				this.appendPanel (token, 6);

				// Register view
				var panel = new IframePanel ({src: Teamlog.config.authurl + 'register?bearer=' + Session.authenticationtoken, height: '382px'});
				this.appendPanel (panel, 12);

			}

		});

		return Page;
	}
);
