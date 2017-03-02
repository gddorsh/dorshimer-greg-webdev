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
        var promise = PageService.findPageById(pageId);
        promise
            .success(function (page) {
                vm.page = page;
            })
            .error(function (err) {
                vm.error = "could not get page";
            });

        function updatePage() {
            var promise = PageService.updatePage(vm.page._id, vm.page);
            promise
                .success(function (newPage) {
                    if (newPage == null) {
                        //console.log('failed to update page');
                    } else {
                        //console.log('successfully updated page');
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    }
                })
                .error(function(err) {
                    vm.error = "failed to update page";
                })
        }

        function deletePage() {
            var promise = PageService.deletePage(vm.page._id);
            promise
                .success(function (deleted) {
                    if (deleted) {
                        // console.log('successfully deleted page');
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    } else {
                        // console.log('could not delete page');
                        vm.error = "could not delete page";
                    }
                })
                .error(function (err) {
                    vm.error = "could not delete page";
                });
        }
    }
})();