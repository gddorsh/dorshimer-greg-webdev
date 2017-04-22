(function(){
    angular
        .module("Project")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, UserService, ObjectService) {
        var vm = this;
        vm.userId = $routeParams['id'];
        vm.itemId = $routeParams['iid'];
        vm.item = {};
        vm.addFavoriteForUser = addFavoriteForUser;

        ObjectService.findItemById(vm.itemId)
            .then(function (item) {
                if (item) {
                    // console.log(item.data.report.food);
                    vm.item = item.data.report.food;
                } else {
                    vm.error = "item not found";
                }
            }, function (err) {
                vm.error = err;
            });

        UserService.findUserById(vm.userId)
            .then(function (user) {
                if (user) {
                    vm.user = user;
                } else {
                    vm.error = "failed to get user";
                }
            }, function (err) {
                vm.error = err;
            });


        function addFavoriteForUser() {
            if (!vm.user.items) {
                vm.user.items = [];
            }
            vm.user.items.push(vm.itemId);
            // console.log(vm.user.items);
            UserService.updateUser(vm.userId, vm.user)
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