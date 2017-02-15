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
        vm.update = update;
        vm.delete = deleteWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();

        function update(website) {
            var newWebsite = WebsiteService.updateWebsite(website);
            if (newWebsite == null) {
                console.log("failed to update website");
            } else {
                console.log("website successfully updated");
                $location.url('#/user/' + userId + '/website');
            }
        }

        function deleteWebsite(website) {
            var deleted = WebsiteService.deleteWebsite(website);
            if (deleted) {
                console.log("website successfully delete");
                $location.url('#/user/' + userId + '/website');
            } else {
                console.log("failed to delete website");
            }

        }
    }

})();