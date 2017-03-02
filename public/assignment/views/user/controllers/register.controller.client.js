(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.user = {};
        vm.user._id = "";
        vm.user.username = "";
        vm.user.password = "";
        vm.user.firstName = "";
        vm.user.lastName = "";
        vm.register = register;

        function register() {
            vm.user._id = (new Date()).getTime();
            var promise = UserService.createUser(vm.user);
            promise
                .success(function (user) {
                    $location.url("/user/" + vm.user._id);
                })
                .error(function (user) {
                    vm.error("could not create user");
                })
        }
    }

})();