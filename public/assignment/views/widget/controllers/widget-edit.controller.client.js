(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        vm.pageId = pageId;
        var widgetId = $routeParams['wgid'];
        vm.widgetId = widgetId;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        var widget = WidgetService.findWidgetById(widgetId);
        vm.widget = widget;
        console.log(widget);
        var widgetType = widget.widgetType;
        vm.widgetType = widgetType;

        function updateWidget(widget) {
            var newWidget = WidgetService.findWidgetById(widget._id);

            // set fields of newWidget here
            if (widgetType == 'HEADER') {
                newWidget.size = widget.size;
                newWidget.text = widget.text;
            } else if (widgetType == 'HTML') {
                newWidget.text = widget.text;
            } else if (widgetType == 'IMAGE') {
                newWidget.width = '' + widget.width + '%';
                newWidget.url = widget.url;
            } else if (widgetType == 'YOUTUBE') {
                newWidget.width = '' + widget.width + '%';
                newWidget.url = widget.url;
            }

            // update the widget with the new fields
            WidgetService.updateWidget(newWidget._id, newWidget);
            $location.url('/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
        }

        function deleteWidget(widgetId) {
            var deleted = WidgetService.deleteWidget(widgetId);
            if (deleted) {
                console.log('successfully deleted');
                $location.url('/user/' + $routeParams['uid'] +
                    '/website/' + $routeParams['wid'] +
                    '/page/' + $routeParams['pid'] +
                    '/widget/');
            } else {
                console.log('failed to deleted widget');
            }
        }

    }

})();