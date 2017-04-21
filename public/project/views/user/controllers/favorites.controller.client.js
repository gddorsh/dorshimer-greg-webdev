(function(){
    angular
        .module("Project")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($routeParams, UserService, ObjectService) {
        var vm = this;
        vm.user._id = $routeParams['id'];
        vm.favorites;
        vm.deleteFavorite = deleteFavorite;

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
            UserService.deleteFavoriteForUser(vm.user._id, favorite._id)
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