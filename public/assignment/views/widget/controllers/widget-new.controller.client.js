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
            var widget = {};
            widget._page = pageId;
            widget.type = widgetType;
            widget.name = "defaultName";
            widget.text = "test text";
            widget.placeholder = "test text";
            widget.description = "test text";
            widget.url = "https://youtu.be/idGvKFbYgI4";
            widget.width = "100%";
            widget.height = "100%";
            widget.rows = 3;
            widget.size = 3;
            widget.class = "defaultClass";
            widget.icon = "defaultIcon";

            // console.log(widget);
            WidgetService.createWidget(pageId, widget)
                .then(function (wg) {
                    // console.log("wg: " + wg);
                    // console.log("wg.data: " + wg);
                    // console.log(wg);
                    $location.url('/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + wg.data._id);
                }, function (err) {
                    vm.error = "failed to create new widget";
                });
        }
    }

})();