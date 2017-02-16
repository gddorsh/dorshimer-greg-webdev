(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = update;
        vm.user = UserService.findUserById(userId);

        function update() {
            var newUser = UserService.updateUser(userId, vm.user);
            if (newUser == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated";
            }
        }
    }

})();