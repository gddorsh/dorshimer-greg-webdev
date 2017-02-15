(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController)

    function WebsiteNewController($routeParams, WebsiteService) {
        var vm = this;
        userId = $routeParams('uid');
        vm.userId = userId;
        vm.update = update;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        function update(website) {
            WebsiteService.updateWebsite(website);
        }
    }

})();