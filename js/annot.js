'use strict';


/***********************************************************************/
/** Shuffle the Cursor To Get to WordStart *****************************/
/***********************************************************************/

var splitters = [ ' ', '\t', '\n', '(' , ')', '[', ']' ];

/*@ isSplit :: (char) => boolean */
function isSplit(c){ return (splitters.indexOf(c) >= 0); }

function wordRangeLo(s, col){
  
  if (isSplit(s[col])){
    return col;
  }

  var lo = col;

  
  while (0 < lo) {
    if (isSplit(s[lo - 1])){
      return lo;
    };
    lo = lo - 1;
  }
  return lo;
}

function wordRangeHi(s, col){
  
  if (isSplit(s[col])){
    return col;
  }

  var hi = col;
  
  while (hi < s.length - 1) {
    if (isSplit(s[hi + 1])) {
      return hi;
    }
    hi = hi + 1;
  }
  return hi;
}
  
 
/*@ localWordStart :: (string, int, int) => [string, int, int] */
function localWordStart(str, row, col){
  var lo = wordRangeLo(str, col);
  var hi = wordRangeHi(str, col);
  var w  = str.slice(lo, 1 + hi);
  return lo;
  // return w;
  //return [w, lo, hi];
}
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
                  }
           }
     , 9 : { 22 : { ident : "map" 
                  , ann   : "(a -> b) -> [a] -> [b]"
                  , row   : 9
                  , col   : 22
                  }
           , 28 : { ident : "xs"
                  , ann   : "[b]" 
                  , row   : 9 
                  , col   : 28
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
    if (c == col) {
      // Found annotation beginning at exact row, col
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
var curRange;

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
      var rng    = editor.session.getAWordRange(pos.row, pos.column);
      var wrd1   = editor.session.getTextRange(rng);
      var line   = editor.session.getLine(pos.row);
      var wrd2   = localWord(line, 1 + pos.row, pos.column);
      // var wrd2   = editor.session.getTextRange(localWordRange(editor.session, pos.row, pos.column));

      curRange   = rng;
      curRange.start.row
      curRange.start.column

      if (tok){
         var fooBar = "Row = "   + pos.row    + 
                      "Col "     + pos.column + 
                      "token = " + tok.value  + 
                      "word1 = " + wrd1      +
                      "word2 = " + wrd2
         ;
         updateAnnotValue($scope, fooBar);
      }
    });
  });
} 

