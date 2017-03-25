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
        PageService.findPageById(pageId)
            .then(function (page) {
                // console.log(page.data.length);
                // console.log(page);
                // console.log(page.data);
                // console.log(page.data[0]);
                vm.page = page.data[0];
            }, function (err) {
                vm.error = "failed to get page";
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
                        vm.error = "failed to delete page";
                    }
                })
                .error(function (err) {
                    vm.error = "failed to delete page";
                });
        }
    }
})();