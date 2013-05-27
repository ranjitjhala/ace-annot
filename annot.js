
'use strict';

var editor = ace.edit("editor");
editor.setTheme("ace/theme/chaos");
    
var SrcMode = require("ace/mode/haskell").Mode;
editor.getSession().setMode(new SrcMode());

var fooBar = "gob";

// Angular Controller
function AnnotDemoCtrl($scope, $http, $location){
  $scope.annotValue = "Zogbert Friggleby";
  fooBar = "poop";
}
