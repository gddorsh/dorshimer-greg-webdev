(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = update;

        //console.log("profile-controller: userId: " + userId);
        UserService.findUserById(userId)
            .then(function (user) {
                if (user != null) {
                    vm.user = user.data;
                    // console.log(vm.user);
                } else {
                    //vm.error = 'User not found, but success';
                }
            }, function (err) {
                // console.log(err);
                //vm.error = 'User not found.';
            });

        function update() {
            UserService.updateUser(userId, vm.user)
                .then(function (user) {
                    vm.message = "user successfully updated";
                    // console.log("profile controller: " + user.data);
                }, function (user) {
                    vm.error = "unable to update user";
                });
        }
    }

})();