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