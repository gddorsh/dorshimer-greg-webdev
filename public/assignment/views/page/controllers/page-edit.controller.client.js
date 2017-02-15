(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        vm.pageId = pageId;
        vm.update = update;
        function init() {
            vm.page = PageService.findPageById(pageId);
        }
        init();

        function update(page) {
            var newPage = PageService.updatePage(page._id, page);
            if (newPage == null) {
                console.log('failed to update page');
            } else {
                console.log('successfully updated page');
                $location.url('#/user/' + userId + "/website/" + websiteId + '/page');
            }
        }
    }
})();