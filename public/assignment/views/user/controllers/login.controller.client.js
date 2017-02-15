(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var myUser = UserService.findUserByCredentials(user.username, user.password);
            if (myUser != null) {
                $location.url('/user/' + myUser._id);
            } else {
                vm.error = 'User/Password combination not found.';
            }
        }
    }

})();