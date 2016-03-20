define (
	['mustache', 'Views/Panel'],
	function (Mustache, Panel)
	{
		var Jumbotron = Panel.extend({
			
			className: 'jumbotron',
			
			render: function (options)
			{	
				if(options) $.extend(this, options);
				
				// Template data
				var params = {
					title: this.title,
					body: this.body
				};

				// Get template
				this.$el.html (Mustache.render (Templates.jumbotron, params));
				this.$container = this.$el.find(".panel-body").eq(0);
											
				return this;
			}
		});
		
		return Jumbotron;
	}
);