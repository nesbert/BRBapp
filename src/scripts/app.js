define(
  ['views/app', 'bootstrap'],
  function (AppView) {
    'use strict';

    var view = new AppView();
    $('#content').html(view.render().el);

    return function() {
      this.debug = (window && window.location && window.location.hostname && (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'));
      this.version = '<version>';
      this.view = view;
    };
  }
);