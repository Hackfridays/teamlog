define (
	['backbone', 'mustache', 'config'],
	function (Backbone, Mustache, config)
	{
		var Navigation = Backbone.View.extend({
		
			className: "container-fluid",
			events: {
				'remove': 'destroy'
			},
			
			initialize: function ()
			{
				// Routing triggers
				this.listenTo(Teamlog.router, 'route', this.setActive);
				
				this.listenTo(Session.user, 'sync', this.renderUser)
			},
		
			render: function ()
			{
				// Build Navigation
				this.$el.html (Mustache.render (Templates.navbar, config));
				
				return this;
			},
			
			renderUser: function (Me, attributes)
			{
				this.$el.find(".profile").html (Mustache.render (Templates['navbar-me'], attributes));
			},
			
			/*handleMenu : function () {
		
				var path = Backbone.history.fragment;
				
				// Ignore Dashboard start
				if(!path) return null;
				
				this.setActive(path);
		    },*/
		    
		    setActive : function (base, fragments) {
				
				var path = Backbone.history.fragment;
				var href = path? '#' + path: '/';
				
				// Toggle .active class
				$('nav .active').removeClass ('active');
				$('a[href="' + href + '"]').parents('nav ul *').addClass ('active');
			},
			
			destroy: function ()
			{	
			}
		});
		
		return Navigation;
	}
);