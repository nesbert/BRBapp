BRBapp
======

Scratch pad for a webapp boilerplate using Backbone.js + RequireJs + Bootstrap. Learning by doing...

## Getting Started

### Installation

Install project dependencies.

    # initialize project
    npm install

    # optional, globally install grunt-cli and bower
    npm install grunt-cli bower -g

### Workflow Automation

Grunt is used to build, test, optimize, deploy and archive the project.

    # test project
    grunt test

    # build project
    grunt build

    # create a distributable archive
    grunt build-zip

### Adding Application Dependencies

Bower is a package-manager for the web that lets you easily manage dependencies from the command-line (reads [component.json](https://github.com/nesbert/BRBapp/blob/master/component.json)). Update this file as needed to include other libraries.

    # add a new package
    bower install <package> --save

## References

- [Backbone.js](http://backbonejs.org)
- [RequireJS](http://requirejs.org)
- [Bootstrap](http://getbootstrap.com)
- [Grunt](http://gruntjs.com)
- [Bower](https://npmjs.org/package/bower)
- [Node Packaged Modules](https://npmjs.org)
- Jeffery Way's tutorial "[A RequireJS, Backbone, and Bower Starter Template](http://net.tutsplus.com/tutorials/javascript-ajax/a-requirejs-backbone-and-bower-starter-template/)."