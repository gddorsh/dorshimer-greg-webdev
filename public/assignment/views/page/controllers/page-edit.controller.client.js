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
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.page = PageService.findPageById(pageId);

        function updatePage() {
            var newPage = PageService.updatePage(vm.page._id, vm.page);
            if (newPage == null) {
                //console.log('failed to update page');
            } else {
                //console.log('successfully updated page');
                $location.url("/user/" + userId + "/website/" + websiteId + "/page");
            }
        }

        function deletePage() {
            var deleted = PageService.deletePage(vm.page._id);
            if (deleted) {
                console.log('successfully deleted page');
                $location.url("/user/" + userId + "/website/" + websiteId + "/page");
            } else {
                console.log('could not delete page');
            }
        }
    }
})();