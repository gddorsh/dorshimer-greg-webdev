(function(){
    angular
        .module("Project")
        .controller("UserPublicUserProfileController", UserPublicUserProfileController);

    function UserPublicUserProfileController($routeParams, UserService, ObjectService) {
        var vm = this;
        vm._id = $routeParams['id'];
        vm._tid = $routeParams['uid'];

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
    }

})();