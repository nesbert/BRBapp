require.config({
  // urlArgs: "v=" + (new Date()).getTime(), // cache buster
  paths: {
    // libs
    "jquery"     : "../vendor/jquery/jquery",
    "bootstrap"  : "../vendor/bootstrap/docs/assets/js/bootstrap",
    "underscore" : "../vendor/underscore-amd/underscore",
    "backbone"   : "../vendor/backbone-amd/backbone",
    // plug-ins
    "text"       : "../vendor/requirejs-text/text",
    "tpl"        : "../vendor/requirejs-tpl/tpl"
  },
  shim: {
    "underscore": {
        "exports" : "_"
    },
    "backbone" : {
      "deps" : ["jquery", "underscore"],
      "exports" : "Backbone"
    },
    "bootstrap"  : ["jquery"]
  }
});

require(['app'], function(App) {
  "use strict";
  window.BRBapp = new App();
});