(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = update;

        function init() {
            vm.user = UserService.findUserById(userId);
        }
        init();

        function update(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if (user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated";
            }
        };
    }
})();