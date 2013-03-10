require.config({
  paths: {
    "jquery"     : "../vendor/jquery/jquery.min",
    "bootstrap"  : "../vendor/bootstrap/js/bootstrap.min",
    "underscore" : "../vendor/underscore-amd/underscore-min",
    "backbone"   : "../vendor/backbone-amd/backbone-min",
  },
  shim: {
    "bootstrap"  : ["jquery"],
      "backbone" : {
          "deps" : ["jquery", "underscore"],
          "exports" : "Backbone"
      },
      "underscore": {
          "exports" : "_"
      }
  }
  // ,urlArgs: "v=2" + (new Date()).getTime()
});

require(['jquery','bootstrap','views/app'], function($,fat,AppView) {
  return new AppView;
});