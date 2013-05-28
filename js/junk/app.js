'use strict';

require.config({
  baseUrl: "/home/rjhala/research/ace-annot/js/",
    
  paths: {
      "angular": "lib/angular/angular",
      "angular-resource": "lib/angular/angular-resource",
  },
    
  shim: {
    "angular": {
            exports: "angular"
        },
        "angular-resource": {
            deps: ["angular"]
        },
    }
});


define("app", ["angular", "angular-resource"], function(angular) {
    var app = angular.module("app", ["ngResource"] );
    // you can do some more stuff here like calling app.factory()...
    return app;
});


// Define Editor
// var editor = ace.edit("editor");
// editor.setTheme("ace/theme/chaos");
// var SrcMode = require("ace/mode/haskell").Mode;
// editor.getSession().setMode(new SrcMode());
// 
// 
// function updateAnnotValue($scope, newVal){
//   $scope.annotValue = newVal;
// }

