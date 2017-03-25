(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        // console.log(vm.userId);
        WebsiteService.findWebsitesByUser(userId)
            .then(function (websites) {
                // console.log(websites);
                vm.websites = websites.data;
            }, function (err) {
                vm.error = "could not get websites";
            });
    }

})();