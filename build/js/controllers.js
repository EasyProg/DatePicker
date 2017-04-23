/**
 * Created by Михаил on 23.03.2017.
 */
'use strict';
// Declare app level module which depends on views, and components
var app = angular.module('app', []);
app.controller("dateCtrl", function($scope) {
    $scope.Week = ['Mo','Th','Wn','Tu','Fr','Sa','Su'];
    $scope.Days = [];
    $scope.othMonth = false;
    $scope.isChosen = false;
    $scope.Months = [{id:0,name:'January',days:31},
                    {id:1,name:'February',days:28},
                    {id:2,name:'March',days:31},
                    {id:3,name:'April',days:30},
                    {id:4,name:'May',days:31},
                    {id:5,name:'June',days:30},
                    {id:6,name:'July',days:31},
                    {id:7,name:'August',days:31},
                    {id:8,name:'September',days:30},
                    {id:9,name:'Oktober',days:31},
                    {id:10,name:'November',days:30},
                    {id:11,name:'December',days:31}];
    $scope.selectedIndex = -1;
    $scope.selectedLeftTag = false;
    $scope.selectedRightTag = false;
    $scope.isClicked = false;
    $scope.DateObj = {
        Year:'1998',
        Month:'10',
        MonthName:'Unknown',
        Day:'30',
        countDays:30
    };
    $scope.fillDays = function(days,firstDay) {
        $scope.Days = [];
        firstDay = firstDay === undefined?1:firstDay;
        $scope.othMonth = firstDay;
        for (var i = 1;i<firstDay;i++) {
            $scope.Days.push({id:i,value:'D'});
        }
        for (var i = 1;i<=days;i++){
            $scope.Days.push({id:i,value:i});
        }

    }
    //$scope.fillDays();
    $scope.tt = $scope.Days.length;
    $scope.panelCheck = function(index) {
        $scope.selectedIndex = index;
    }
    $scope.selectLeftTag = function() {
        $scope.selectedLeftTag = true;
    }
    $scope.selectRightTag = function() {
        $scope.selectedRightTag = true;
    }

    $scope.getMbyNum = function(arr,num,month,year) {
        var result = '';
        var obj = {};
        console.log(arr,num,month);
        arr.forEach(function(e) {
            if (e['id'] === num) {
                obj = e;
            }
        });
        if (num === 1) {
            obj['days'] = ((year % 400 === 0) && (year % 100 !== 0) && (year % 4 === 0)) ? 29 :28;
        }

        switch (month) {
            case "mon" : return obj['name'];
            case 'id'  : return obj['id'];
            case 'days': return obj['days'];
            //default:     console.log(mon);
        }
    };

    $scope.choose = function(arrIndex,dayIndex,DateObj) {
        $scope.isChosen = arrIndex;
        $scope.setDate(DateObj,dayIndex,DateObj.Month);
    };
    $scope.setDate = function(DateObj,day,month) {
        var DateNow = new Date();
        var Day = day===undefined?DateNow.getDate():day;
        var l1 = Day.toString().length;
        Day  = l1 === 1?'0'+Day:Day;
        DateObj.Year=DateNow.getFullYear();
        DateObj.Month=month===undefined?DateNow.getMonth():month;
        var FirstValueDate = new Date(DateObj.Year,DateObj.Month,1);
        var DayFirst = FirstValueDate.getDay();
        var Month = month===undefined?DateObj.Month+1:month+1;
        var MonthLength =  DateObj.Month.toString().length;
        Month = MonthLength === 2?Month:'0' + Month;
        DateObj.MonthName=$scope.getMbyNum($scope.Months,DateObj.Month,'mon');
        DateObj.Day=Day;
        DateObj.FullDate=Day+'.'+Month+'.'+DateNow.getFullYear();
        DateObj.Time=DateNow.getHours()+":"+DateNow.getMinutes()+':'+DateNow.getSeconds();
        $scope.fillDays($scope.getMbyNum($scope.Months,DateObj.Month,'days'),DayFirst);
    };
    $scope.goacrossDate = function (arr,go,DateObj) {
        var up   = DateObj.Month + 1;
        var down = DateObj.Month - 1;
        down = down === -1?11:down;
        up   = up   === arr.length?0:up;
        var Month =  DateObj.Month;
        var Year  =  DateObj.Year;
        if (go === 'prev') {
            Month = arr[down]['id'];
            Year =  DateObj.Year = down === 11?DateObj.Year-1:DateObj.Year;
            var FirstValueDate = new Date(Year,Month,1);
            var DayFirst = FirstValueDate.getDay();
            return  {
                Year:      Year,
                Month:     Month,
                MonthName: arr[down]['name'],
                Day:       DateObj.Day,
                FullDate:  DateObj.FullDate,
                countDays: $scope.fillDays($scope.getMbyNum($scope.Months,arr[down]['id'],'days'),DayFirst)
            }
        }
        if (go === 'next') {
            Month = arr[up]['id'];
            Year = up ===0?DateObj.Year+1:DateObj.Year;
            var FirstValueDate = new Date(Year,Month,1);
            var DayFirst = FirstValueDate.getDay();
            return  {
                Year:Year,
                Month:Month,
                MonthName: arr[up]['name'],
                Day:       DateObj.Day,
                FullDate:  DateObj.FullDate,
                countDays: $scope.fillDays($scope.getMbyNum($scope.Months,arr[up]['id'],'days'),DayFirst)
            }
        }

    };

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb250cm9sbGVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSDQnNC40YXQsNC40Lsgb24gMjMuMDMuMjAxNy5cclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuLy8gRGVjbGFyZSBhcHAgbGV2ZWwgbW9kdWxlIHdoaWNoIGRlcGVuZHMgb24gdmlld3MsIGFuZCBjb21wb25lbnRzXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW10pO1xyXG5hcHAuY29udHJvbGxlcihcImRhdGVDdHJsXCIsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLldlZWsgPSBbJ01vJywnVGgnLCdXbicsJ1R1JywnRnInLCdTYScsJ1N1J107XHJcbiAgICAkc2NvcGUuRGF5cyA9IFtdO1xyXG4gICAgJHNjb3BlLm90aE1vbnRoID0gZmFsc2U7XHJcbiAgICAkc2NvcGUuaXNDaG9zZW4gPSBmYWxzZTtcclxuICAgICRzY29wZS5Nb250aHMgPSBbe2lkOjAsbmFtZTonSmFudWFyeScsZGF5czozMX0sXHJcbiAgICAgICAgICAgICAgICAgICAge2lkOjEsbmFtZTonRmVicnVhcnknLGRheXM6Mjh9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtpZDoyLG5hbWU6J01hcmNoJyxkYXlzOjMxfSxcclxuICAgICAgICAgICAgICAgICAgICB7aWQ6MyxuYW1lOidBcHJpbCcsZGF5czozMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2lkOjQsbmFtZTonTWF5JyxkYXlzOjMxfSxcclxuICAgICAgICAgICAgICAgICAgICB7aWQ6NSxuYW1lOidKdW5lJyxkYXlzOjMwfSxcclxuICAgICAgICAgICAgICAgICAgICB7aWQ6NixuYW1lOidKdWx5JyxkYXlzOjMxfSxcclxuICAgICAgICAgICAgICAgICAgICB7aWQ6NyxuYW1lOidBdWd1c3QnLGRheXM6MzF9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtpZDo4LG5hbWU6J1NlcHRlbWJlcicsZGF5czozMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2lkOjksbmFtZTonT2t0b2JlcicsZGF5czozMX0sXHJcbiAgICAgICAgICAgICAgICAgICAge2lkOjEwLG5hbWU6J05vdmVtYmVyJyxkYXlzOjMwfSxcclxuICAgICAgICAgICAgICAgICAgICB7aWQ6MTEsbmFtZTonRGVjZW1iZXInLGRheXM6MzF9XTtcclxuICAgICRzY29wZS5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICAkc2NvcGUuc2VsZWN0ZWRMZWZ0VGFnID0gZmFsc2U7XHJcbiAgICAkc2NvcGUuc2VsZWN0ZWRSaWdodFRhZyA9IGZhbHNlO1xyXG4gICAgJHNjb3BlLmlzQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgJHNjb3BlLkRhdGVPYmogPSB7XHJcbiAgICAgICAgWWVhcjonMTk5OCcsXHJcbiAgICAgICAgTW9udGg6JzEwJyxcclxuICAgICAgICBNb250aE5hbWU6J1Vua25vd24nLFxyXG4gICAgICAgIERheTonMzAnLFxyXG4gICAgICAgIGNvdW50RGF5czozMFxyXG4gICAgfTtcclxuICAgICRzY29wZS5maWxsRGF5cyA9IGZ1bmN0aW9uKGRheXMsZmlyc3REYXkpIHtcclxuICAgICAgICAkc2NvcGUuRGF5cyA9IFtdO1xyXG4gICAgICAgIGZpcnN0RGF5ID0gZmlyc3REYXkgPT09IHVuZGVmaW5lZD8xOmZpcnN0RGF5O1xyXG4gICAgICAgICRzY29wZS5vdGhNb250aCA9IGZpcnN0RGF5O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxO2k8Zmlyc3REYXk7aSsrKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5EYXlzLnB1c2goe2lkOmksdmFsdWU6J0QnfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAxO2k8PWRheXM7aSsrKXtcclxuICAgICAgICAgICAgJHNjb3BlLkRheXMucHVzaCh7aWQ6aSx2YWx1ZTppfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8vJHNjb3BlLmZpbGxEYXlzKCk7XHJcbiAgICAkc2NvcGUudHQgPSAkc2NvcGUuRGF5cy5sZW5ndGg7XHJcbiAgICAkc2NvcGUucGFuZWxDaGVjayA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuICAgIH1cclxuICAgICRzY29wZS5zZWxlY3RMZWZ0VGFnID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkTGVmdFRhZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAkc2NvcGUuc2VsZWN0UmlnaHRUYWcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSaWdodFRhZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLmdldE1ieU51bSA9IGZ1bmN0aW9uKGFycixudW0sbW9udGgseWVhcikge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgICAgICB2YXIgb2JqID0ge307XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJyLG51bSxtb250aCk7XHJcbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZVsnaWQnXSA9PT0gbnVtKSB7XHJcbiAgICAgICAgICAgICAgICBvYmogPSBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG51bSA9PT0gMSkge1xyXG4gICAgICAgICAgICBvYmpbJ2RheXMnXSA9ICgoeWVhciAlIDQwMCA9PT0gMCkgJiYgKHllYXIgJSAxMDAgIT09IDApICYmICh5ZWFyICUgNCA9PT0gMCkpID8gMjkgOjI4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChtb250aCkge1xyXG4gICAgICAgICAgICBjYXNlIFwibW9uXCIgOiByZXR1cm4gb2JqWyduYW1lJ107XHJcbiAgICAgICAgICAgIGNhc2UgJ2lkJyAgOiByZXR1cm4gb2JqWydpZCddO1xyXG4gICAgICAgICAgICBjYXNlICdkYXlzJzogcmV0dXJuIG9ialsnZGF5cyddO1xyXG4gICAgICAgICAgICAvL2RlZmF1bHQ6ICAgICBjb25zb2xlLmxvZyhtb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmNob29zZSA9IGZ1bmN0aW9uKGFyckluZGV4LGRheUluZGV4LERhdGVPYmopIHtcclxuICAgICAgICAkc2NvcGUuaXNDaG9zZW4gPSBhcnJJbmRleDtcclxuICAgICAgICAkc2NvcGUuc2V0RGF0ZShEYXRlT2JqLGRheUluZGV4LERhdGVPYmouTW9udGgpO1xyXG4gICAgfTtcclxuICAgICRzY29wZS5zZXREYXRlID0gZnVuY3Rpb24oRGF0ZU9iaixkYXksbW9udGgpIHtcclxuICAgICAgICB2YXIgRGF0ZU5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdmFyIERheSA9IGRheT09PXVuZGVmaW5lZD9EYXRlTm93LmdldERhdGUoKTpkYXk7XHJcbiAgICAgICAgdmFyIGwxID0gRGF5LnRvU3RyaW5nKCkubGVuZ3RoO1xyXG4gICAgICAgIERheSAgPSBsMSA9PT0gMT8nMCcrRGF5OkRheTtcclxuICAgICAgICBEYXRlT2JqLlllYXI9RGF0ZU5vdy5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIERhdGVPYmouTW9udGg9bW9udGg9PT11bmRlZmluZWQ/RGF0ZU5vdy5nZXRNb250aCgpOm1vbnRoO1xyXG4gICAgICAgIHZhciBGaXJzdFZhbHVlRGF0ZSA9IG5ldyBEYXRlKERhdGVPYmouWWVhcixEYXRlT2JqLk1vbnRoLDEpO1xyXG4gICAgICAgIHZhciBEYXlGaXJzdCA9IEZpcnN0VmFsdWVEYXRlLmdldERheSgpO1xyXG4gICAgICAgIHZhciBNb250aCA9IG1vbnRoPT09dW5kZWZpbmVkP0RhdGVPYmouTW9udGgrMTptb250aCsxO1xyXG4gICAgICAgIHZhciBNb250aExlbmd0aCA9ICBEYXRlT2JqLk1vbnRoLnRvU3RyaW5nKCkubGVuZ3RoO1xyXG4gICAgICAgIE1vbnRoID0gTW9udGhMZW5ndGggPT09IDI/TW9udGg6JzAnICsgTW9udGg7XHJcbiAgICAgICAgRGF0ZU9iai5Nb250aE5hbWU9JHNjb3BlLmdldE1ieU51bSgkc2NvcGUuTW9udGhzLERhdGVPYmouTW9udGgsJ21vbicpO1xyXG4gICAgICAgIERhdGVPYmouRGF5PURheTtcclxuICAgICAgICBEYXRlT2JqLkZ1bGxEYXRlPURheSsnLicrTW9udGgrJy4nK0RhdGVOb3cuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBEYXRlT2JqLlRpbWU9RGF0ZU5vdy5nZXRIb3VycygpK1wiOlwiK0RhdGVOb3cuZ2V0TWludXRlcygpKyc6JytEYXRlTm93LmdldFNlY29uZHMoKTtcclxuICAgICAgICAkc2NvcGUuZmlsbERheXMoJHNjb3BlLmdldE1ieU51bSgkc2NvcGUuTW9udGhzLERhdGVPYmouTW9udGgsJ2RheXMnKSxEYXlGaXJzdCk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLmdvYWNyb3NzRGF0ZSA9IGZ1bmN0aW9uIChhcnIsZ28sRGF0ZU9iaikge1xyXG4gICAgICAgIHZhciB1cCAgID0gRGF0ZU9iai5Nb250aCArIDE7XHJcbiAgICAgICAgdmFyIGRvd24gPSBEYXRlT2JqLk1vbnRoIC0gMTtcclxuICAgICAgICBkb3duID0gZG93biA9PT0gLTE/MTE6ZG93bjtcclxuICAgICAgICB1cCAgID0gdXAgICA9PT0gYXJyLmxlbmd0aD8wOnVwO1xyXG4gICAgICAgIHZhciBNb250aCA9ICBEYXRlT2JqLk1vbnRoO1xyXG4gICAgICAgIHZhciBZZWFyICA9ICBEYXRlT2JqLlllYXI7XHJcbiAgICAgICAgaWYgKGdvID09PSAncHJldicpIHtcclxuICAgICAgICAgICAgTW9udGggPSBhcnJbZG93bl1bJ2lkJ107XHJcbiAgICAgICAgICAgIFllYXIgPSAgRGF0ZU9iai5ZZWFyID0gZG93biA9PT0gMTE/RGF0ZU9iai5ZZWFyLTE6RGF0ZU9iai5ZZWFyO1xyXG4gICAgICAgICAgICB2YXIgRmlyc3RWYWx1ZURhdGUgPSBuZXcgRGF0ZShZZWFyLE1vbnRoLDEpO1xyXG4gICAgICAgICAgICB2YXIgRGF5Rmlyc3QgPSBGaXJzdFZhbHVlRGF0ZS5nZXREYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICBZZWFyOiAgICAgIFllYXIsXHJcbiAgICAgICAgICAgICAgICBNb250aDogICAgIE1vbnRoLFxyXG4gICAgICAgICAgICAgICAgTW9udGhOYW1lOiBhcnJbZG93bl1bJ25hbWUnXSxcclxuICAgICAgICAgICAgICAgIERheTogICAgICAgRGF0ZU9iai5EYXksXHJcbiAgICAgICAgICAgICAgICBGdWxsRGF0ZTogIERhdGVPYmouRnVsbERhdGUsXHJcbiAgICAgICAgICAgICAgICBjb3VudERheXM6ICRzY29wZS5maWxsRGF5cygkc2NvcGUuZ2V0TWJ5TnVtKCRzY29wZS5Nb250aHMsYXJyW2Rvd25dWydpZCddLCdkYXlzJyksRGF5Rmlyc3QpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdvID09PSAnbmV4dCcpIHtcclxuICAgICAgICAgICAgTW9udGggPSBhcnJbdXBdWydpZCddO1xyXG4gICAgICAgICAgICBZZWFyID0gdXAgPT09MD9EYXRlT2JqLlllYXIrMTpEYXRlT2JqLlllYXI7XHJcbiAgICAgICAgICAgIHZhciBGaXJzdFZhbHVlRGF0ZSA9IG5ldyBEYXRlKFllYXIsTW9udGgsMSk7XHJcbiAgICAgICAgICAgIHZhciBEYXlGaXJzdCA9IEZpcnN0VmFsdWVEYXRlLmdldERheSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgICAgIFllYXI6WWVhcixcclxuICAgICAgICAgICAgICAgIE1vbnRoOk1vbnRoLFxyXG4gICAgICAgICAgICAgICAgTW9udGhOYW1lOiBhcnJbdXBdWyduYW1lJ10sXHJcbiAgICAgICAgICAgICAgICBEYXk6ICAgICAgIERhdGVPYmouRGF5LFxyXG4gICAgICAgICAgICAgICAgRnVsbERhdGU6ICBEYXRlT2JqLkZ1bGxEYXRlLFxyXG4gICAgICAgICAgICAgICAgY291bnREYXlzOiAkc2NvcGUuZmlsbERheXMoJHNjb3BlLmdldE1ieU51bSgkc2NvcGUuTW9udGhzLGFyclt1cF1bJ2lkJ10sJ2RheXMnKSxEYXlGaXJzdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxufSk7Il0sImZpbGUiOiJjb250cm9sbGVycy5qcyJ9
