(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams['pid'];
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pageId);
        }
        init();
    }
})();