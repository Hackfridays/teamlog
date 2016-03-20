/**
 * Concat Cell
 * Concat cell joins the "name" fields of an array.  
 */

define (
	['backgrid'],
	function (Backgrid)
	{
		var ConcatCell = Backgrid.Cell.extend({

			/** @property */
			events: {},
			
			/**
			Renders the given object length.
			*/
			render: function ()
			{
				var field = this.model.get(this.column.get("name"));
				var concat = [];
				
				if (field && field.length)
					for (var n in field) concat.push (field[n].name);
	
				this.$el.html(concat.join(", "));
				
				return this;
			}
		});
		
		return ConcatCell;
	}
);