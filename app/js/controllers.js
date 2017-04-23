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
