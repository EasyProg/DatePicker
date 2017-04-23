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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkaXJlY3RpdmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkg0JzQuNGF0LDQuNC7IG9uIDE4LjA0LjIwMTcuXHJcbiAqL1xyXG5hcHAuZGlyZWN0aXZlKCdmb28nLCBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICAvL3RlbXBsYXRlVXJsOiBcIi4uL2h0bWwvaW5kZXguaHRtbFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogXCIuLi9odG1sL2luZGV4Lmh0bWxcIixcclxuICAgICAgICByZXBsYWNlOnRydWUsXHJcbiAgICAgICAgc2NvcGU6IHRydWVcclxuICAgIH07XHJcblxyXG5cclxufSk7XHJcbmFwcC5kaXJlY3RpdmUoJ2lzRWRpdGluZycsZnVuY3Rpb24oKXtcclxuICByZXR1cm4gIHtcclxuICAgICAgbGluazpmdW5jdGlvbihzY29wZSxlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgZWxlbWVudC5vbigna2V5dXAnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKF8uaXNFcXVhbChlLmtleUNvZGUsMjcpKSB7XHJcbnNjb3BlLmlzQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzY29wZS5pc0NsaWNrZWQpO1xyXG5zY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAgIHNjb3BlOmZhbHNlXHJcbiAgfVxyXG59KTsiXSwiZmlsZSI6ImRpcmVjdGl2ZS5qcyJ9
