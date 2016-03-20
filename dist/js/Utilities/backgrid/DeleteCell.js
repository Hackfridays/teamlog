/**
 * Delete Cell
 * Delete the row and send delete request
 */

define (
  ['backgrid'],
  function (Backgrid)
  {
    // custom cell for deleting row/models
    var DeleteCell = Backgrid.Cell.extend({
        template: _.template('<button class="btn btn-danger btn-xs ion-minus-circled removemodel"></button>'),
        events: {
          "click .removemodel": "deleteRow"
        },
        // destroys the model
        deleteRow: function (e) {
          e.preventDefault();
          this.model.destroy();
        },
        // render the delete button
        render: function () {
          this.$el.html(this.template());
          this.delegateEvents();
          return this;
        }
    });
    return DeleteCell;
  }
);
