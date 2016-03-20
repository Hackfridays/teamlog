define (
	['backbone', 'Models/User'],
	function(Backbone, User)
	{
		var Users = Backbone.Collection.extend(
		{
			typestring : "users",

			model: User,

			required: {email: 'Email', firstname: 'New User', lastname: 'Last Name'},

			initialize : function (options)
			{
				if(options) $.extend(this, options);

				// Event listeners
				this.on ('backgrid:edited', this.patchModel);
				this.on ('backgrid:edited', this.postModel);
			},

			url : function()
			{
				var url = Teamlog.config.url + this.typestring;

				return this.parameters? url + "?" + $.param (this.parameters): url;
			},

			patchModel : function (model)
			{
				// Patch model, if changed
				if (Object.keys(model.changed).length && !model.isNew()) {
					model.save(model.changed, {patch: true});
				}
			},

			/**
			 * Compare the model attributes with the required default values.
			 * @param  {Backgrid.model} model 	The model that was edited.
			 * @return {boolean}       			The evaluation of the comparison
			 */
			checkAllRequired: function (model)
			{
				var attributes = model.attributes;
				var evaluation = [];
				for (var attr in  attributes){
					evaluation.push(attributes[attr] !== this.required[attr]);
				}
				return evaluation.reduce(function (prev, curr) {
					return prev && curr;
				});
			},

			/**
			 * Saves the model on the server if all required fields were edited.
			 * @param  {Backgrid.model} model 	The model that was edited.
			 */
			postModel: function (model)
			{
				if (Object.keys(model.changed).length && model.isNew() && this.checkAllRequired(model))
				{
					var self = this;
					model.save({
						success: function() {
							self.trigger('newuser:save');
						}
					});
				}
			},
		});

		return Users;
	}
);
