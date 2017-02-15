(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController)

    function WidgetEditController($routeParams, WidgetService) {
        var vm = this;
        var widgetId = $routeParams['wgid'];

        function init() {
            vm.widget = WidgetService.findWidgetById(widgetId);
        }
        init();
    }

    // TODO

})();