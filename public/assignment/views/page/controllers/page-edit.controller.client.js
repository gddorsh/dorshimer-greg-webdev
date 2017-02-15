(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService) {
        var vm = this;
        var pageId = $routeParams['pid'];
        function init() {
            vm.page = PageService.findPageById(pageId);
        }
        init();
    }
})();