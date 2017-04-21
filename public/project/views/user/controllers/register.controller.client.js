(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.user = {};
        vm.user.username = "";
        vm.user.email = "";
        vm.user.password = "";
        vm.user.password2 = "";
        vm.register = register;

        function register() {
            if (vm.user.password == vm.user.password2) {
                UserService.createUser(vm.user)
                    .then(function (user) {
                        //console.log("register controller: " + user.data._id);
                        $location.url("/user/" + user.data._id);
                    }, function (user) {
                        vm.error = "could not create user";
                    });
            } else {
                vm.error = "passwords must match";
            }
        }
    }

})();