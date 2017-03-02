(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        var promise = UserService.findUserById(userId);
        promise
            .success(function (user) {
                var myUser = user;
                if (myUser != null) {
                    vm.user = myUser;
                } else {
                    vm.error = 'User not found, but success';
                }
            })
            .error(function (err) {
                console.log(promise);
                vm.error = 'User not found.';
            });
        // console.log(vm.user); this was showing undefined, but functionality was there, so idk
        vm.update = update;

        function update() {
            var promise = UserService.updateUser(userId, vm.user);
            promise
                .success(function (user) {
                    vm.message = "user successfully updated";
                    // console.log(newUser.toString());
                })
                .error(function (user) {
                    vm.error = "unable to update user";
                });
        }
    }

})();