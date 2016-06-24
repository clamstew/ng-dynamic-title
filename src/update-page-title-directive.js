angular.module('ng.dynamic-title').directive('ngDynamicTitle',[
  function() {

    function controller($scope, $element) {
      function stateChangeCallback(event, toState) {
        var title;

        // build default title suffix
        if($scope.rootTitle && $scope.subTitle){
          title = $scope.rootTitle+' | '+$scope.subTitle;
        }

        // either prepend toState.data.ngDynamicTitle default scope titles
        // or display the title on toState.data.ngDynamicTitle
        if (toState.data && toState.data.ngDynamicTitle && title) {
          title = toState.data.ngDynamicTitle + ' | ' + title;
        } else {
          title = toState.data.ngDynamicTitle
        }

        $element.text(title);
      }

      // ui-router state change event
      $scope.$on('$stateChangeSuccess', stateChangeCallback);
    }

    return {
      restrict: 'A',
      controller: controller,
      scope: {
        'rootTitle': '@',
        'subTitle': '@'
      }
    };

  }
]);