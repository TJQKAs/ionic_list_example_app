// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('tabs',{
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tabs.home',{
    url:'/home',
    views:{
      'home-tab':{
        templateUrl:'templates/home.html',
      }
    }
  })

  .state('tabs.list',{
    url:'/list',
    views:{
      'list-tab':{
        templateUrl:'templates/list.html',
        controller: 'ListController'
      }
    }
  })

  .state('tabs.detail',{
    url:'/list/:aId',
    views:{
      'list-tab':{
        templateUrl:'templates/detail.html',
        controller: 'ListController'
      }
    }
  })
  $urlRouterProvider.otherwise('/tab/home');
})

     //first our controller which retrieves data from data.json
.controller('ListController',['$scope','$http','$state',function($scope,$http,$state){
  $http.get('js/data.json').success(function(data){
    $scope.courses=data;
    $scope.whichcourse=$state.params.aId;
     //our function which delete items when we click on trash-button
      $scope.onItemDelete = function(item){
      $scope.courses.splice($scope.courses.indexOf(item),1);
    }

    $scope.doRefresh = function(){
      $http.get('js/data.json').success(function(data){
        $scope.courses=data;
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

      //toggleStar function that create stars when we click on star
      $scope.toggleStar = function(item){
        item.star = !item.star;
    }



    // function which splice our array and we can reorder our elements of array
      $scope.moveItem = function(item,fromIndex,toIndex){
      //splice our array courses and pass fromIndex
      $scope.courses.splice(fromIndex,1);
      $scope.courses.splice(toIndex,0,item);
    };
  });
}]);
