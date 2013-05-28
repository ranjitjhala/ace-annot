'use strict';


//////////////////////////////////////////////////////////////////////////////////////
// Function Returning Annot for A Row/Column /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

var zooper = "   Int\n-> Bool\n-> IO String";

function annotFun(row, col){
   // return "(HAHAHAHA " + col + ", " + row + " OHOHOHOHO)";
   if (row > 5) {
     return zooper;
   };
   return "(" + row + ", " + col + ")";
};

//////////////////////////////////////////////////////////////////////////////////////
/////////// Define Editor ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

var editor = ace.edit("editor");
editor.setTheme("ace/theme/chaos");
var SrcMode = require("ace/mode/haskell").Mode;
editor.getSession().setMode(new SrcMode());

var tt = new TokenTooltip(editor, annotFun);



//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function updateAnnotValue($scope, newVal){
  $scope.annotValue = newVal;
}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function AnnotDemoCtrl($scope, $http, $location){
   
  $scope.annotValue = "Zogbert Friggleby";
 
  //editor.on("click", function(ev){
  editor.on("mousemove", function(ev){
    $scope.$apply(function () {
      var pos    = ev.getDocumentPosition();
      var tok    = editor.session.getTokenAt(pos.row, pos.column);
      if (tok){
         var fooBar = "Row = " + pos.row + " Col " + pos.column + " token = " + tok.value ;
         updateAnnotValue($scope, fooBar);
      }
    });
  });
} 

