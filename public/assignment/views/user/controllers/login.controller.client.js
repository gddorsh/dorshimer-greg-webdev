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
            UserService.findUserByCredentials(vm.user.username, vm.user.password)
                .then(function (user) {
                    if (user != null) {
                        // console.log(myUser);
                        $location.url("/user/" + user.data._id);
                    } else {
                        vm.error = 'User/Password combination not found.';
                    }
                }, function (err) {
                    vm.error = 'User/Password combination not found.';
                });
        }
    }

})();