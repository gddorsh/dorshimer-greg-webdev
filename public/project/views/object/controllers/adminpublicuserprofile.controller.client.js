(function(){
    angular
        .module("Project")
        .controller("AdminPublicUserProfileController", AdminPublicUserProfileController);

    function AdminPublicUserProfileController($routeParams, $location, UserService, ObjectService) {
        var vm = this;
        vm._id = $routeParams['id'];
        vm._tid = $routeParams['uid'];
        vm.favorites;
        // vm.update = update;
        vm.deleteUser = deleteUser;

        UserService.findUserById(vm._tid)
            .then(function (target) {
                if (target != null) {
                    vm.target = target.data;
                    // console.log(vm.user);
                } else {
                    vm.error = 'target user not found, but success';
                }
            }, function (err) {
                // console.log(err);
                vm.error = 'target user not found';
            });

        /*function update() {
            UserService.updateUser(vm.target._id, vm.target)
                .then(function (target) {
                    vm.message = "user successfully updated";
                    // console.log("profile controller: " + user.data);
                }, function (err) {
                    vm.error = "unable to update user";
                });
        }*/

        function deleteUser() {
            UserService.deleteUser(vm._tid)
                .then(function (data) {
                    if (data) {
                        vm.message = "target user successfully deleted";
                        $location.url("/admin/" + vm._id + "/search");
                    } else {
                        vm.error = "could not delete user";
                    }
                }, function (err) {
                    vm.error = "failed to delete user";
                });
        }
    }

})();