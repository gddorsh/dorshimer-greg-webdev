(function(){
    angular
        .module("Project")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, $location, ObjectService, UserService) {
        var vm = this;
        vm.user._id = $routeParams['id'];
        vm.query = "";
        vm.queryUserResults;
        vm.queryItemResults;
        vm.findUsersForSearch = findUsersForSearch;
        vm.findItemsForSearch = findItemsForSearch;
        vm.deleteUser = deleteUser;

        function findUsersForSearch() {
            UserService.findUsersForSearch(vm.query)
                .then(function (results) {
                    if (results) {
                        // possibly iterate over results and add each individually
                        vm.queryUserResults = results.data;
                    } else {
                        vm.error = "no users found";
                    }
                }, function (err) {
                    vm.error = "search function failed";
                });
        }

        function findItemsForSearch() {
            ObjectService.findItemsForSearch(vm.query)
                .then(function (results) {
                    if (results) {
                        // possibly iterate over results and add each individually
                        vm.queryItemResults = results.data;
                    } else {
                        vm.error = "no items found";
                    }
                }, function (err) {
                    vm.error = "search function failed";
                });
        }

        function deleteUser(user) {
            UserService.deleteUser(user)
                .then(function (user) {
                    if (user) {
                        $location.url("/admin/" + vm.user._id + "/search");
                    } else {
                        vm.error = "could not delete user";
                    }
                }, function (err) {
                    vm.error = "could not delete user";
                });
        }
    }

})();