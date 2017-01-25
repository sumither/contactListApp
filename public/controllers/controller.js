function AppCtrlr($scope,$http){
  console.log('This is from the controller');

  var refresh = function(){
    $http.get('/contactlist').success(function(response){
      $scope.contactlist = response;
      $scope.contact = '';
    });
  };

  refresh();

  $scope.addContact = function(){
    $http.post('/contactlist',$scope.contact).success(function(response){
        $scope.contactlist = response;
        refresh();
    });
  }

  $scope.removeContact = function(id){
    $http.delete('/contactlist/'+id).success(function(response){
        refresh();
    });
  }

  $scope.editContact = function(id){
    $http.get('/contactlist/'+id).success(function(response){
        $scope.contact = response;
    });
  }

  $scope.updateContact = function(id){
    $http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response){
        refresh();
    });
  }


  $scope.clearContact = function(id){
        $scope.contact = '';
  }
}
