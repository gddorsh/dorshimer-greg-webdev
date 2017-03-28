(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        var pageId = $routeParams['pid'];
        vm.pageId = pageId;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        WidgetService.findWidgetsByPageId(pageId)
            .then(function (widgets) {
                // console.log(widgets);
                // for (wg in widgets.data) {
                //     console.log(widgets.data[wg]);
                // }
                vm.widgets = widgets.data;
                // for (wg in vm.widgets) {
                //     console.log(vm.widgets[wg]);
                // }
            }, function (err) {
                vm.error = "failed to get widgets";
            });

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            console.log(widgetUrl);
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }
    }

})();