(function(){
    angular
        .module("Project")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, ObjectService, UserService) {
        var vm = this;
        vm.user._id = $routeParams['id'];
        vm.query = "";
        vm.queryUserResults;
        vm.queryItemResults;
        vm.findUsersForSearch = findUsersForSearch;
        vm.findItemsForSearch = findItemsForSearch;

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
    }

})();