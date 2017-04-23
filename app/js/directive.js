/**
 * Created by Михаил on 18.04.2017.
 */
app.directive('foo', function() {
    return {
        link: function (scope, element, attrs) {
            //templateUrl: "../html/index.html"
        },
        templateUrl: "../html/index.html",
        replace:true,
        scope: true
    };


});
app.directive('isEditing',function(){
  return  {
      link:function(scope,element, attrs) {
          element.on('keyup', function(e) {
              if (_.isEqual(e.keyCode,27)) {
scope.isClicked = false;
                  console.log(scope.isClicked);
scope.$apply();
              }
          });
    },
      scope:false
  }
});