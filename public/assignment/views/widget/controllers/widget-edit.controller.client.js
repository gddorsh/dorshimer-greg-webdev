(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService) {
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
        var widgetType = widget.widgetType;
        vm.widgetType = widgetType;

        function updateWidget(widget) {
            var newWidget = WidgetService.findWidgetById(widget._id);

            // set fields of newWidget here, once
            // the widget-edit form templates are implemented
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
        }

        function deleteWidget(widget) {
            WidgetService.deleteWidget(widget._id);
            $location.url('#/user/' + $routeParams['uid'] +
                          '/website/' + $routeParams['wid'] +
                          '/page/' + $routeParams['pid'] +
                          '/widget/');
        }

    }

})();