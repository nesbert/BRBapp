define(['backbone','text!templates/app.html'], function(Backbone, html) {
  "use strict";
  var AppView = Backbone.View.extend({

    initialize: function() {
      this.template = _.template(html);
      this.render();
    },

    render: function(){
      $('html body').html(this.template(this.options));
    }

  });
  return AppView;
});