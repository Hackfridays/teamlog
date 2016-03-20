define (
	['backbone'],
	function (Backbone)
	{
		var User = Backbone.Model.extend({
		
			typestring: 'users',
			
			url: function ()
			{
				var url = Teamlog.config.url;
				
				// POST hack
				if(this.get('accountid')) url += "accounts/" + this.get('accountid') + "/";
				
				url += this.typestring;
				
				if (this.id) url += '/' + this.id;
				
				return this.parameters? url + "?" + $.param (this.parameters): url;
			}

		});
		
		return User;
	}
);