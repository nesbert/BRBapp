define(['backbone','tpl!templates/app.tpl'], function(Backbone, tpl) {
  "use strict";

  var AppView = Backbone.View.extend({

    events: {
      "click .btn-primary" : "click"
    },

    render: function() {
      this.$el.html(tpl(this.options));
      return this;
    },

    click: function() {
      if (BRBapp.debug) {
        console.log('click', BRBapp);
      }
    }

  });

  return AppView;
});