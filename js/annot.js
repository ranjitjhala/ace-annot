'use strict';

/********************************************************************************/
/******** "Global" Annotation Table *********************************************/
/********************************************************************************/

/*@ type Annot1 = { ident : string
                  , ann   : string
                  , row   : int
                  , col   : int  
                  , size  : int
                  } */ 

/*@ type Annot  = array [array [annotJ]] */

/*@ annotTable :: Annot */

var annotTable 
   = { 5 : { 14 : { ident : "foo"
                  , ann   : "int -> int"
                  , row   : 5
                  , col   : 14
                  , size  : 3
                  }
           }
     , 9 : { 22 : { ident : "map" 
                  , ann   : "(a -> b) -> [a] -> [b]"
                  , row   : 9
                  , col   : 22
                  , size  : 3
                  }
           , 28 : { ident : "xs"
                  , ann   : "[b]" 
                  , row   : 9 
                  , col   : 28
                  , size  : 2
                  }
           } 
     }

/********************************************************************************/
/******** Function Returning Annot for A Row/Column *****************************/
/********************************************************************************/

var zooper     = "   Int\n-> Bool\n-> IO String";

function getAnnotText(row, col, annT) {
  var rowA = annT[row];
  
  if (!rowA){
    // No annotations defined for this row...
    return null;
  }

  for (var c in rowA){
    if ((c <= col) && (col < c + rowA[c].size)){
      // cursor at col is between start and end
      return rowA[c].ann;
    }
  }
  return null;
}

function annotFun(row, col){
  return getAnnotText(row + 1, col + 1, annotTable);
}

/********************************************************************************/
/******** Set up the Editor *****************************************************/
/********************************************************************************/

var editor      = ace.edit("editor");
editor.setTheme("ace/theme/chaos");
var SrcMode     = require("ace/mode/haskell").Mode;
editor.getSession().setMode(new SrcMode());
var typeTooltip = new TokenTooltip(editor, annotFun);


/********************************************************************************/
/******** Using Angular-Binding To Show Annotations (Deprecated) ****************/
/********************************************************************************/

function updateAnnotValue($scope, newVal){
  $scope.annotValue = newVal;
}

/********************************************************************************/
/******** Angular Controller (Deprecated) ***************************************/
/********************************************************************************/

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

