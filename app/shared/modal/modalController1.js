angular.module('shared').controller('ModalInstanceCtrl1', function ($scope, $uibModalInstance) {


  $scope.ok = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss(false);
  };
});