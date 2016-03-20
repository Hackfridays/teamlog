define (
	['Models/User'],
	function (User)
	{
		var Me = User.extend({
		
			url: function () 
			{
				return Teamlog.config.url + "me?" + $.param ({display: 'full'});
			}
		});
		
		return Me;
	}
);