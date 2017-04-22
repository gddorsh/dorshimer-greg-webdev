(function(){
    angular
        .module("Project")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($routeParams, UserService, ObjectService) {
        var vm = this;
        vm._id = $routeParams['id'];
        vm.user;
        vm.deleteFavorite = deleteFavorite;

        UserService.findUserById(vm._id)
            .then(function (user) {
                if (user != null) {
                    vm.user = user.data;
                } else {
                    vm.error = "couldn't get user";
                }
            }, function (err) {
                // console.log(err);
                vm.error = 'failed to get user';
            });

        function deleteFavorite(favorite) {
            var i = vm.user.items.indexOf(favorite);
            vm.user.items.splice(i, 1);

            UserService.updateUser(vm._id, vm.user)
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
    }

})();