(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.user = {};
        vm.user.username = "";
        vm.user.password = "";
        vm.login = login;

        function login() {
            var promise = UserService.findUserByCredentials(vm.user.username, vm.user.password);
            promise
                .success(function (user) {
                    var myUser = user;
                    if (myUser != null) {
                        // console.log(myUser);
                        $location.url("/user/" + myUser._id);
                    } else {
                        vm.error = 'User/Password combination not found.';
                    }
                })
                .error(function (err) {
                    vm.error = 'User/Password combination not found.';
                });
        }
    }

})();