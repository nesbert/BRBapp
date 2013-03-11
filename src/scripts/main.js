require.config({
  // urlArgs: "v=" + (new Date()).getTime(), // cache buster
  paths: {
    // libs
    "jquery"     : "../vendor/jquery/jquery.min",
    "bootstrap"  : "../vendor/bootstrap/js/bootstrap.min",
    "underscore" : "../vendor/underscore-amd/underscore-min",
    "backbone"   : "../vendor/backbone-amd/backbone-min",
    // plug-ins
    "text"       : "../vendor/requirejs-text/text",
    "tpl"        : "../vendor/requirejs-tpl/tpl",
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

require(['jquery','bootstrap','views/app'], function($,bs,AppView) {
  return new AppView;
});