define (
  ['mustache', 'backgrid', 'Collections/Accounts', 'Views/Pageview',
    'Views/Panels/List', 'Utilities/backgrid/DeleteCell', 'Utilities/backgrid/CountCell'],
  function (Mustache, Backgrid, Accounts, Pageview, ListPanel, DeleteCell, CountCell)
  {


    var AccountsView = Pageview.extend(
    {
      title : "Accounts",

      fullgrid: [
        { name: "id", label: "ID", editable: false,  cell: "string"},
        { name: "slug", label: "Unique Name", cell: "string"},
        { name: "name", label: "Name", cell: "string"},
        { name: "users", label: "Users", editable: false, cell: CountCell},
        { name: "active", label: "Active", cell: Backgrid.IntegerCell},
        { name: "delete", sortable: false, label: "Delete", cell: DeleteCell }
      ],

      grid: [
        { name: "id", label: "ID", editable: false,  cell: "string"},
        { name: "slug", label: "Unique Name", cell: "string"},
        { name: "name", label: "Name", cell: "string"},
        { name: "delete", sortable: false, label: "Delete", cell: DeleteCell }
      ],

      render: function ()
      {
        // Build Pageview
        this.$el.html (Mustache.render (Templates.pageview, {'title' : this.title}));

        // Panels parent
        this.$container = this.$el.find("#container").eq(0);

        // Accounts
        var grid = this.accountsgrid(true);
        var accountslist = new ListPanel ({
          title: 'Accounts',
          grid: grid,
          addNew: {
            required: grid.collection.required
          }
        });
        this.appendPanel (accountslist, 12);

        grid.collection.on('newaccount:save', function() {
          this.fetch ({reset: true});
        });
        
        // ad-hoc display implementation
        grid.collection.parameters = {display: 'full'};

        grid.collection.fetch ({reset: true});

        return this;
      },

      accountsgrid: function (full)
      {
        return new Backgrid.Grid (
        {
          collection: new Accounts(),
          columns: full ? this.fullgrid : this.grid
        });
      }
    });

    return AccountsView;
  }
);
