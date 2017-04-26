(function(){
    angular
        .module("Project")
        .controller("UserProfileController", UserProfileController);

    function UserProfileController($routeParams, $location, $rootScope, UserService) {
        var vm = this;
        vm._id = $routeParams['id'];
        vm.update = update;
        vm.logout = logout;
        vm.deleteUser = deleteUser;

        //console.log("profile-controller: userId: " + userId);
        UserService.findUserById(vm._id)
            .then(function (user) {
                if (user != null) {
                    vm.user = user.data;
                    // vm.password2 = vm.user.password;
                    // console.log(vm.user);
                } else {
                    vm.error = 'user not found, but success';
                }
            }, function (err) {
                // console.log(err);
                vm.error = 'user not found';
            });

        function update() {
            UserService.updateUser(vm._id, vm.user)
                .then(function (user) {
                    vm.message = "user successfully updated";
                    // console.log("profile controller: " + user.data);
                }, function (user) {
                    vm.error = "unable to update user";
                });
        }

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                }, function (err) {
                    vm.error = "failed to logout";
                });
        }

        function deleteUser() {
            UserService.deleteUser(vm.user._id)
                .then(function (data) {
                    if (data) {
                        vm.message = "user successfully deleted";
                        $location.url("/register/");
                    } else {
                        vm.error = "could not delete user";
                    }
                }, function (err) {
                    vm.error = "" + err;
                });
        }
    }

})();