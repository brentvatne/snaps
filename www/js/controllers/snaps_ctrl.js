angular.module('snap.controllers')
.controller('SnapsCtrl', function($scope, $rootScope, $state, $ionicLoading,
                                  $cordovaDialogs, $cordovaVibration,
                                  $cordovaCamera, FirebaseUrl, $firebase) {

  $scope.isLoading = true;
  var snapsRef = new Firebase(FirebaseUrl + "/snaps");
  $scope.snaps = $firebase(snapsRef);
  $scope.snaps.$on('loaded', function() {
    $scope.isLoading = false;
  });

  $scope.formattedDate = function(dateInteger) {
    return strftime('%B %d, %Y %H:%M:%S', new Date(dateInteger));
  }

  $scope.takePicture = function() {
    var options = {
        quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 600,
        targetHeight: 600,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $ionicLoading.show({
        template: 'Uploading...'
      });

      $scope.snaps.$add({data: imageData, created: (new Date().getTime())}).
        then(function(data) {
          $ionicLoading.hide();
        });
    }, function(err) {
      $cordovaDialogs.alert("Uh that failed for some reason.")
    });
  }
});
