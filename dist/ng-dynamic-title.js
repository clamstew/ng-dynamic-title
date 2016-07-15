angular.module('ng.dynamic-title', []);
angular.module('ng.dynamic-title').directive('ngDynamicTitle',[
  '$rootScope',
  '$timeout',
  function(
    $rootScope,
    $timeout
  ) {

    function link($scope, $element) {
      function stateChangeCallback(event, toState) {
        var title;
        $scope.separator = $scope.separator ? $scope.separator : '-';
        $scope.separatorTagline = $scope.separatorTagline ? $scope.separatorTagline : '-';

        // build default title suffix
        if($scope.rootTitle && $scope.subTitle){
          title = $scope.rootTitle+' '+$scope.separator+' '+$scope.subTitle;
        }

        // either prepend toState.data.ngDynamicTitle default scope titles
        // or display the title on toState.data.ngDynamicTitle
        if (toState.data && toState.data.ngDynamicTitle && title) {
          title = toState.data.ngDynamicTitle + ' '+$scope.separator+' ' + title;
        } else {
          title = toState.data.ngDynamicTitle;
        }

        $timeout(function() {
          $element.text(title);
        }, 0, false);
      }

      // ui-router state change event
      $rootScope.$on('$stateChangeSuccess', stateChangeCallback);
    }

    return {
      restrict: 'A',
      link: link,
      scope: {
        'rootTitle': '@',
        'subTitle': '@',
        'separator': '@?',
        'separatorTagline': '@?'
      }
    };

  }
]);
angular.module('ng.dynamic-title').service('ngDynamicTitleService',[
  '$rootScope',
  '$timeout',
  function(
    $rootScope,
    $timeout
  ) {

    return {
      titles: []
    };

  }
]);