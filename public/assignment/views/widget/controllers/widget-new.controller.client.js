(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        vm.pageId = pageId;

        vm.linkToWidgetEdit = linkToWidgetEdit;

        function linkToWidgetEdit(widgetType) {
            var widgetId = (new Date()).getTime();
            var widget = {};
            widget._id = widgetId;
            widget.widgetType = widgetType;
            widget.pageId = pageId;
            WidgetService.createWidget(pageId, widget);

            $location.url('#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId);
        }
    }

})();