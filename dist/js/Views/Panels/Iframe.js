define (
  ['mustache', 'Views/Panel'],
  function (Mustache, Panel)
  {
    var Iframe = Panel.extend({

      className: 'iframe-panel',
      height: '200px',

      render: function ()
      {

        // Create iframe
        this.$el.append ($('<iframe>', {src: this.src, height: this.height}));

        return this;
      }
    });

    return Iframe;
  }
);
