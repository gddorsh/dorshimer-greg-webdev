(function() {
    angular
        .module("Project")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.user = {};
        vm.user.username = "";
        vm.user.email = "";
        vm.user.password = "";
        vm.user.password2 = "";
        vm.registerUser = registerUser;
        vm.registerAdmin = registerAdmin;

        function registerUser() {
            if (vm.user.password == vm.user.password2) {
                vm.user.type = 'USER';
                UserService.createUser(vm.user)
                    .then(function (user) {
                        $rootScope.currentUser = user.data;
                        //console.log("register controller: " + user.data._id);
                        $location.url("/user/" + user.data._id);
                    }, function (user) {
                        vm.error = "could not create user";
                    });
            } else {
                vm.error = "passwords must match";
            }
        }

        function registerAdmin() {
            if (vm.user.password == vm.user.password2) {
                vm.user.type = 'ADMIN';
                UserService.createUser(vm.user)
                    .then(function (user) {
                        $rootScope.currentUser = user.data;
                        //console.log("register controller: " + user.data._id);
                        $location.url("/admin/" + user.data._id);
                    }, function (user) {
                        vm.error = "could not create user";
                    });
            } else {
                vm.error = "passwords must match";
            }
        }
    }

})();