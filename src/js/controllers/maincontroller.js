const SERVER_URL = 'https://class-server.herokuapp.com/collections/tai-contact-form/';

function MainController ($scope, $http) {
  $scope.contacts = [];
  $scope.errors = {};

  function init () {
    $http.get(SERVER_URL).then(function (resp) {
      console.log(resp.data);
      $scope.contacts = resp.data;
    });
  };

  init();

  $scope.validateName = function (name) {
    if (name === '') {
      $scope.errors.name = "Name cannot be left empty";
      return false;
    }
    else {
      $scope.errors.name = "";
    }
    return true;
  };

  $scope.validateEmail = function (email) {
    if (email === '') {
      $scope.errors.email = "Email cannot be left empty";
      return false;
    }
    else if (!email.includes('@')) {
      $scope.errors.email = "Email must have an '@'";
      return false;
    }
    else {
      $scope.errors.email = "";
    }
    return true;
  };

  $scope.validateUrl = function (url) {
    if (url && !url.startsWith('http')) {
      $scope.errors.url = "Must be a valid URL starting with http or https."
      return false;
    }
    else if (url === '') {
      $scope.errors.url = '';
    }
    return true;
  };

  $scope.validateMsg = function (msg) {
    if (msg === '') {
      $scope.errors.msg = "Message cannot be left empty";
      return false;
    }
    else {
      $scope.errors.msg = "";
    }
    return true;
  };

  $scope.validateData = function () {
    return 
  }

  $scope.addContact = function (contact) {
    if ($scope.validateData(contact)) {
      $http.post(SERVER_URL, contact).then(function (resp) {
        let contact = resp.data;
        $scope.contacts.push(contact);
      });
    }
  };
};

MainController.$inject = ['$scope', '$http'];
export { MainController };
