/**
 * Count Cell
 * Count Cell displays the length of an array.
 */

define (
	['backgrid'],
	function (Backgrid)
	{
		var CountCell = Backgrid.NumberCell.extend({

			/** @property */
			events: {},
			
			/**
			Renders the given object length.
			*/
			render: function ()
			{
				var field = this.model.get(this.column.get("name"));
				var count = field? field.length: 0;
				this.$el.html(count);
				
				return this;
			}
		});
		
		return CountCell;
	}
);