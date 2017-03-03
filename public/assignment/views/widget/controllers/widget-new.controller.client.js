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

        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var widgetId = (new Date()).getTime();
            var widget = {};
            widget._id = widgetId;
            widget.widgetType = widgetType;
            // console.log(widgetType.toString());
            widget.pageId = pageId;
            widget.size = 3;
            widget.text = 'test text';
            widget.width = '100%';
            widget.url = 'testurl';

            var promise = WidgetService.createWidget(pageId, widget);
            promise
                .success(function (wg) {
                    $location.url('/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId);
                })
                .error(function (err) {
                    vm.error = "failed to create new widget";
                });
        }
    }

})();