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
        var promise = WidgetService.findWidgetById(widgetId);
        promise
            .success(function (wg) {
                vm.widget = wg;
                //console.log("first fetch:");
                //console.log(vm.widget);
            })
            .error(function (err) {
                vm.error = "could not get widget";
            });


        function updateWidget() {
            //console.log(vm.widget);

            // update the widget with the new fields
            var promise2 =  WidgetService.updateWidget(vm.widgetId, vm.widget);
            promise2
                .success(function (result) {
                    //console.log("updated widget");
                    //console.log(vm.widget);
                    $location.url('/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
                })
                .error(function (err) {
                    vm.error = "could not update widget";
                });
        }

        function deleteWidget() {
            var deleted = WidgetService.deleteWidget(widgetId);
            if (deleted) {
                //console.log('successfully deleted');
                $location.url('/user/' + $routeParams['uid'] +
                    '/website/' + $routeParams['wid'] +
                    '/page/' + $routeParams['pid'] +
                    '/widget/');
            } else {
                //console.log('failed to deleted widget');
                vm.error = "failed to delete widget";
            }
        }

    }

})();