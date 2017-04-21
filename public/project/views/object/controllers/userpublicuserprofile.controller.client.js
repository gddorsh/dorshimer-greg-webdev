(function(){
    angular
        .module("Project")
        .controller("AdminPublicUserProfileController", AdminPublicUserProfileController);

    function AdminPublicUserProfileController($routeParams, UserService, ObjectService) {
        var vm = this;
        vm.user._id = $routeParams['id'];
        vm.target._id = $routeParams['uid'];
        vm.favorites;

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
    }

})();