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
        //console.log(vm.widgetId);
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        WidgetService.findWidgetById(widgetId)
            .then(function (wg) {
                vm.widget = wg.data;
                console.log(vm.widget.type);
            }, function (err) {
                vm.error = "failed to get widget";
            });


        function updateWidget() {
            //console.log(vm.widget);

            // update the widget with the new fields
            WidgetService.updateWidget(vm.widgetId, vm.widget)
                .then(function (widget) {
                    //console.log("updated widget");
                    //console.log(vm.widget);
                    $location.url('/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
                }, function (err) {
                    vm.error = "failed to update widget";
                });
        }

        function deleteWidget() {
            WidgetService.deleteWidget(widgetId)
                .then(function(widgetId) {
                    $location.url('/user/' + $routeParams['uid'] +
                        '/website/' + $routeParams['wid'] +
                        '/page/' + $routeParams['pid'] +
                        '/widget/');
                }, function(err) {
                    vm.error = "failed to delete widget";
                });
        }

    }

})();