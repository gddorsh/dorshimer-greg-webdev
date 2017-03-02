(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        // console.log(vm.userId);
        var promise = WebsiteService.findWebsitesByUser(userId);
        promise
            .success(function (websites) {
                vm.websites = websites;
            })
            .error(function (err) {
                vm.error = "could not get websites";
            })
    }

})();