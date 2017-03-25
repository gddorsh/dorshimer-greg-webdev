(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.user = {};
        vm.user.username = "";
        vm.user.password = "";
        vm.user.firstName = "";
        vm.user.lastName = "";
        vm.user.email = "";
        vm.user.phone = "";
        vm.register = register;

        function register() {
            UserService.createUser(vm.user)
                .then(function (user) {
                    //console.log("register controller: " + user.data._id);
                    $location.url("/user/" + user.data._id);
                }, function (user) {
                    vm.error = "could not create user";
                });
        }
    }

})();