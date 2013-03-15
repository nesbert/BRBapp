define(['views/app','bootstrap'],function(AppView) {
  "use strict";

  var view = new AppView();
  $('#content').html(view.render().el);

  return function() {
    this.debug = false;
    this.view = view;
  };
});