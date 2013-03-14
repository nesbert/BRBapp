define(['backbone','tpl!templates/app.tpl'], function(Backbone, tpl) {
  "use strict";

  var AppView = Backbone.View.extend({

    render: function() {
      this.$el.html(tpl(this.options));
      return this;
    }

  });

  return AppView;
});