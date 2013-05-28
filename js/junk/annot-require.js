'use strict';

require.config({
    baseUrl: "/js",
    paths: {
      "angular": "lib/angular",
      "angular-resource": "lib/angular-resource",
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

// require.config({
//   baseUrl: window.location.protocol + "//" + window.location.host + window.location.pathname.split("/").slice(0, -1).join("/"),
// 
//   paths: {
// 		jquery:     '/home/rjhala/research/ace-annot/js/lib/jquery/jquery-1.7.1.min',
// 		angular:    '/home/rjhala/research/ace-annot/js/lib/angular/angular',
//         bootstrap:  '/home/rjhala/research/ace-annot/js/lib/bootstrap/bootstrap', 
// 		ace:        '/home/rjhala/research/ace-annot/js/lib/ace/ace'
// 	},
// 	
// 
//   shim: {
// 		'angular' : {'exports' : 'angular'},
// 		'angularMocks': {deps:['angular'], 'exports':'angular.mock'}
// 	},
// 
//   priority: [
// 		"angular"
// 	]
// });
// 
// require( [
// 	'jquery',
// 	'angular'
// 	'app',
// 	'routes'
// ], function($, angular, app, routes) {
// 	'use strict';
// 	$(document).ready(function () {
// 		var $html = $('html');
// 		angular.bootstrap($html, [app['name']]);
// 		// Because of RequireJS we need to bootstrap the app app manually
// 		// and Angular Scenario runner won't be able to communicate with our app
// 		// unless we explicitely mark the container as app holder
// 		// More info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
// 		$html.addClass('ng-app');
// 	});
// });


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


