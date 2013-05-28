'use strict';


// Define Editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/chaos");
var SrcMode = require("ace/mode/haskell").Mode;
editor.getSession().setMode(new SrcMode());



function updateAnnotValue($scope, newVal){
  $scope.annotValue = newVal;
}

// Angular Controller
function AnnotDemoCtrl($scope, $http, $location){
  
  $scope.annotValue = "Zogbert Friggleby";

  editor.on("click", function(ev){
    $scope.$apply(function () {
      var pos    = ev.getDocumentPosition();
      var tok    = editor.session.getTokenAt(pos.row, pos.column);
      var fooBar = "Row = " + pos.row + " Col " + pos.column + " token = " + tok.value ;
      updateAnnotValue($scope, fooBar);
    });
  });
}
