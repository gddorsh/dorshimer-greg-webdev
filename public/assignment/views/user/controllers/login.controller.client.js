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
            var myUser = UserService.findUserByCredentials(vm.user.username, vm.user.password);
            if (myUser != null) {
                $location.url("/user/" + myUser._id);
            } else {
                vm.error = 'User/Password combination not found.';
            }
        }
    }

})();