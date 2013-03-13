define(['views/app','bootstrap'],function(AppView) {
  "use strict";

  var view = new AppView();
  $('html body').prepend(view.render().el);

  return function() {
    this.debug = false;
    this.view = view;
  };
});