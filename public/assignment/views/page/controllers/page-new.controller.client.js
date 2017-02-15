(function() {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController)

    function PageNewController($routeParams, PageService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        vm.create = create;


        function create(page) {
            var id = (new Date()).getTime();
            vm.page._id = id;
            vm.page.websiteId = websiteId;
            var newPage = PageService.createPage(page);
            if (newPage) {
                console.log("new page created successfully");
            } else {
                console.log("failed to create new page");
            }

        }
    }

})();