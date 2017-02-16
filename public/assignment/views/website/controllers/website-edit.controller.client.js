(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();

        function updateWebsite() {
            var newWebsite = WebsiteService.updateWebsite(websiteId, vm.website);
            if (newWebsite) {
                // console.log("website successfully updated");
                $location.url("/user/" + userId + "/website");
            } else {
                console.log("failed to update website");
            }
        }

        function deleteWebsite() {
            var deleted = WebsiteService.deleteWebsite(vm.websiteId);
            if (deleted) {
                //console.log("website successfully deleted");
                $location.url("/user/" + userId + "/website");
            } else {
                console.log("failed to delete website");
            }

        }
    }

})();