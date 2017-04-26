(function(){
    angular
        .module("Project")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.user = {};
        vm.user.username = "";
        vm.user.password = "";
        vm.login = login;

        function login() {
            UserService.login(vm.user)
                .then(function (user) {
                    $rootScope.currentUser = user.data;
                    UserService.findUserByCredentials(vm.user.username, vm.user.password)
                        .then(function (user) {
                            if (user.data != null) {
                                // console.log(user);
                                if (user.data.type == "ADMIN") {
                                    $location.url("/admin/" + user.data._id);
                                } else if (user.data.type == "USER") {
                                    $location.url("/user/" + user.data._id);
                                } else {
                                    vm.error = 'user.type: ' + user.data.type;
                                }
                            } else {
                                // console.log("user/password combination not found");
                                vm.error = 'user/password combination not found';
                            }
                        }, function (err) {
                            vm.error = 'user/password combination not found';
                        });
                }, function (err) {
                    vm.error = err;
                });
        }
    }

})();