(function(){
    angular
        .module("Project")
        .controller("AdminPublicUserProfileController", AdminPublicUserProfileController);

    function AdminPublicUserProfileController($routeParams, $location, UserService, ObjectService) {
        var vm = this;
        vm.user._id = $routeParams['id'];
        vm.target._id = $routeParams['uid'];
        vm.favorites;
        // vm.update = update;
        vm.deleteUser = deleteUser;
        vm.deleteFavorite = deleteFavorite;

        UserService.findUserById(vm.target._id)
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

        ObjectService.findFavoritesForUser(vm.user._id)
            .then(function (favorites) {
                if (favorites != null) {
                    vm.favorites = favorites.data; // maybe change this
                } else {
                    vm.error = 'no favorites';
                }
            }, function (err) {
                // console.log(err);
                vm.error = 'failed to get favorites';
            });

        function deleteFavorite(favorite) {
            ObjectService.deleteFavoriteForUser(vm.user._id, favorite._id)
                .then(function (user) {
                    if (user) {
                        vm.message = "favorite successfully removed";
                    } else {
                        vm.error = "failed to remove favorite";
                    }
                }, function (err) {
                    vm.error = err;
                });

        }


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
            UserService.deleteUser(vm.target._id)
                .then(function (data) {
                    if (data) {
                        vm.message = "target user successfully deleted";
                        $location.url("/admin/" + vm.user_id + "/search");
                    } else {
                        vm.error = "could not delete user";
                    }
                }, function (err) {
                    vm.error = "failed to delete user";
                });
        }
    }

})();