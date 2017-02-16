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
            var id = (new Date()).getTime();
            vm.page._id = id;
            vm.page.websiteId = websiteId;
            var newPage = PageService.createPage(websiteId, vm.page);
            if (newPage) {
                //console.log("new page created successfully");
                $location.url("/user/" + userId + "/website/" + websiteId + "/page");
            } else {
                //console.log("failed to create new page");
                // vm.error() some thing here
            }

        }
    }

})();