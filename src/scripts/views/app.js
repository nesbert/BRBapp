define(['backbone','tpl!templates/app.tpl'], function(Backbone, tpl) {
  "use strict";

  var AppView = Backbone.View.extend({

    initialize: function() {
      this.render();
    },

    render: function(){
      $('html body').html(tpl(this.options));
    }

  });
  
  return AppView;
});