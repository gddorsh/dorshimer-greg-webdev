(function(){
    angular
        .module("Project")
        .controller("UserSearchController", UserSearchController);

    function UserSearchController($routeParams, $location, ObjectService, UserService) {
        var vm = this;
        vm._id = $routeParams['id'];
        vm.query = "";
        vm.queryUserResults;
        vm.queryItemResults;
        vm.findUsersForSearch = findUsersForSearch;
        vm.findItemsForSearch = findItemsForSearch;

        function findUsersForSearch() {
            vm.queryItemResults = "";
            UserService.findUsersForSearch(vm.query)
                .then(function (results) {
                    // console.log(results.data.length);
                    if (results.data.length > 0) {
                        // possibly iterate over results and add each individually
                        vm.queryUserResults = results.data;
                    } else {
                        // console.log("no users found");
                        vm.error = "no users found";
                    }
                }, function (err) {
                    vm.error = "search function failed";
                });
        }

        function findItemsForSearch() {
            vm.queryUserResults = "";
            ObjectService.findItemsForSearch(vm.query)
                .then(function (results) {
                    if (results.data) {
                        // possibly iterate over results and add each individually
                        // console.log(results.data.list.item);
                        vm.queryItemResults = results.data.list.item;
                        // console.log(vm.queryItemResults);
                        // console.log(vm.queryItemResults[0].name);
                        // console.log(vm.queryItemResults[0].ndbno);
                    } else {
                        vm.error = "no items found";
                    }
                }, function (err) {
                    vm.error = "search function failed";
                });
        }
    }

})();