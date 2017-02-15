(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)

    function WebsiteEditController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();
    }

})();