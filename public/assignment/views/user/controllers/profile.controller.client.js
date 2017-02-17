(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.user = UserService.findUserById(userId);
        vm.update = update;

        function update() {
            var newUser = UserService.updateUser(userId, vm.user);
            if (newUser == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated";
                console.log(newUser.toString());
            }
        }
    }

})();