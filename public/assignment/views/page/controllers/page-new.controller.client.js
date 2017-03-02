(function() {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        vm.create = create;


        function create() {
            vm.page._id = (new Date()).getTime();
            vm.page.websiteId = websiteId;
            var promise = PageService.createPage(websiteId, vm.page);
            promise
                .success(function (newPage) {
                    if (newPage) {
                        //console.log("new page created successfully");
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    } else {
                        //console.log("failed to create new page");
                        vm.error = "failed to create new page";
                    }
                })
                .error(function (err) {
                    vm.error = "failed to create new page";
                })
        }
    }

})();