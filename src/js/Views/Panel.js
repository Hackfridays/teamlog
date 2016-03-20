define (
	['backbone', 'mustache'],
	function (Backbone, Mustache)
	{
		var Panel = Backbone.View.extend({
			
			paneltype: 'default',
			title: 'Panel',
			template: Templates.panel,
			
			events: {
				'remove' : 'destroy',
			},
		
			initialize: function (options)
			{
				if(options) $.extend(this, options);
			},
		
			render: function (options)
			{	
				if(options) $.extend(this, options);
				
				
				// Get template
				this.$el.html (Mustache.render (this.template, this));
				this.$container = this.$el.find(".panel-body").eq(0);
								
				return this;
			}
		});
		
		return Panel;
	}
);