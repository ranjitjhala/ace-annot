
// require([
//     "app",
//     "controller"
//     ]);

// Angular Controller

alert("fooBar");

require(["app", "controller"], function(app) {
  app.controller(
    "AnnotDemoCtrl",
    function($scope, $http, $location) {
      $scope.annotValue = "Zogbert Friggleby";

      alert("fooBar");

      //editor.on("click", function(ev){
      // editor.on("mousemove", function(ev){
      //   $scope.$apply(function () {
      //     var pos    = ev.getDocumentPosition();
      //     var tok    = editor.session.getTokenAt(pos.row, pos.column);
      //     if (tok){
      //       var fooBar = "Row = " + pos.row + " Col " + pos.column + " token = " + tok.value ;
      //       updateAnnotValue($scope, fooBar);
      //     }
      //   });
      // });

      //$scope.sayHello = function() {
      //  return "Hello";
      //}
    }
  );
});

// function AnnotDemoCtrl($scope, $http, $location){
//   $scope.annotValue = "Zogbert Friggleby";
// 
//   //editor.on("click", function(ev){
//   editor.on("mousemove", function(ev){
//     $scope.$apply(function () {
//       var pos    = ev.getDocumentPosition();
//       var tok    = editor.session.getTokenAt(pos.row, pos.column);
//       if (tok){
//          var fooBar = "Row = " + pos.row + " Col " + pos.column + " token = " + tok.value ;
//          updateAnnotValue($scope, fooBar);
//       }
//     });
//   });
// 
// }
