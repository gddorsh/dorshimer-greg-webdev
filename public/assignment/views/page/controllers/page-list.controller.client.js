(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var promise = PageService.findPagesByWebsiteId(websiteId);
        promise
            .success(function(pages) {
                vm.pages = pages;
            })
            .error(function (err) {
                vm.error = "could not get pages";
            });
    }

})();