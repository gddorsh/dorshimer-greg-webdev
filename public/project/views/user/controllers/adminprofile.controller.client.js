(function() {
    angular
        .module("Project")
        .controller("AdminProfileController", AdminProfileController);

    function AdminProfileController($routeParams, $location, UserService) {
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
            // TODO
            $location.url("/login");
        }

        function deleteUser() {
            UserService.deleteUser(vm._id)
                .then(function (data) {
                    if (data) {
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