define (
  ['mustache', 'backgrid', 'Collections/Users', 'Collections/Accounts', 'Views/Pageview', 'Views/Panels/List',
   'Views/Panel', 'Utilities/backgrid/DeleteCell', 'Utilities/backgrid/ConcatCell', 'chosen'],
  function (Mustache, Backgrid, Users, Accounts, Pageview, ListPanel, Panel, DeleteCell, ConcatCell, chosen)
  {

    var UsersView = Pageview.extend(
    {
      title : "Users",

      fullgrid: [
        { name: "id", label: "ID", editable: false,  cell: "string"},
        { name: "email", label: "E-mail", cell: "email"},
        { name: "firstname", label: "First Name", cell: "string"},
        { name: "lastname", label: "Last Name", cell: "string"},
        { name: "accounts", label: "Connected Accounts", cell: ConcatCell},
        { name: "delete", sortable: false, label: "Delete", cell: DeleteCell }
      ],

      grid: [
        { name: "id", label: "ID", editable: false,  cell: "string"},
        { name: "email", label: "E-mail", cell: "email"},
        { name: "firstname", label: "First Name", cell: "string"},
        { name: "lastname", label: "Last Name", cell: "string"},
        { name: "delete", sortable: false, label: "Delete", cell: DeleteCell }
      ],

      events: {
        'click #adduser': 'adduser',
        'remove': 'destroy'
      },

      initialize: function () {
        // Accounts for adduser
        this.accounts = new Accounts();
        this.listenTo(this.accounts, 'sync', this.appendaccounts);
      },

      render: function ()
      {

        // Build Pageview
        this.$el.html (Mustache.render (Templates.pageview, {'title' : this.title}));

        // Panels parent
        this.$container = this.$el.find("#container").eq(0);

        // Users
        grid = this.usersgrid(true);
        var userslist = new ListPanel ({title: 'Users', grid: grid, addNew: {required: grid.collection.required}});
        this.appendPanel (userslist, 8);

        this.users = grid.collection;

        this.users.on('newuser:save', function() {
          this.fetch ({reset: true});
        });
		
		// ad-hoc display implementation
        this.users.parameters = {display: 'super'};
		
        this.users.fetch({reset: true});

        // Add User
        var adduser = new Panel ({title: 'Add User', template: Templates.adduser});
        this.appendPanel (adduser, 4);

        this.$el.find('select').chosen({width: '100%'});
        this.accounts.fetch({reset: true});

        return this;
      },

      usersgrid: function (full)
      {
        return new Backgrid.Grid (
        {
          collection: new Users (),
          columns: full ? this.fullgrid : this.grid
        });
      },

      appendaccounts: function (coll, models)
      {
          // Select field
        var select = this.$el.find('select').html('');

        for (var n in models)

          select.append($('<option>', {value: models[n].id}).html(models[n].name));

        select.trigger("chosen:updated");

      },

      adduser: function ()
      {

        this.users.create(
        {
          firstname: $('#firstname').val(), lastname: $('#lastname').val(), email: $('#email').val(), accountid: this.$el.find('select').val()
        })
      }

      });

    return UsersView;
  }
);
