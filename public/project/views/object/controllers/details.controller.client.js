(function(){
    angular
        .module("Project")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, UserService, ObjectService) {
        var vm = this;
        vm.user._id = $routeParams['id'];
        vm.item._id = $routeParams['iid'];
        vm.item = {};
        vm.addFavoriteForUser = addFavoriteForUser;

        ObjectService.findItemById(vm.item._id)
            .then(function (item) {
                if (item) {
                    // console.log(item.data);
                    vm.item = item.data;
                } else {
                    vm.error = "item not found";
                }
            }, function (err) {
                vm.error = err;
            });

        function addFavoriteForUser() {
            UserService.addFavoriteForUser(vm.user._id, vm.item._id)
                .then(function (data) {
                    if (data) {
                        vm.message = "favorite added";
                    } else {
                        vm.error = "failed to add favorite";
                    }
                }, function (data) {
                    vm.error = "failed to add favorite";
                });
        }
    }

})();